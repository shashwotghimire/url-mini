import { Router } from "express";
import prisma from "../prisma";
import { nanoid } from "nanoid";
import { isValidHttpUrl } from "../validation";
const router = Router();

// Create short URL
router.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || !isValidHttpUrl(url))
      return res.status(400).json({ error: "URL is required/invalid" });

    const shortId = nanoid(8);
    const shortIdExists = await prisma.url.findUnique({ where: { shortId } });
    if (shortIdExists) {
      return res.status(400).json({ error: "not a unique shrot id" });
    }
    const shortUrl = await prisma.url.create({
      data: { redirectUrl: url, shortId },
    });

    return res.status(200).json({ shortUrl });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// Analytics endpoint
router.get("/analytics/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const shortUrl = await prisma.url.findUnique({ where: { shortId } });
    if (!shortUrl)
      return res.status(404).json({ error: "Short URL not found" });

    return res.status(200).json({ shortUrl });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Redirect endpoint
router.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    if (!shortId)
      return res.status(400).json({ error: "No short ID provided" });

    const entryUrl = await prisma.url.findUnique({ where: { shortId } });
    if (!entryUrl) return res.status(404).json({ error: "URL does not exist" });

    res.redirect(entryUrl.redirectUrl);
    // Update visit count and history
    prisma.url.update({
      where: { shortId },
      data: {
        visitCount: { increment: 1 },
        visitHistory: { push: new Date() },
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
