/// <reference types="bun" />
import { describe, expect, test, beforeAll } from "bun:test";

// Mock window and localStorage before importing theme module
beforeAll(() => {
  if (typeof window === "undefined") {
    (globalThis as any).window = {
      matchMedia: () => ({ matches: false }),
      localStorage: {
        getItem: () => null,
        setItem: () => {},
      },
    };
  }
  if (typeof localStorage === "undefined") {
    (globalThis as any).localStorage = {
      getItem: () => null,
      setItem: () => {},
    };
  }
});

describe("theme module", () => {
  test("can be imported", async () => {
    const module = await import("../src/theme");
    expect(module).toBeDefined();
  });
});
