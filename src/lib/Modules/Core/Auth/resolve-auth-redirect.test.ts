import { describe, expect, it } from "vitest";

import { HOME_HREF } from "@/constants/Modules/Core/Shell/navigation";

import { resolveAuthRedirect } from "./resolve-auth-redirect";

describe("resolveAuthRedirect", () => {
  it("manda para o login quem abre rota protegida sem sessão", () => {
    expect(resolveAuthRedirect("/visao-geral/dashboard", "", false)).toBe("/login?redirect=%2Fvisao-geral%2Fdashboard");
  });

  it("guarda a busca da rota protegida no redirect", () => {
    expect(resolveAuthRedirect("/tabela", "?pagina=2", false)).toBe("/login?redirect=%2Ftabela%3Fpagina%3D2");
  });

  it("deixa passar rota protegida com sessão", () => {
    expect(resolveAuthRedirect("/visao-geral/dashboard", "", true)).toBeNull();
  });

  it("deixa abrir o login sem sessão", () => {
    expect(resolveAuthRedirect("/login", "", false)).toBeNull();
  });

  it("tira do login quem já tem sessão", () => {
    expect(resolveAuthRedirect("/login", "", true)).toBe(HOME_HREF);
  });

  it("deixa abrir rotas públicas e as filhas delas sem sessão", () => {
    expect(resolveAuthRedirect("/nao-encontrado", "", false)).toBeNull();
    expect(resolveAuthRedirect("/redefinir-senha/abc", "", false)).toBeNull();
  });

  it("não confunde rota pública com prefixo parecido", () => {
    expect(resolveAuthRedirect("/convites", "", false)).toBe("/login?redirect=%2Fconvites");
  });
});
