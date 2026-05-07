/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { loadImage, lazyLoadImage, lazyLoadElm } from "../src/load";

describe("loadImage", () => {
  test("is a function", () => {
    expect(typeof loadImage).toBe("function");
  });
});

describe("lazyLoadImage", () => {
  test("is a function", () => {
    expect(typeof lazyLoadImage).toBe("function");
  });
});

describe("lazyLoadElm", () => {
  test("is a function", () => {
    expect(typeof lazyLoadElm).toBe("function");
  });
});

