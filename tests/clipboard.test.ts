/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { copyImageToClipboard, imageToBlob, toClipboard, copyToClipboard, fallbackToClipboard } from "../src/clipboard";

describe("copyImageToClipboard", () => {
  test("is a function", () => {
    expect(typeof copyImageToClipboard).toBe("function");
  });
});

describe("imageToBlob", () => {
  test("is a function", () => {
    expect(typeof imageToBlob).toBe("function");
  });
});

describe("toClipboard", () => {
  test("is a function", () => {
    expect(typeof toClipboard).toBe("function");
  });
});

describe("copyToClipboard", () => {
  test("is alias for toClipboard", () => {
    expect(copyToClipboard).toBe(toClipboard);
  });
});

describe("fallbackToClipboard", () => {
  test("is a function", () => {
    expect(typeof fallbackToClipboard).toBe("function");
  });
});

