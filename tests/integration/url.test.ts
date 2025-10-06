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

  test("it should return 400 when URL is missing", async () => {
    const res = await request(app).post("/url").send({});
    expect(res.status).toBe(400);
  });

  test("it should return 400 for invalid URL", async () => {
    const res = await request(app).post("/url").send({ url: "not_a_url" });
    expect(res.status).toBe(400);
  });

  test("it should redirect correctly for correct shortId", async () => {
    const res = await request(app).post("/url").send({ url: "http://bun.sh" });
    const shortId = res.body.shortUrl.shortId;
    const redirect = await request(app).get(`/url/${shortId}`);
    expect(redirect.status).toBe(302);
    expect(redirect.headers.location).toBe("http://bun.sh");
  });

  test("it should return analytics", async () => {
    const req = await request(app).post("/url").send({ url: "http://bun.sh" });
    const shortId = req.body.shortUrl.shortId;
    const res = await request(app).get(`/url/analytics/${shortId}`);
    expect(res.status).toBe(200);
    expect(res.body.shortUrl).toBeDefined();
  });
});
