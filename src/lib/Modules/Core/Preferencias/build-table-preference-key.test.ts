import { describe, expect, it } from "vitest";

import { buildTablePreferenceKey } from "./build-table-preference-key";

describe("buildTablePreferenceKey", () => {
  it("prefixa o id da tabela no formato aceito pela API", () => {
    expect(buildTablePreferenceKey("administracao-usuarios")).toBe("table.administracao-usuarios");
    expect(buildTablePreferenceKey("Plataforma-Planos")).toBe("table.plataforma-planos");
  });
});
