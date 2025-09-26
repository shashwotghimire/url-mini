import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// mware
app.use(cors({ origin: "*" }));

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
