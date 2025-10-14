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

// Root route with API information
app.get("/", (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  const apiInfo = {
    name: "URL Mini - URL Shortener API",
    version: "1.0.0",
    description: "A simple URL shortener service with analytics",
    baseUrl: baseUrl,
    endpoints: {
      health: {
        method: "GET",
        path: "/check",
        description: "Check API health status",
        example: `${baseUrl}/check`,
        response: {
          success: { message: "api is healthy" },
          error: { error: "internal server error" }
        }
      },
      createShortUrl: {
        method: "POST",
        path: "/url",
        description: "Create a new short URL",
        example: `${baseUrl}/url`,
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          url: "https://example.com"
        },
        response: {
          success: { shortUrl: "object with shortId and redirectUrl" },
          error: { error: "URL is required/invalid" }
        }
      },
      redirect: {
        method: "GET",
        path: "/url/{shortId}",
        description: "Redirect to original URL using short ID",
        example: `${baseUrl}/url/abc12345`,
        response: "302 redirect to original URL"
      },
      analytics: {
        method: "GET",
        path: "/url/analytics/{shortId}",
        description: "Get analytics for a short URL",
        example: `${baseUrl}/url/analytics/abc12345`,
        response: {
          success: { shortUrl: "object with visit count and history" },
          error: { error: "Short URL not found" }
        }
      }
    },
    testing: {
      curl: {
        health: `curl -X GET "${baseUrl}/check"`,
        createUrl: `curl -X POST "${baseUrl}/url" -H "Content-Type: application/json" -d '{"url":"https://example.com"}'`,
        analytics: `curl -X GET "${baseUrl}/url/analytics/{shortId}"`
      },
      postman: {
        collection: "Import the following endpoints into Postman",
        environment: {
          baseUrl: baseUrl
        }
      },
      browser: {
        health: "Visit /check to see API health",
        redirect: "Visit /url/{shortId} to test redirect functionality"
      }
    },
    status: "online",
    timestamp: new Date().toISOString()
  };
  
  res.status(200).json(apiInfo);
});

// routes
app.use("/check", checkRoutes);
app.use("/url", urlRoutes);

export default app;
