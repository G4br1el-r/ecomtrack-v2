import { describe, expect, it } from "vitest";

import { getLoginHref } from "./get-login-href";

describe("getLoginHref", () => {
  it("leva para o login guardando a rota de volta", () => {
    expect(getLoginHref("/visao-geral/dashboard")).toBe("/login?redirect=%2Fvisao-geral%2Fdashboard");
  });

  it("preserva a busca da rota de volta", () => {
    expect(getLoginHref("/tabela?pagina=2")).toBe("/login?redirect=%2Ftabela%3Fpagina%3D2");
  });
});
