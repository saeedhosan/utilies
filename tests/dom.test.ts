/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { isElementInViewport, isViewElm } from "../src/dom";

describe("isElementInViewport", () => {
  test("is a function", () => {
    expect(typeof isElementInViewport).toBe("function");
  });

  test("isViewElm is alias for isElementInViewport", () => {
    expect(isViewElm).toBe(isElementInViewport);
  });
});
