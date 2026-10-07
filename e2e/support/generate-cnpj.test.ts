import { describe, expect, it } from "vitest";

import { generateCnpj } from "./generate-cnpj";

describe("generateCnpj", () => {
  it("calcula os dígitos verificadores de um CNPJ conhecido", () => {
    expect(generateCnpj(11222333)).toBe("11222333000181");
  });

  it("gera 14 dígitos diferentes para sementes diferentes", () => {
    const first = generateCnpj(1791413938593);
    const second = generateCnpj(1791413938594);

    expect(first).toMatch(/^\d{14}$/);
    expect(first).not.toBe(second);
  });
});
