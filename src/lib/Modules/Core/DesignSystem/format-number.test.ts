import { describe, expect, it } from "vitest";

import { formatNumber } from "./format-number";

const NBSP = " ";

describe("formatNumber", () => {
  it("formata moeda em reais", () => {
    expect(formatNumber(184320, "currency")).toBe(`R$${NBSP}184.320,00`);
  });

  it("formata inteiro com separador de milhar", () => {
    expect(formatNumber(1248.6, "integer")).toBe("1.249");
  });

  it("formata decimal sempre com uma casa", () => {
    expect(formatNumber(4.85, "decimal")).toBe("4,9");
    expect(formatNumber(5, "decimal")).toBe("5,0");
  });

  it("formata percentual a partir de fração", () => {
    expect(formatNumber(0.124, "percent")).toBe("12,4%");
  });
});

describe("formatNumber compacto e com sinal", () => {
  it("formata moeda compacta para eixos", () => {
    expect(formatNumber(12500, "compactCurrency")).toBe(`R$${NBSP}13${NBSP}mil`);
  });

  it("formata inteiro compacto", () => {
    expect(formatNumber(1250, "compactInteger")).toBe(`1,3${NBSP}mil`);
  });

  it("mostra sinal de positivo e negativo no percentual", () => {
    expect(formatNumber(0.124, "signedPercent")).toBe("+12,4%");
    expect(formatNumber(-0.05, "signedPercent")).toBe("-5%");
    expect(formatNumber(0, "signedPercent")).toBe("0%");
  });
});
