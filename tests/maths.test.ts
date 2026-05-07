/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { loanPerMonth, loanPerYear, loanPerday } from "../src/maths";

describe("loanPerMonth", () => {
  test("calculates monthly payment correctly", () => {
    expect(loanPerMonth(10000, 5, 12)).toBeGreaterThan(0);
  });

  test("returns 0 for invalid inputs", () => {
    expect(loanPerMonth(0, 0, 0)).toBe(0);
  });
});

describe("loanPerYear", () => {
  test("calculates yearly payment correctly", () => {
    expect(loanPerYear(10000, 5, 1)).toBeGreaterThan(0);
  });
});

describe("loanPerday", () => {
  test("calculates daily payment correctly", () => {
    expect(loanPerday(10000, 5, 365)).toBeGreaterThan(0);
  });
});
