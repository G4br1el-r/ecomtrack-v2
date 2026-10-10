import { describe, expect, it } from "vitest";

import { compactTablePreferences } from "./compact-table-preferences";

describe("compactTablePreferences", () => {
  it("remove campos vazios e mantém os preenchidos", () => {
    expect(
      compactTablePreferences({ features: {}, columnOrder: [], columnVisibility: { email: false }, pageSize: 20 }),
    ).toEqual({ columnVisibility: { email: false }, pageSize: 20 });
  });

  it("devolve nulo quando tudo voltou ao padrão", () => {
    expect(compactTablePreferences({ features: {}, columnSizing: {} })).toBeNull();
    expect(compactTablePreferences(undefined)).toBeNull();
  });
});
