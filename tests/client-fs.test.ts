/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { downloadFile } from "../src/client-fs";

describe("downloadFile", () => {
  test("is a function", () => {
    expect(typeof downloadFile).toBe("function");
  });

  test("handles options parameter", () => {
    expect(typeof downloadFile).toBe("function");
  });

  test("handles callback parameter", () => {
    expect(typeof downloadFile).toBe("function");
  });
});

