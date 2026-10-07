import { describe, expect, it } from "vitest";

import { brandSchema } from "./brand-schema";

describe("brandSchema", () => {
  it("aceita marca válida", () => {
    expect(brandSchema.safeParse({ name: "PlayStation", slug: "playstation" }).success).toBe(true);
  });

  it("rejeita nome curto", () => {
    expect(brandSchema.safeParse({ name: "P", slug: "p" }).success).toBe(false);
  });

  it("rejeita slug com espaço ou maiúscula", () => {
    expect(brandSchema.safeParse({ name: "Xbox", slug: "Xbox One" }).success).toBe(false);
  });
});
