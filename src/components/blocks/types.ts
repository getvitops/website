// Every stored block carries _type/_version/_key next to its own fields
// (EmDash blocks field). `.emdash/types.ts` doesn't generate a union for them
// yet (see UPSTREAM.md), so each renderer declares its own value shape.
export type BV<T> = T & { _type: string; _version: number; _key: string };
