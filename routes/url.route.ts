import { Router } from "express";
import prisma from "../prisma";
import { nanoid } from "nanoid";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const shortId = nanoid(8);
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "url is required" });
    }
    const shortUrl = await prisma.url.create({
      data: {
        redirectUrl: url,
        shortId,
      },
    });
    return res.status(200).json({ shortUrl });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "server error" });
  }
});

export default router;
