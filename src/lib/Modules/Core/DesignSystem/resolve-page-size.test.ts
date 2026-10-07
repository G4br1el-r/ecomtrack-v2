import { describe, expect, it } from "vitest";

import { resolvePageSize } from "./resolve-page-size";

const OPTIONS = [10, 20, 50];

describe("resolvePageSize", () => {
  it("usa a primeira opção quando nada foi salvo", () => {
    expect(resolvePageSize(undefined, OPTIONS)).toBe(10);
  });

  it("usa o tamanho salvo quando ele está entre as opções", () => {
    expect(resolvePageSize(50, OPTIONS)).toBe(50);
  });

  it("ignora tamanho salvo que a tabela não oferece mais", () => {
    expect(resolvePageSize(30, OPTIONS)).toBe(10);
  });
});
