import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../utils/authentication/withSession";
import nc from "next-connect";
import { ClientCredentialRequest } from "@azure/msal-node";
import { instantiateCca } from "../../../utils/msal/cca";
import { dynamicsTechThemes } from "../../../services/dynamicsTechThemes";
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
  const techThemes = await dynamicsTechThemes(
    tokenResponse.accessToken
  ).getAllTechThemes();

  return res.status(200).json([...techThemes]);
});

export default withSessionRoute(handler);
