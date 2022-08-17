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
    res.status(404).end("Page is not found");
  },
}).get(async (req, res) => {
  if (!req.session.user) {
    throw new Error("Not Authenticated");
  }
  const { keyword, memberType, techTheme } = req.query;
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
  const members = await dynamicsContact(
    tokenResponse.accessToken
  ).getBySearchstringMemberTypeTechTheme(
    keyword as string,
    parseInt(memberType as string),
    techTheme as string
  );

  return res.status(200).json([...members]);
});

export default withSessionRoute(handler);
