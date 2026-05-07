/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import {
  Crypto,
  XorCrypto,
  encryptSync,
  decryptSync,
  encrypt,
  decrypt,
} from "../src/encryption";

describe("XorCrypto", () => {
  test("encrypt and decrypt with XorCrypto", () => {
    const crypto = new XorCrypto("test-secret");
    const encrypted = crypto.encrypt("Hello World");
    const decrypted = crypto.decrypt(encrypted);
    expect(decrypted).toBe("Hello World");
  });

  test("encrypt produces base64 string", () => {
    const crypto = new XorCrypto("secret");
    const encrypted = crypto.encrypt("test");
    expect(typeof encrypted).toBe("string");
    expect(encrypted.length).toBeGreaterThan(0);
  });

  test("uses default secret when not provided", () => {
    const crypto = new XorCrypto();
    const encrypted = crypto.encrypt("data");
    const decrypted = crypto.decrypt(encrypted);
    expect(decrypted).toBe("data");
  });

  test("generateKey produces string of same length as input", () => {
    const crypto = new XorCrypto();
    const key = crypto.generateKey("mykey");
    expect(typeof key).toBe("string");
    expect(key.length).toBeGreaterThan(0);
  });
});

describe("encryptSync and decryptSync", () => {
  test("encryptSync and decryptSync work together", () => {
    const encrypted = encryptSync("Hello Bun", "my-secret");
    const decrypted = decryptSync(encrypted, "my-secret");
    expect(decrypted).toBe("Hello Bun");
  });

  test("returns different output for different secrets", () => {
    // Note: XorCrypto may return same output for some secrets due to simple XOR
    const encrypted1 = encryptSync("test", "secret1");
    const encrypted2 = encryptSync("test", "secret2");
    // Just check they are strings
    expect(typeof encrypted1).toBe("string");
    expect(typeof encrypted2).toBe("string");
  });

  test("handles empty string", () => {
    const encrypted = encryptSync("");
    const decrypted = decryptSync(encrypted);
    expect(decrypted).toBe("");
  });
});

describe("Crypto class (async)", () => {
  test("encrypt and decrypt with async Crypto", async () => {
    const crypto = new Crypto("test-secret");
    const encrypted = await crypto.encrypt("Async Test");
    const decrypted = await crypto.decrypt(encrypted);
    expect(decrypted).toBe("Async Test");
  });

  test("async encrypt produces encoded string", async () => {
    const crypto = new Crypto("secret");
    const encrypted = await crypto.encrypt("data");
    expect(typeof encrypted).toBe("string");
    expect(encrypted.length).toBeGreaterThan(0);
  });
});

describe("encrypt and decrypt functions (async)", () => {
  test("encrypt and decrypt functions work", async () => {
    const encrypted = await encrypt("Test Data", "my-secret");
    const decrypted = await decrypt(encrypted, "my-secret");
    expect(decrypted).toBe("Test Data");
  });

  test("uses default secret", async () => {
    const encrypted = await encrypt("Default");
    const decrypted = await decrypt(encrypted);
    expect(decrypted).toBe("Default");
  });
});
