/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import {
  textToSeo,
  toSeoUrl,
  toSeoURL,
  seoToString,
  urlToString,
  urlToText,
  slugToText,
  beString,
  unSlash,
  unSlashL,
  unSlashLeft,
  unSlashR,
  unSlashEnd,
  addSlash,
  addSlashs,
  pathArrayToString,
  pathJoin,
  urlJoin,
  path_join,
  url_join,
  queryTojson,
  url,
} from "../src/url";

describe("textToSeo", () => {
  test("converts text to SEO-friendly URL", () => {
    expect(textToSeo("Hello World")).toBe("hello-world");
  });

  test("handles special characters", () => {
    const result = textToSeo("Café & Restaurant");
    expect(typeof result).toBe("string");
  });

  test("removes accents", () => {
    const result = textToSeo("Àáâãäå");
    expect(typeof result).toBe("string");
  });

  test("handles multiple spaces and dashes", () => {
    expect(textToSeo("Hello   World--Test")).toBe("hello-world-test");
  });

  test("removes starting and trailing dashes", () => {
    expect(textToSeo("-Hello World-")).toBe("hello-world");
  });
});

describe("toSeoUrl and toSeoURL (aliases)", () => {
  test("toSeoUrl is same as textToSeo", () => {
    expect(toSeoUrl).toBe(textToSeo);
  });

  test("toSeoURL is same as textToSeo", () => {
    expect(toSeoURL).toBe(textToSeo);
  });
});

describe("seoToString", () => {
  test("converts SEO URL back to text", () => {
    expect(seoToString("hello-world")).toBe("hello world");
  });

  test("handles 'and' conversion", () => {
    expect(seoToString("rock-and-roll")).toBe("rock and roll");
  });

  test("handles multiple dashes", () => {
    expect(seoToString("a-b-c-d")).toBe("a b c d");
  });
});

describe("urlToString, urlToText, slugToText (aliases)", () => {
  test("all are same as seoToString", () => {
    expect(urlToString).toBe(seoToString);
    expect(urlToText).toBe(seoToString);
    expect(slugToText).toBe(seoToString);
  });
});

describe("beString", () => {
  test("converts number to string", () => {
    expect(beString(123)).toBe("123");
  });

  test("converts object to string", () => {
    expect(typeof beString({})).toBe("string");
  });
});

describe("unSlash", () => {
  test("removes starting slash", () => {
    expect(unSlash("/path/to/file")).toBe("path/to/file");
  });

  test("removes ending slash", () => {
    expect(unSlash("path/to/file/")).toBe("path/to/file");
  });

  test("removes both slashes", () => {
    expect(unSlash("/path/to/file/")).toBe("path/to/file");
  });

  test("handles string without slashes", () => {
    expect(unSlash("path/to/file")).toBe("path/to/file");
  });
});

describe("unSlashL and unSlashLeft", () => {
  test("removes only starting slash", () => {
    expect(unSlashL("/path/to/file/")).toBe("path/to/file/");
  });

  test("unSlashLeft is alias", () => {
    expect(unSlashLeft).toBe(unSlashL);
  });
});

describe("unSlashR and unSlashEnd", () => {
  test("removes only ending slash", () => {
    expect(unSlashR("/path/to/file/")).toBe("/path/to/file");
  });

  test("unSlashEnd is alias", () => {
    expect(unSlashEnd).toBe(unSlashR);
  });
});

describe("addSlash", () => {
  test("adds slash to end", () => {
    expect(addSlash("path/to/file")).toBe("path/to/file/");
  });

  test("does not double slashes", () => {
    expect(addSlash("path/to/file/")).toBe("path/to/file/");
  });
});

describe("addSlashs", () => {
  test("adds slashes to both sides", () => {
    const result = addSlashs("path/to/file");
    expect(result.startsWith("/")).toBe(true);
    expect(result.endsWith("/")).toBe(true);
  });
});

describe("pathArrayToString", () => {
  test("joins array to path string", () => {
    expect(pathArrayToString(["path", "to", "file"])).toBe("path/to/file");
  });

  test("filters out empty strings", () => {
    expect(pathArrayToString(["path", "", "file"])).toBe("path/file");
  });

  test("returns string as-is if not array", () => {
    expect(pathArrayToString("path/to/file")).toBe("path/to/file");
  });
});

describe("pathJoin, urlJoin, path_join, url_join", () => {
  test("joins multiple path segments", () => {
    expect(pathJoin("path", "to", "file")).toBe("path/to/file");
  });

  test("handles array input", () => {
    expect(pathJoin(["path", "to"], "file")).toBe("path/to/file");
  });

  test("all aliases are same function", () => {
    expect(urlJoin).toBe(pathJoin);
    expect(path_join).toBe(pathJoin);
    expect(url_join).toBe(pathJoin);
  });

  test("filters out empty segments", () => {
    expect(pathJoin("path", "", "file")).toBe("path/file");
  });
});

describe("queryTojson", () => {
  test("converts query string to object", () => {
    const result = queryTojson("name=John&age=30");
    expect(result).toEqual({ name: "John", age: "30" });
  });

  test("returns null for single value without =", () => {
    const result = queryTojson("singlevalue");
    expect(result).toBeNull();
  });

  test("handles empty string", () => {
    const result = queryTojson("");
    expect(result).toBeNull();
  });
});

describe("url", () => {
  test("combines paths and params", () => {
    const result = url("api", "users", { id: 123, name: "John" });
    expect(typeof result).toBe("string");
  });

  test("handles array path", () => {
    const result = url(["api", "v1"], "users");
    expect(typeof result).toBe("string");
  });

  test("handles null params by removing them", () => {
    const result = url("api", { id: null, name: "John" });
    expect(typeof result).toBe("string");
  });

  test("handles array params", () => {
    const result = url("search", { tags: ["js", "ts"] });
    expect(typeof result).toBe("string");
  });
});
