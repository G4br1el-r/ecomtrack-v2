import { render, screen } from "@testing-library/react";
import { Users } from "lucide-react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SidebarMenu, SidebarProvider } from "@/components/ui/sidebar";

import { SidebarNavItem } from ".";

vi.mock("next/navigation", () => ({ usePathname: () => "/visao-geral/dashboard" }));

function renderItem(integrated?: boolean) {
  render(
    <SidebarProvider>
      <SidebarMenu>
        <SidebarNavItem title="Usuários" href="/administracao/usuarios" icon={<Users />} integrated={integrated} />
      </SidebarMenu>
    </SidebarProvider>,
  );
  return screen.getByRole("link", { name: "Usuários" });
}

describe("SidebarNavItem", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("pinta de azul a rota que já usa a API", () => {
    const link = renderItem(true);

    expect(link).toHaveAttribute("data-integrated", "true");
    expect(link).toHaveClass("text-info/80");
    expect(link).not.toHaveClass("text-sidebar-foreground/70");
  });

  it("mantém a cor padrão na rota ainda simulada", () => {
    const link = renderItem();

    expect(link).not.toHaveAttribute("data-integrated");
    expect(link).toHaveClass("text-sidebar-foreground/70");
  });
});
