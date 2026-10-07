import { describe, expect, it } from "vitest";

import { isGranularity } from "./is-granularity";

describe("isGranularity", () => {
  it("aceita dia, semana e mês", () => {
    expect(["day", "week", "month"].every(isGranularity)).toBe(true);
  });

  it("recusa valores vazios ou desconhecidos", () => {
    expect(isGranularity("")).toBe(false);
    expect(isGranularity("year")).toBe(false);
  });
});
