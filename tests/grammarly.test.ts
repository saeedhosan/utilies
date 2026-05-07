/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { grammarlyItem } from "../src/grammarly";

describe("grammarlyItem", () => {
  test("returns 'Empty' when count is 0 and no third element", () => {
    expect(grammarlyItem(0, ["item", "items"])).toBe("Empty");
  });

  test("returns custom empty text when count is 0 with third element", () => {
    expect(grammarlyItem(0, ["item", "items", "No items found"])).toBe("No items found");
  });

  test("returns singular form for count 1", () => {
    expect(grammarlyItem(1, ["todo", "todos"])).toBe("1 todo");
  });

  test("returns plural form for count greater than 1", () => {
    expect(grammarlyItem(5, ["item", "items"])).toBe("5 items");
  });

  test("handles count 2", () => {
    expect(grammarlyItem(2, ["comment", "comments"])).toBe("2 comments");
  });

  test("handles large numbers", () => {
    expect(grammarlyItem(100, ["post", "posts"])).toBe("100 posts");
  });
});
