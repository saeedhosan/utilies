{{ badges }}

# utilies

A lightweight collection of JavaScript/TypeScript utilities for faster frontend development and productivity.

## Table of contents

-   [Introduction](#Introduction)
-   [Installation](#Installation)
-   [Quick Usages](#quick-usages)
    -   [Str](#str)
    -   [Dom](#dom)
    -   [Dom load](#dom-load)
    -   [Theme](#theme)
    -   [errors](#errors)
    -   [generate](#generate)
    -   [exporting](#exporting)
    -   [encryption](#encryption)
    -   [Cookies](#Cookies)
    -   [Storage](#storage)
    -   [Clipboard](#clipboard)
    -   [Convert](#convert)
    -   [detection](#detection)
    -   [datetime](#datetime)
    -   [Navigator](#Navigator)
    -   [validation](#validation)
    -   [grammarly](#grammarly)
    -   [maths](#maths)
    -   [Client Filesystem](#client-filesystem)
-   [Testing](#testing)
-   [License](#License)

## Introduction

`utilies` is a zero-dependency utility library providing common helpers for string manipulation, DOM operations, data encryption, validation, date/time formatting, clipboard actions, and more. Designed for browser environments with full TypeScript support.

## Installation

```bash
npm install utilies
```

Or with other package managers:

```bash
yarn add utilies
pnpm add utilies
```

## Quick Usages

Import everything or pick only what you need:

```ts
// import all
import * as utilies from "utilies";

// or import specific modules
import { randomString, isMail, toClipboard } from "utilies";

// or import from sub-path
import { toClipboard } from "utilies/clipboard";
```

### Str

String helpers — strip HTML, convert CSS durations, capitalize.

```ts
import { removeHtml, cssDurationToMillisecond, capitalize } from "utilies";

removeHtml("<p>Hello &nbsp;world</p>"); // "Hello world"
cssDurationToMillisecond("1.5s"); // 1500
cssDurationToMillisecond("300ms"); // 300
capitalize("hello"); // "Hello"
```

### Dom

Check if an element is visible in the viewport.

```ts
import { isElementInViewport } from "utilies";

const el = document.querySelector(".hero")!;
isElementInViewport(el); // true | false
```

### Dom load

Load images and elements lazily with `IntersectionObserver`.

```ts
import { loadImage, lazyLoadImage, lazyLoadElm } from "utilies";

// load an image immediately
const img = await loadImage("/photo.jpg");

// lazy-load an image (resolves when visible)
const lazyImg = await lazyLoadImage("/photo.jpg");

// lazy-load any element
const section = document.querySelector(".lazy-section")!;
await lazyLoadElm(section);
```

### Theme

Detect system theme and persist user preference in `localStorage`.

```ts
import { isDark, themeSchema, getTheme, setTheme, themeIs } from "utilies";

isDark; // true | false (system preference)
themeSchema; // "dark" | "light"

setTheme("dark"); // saves to localStorage
getTheme(); // "dark" | "light"
themeIs("dark"); // true
```

### errors

Convert errors to strings and safely catch exceptions.

```ts
import { errorToString, catchOrNull, catchOR } from "utilies";

errorToString(new Error("oops")); // "Error: oops"
catchOrNull(() => JSON.parse("bad")); // null
catchOR(() => JSON.parse("bad"), {}); // {}
```

### generate

Generate random values, unique IDs, tokens, and avatar URLs.

```ts
import { random, randomString, uniqid, uuid, uuidv4, generateToken, avatar } from "utilies";

random(1, 10); // random number between 1 and 10
randomString(16); // e.g. "aB3xK9..."
uniqid("user_"); // "user_00000000-0000-..."
uuid(); // random 36-char string
uuidv4(); // UUID v4 format
generateToken(32); // random alphanumeric token
avatar("John Doe"); // "https://ui-avatars.com/api/?name=John Doe"
```

### exporting

Export content as PDF or Word document from the browser.

```ts
import exportToPdf, { exportToDocs } from "utilies";

exportToPdf("Report", "<h1>Hello</h1>");
exportToDocs("Report", "<h1>Hello</h1>"); // downloads .doc file
```

### encryption

AES-GCM and XOR-based encryption/decryption.

```ts
import { Crypto, XorCrypto, encrypt, decrypt, encryptSync, decryptSync } from "utilies";

// async AES-GCM
const encrypted = await encrypt("secret data", "my-key");
const decrypted = await decrypt(encrypted, "my-key");

// sync XOR (faster, lighter)
const enc = encryptSync("hello", "key");
const dec = decryptSync(enc, "key");

// or use the class directly
const crypto = new Crypto("my-secret");
const enc = await crypto.encrypt("data");
const dec = await crypto.decrypt(enc);
```

### Cookies

Manage encrypted document cookies with a clean API.

```ts
import { Cookies } from "utilies";

const cookies = new Cookies({ expires: 86400000 }); // 24h in ms

cookies.set("session", { userId: 1 });
cookies.get("session"); // { userId: 1 }
cookies.is("session"); // true
cookies.delete("session");
cookies.all(); // [{ name, value }, ...]
```

### Storage

Encrypted `localStorage` and `sessionStorage` helpers.

```ts
import {
    setStorage,
    getStorage,
    cleanStorage,
    setSession,
    getSession,
    cleanSession,
} from "utilies";

setStorage("user", { name: "Saeed" });
getStorage("user"); // { name: 'Saeed' }
cleanStorage("user");

setSession("token", "abc123");
getSession("token"); // 'abc123'
cleanSession("token");
```

### Clipboard

Copy text and images to the clipboard.

```ts
import { toClipboard, copyImageToClipboard } from "utilies";

await toClipboard("Hello world");
await copyImageToClipboard("https://example.com/image.png");
```

### Convert

Unit and format conversions — price, color, base64, currency.

```ts
import {
    formatPrice,
    currencyToSymbol,
    rgbToHex,
    hexToRgb,
    base64encode,
    base64decode,
} from "utilies";

formatPrice(9.99); // 999 (cents for Stripe)
currencyToSymbol("USD", "en-US"); // "$"
rgbToHex(255, 0, 0); // "#ff0000"
hexToRgb("#ff0000"); // { red: 255, green: 0, blue: 0 }
base64encode("hello"); // "aGVsbG8="
base64decode("aGVsbG8="); // "hello"
```

### detection

Detect mobile and touch devices.

```ts
import { isMobile, isTouchDevice } from "utilies";

isMobile; // true | false
isTouchDevice; // true | false
```

### datetime

Format dates and times with `Intl.DateTimeFormat`.

```ts
import { dateTime, date, time } from "utilies";

dateTime("2025-01-15T10:30:00", { locales: "en-US" }); // "1/15/2025, 10:30 AM"
date("2025-01-15T10:30:00", { locales: "en-US" }); // "1/15/2025"
time("2025-01-15T10:30:00", { locales: "en-US" }); // "10:30 AM"
```

### Navigator

Share content via the Web Share API.

```ts
import { shareToSocial } from "utilies";

shareToSocial({ title: "Check this out", url: "https://example.com" });
```

### validation

Validate emails, phone numbers, and form fields.

```ts
import { isMail, isPhoneNumber, validate } from "utilies";

isMail("test@example.com"); // true
isPhoneNumber("+1234567890"); // true

validate("email", "bad-email", { email: true, required: true });
// returns error message or false
```

### grammarly

Pretty-print item counts with singular/plural/empty labels.

```ts
import { grammarlyItem } from "utilies";

grammarlyItem(0, ["todo", "todos", "nothing"]); // "nothing"
grammarlyItem(1, ["todo", "todos", "nothing"]); // "1 todo"
grammarlyItem(5, ["todo", "todos", "nothing"]); // "5 todos"
```

### maths

Loan EMI calculations per month, year, or day.

```ts
import { loanPerMonth, loanPerYear, loanPerday } from "utilies";

loanPerMonth(10000, 5, 12); // monthly EMI
loanPerYear(10000, 5, 1); // yearly payment
loanPerday(10000, 5, 365); // daily payment
```

### Client Filesystem

Download files programmatically in the browser.

```ts
import { downloadFile } from "utilies";

downloadFile({
    name: "report.txt",
    data: "Hello world",
    type: "text/plain",
});
```

## Testing

```bash
npm run test
```

## License

The utilies was created by Saeed Hosan under the MIT [license](LICENSE).
