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
}).get(async (req, res) => {
  //Destructure secret and entryId from URL query
  const {
    secret,
    pageSectionId,
    designedSectionName,
    previewType,
    pageId,
    navigationId,
  } = req.query;

  //If no preview secret is provided or unmatched, throw error
  if (!secret || secret !== process.env.PREVIEW_SECRET) {
    throw new Error("Invalid Token");
  }

  //If no entryId is provided, throw error
  if (!pageSectionId && !designedSectionName && !pageId && !navigationId) {
    throw new Error("Invalid Preview");
  }

  //Set the entryId in preview cookie
  res.setPreviewData({
    pageSectionId,
    designedSectionName,
    pageId,
    navigationId,
  });
  if (previewType === "pageSection") {
    return res.redirect(`/preview/page-sections/${designedSectionName}`);
  }

  if (previewType === "navigation") {
    return res.redirect(`/preview/navigations`);
  }

  return res.redirect(`/${pageId}`);
});

export default handler;
