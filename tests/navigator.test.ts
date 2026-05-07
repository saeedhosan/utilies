/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { shareToSocial } from "../src/navigator";

describe("shareToSocial", () => {
  test("is a function", () => {
    expect(typeof shareToSocial).toBe("function");
  });

  test("returns Error or null", () => {
    const result = shareToSocial({ title: "Test" });
    expect(result === null || result instanceof Error).toBe(true);
  });
});

