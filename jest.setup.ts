import "@testing-library/jest-dom";
import { randomUUID } from "node:crypto";

Object.defineProperty(globalThis, "crypto", {
  value: { ...globalThis.crypto, randomUUID },
});
