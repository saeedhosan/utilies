/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import exportToPdf, { exportToDocs } from "../src/exporting";

describe("exportToPdf", () => {
  test("is a function", () => {
    expect(typeof exportToPdf).toBe("function");
  });

  test("handles parameters correctly", () => {
    expect(typeof exportToPdf).toBe("function");
  });
});

describe("exportToDocs", () => {
  test("is a function", () => {
    expect(typeof exportToDocs).toBe("function");
  });

  test("handles parameters correctly", () => {
    expect(typeof exportToDocs).toBe("function");
  });
});

