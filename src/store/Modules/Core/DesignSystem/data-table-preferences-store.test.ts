import { beforeEach, describe, expect, it } from "vitest";

import { DATA_TABLE_PREFERENCES_STORAGE_KEY } from "@/constants/Modules/Core/DesignSystem/data-table";

import { useDataTablePreferencesStore } from "./data-table-preferences-store";

describe("useDataTablePreferencesStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useDataTablePreferencesStore.setState({ tables: {} });
  });

  it("guarda as preferências por tabela e persiste", () => {
    const { patchTable } = useDataTablePreferencesStore.getState();
    patchTable("produtos", { columnOrder: ["price", "name"] });
    patchTable("produtos", { features: { sorting: false } });
    patchTable("pedidos", { features: { rowPinning: true } });
    const { tables } = useDataTablePreferencesStore.getState();
    expect(tables.produtos).toEqual({ columnOrder: ["price", "name"], features: { sorting: false } });
    expect(tables.pedidos).toEqual({ features: { rowPinning: true } });
    expect(localStorage.getItem(DATA_TABLE_PREFERENCES_STORAGE_KEY)).toContain("price");
  });

  it("ao reidratar descarta só o campo fora do formato", async () => {
    localStorage.setItem(
      DATA_TABLE_PREFERENCES_STORAGE_KEY,
      JSON.stringify({
        state: { tables: { produtos: { features: { voar: true }, columnSizing: { brand: 0 } } } },
        version: 0,
      }),
    );
    await useDataTablePreferencesStore.persist.rehydrate();
    const { produtos } = useDataTablePreferencesStore.getState().tables;
    expect(produtos?.features).toBeUndefined();
    expect(produtos?.columnSizing).toEqual({ brand: 0 });
  });

  it("descarta tudo quando o que foi salvo não é um mapa de tabelas", async () => {
    localStorage.setItem(DATA_TABLE_PREFERENCES_STORAGE_KEY, JSON.stringify({ state: { tables: 1 }, version: 0 }));
    await useDataTablePreferencesStore.persist.rehydrate();
    expect(useDataTablePreferencesStore.getState().tables).toEqual({});
  });
});
