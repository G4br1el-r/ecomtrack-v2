import { beforeEach, describe, expect, it } from "vitest";

import { useSidebarNavStore } from "./sidebar-nav-store";

const PENDING = { href: "/catalogo/marcas", from: "/vendas/pedidos" };

describe("useSidebarNavStore", () => {
  beforeEach(() => {
    useSidebarNavStore.setState({ pending: null });
  });

  it("guarda a navegação pendente", () => {
    useSidebarNavStore.getState().setPending(PENDING);
    expect(useSidebarNavStore.getState().pending).toEqual(PENDING);
  });

  it("mantém o pendente enquanto a rota de origem não muda", () => {
    useSidebarNavStore.getState().setPending(PENDING);
    useSidebarNavStore.getState().clearStale("/vendas/pedidos");
    expect(useSidebarNavStore.getState().pending).toEqual(PENDING);
  });

  it("descarta o pendente quando a rota muda", () => {
    useSidebarNavStore.getState().setPending(PENDING);
    useSidebarNavStore.getState().clearStale("/catalogo/marcas");
    expect(useSidebarNavStore.getState().pending).toBeNull();
  });
});
