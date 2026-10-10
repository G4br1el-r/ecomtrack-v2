import { describe, expect, it } from "vitest";

import { parseRemotePreferences } from "./parse-remote-preferences";

const UPDATED_AT = "2026-10-09T10:00:00Z";

describe("parseRemotePreferences", () => {
  it("separa as preferências de tabela pelo id e a densidade", () => {
    expect(
      parseRemotePreferences([
        {
          key: "table.administracao-usuarios",
          value: { pageSize: 20, columnVisibility: { email: false } },
          updatedAt: UPDATED_AT,
        },
        { key: "ui.density", value: "compact", updatedAt: UPDATED_AT },
        { key: "ai.task.tags", value: { prompt: "x" }, updatedAt: UPDATED_AT },
      ]),
    ).toEqual({
      tables: { "administracao-usuarios": { pageSize: 20, columnVisibility: { email: false } } },
      density: "compact",
    });
  });

  it("descarta campo inválido sem perder o resto e ignora densidade desconhecida", () => {
    expect(
      parseRemotePreferences([
        {
          key: "table.administracao-auditoria",
          value: { pageSize: -1, columnOrder: ["a", "b"] },
          updatedAt: UPDATED_AT,
        },
        { key: "ui.density", value: "gigante", updatedAt: UPDATED_AT },
      ]),
    ).toEqual({ tables: { "administracao-auditoria": { columnOrder: ["a", "b"] } }, density: null });
  });

  it("devolve vazio sem preferências salvas", () => {
    expect(parseRemotePreferences([])).toEqual({ tables: {}, density: null });
  });
});
