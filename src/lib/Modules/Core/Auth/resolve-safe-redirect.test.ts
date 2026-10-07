import { describe, expect, it } from "vitest";

import { HOME_HREF } from "@/constants/Modules/Core/Shell/navigation";

import { resolveSafeRedirect } from "./resolve-safe-redirect";

describe("resolveSafeRedirect", () => {
  it("volta para a rota interna pedida", () => {
    expect(resolveSafeRedirect("/tabela?pagina=2")).toBe("/tabela?pagina=2");
  });

  it("vai para o início sem rota pedida", () => {
    expect(resolveSafeRedirect(null)).toBe(HOME_HREF);
    expect(resolveSafeRedirect("")).toBe(HOME_HREF);
  });

  it("recusa endereço de fora do sistema", () => {
    expect(resolveSafeRedirect("https://site-malicioso.com")).toBe(HOME_HREF);
    expect(resolveSafeRedirect("//site-malicioso.com")).toBe(HOME_HREF);
    expect(resolveSafeRedirect("/\\site-malicioso.com")).toBe(HOME_HREF);
  });

  it("não volta para o próprio login", () => {
    expect(resolveSafeRedirect("/login?redirect=%2Ftabela")).toBe(HOME_HREF);
  });
});
