import { describe, expect, it } from "vitest";

import { parsePageInput } from "./parse-page-input";

const TOTAL_PAGES = 3;

describe("parsePageInput", () => {
  it("aceita página dentro do intervalo", () => {
    expect(parsePageInput("2", TOTAL_PAGES)).toBe(2);
  });

  it("ignora espaços nas bordas", () => {
    expect(parsePageInput(" 3 ", TOTAL_PAGES)).toBe(3);
  });

  it.each(["0", "4", "", "abc", "1.5", "-1"])("rejeita %j", (value) => {
    expect(parsePageInput(value, TOTAL_PAGES)).toBeNull();
  });
});
