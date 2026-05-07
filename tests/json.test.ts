/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { json_decode } from "../src/json";

describe("json_decode", () => {
  test("parses valid JSON string", () => {
    const result = json_decode('{"name": "test", "value": 123}');
    expect(result).toEqual({ name: "test", value: 123 });
  });

  test("returns fallback for invalid JSON", () => {
    const result = json_decode("invalid json", { error: true });
    expect(result).toEqual({ error: true });
  });

  test("returns empty object for undefined input", () => {
    const result = json_decode(undefined);
    expect(result).toEqual({});
  });

  test("returns empty object for null input", () => {
    const result = json_decode(null as any);
    expect(result).toEqual({});
  });

  test("handles empty string", () => {
    const result = json_decode("");
    expect(result).toEqual({});
  });

  test("parses array JSON", () => {
    const result = json_decode("[1, 2, 3]");
    expect(result).toEqual([1, 2, 3]);
  });

  test("parses nested objects", () => {
    const result = json_decode('{"user": {"name": "John", "age": 30}}');
    expect(result).toEqual({ user: { name: "John", age: 30 } });
  });
});
