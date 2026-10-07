import { describe, expect, it } from "vitest";

import { formatDocument } from "./format-document";

describe("formatDocument", () => {
  it("formata CNPJ e CPF guardados só com números", () => {
    expect(formatDocument("12345678000190")).toBe("12.345.678/0001-90");
    expect(formatDocument("12345678901")).toBe("123.456.789-01");
  });

  it("devolve vazio sem documento e mantém formato desconhecido", () => {
    expect(formatDocument(null)).toBe("");
    expect(formatDocument("123")).toBe("123");
  });
});
