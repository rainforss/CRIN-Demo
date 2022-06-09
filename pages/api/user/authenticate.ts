import { ClientCredentialRequest } from "@azure/msal-node";
import { NextApiRequest, NextApiResponse } from "next";
import { dynamicsContact } from "../../../services/dynamicsContact";
import { instantiateCca } from "../../../utils/msal/cca";
import bcrypt from "bcrypt";
import { withSessionRoute } from "../../../utils/authentication/withSession";
import { IronSessionData } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
      fullname: string;
      email: string;
      username: string;
    };
  }
}

async function authenticateRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    return res.status(400).json({
      error: {
        name: "Already authenticated",
        message: "You have already logged in.",
      },
    });
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
    return res.status(500).json({
      error: {
        name: "Server Error",
        message:
          "Internal server error, could not retrieve an access token for Dynamics 365 environment.",
      },
    });
  }

  const { username, password } = req.body;
  switch (req.method) {
    case "POST":
      const users = await dynamicsContact(
        tokenResponse.accessToken
      ).getByUsername(username);

      try {
        if (!users || users.length === 0) {
          const error = new Error("User not found");
          error.name = "Credential Mismatch";
          error.message = `User of ${username} is not found in the system. Please check your username and password.`;
          throw error;
        }
        if (!bcrypt.compareSync(password, users[0].bsi_password)) {
          const error = new Error("User not found");
          error.name = "Credential Mismatch";
          error.message = `User of ${username} is not found in the system. Please check your username and password.`;
          throw error;
        }

        req.session.user = {
          fullname: users[0].fullname,
          email: users[0].emailaddress1,
          id: users[0].contactid,
          username: users[0].bsi_username,
        };

        await req.session.save();
        return res.status(200).json({
          id: users[0].contactid,
          fullname: users[0].fullname,
          email: users[0].emailaddress1,
          username: users[0].bsi_username,
        });
      } catch (err: any) {
        if (err.name === "Credential Mismatch") {
          return res
            .status(400)
            .json({ error: { name: err.name, message: err.message } });
        }
        return res.status(500).json({
          error: {
            name: "Internal Server Error",
            message: err.message,
            stack: err.stack,
          },
        });
      }

    default:
      return res.status(405).json({
        error: {
          name: "Not Supported",
          message: `Method ${req.method} is not allowed`,
        },
      });
  }
}

export default withSessionRoute(authenticateRoute);
