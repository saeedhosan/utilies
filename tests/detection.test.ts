/// <reference types="bun" />
import { describe, expect, test, beforeAll } from "bun:test";

// Mock navigator before importing detection module
beforeAll(() => {
  if (typeof navigator === "undefined") {
    (globalThis as any).navigator = {
      userAgent: "Mozilla/5.0",
      maxTouchPoints: 0,
    };
  }
  if (typeof document === "undefined") {
    (globalThis as any).document = {
      documentElement: {},
    };
  }
});

describe("detection module", () => {
  test("can be imported", async () => {
    const module = await import("../src/detection");
    expect(module).toBeDefined();
  });
});
