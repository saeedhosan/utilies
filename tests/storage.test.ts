/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import {
  setSession,
  getSession,
  cleanSession,
  setStorage,
  getStorage,
  cleanStorage,
} from "../src/storage";

describe("Session Storage", () => {
  test("setSession is a function", () => {
    expect(typeof setSession).toBe("function");
  });

  test("getSession is a function", () => {
    expect(typeof getSession).toBe("function");
  });

  test("cleanSession is a function", () => {
    expect(typeof cleanSession).toBe("function");
  });
});

describe("Local Storage", () => {
  test("setStorage is a function", () => {
    expect(typeof setStorage).toBe("function");
  });

  test("getStorage is a function", () => {
    expect(typeof getStorage).toBe("function");
  });

  test("cleanStorage is a function", () => {
    expect(typeof cleanStorage).toBe("function");
  });
});

