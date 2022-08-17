import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../utils/authentication/withSession";
import nc from "next-connect";
import { ClientCredentialRequest } from "@azure/msal-node";
import { instantiateCca } from "../../../utils/msal/cca";
import { dynamicsContact } from "../../../services/dynamicsContact";
import { errorResponse } from "../../../utils/serverErrorHandling";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    console.error(err.stack);
    const { status, error } = errorResponse(err.message);
    return res.status(status).json({ error });
  },
  onNoMatch: (_req, res) => {
    res.status(404).end("Method is not supported");
  },
})
  .get(async (req, res) => {
    if (!req.session.user) {
      throw new Error("Not Authenticated");
    }
    const { id } = req.query;
    if (!id) {
      throw new Error("Invalid Query");
    }
    const cca = await instantiateCca();
    const clientCredentialsRequest: ClientCredentialRequest = {
      scopes: [`${process.env.CLIENT_URL}/.default`],
      skipCache: false,
    };
    const tokenResponse = await cca.acquireTokenByClientCredential(
      clientCredentialsRequest
    );

    if (!tokenResponse) {
      throw new Error("Server Error");
    }
    const member = await dynamicsContact(tokenResponse.accessToken).getById(
      id as string
    );

    return res.status(200).json({ ...member });
  })
  .put(async (req, res) => {
    if (!req.session.user) {
      throw new Error("Not Authenticated");
    }
    if (req.session.user.id !== req.query.id) {
      throw new Error("Not Authorized");
    }
    const cca = await instantiateCca();
    const clientCredentialsRequest: ClientCredentialRequest = {
      scopes: [`${process.env.CLIENT_URL}/.default`],
      skipCache: false,
    };
    const tokenResponse = await cca.acquireTokenByClientCredential(
      clientCredentialsRequest
    );

    if (!tokenResponse) {
      throw new Error("Server Error");
    }
    if (req.body.contactid) {
      if (!req.body.bsi_membercompanyid) {
        const companyid = await dynamicsContact(
          tokenResponse.accessToken
        ).createMemberCompany(req.body.company);
        await dynamicsContact(tokenResponse.accessToken).updateUserById(
          req.body.contactid,
          {
            ...req.body.contact,
            "bsi_MemberCompany@odata.bind": `/bsi_membercompanies(${companyid})`,
          }
        );
        await dynamicsContact(
          tokenResponse.accessToken
        ).updateUserAssociatedSectors(req.body.contactid, req.body.sectors);
        return res.status(204).end();
      }

      const promises = [
        dynamicsContact(tokenResponse.accessToken).updateUserById(
          req.body.contactid,
          req.body.contact
        ),
        dynamicsContact(tokenResponse.accessToken).updateUserMemberCompany(
          req.body.bsi_membercompanyid,
          req.body.company
        ),
        dynamicsContact(tokenResponse.accessToken).updateUserAssociatedSectors(
          req.body.contactid,
          req.body.sectors
        ),
      ];

      await Promise.all(promises);
      // await dynamicsContact(tokenResponse.accessToken).batchUpdate(
      //   req.body.contactid,
      //   req.body.contact,
      //   req.body.bsi_membercompanyid,
      //   req.body.company
      // );
      return res.status(204).end();
    }
    const updatedMember = await dynamicsContact(
      tokenResponse.accessToken
    ).updateUserById(req.query.id as string, req.body);

    return res.status(200).json({ ...updatedMember });
  });

export default withSessionRoute(handler);
