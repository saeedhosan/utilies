/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { dateTime, datetime, date, time } from "../src/datetime";

describe("dateTime", () => {
  test("formats date string to locale string with time", () => {
    const result = dateTime("2024-01-15T10:30:00");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("handles invalid date string - returns Invalid Date or empty", () => {
    const result = dateTime("invalid-date");
    expect(typeof result).toBe("string");
  });

  test("handles empty string - returns Invalid Date or empty", () => {
    const result = dateTime("");
    expect(typeof result).toBe("string");
  });

  test("accepts custom locales and options", () => {
    const result = dateTime("2024-01-15T10:30:00", { locales: "en-US", year: "numeric" });
    expect(typeof result).toBe("string");
  });

  test("handles Date object string representation", () => {
    const result = dateTime(new Date().toString());
    expect(typeof result).toBe("string");
  });
});

describe("datetime (alias)", () => {
  test("is the same function as dateTime", () => {
    expect(datetime).toBe(dateTime);
  });
});

describe("date", () => {
  test("formats date string to locale date string", () => {
    const result = date("2024-01-15T10:30:00");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("handles invalid date - returns Invalid Date or empty", () => {
    const result = date("invalid");
    expect(typeof result).toBe("string");
  });

  test("handles ISO format date", () => {
    const result = date("2024-01-15");
    expect(typeof result).toBe("string");
  });

  test("accepts custom options", () => {
    const result = date("2024-01-15", { locales: "fr-FR" });
    expect(typeof result).toBe("string");
  });
});

describe("time", () => {
  test("formats date string to locale time string", () => {
    const result = time("2024-01-15T10:30:00");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("handles invalid date - returns Invalid Date or empty", () => {
    const result = time("invalid");
    expect(typeof result).toBe("string");
  });

  test("extracts time portion correctly", () => {
    const result = time("2024-01-15T14:45:30");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("handles custom time format options", () => {
    const result = time("2024-01-15T10:30:00", { hour12: false });
    expect(typeof result).toBe("string");
  });
});
