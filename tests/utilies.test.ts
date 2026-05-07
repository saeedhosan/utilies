/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { isClient, isServer } from "../src/utilies";

describe("isClient", () => {
  test("is a boolean", () => {
    expect(typeof isClient).toBe("boolean");
  });

  test("reflects environment correctly", () => {
    // In Bun test environment, window is not defined
    expect(isClient).toBe(false);
  });
});

describe("isServer", () => {
  test("is a boolean", () => {
    expect(typeof isServer).toBe("boolean");
  });

  test("reflects environment correctly", () => {
    // In Bun test environment, window is not defined
    expect(isServer).toBe(true);
  });
});

describe("isClient and isServer relationship", () => {
  test("are opposites", () => {
    expect(isClient).not.toBe(isServer);
  });
});
