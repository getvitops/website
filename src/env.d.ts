/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** Active A/B variant for this request. Set by `src/middleware.ts`. */
    variant: import("./lib/variant").Variant;
  }
}
