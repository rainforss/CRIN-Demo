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
  const members = await dynamicsContact(
    tokenResponse.accessToken
  ).getMemberProfilesForIntermediateAccessMember();

  return res.status(200).json({ ...members });
});

// function userRoute(req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case "GET":
//       if (!req.session.user) {
//         return res.status(401).json({
//           error: {
//             name: "Not Authenticated",
//             message: "User is not logged in.",
//           },
//         });
//       }
//       return res.status(200).json({ ...req.session.user });
//     default:
//       return res.status(405).json({
//         error: {
//           name: "Not Supported",
//           message: `Method ${req.method} is not allowed`,
//         },
//       });
//   }
// }

export default withSessionRoute(handler);
