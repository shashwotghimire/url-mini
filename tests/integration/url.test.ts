import { test, describe, expect } from "bun:test";
import request from "supertest";
import app from "../..";

describe("URL shortner API", () => {
  test("it should create a short url", async () => {
    const res = await request(app)
      .post("/url")
      .send({ url: "http://example.com" })
      .expect(200);
    expect(res.body.shortUrl).toBeDefined();
    expect(res.body.shortUrl.redirectUrl).toBe("http://example.com");
    expect(res.body.shortUrl.shortId).toBeDefined();
  });
});
