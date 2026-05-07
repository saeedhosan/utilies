/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import {
  urlBase64ToUint8Array,
  formatPrice,
  currencyToSymbol,
  rgbToHex,
  hexToRgb,
  base64en,
  base64de,
  base64encode,
  base64decode,
} from "../src/convert";

describe("urlBase64ToUint8Array", () => {
  test("converts base64url to Uint8Array", () => {
    const base64 = btoa("Hello"); // Valid base64
    const result = urlBase64ToUint8Array(base64);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBeGreaterThan(0);
  });

  test("handles padding correctly", () => {
    const base64 = btoa("Hi"); // "Hi" in base64
    const result = urlBase64ToUint8Array(base64);
    expect(result).toBeInstanceOf(Uint8Array);
  });

  test("handles empty string", () => {
    const result = urlBase64ToUint8Array("");
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBe(0);
  });

  test("handles valid base64 string", () => {
    const base64 = btoa("test data");
    const result = urlBase64ToUint8Array(base64);
    expect(result).toBeInstanceOf(Uint8Array);
  });
});

describe("formatPrice", () => {
  test("converts string price to number", () => {
    expect(formatPrice("10.50")).toBe(1050);
  });

  test("multiplies number price by 100", () => {
    expect(formatPrice(10.50)).toBe(1050);
  });

  test("handles zero", () => {
    expect(formatPrice(0)).toBe(0);
  });

  test("handles decimal values", () => {
    expect(formatPrice(99.99)).toBe(9999);
  });
});

describe("currencyToSymbol", () => {
  test("converts USD to $ symbol", () => {
    const result = currencyToSymbol("USD", "en-US");
    expect(result).toBe("$");
  });

  test("converts EUR to € symbol", () => {
    const result = currencyToSymbol("EUR", "en-US");
    expect(result).toBe("€");
  });

  test("handles different locales", () => {
    const result = currencyToSymbol("GBP", "en-GB");
    expect(result).toBe("£");
  });

  test("handles JPY currency", () => {
    const result = currencyToSymbol("JPY", "ja-JP");
    expect(result).toBe("￥");
  });
});

describe("rgbToHex", () => {
  test("converts RGB to hex correctly", () => {
    expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
  });

  test("converts black to hex", () => {
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
  });

  test("converts white to hex", () => {
    expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
  });

  test("handles string inputs", () => {
    expect(rgbToHex("128", "64", "192")).toBe("#8040c0");
  });
});

describe("hexToRgb", () => {
  test("converts hex to RGB object", () => {
    const result = hexToRgb("#ff0000");
    expect(result).toEqual({ red: 255, green: 0, blue: 0 });
  });

  test("handles hex without #", () => {
    const result = hexToRgb("00ff00");
    expect(result).toEqual({ red: 0, green: 255, blue: 0 });
  });

  test("returns null for invalid hex", () => {
    const result = hexToRgb("invalid");
    expect(result).toBeNull();
  });

  test("handles uppercase hex", () => {
    const result = hexToRgb("#FFFFFF");
    expect(result).toEqual({ red: 255, green: 255, blue: 255 });
  });
});

describe("base64en/base64encode", () => {
  test("encodes string to base64", () => {
    const encoded = base64en("Hello");
    expect(typeof encoded).toBe("string");
    expect(encoded).toBeTruthy();
  });

  test("base64encode is alias for btoa", () => {
    expect(base64encode).toBe(base64en);
  });
});

describe("base64de/base64decode", () => {
  test("decodes base64 to string", () => {
    const encoded = btoa("Hello");
    const decoded = base64de(encoded);
    expect(decoded).toBe("Hello");
  });

  test("base64decode is alias for atob", () => {
    expect(base64decode).toBe(base64de);
  });
});
