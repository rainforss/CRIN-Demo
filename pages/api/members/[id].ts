import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../utils/authentication/withSession";
import nc from "next-connect";
import { ClientCredentialRequest } from "@azure/msal-node";
import { instantiateCca } from "../../../utils/msal/cca";
import { dynamicsContact } from "../../../services/dynamicsContact";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    console.error(err.stack);
    if (err.message === "Not Authenticated") {
      return res.status(401).json({
        error: {
          name: "Not Authenticated",
          message: "User is not logged in.",
        },
      });
    }
    if (err.message === "Server Error") {
      return res.status(500).json({
        error: {
          name: "Server Error",
          message:
            "Internal server error, could not retrieve an access token for Dynamics 365 environment.",
        },
      });
    }
    if (err.message === "Invalid Query") {
      return res.status(400).json({
        error: {
          name: "Invalid Query",
          message: "Invalid query string, missing member id information.",
        },
      });
    }
  },
  onNoMatch: (_req, res) => {
    res.status(404).end("Page is not found");
  },
}).get(async (req, res) => {
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
});

export default withSessionRoute(handler);
