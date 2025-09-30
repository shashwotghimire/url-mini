import { expect, test, describe } from "bun:test";
import { isValidHttpUrl } from "../../validation";

describe("isValidHttpUrl()", () => {
  test("should return true for a valid HTTPS url", () => {
    expect(isValidHttpUrl("https://bun.com")).toBe(true);
  });

  test("should return true for a valid HTTP url", () => {
    expect(isValidHttpUrl("http://example.com")).toBe(true);
  });

  test("should return false for an invalid URL string", () => {
    expect(isValidHttpUrl("abcd")).toBe(false);
  });

  test("should return false for a relative path", () => {
    expect(isValidHttpUrl("/pathto/a/file")).toBe(false);
  });
});
