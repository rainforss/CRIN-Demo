import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../utils/authentication/withSession";

function userRoute(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      if (!req.session.user) {
        return res.status(401).json({
          error: {
            name: "Not Authenticated",
            message: "User is not logged in.",
          },
        });
      }
      return res.status(200).json({ ...req.session.user });
    default:
      return res.status(405).json({
        error: {
          name: "Not Supported",
          message: `Method ${req.method} is not allowed`,
        },
      });
  }
}

export default withSessionRoute(userRoute);
