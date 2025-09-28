import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// route import

import urlRoutes from "./routes/url.route";
import checkRoutes from "./routes/health.route";
//
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// mware
app.use(cors({ origin: "*" }));
app.use(express.json());
// routes
app.use("/check", checkRoutes);
app.use("/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
