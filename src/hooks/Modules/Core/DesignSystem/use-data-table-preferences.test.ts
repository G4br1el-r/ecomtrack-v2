import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";

import { useDataTablePreferences } from "./use-data-table-preferences";

const SETTINGS = { id: "produtos", features: { sorting: true, rowPinning: true, expanding: false } };

describe("useDataTablePreferences", () => {
  beforeEach(() => {
    localStorage.clear();
    useDataTablePreferencesStore.setState({ tables: {} });
  });

  it("começa com o padrão declarado pela tabela", () => {
    const { result } = renderHook(() => useDataTablePreferences(SETTINGS));
    expect(result.current.features.sorting).toBe(true);
    expect(result.current.features.expanding).toBe(false);
  });

  it("liga e desliga recurso e restaura o padrão", () => {
    const { result } = renderHook(() => useDataTablePreferences(SETTINGS));
    act(() => result.current.setFeature("rowPinning", false));
    expect(result.current.features.rowPinning).toBe(false);
    act(() => result.current.resetFeatures());
    expect(result.current.features.rowPinning).toBe(true);
  });

  it("sem configuração usa só ordenação e não salva nada", () => {
    const { result } = renderHook(() => useDataTablePreferences(undefined));
    expect(result.current.features.sorting).toBe(true);
    expect(result.current.features.rowPinning).toBe(false);
    act(() => result.current.setFeature("rowPinning", true));
    expect(useDataTablePreferencesStore.getState().tables).toEqual({});
  });
});
