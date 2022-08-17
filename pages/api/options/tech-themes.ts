import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { errorResponse } from "../../../utils/serverErrorHandling";
import config from "../../../crin-config.json";
import fs from "fs";

const path = process.cwd() + "/crin-config.json";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, _req, res) => {
    console.error(err.stack);
    const { status, error } = errorResponse(err.message);
    return res.status(status).json({ error });
  },
  onNoMatch: (_req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .post(async (req, res) => {
    if (req.headers.authorization !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
      throw new Error("Not Authenticated");
    }
    const { options } = req.body;
    if (!options) {
      throw new Error("Bad Request");
    }
    options.forEach((o: any) =>
      config.themetypes.push({
        value: o.bsi_themeid,
        label: o.bsi_name,
      })
    );
    fs.writeFileSync(path, JSON.stringify(config));
    return res.status(200).json({ success: true });
  })
  .delete(async (req, res) => {
    if (req.headers.authorization !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
      throw new Error("Not Authenticated");
    }
    if (!req.query.id) {
      throw new Error("Bad Request");
    }
    config.themetypes = config.themetypes.filter(
      (s) => s.value !== req.query.id
    );
    fs.writeFileSync(path, JSON.stringify(config));
    return res.status(200).json({ success: true });
  });

export default handler;
