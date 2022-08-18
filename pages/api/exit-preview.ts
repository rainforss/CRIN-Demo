import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { errorResponse } from "../../utils/serverErrorHandling";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    console.error(err.stack);
    const { status, error } = errorResponse(err.message);
    return res.status(status).json({ error });
  },
  onNoMatch: (_req, res) => {
    res.status(404).end("Page is not found");
  },
}).get(async (_req, res) => {
  res.clearPreviewData();
  res.redirect("/");
});

export default handler;
