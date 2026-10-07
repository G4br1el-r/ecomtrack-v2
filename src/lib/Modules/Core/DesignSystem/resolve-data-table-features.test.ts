import { describe, expect, it } from "vitest";

import { resolveDataTableFeatures } from "./resolve-data-table-features";

describe("resolveDataTableFeatures", () => {
  it("usa o padrão declarado quando nada foi salvo", () => {
    const features = resolveDataTableFeatures({ sorting: true, expanding: false });
    expect(features.sorting).toBe(true);
    expect(features.expanding).toBe(false);
  });

  it("prefere o que o usuário salvou", () => {
    expect(resolveDataTableFeatures({ sorting: true }, { sorting: false }).sorting).toBe(false);
  });

  it("mantém desligado o recurso que a tabela não oferece, mesmo se salvo", () => {
    expect(resolveDataTableFeatures({ sorting: true }, { rowPinning: true }).rowPinning).toBe(false);
  });
});
