import { describe, expect, it } from "vitest";

import { dataTablePreferencesMapSchema } from "./data-table-preferences-schema";

describe("dataTablePreferencesMapSchema", () => {
  it("aceita preferências parciais por tabela", () => {
    const parsed = dataTablePreferencesMapSchema.safeParse({
      produtos: { features: { sorting: false }, columnOrder: ["price", "name"] },
    });
    expect(parsed.success).toBe(true);
  });

  it("descarta só os recursos quando há um recurso desconhecido", () => {
    const parsed = dataTablePreferencesMapSchema.parse({
      produtos: { features: { voar: true }, columnOrder: ["price"] },
    });
    expect(parsed.produtos).toEqual({ features: undefined, columnOrder: ["price"] });
  });

  it("aceita largura zero de coluna encolhida até o mínimo", () => {
    const parsed = dataTablePreferencesMapSchema.parse({
      produtos: { features: { columnResizing: true }, columnSizing: { brand: 0 } },
    });
    expect(parsed.produtos).toEqual({ features: { columnResizing: true }, columnSizing: { brand: 0 } });
  });

  it("descarta só as larguras quando alguma é negativa", () => {
    const parsed = dataTablePreferencesMapSchema.parse({
      produtos: { features: { columnResizing: true }, columnSizing: { name: -1 } },
    });
    expect(parsed.produtos?.features).toEqual({ columnResizing: true });
    expect(parsed.produtos?.columnSizing).toBeUndefined();
  });
});
