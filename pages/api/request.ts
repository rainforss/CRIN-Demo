import { ClientCredentialRequest } from "@azure/msal-node";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { dynamicsRequest } from "../../services/dynamicsRequest";
import { withSessionRoute } from "../../utils/authentication/withSession";
import { instantiateCca } from "../../utils/msal/cca";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function requestRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "POST": {
        if (!req.session.user) {
          return res.status(401).json({
            error: {
              name: "Not Authenticated",
              message: "User is not logged in.",
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
        const { fields, files, binary } = await new Promise(function (
          resolve,
          reject
        ) {
          const form = new formidable.IncomingForm({
            multiples: false,
          });

          form.parse(req, (err, fields, files) => {
            if (err) {
              return reject(err);
            }
            if (Array.isArray(files.file)) {
              return reject();
            }
            const binary = fs.readFileSync(files.file.filepath).toString("hex");
            resolve({ fields, files, binary });
          });
        });

        // const form = new formidable.IncomingForm({ multiples: false });
        // form.parse(req);
        // const test: any = {};
        // form.on("field", (name, value) => {
        //   test[name] = value;
        // });
        // console.log(test);
        // form.on("file", (formName, file) => {
        //   const data = fs.readFileSync(file.filepath);
        //   console.log(data);
        // });

        const result = await dynamicsRequest(
          tokenResponse.accessToken
        ).createRequest({
          bsi_title: fields.title as string,
          bsi_requestdescription: fields.requestDescription as string,
          bsi_startdate: new Date(fields.startDate),
          bsi_enddate: new Date(fields.endDate),
          "bsi_SubmittedBy@odata.bind": `/contacts(${req!.session!.user!.id!})`,
        });

        await dynamicsRequest(tokenResponse.accessToken).uploadFileToRequest(
          result.bsi_requestid,
          binary,
          files.file.originalFilename
        );
        return res.status(200).json({ result });
      }
      default:
        return res.status(405).json({
          error: {
            name: "Not Supported",
            message: `Method ${req.method} is not allowed`,
          },
        });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err });
  }
}

export default withSessionRoute(requestRoute);
