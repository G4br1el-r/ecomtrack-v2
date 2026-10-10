import { describe, expect, it } from "vitest";

import { upsertPreference } from "./upsert-preference";

const DENSITY = { key: "ui.density", value: "compact", updatedAt: "2026-10-09T10:00:00Z" };
const TABLE = { key: "table.administracao-usuarios", value: { pageSize: 20 }, updatedAt: "2026-10-09T10:00:00Z" };

describe("upsertPreference", () => {
  it("troca a preferência da mesma chave", () => {
    const updated = { ...DENSITY, value: "comfortable" };

    expect(upsertPreference([TABLE, DENSITY], updated)).toEqual([TABLE, updated]);
  });

  it("inclui a chave nova mantendo a ordem por chave", () => {
    expect(upsertPreference([TABLE], DENSITY)).toEqual([TABLE, DENSITY]);
  });

  it("aceita lista ainda não carregada", () => {
    expect(upsertPreference(undefined, DENSITY)).toEqual([DENSITY]);
  });
});
