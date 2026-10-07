import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";

import { useDataTableServerState } from "./use-data-table-server-state";

const SETTINGS = { id: "tabela-servidor", features: {}, pagination: { pageSizeOptions: [10, 20] } };
const TOTAL = 45;

describe("useDataTableServerState", () => {
  beforeEach(() => useDataTablePreferencesStore.setState({ tables: {} }));

  it("começa na primeira página com o primeiro tamanho e sem busca", () => {
    const { result } = renderHook(() => useDataTableServerState(SETTINGS));

    expect(result.current.query).toEqual({ Page: 1, PageSize: 10, Search: "" });
  });

  it("troca de página e volta para a primeira ao pesquisar", () => {
    const { result } = renderHook(() => useDataTableServerState(SETTINGS));

    act(() => result.current.server(TOTAL).onPageIndexChange(2));
    expect(result.current.query.Page).toBe(3);

    act(() => result.current.server(TOTAL).onSearch("ana"));
    expect(result.current.query).toEqual({ Page: 1, PageSize: 10, Search: "ana" });
  });

  it("guarda o tamanho da página nas preferências da tabela", () => {
    const { result } = renderHook(() => useDataTableServerState(SETTINGS));

    act(() => result.current.server(TOTAL).onPageIndexChange(1));
    act(() => result.current.server(TOTAL).onPageSizeChange(20));

    expect(result.current.query).toEqual({ Page: 1, PageSize: 20, Search: "" });
    expect(useDataTablePreferencesStore.getState().tables[SETTINGS.id]?.pageSize).toBe(20);
  });
});
