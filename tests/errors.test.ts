/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import {
  errorToString,
  errorsToString,
  extractError,
  extractErrors,
  catchOrNull,
  catchOR,
  catchError,
} from "../src/errors";

describe("errorToString", () => {
  test("converts string error to string", () => {
    expect(errorToString("test error")).toBe("test error");
  });

  test("converts array error to comma-separated string", () => {
    expect(errorToString(["error1", "error2"])).toBe("error1,error2");
  });

  test("converts object error to JSON string", () => {
    const result = errorToString({ message: "error", code: 500 });
    expect(typeof result).toBe("string");
    expect(result).toContain("message");
  });

  test("handles null and undefined", () => {
    expect(typeof errorToString(null)).toBe("string");
    expect(typeof errorToString(undefined)).toBe("string");
  });

  test("handles number error", () => {
    expect(errorToString(404)).toBe("404");
  });
});

describe("errorsToString", () => {
  test("joins multiple errors with comma", () => {
    const result = errorsToString("error1", "error2", "error3");
    expect(result).toBe("error1, error2, error3");
  });

  test("handles mixed error types", () => {
    const result = errorsToString("string error", { obj: "error" }, 500);
    expect(typeof result).toBe("string");
    expect(result).toContain(",");
  });

  test("handles empty arguments", () => {
    expect(errorsToString()).toBe("");
  });
});

describe("extractError and extractErrors", () => {
  test("extractError is alias for errorToString", () => {
    expect(extractError).toBe(errorToString);
  });

  test("extractErrors is alias for errorsToString", () => {
    expect(extractErrors).toBe(errorsToString);
  });
});

describe("catchOrNull", () => {
  test("returns result when function succeeds", () => {
    const result = catchOrNull(() => "success");
    expect(result).toBe("success");
  });

  test("returns null when function throws", () => {
    const result = catchOrNull(() => {
      throw new Error("test error");
    });
    expect(result).toBeNull();
  });

  test("calls callback when error occurs", () => {
    let callbackCalled = false;
    catchOrNull(
      () => {
        throw new Error("error");
      },
      () => {
        callbackCalled = true;
      }
    );
    expect(callbackCalled).toBe(true);
  });

  test("returns null for non-function input", () => {
    const result = catchOrNull("not a function" as any);
    expect(result).toBeNull();
  });
});

describe("catchOR", () => {
  test("returns result when function succeeds", () => {
    const result = catchOR(() => "success", "default");
    expect(result).toBe("success");
  });

  test("returns default value when function throws", () => {
    const result = catchOR(
      () => {
        throw new Error("error");
      },
      "fallback"
    );
    expect(result).toBe("fallback");
  });

  test("returns different default type", () => {
    const result = catchOR(
      () => {
        throw new Error("error");
      },
      404
    );
    expect(result).toBe(404);
  });

  test("calls callback on error", () => {
    let callbackCalled = false;
    catchOR(
      () => {
        throw new Error("error");
      },
      "default",
      () => {
        callbackCalled = true;
      }
    );
    expect(callbackCalled).toBe(true);
  });
});

describe("catchError", () => {
  test("returns null when function succeeds", () => {
    const result = catchError(() => true);
    expect(result).toBeNull();
  });

  test("returns error when function throws", () => {
    const result = catchError(() => {
      throw new Error("test error");
    });
    expect(result).toBeInstanceOf(Error);
  });

  test("handles non-function input", () => {
    const result = catchError("not a function" as any);
    // The function may return null or an error depending on implementation
    expect(result === null || result instanceof Error).toBe(true);
  });
});
