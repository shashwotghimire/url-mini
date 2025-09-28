import Router from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "api is healthy" });
  } catch (e) {
    return res.status(500).json({ error: "internal server error" });
  }
});

export default router;
