/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { removeHtml, cssDurationToMillisecond, capitalize } from "../src/str";

describe("removeHtml", () => {
  test("removes HTML tags", () => {
    expect(removeHtml("<p>Hello</p>")).toBe("Hello");
  });

  test("handles empty string", () => {
    expect(removeHtml("")).toBe("");
  });
});

describe("cssDurationToMillisecond", () => {
  test("converts seconds to milliseconds", () => {
    expect(cssDurationToMillisecond("2s")).toBe(2000);
  });

  test("handles milliseconds", () => {
    expect(cssDurationToMillisecond("500ms")).toBe(500);
  });
});

describe("capitalize", () => {
  test("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });
});
