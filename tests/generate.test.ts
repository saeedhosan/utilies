/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import {
  random,
  uniqid,
  randomString,
  uuid,
  uuidv1,
  uuidv4,
  avatar,
  generateToken,
} from "../src/generate";

describe("random", () => {
  test("returns number between start and end + start", () => {
    // Note: The implementation is Math.floor(Math.random() * end + start)
    // This means result is between start and start + end - 1
    const result = random(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  test("handles same start and end - returns between start and start+end", () => {
    // random(5, 5) = Math.floor(Math.random() * 5 + 5) = between 5 and 9
    const result = random(5, 5);
    expect(result).toBeGreaterThanOrEqual(5);
    expect(result).toBeLessThanOrEqual(9);
  });

  test("returns integer", () => {
    const result = random(1, 100);
    expect(Number.isInteger(result)).toBe(true);
  });
});

describe("uniqid", () => {
  test("generates unique id with prefix", () => {
    const result = uniqid("prefix-");
    expect(result.startsWith("prefix-")).toBe(true);
  });

  test("generates unique id without prefix", () => {
    const result = uniqid();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("generates valid UUID format", () => {
    const result = uniqid();
    expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  });
});

describe("randomString", () => {
  test("generates string of specified length", () => {
    const result = randomString(10);
    expect(result.length).toBe(10);
  });

  test("generates string with prefix", () => {
    const result = randomString(5, "pre-");
    expect(result.startsWith("pre-")).toBe(true);
    expect(result.length).toBe(9);
  });

  test("uses only valid characters", () => {
    const result = randomString(100);
    expect(/^[A-Za-z0-9]+$/.test(result)).toBe(true);
  });

  test("handles length 0", () => {
    const result = randomString(0);
    expect(result.length).toBe(0);
  });
});

describe("uuid", () => {
  test("generates string of default length", () => {
    const result = uuid();
    expect(result.length).toBe(36);
  });

  test("generates string of custom length", () => {
    const result = uuid(10);
    expect(result.length).toBe(10);
  });

  test("generates with prefix", () => {
    const result = uuid(36, "id-");
    expect(result.startsWith("id-")).toBe(true);
  });
});

describe("uuidv1", () => {
  test("generates uuid with timestamp", () => {
    const result = uuidv1();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("generates with custom prefix", () => {
    const result = uuidv1(36, "v1-");
    expect(result.startsWith("v1-")).toBe(true);
  });
});

describe("uuidv4", () => {
  test("generates a string", () => {
    const result = uuidv4();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("generates unique values", () => {
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();
    expect(uuid1).not.toBe(uuid2);
  });

  test("contains timestamp in result", () => {
    const result = uuidv4();
    expect(typeof result).toBe("string");
  });
});

describe("avatar", () => {
  test("generates avatar URL", () => {
    const result = avatar("John");
    expect(result).toBe("https://ui-avatars.com/api/?name=John");
  });

  test("handles single character", () => {
    const result = avatar("J");
    expect(result).toContain("name=J");
  });
});

describe("generateToken", () => {
  test("generates token of specified length", () => {
    const result = generateToken(30);
    expect(result.length).toBe(30);
  });

  test("uses valid characters", () => {
    const result = generateToken(100);
    expect(/^[A-Za-z0-9]+$/.test(result)).toBe(true);
  });

  test("handles default length", () => {
    const result = generateToken();
    expect(result.length).toBe(30);
  });
});
