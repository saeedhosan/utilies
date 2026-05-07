/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { Cookies, setCookie, getCookie, isCookie, hasCookie, allCookies } from "../src/cookies";

describe("Cookies class", () => {
  test("constructor creates instance", () => {
    const cookies = new Cookies();
    expect(cookies).toBeInstanceOf(Cookies);
  });

  test("constructor accepts options", () => {
    const cookies = new Cookies({ secure: true, path: "/test" });
    expect(cookies).toBeInstanceOf(Cookies);
  });

  test("set method exists", () => {
    const cookies = new Cookies();
    expect(typeof cookies.set).toBe("function");
  });

  test("get method exists", () => {
    const cookies = new Cookies();
    expect(typeof cookies.get).toBe("function");
  });

  test("is method exists", () => {
    const cookies = new Cookies();
    expect(typeof cookies.is).toBe("function");
  });

  test("delete method exists", () => {
    const cookies = new Cookies();
    expect(typeof cookies.delete).toBe("function");
  });

  test("all method exists", () => {
    const cookies = new Cookies();
    expect(typeof cookies.all).toBe("function");
  });
});

describe("Exported convenience functions", () => {
  test("setCookie is defined", () => {
    expect(typeof setCookie).toBe("function");
  });

  test("getCookie is defined", () => {
    expect(typeof getCookie).toBe("function");
  });

  test("isCookie is defined", () => {
    expect(typeof isCookie).toBe("function");
  });

  test("hasCookie is defined", () => {
    expect(typeof hasCookie).toBe("function");
  });

  test("allCookies is defined", () => {
    expect(typeof allCookies).toBe("function");
  });
});
