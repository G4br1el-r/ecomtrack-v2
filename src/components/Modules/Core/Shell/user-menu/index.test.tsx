import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

import { UserMenu } from ".";

const logout = vi.fn();

const push = vi.fn();

vi.mock("@/hooks/Modules/Core/Auth/use-logout", () => ({ useLogout: () => ({ mutate: logout, isPending: false }) }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

function renderMenu() {
  render(
    <SidebarProvider>
      <UserMenu />
    </SidebarProvider>,
  );
}

describe("UserMenu", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    );
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    useSessionStore.getState().setSession(AUTH_TOKENS_MOCK);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    useSessionStore.getState().clearSession();
  });

  it("mostra o nome, as iniciais e o perfil do usuário logado", () => {
    renderMenu();

    expect(screen.getByText("Gabriel Rodrigues")).toBeInTheDocument();
    expect(screen.getByText("GR")).toBeInTheDocument();
    expect(screen.getByText("Owner")).toBeInTheDocument();
  });

  it("mostra o e-mail e sai do sistema", async () => {
    renderMenu();

    await userEvent.click(screen.getByRole("button", { name: /Gabriel Rodrigues/ }));

    expect(await screen.findByText(AUTH_TOKENS_MOCK.user.email)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("menuitem", { name: "Sair" }));
    expect(logout).toHaveBeenCalledOnce();
  });

  it.each([
    ["Meu Perfil", "/minha-conta"],
    ["Segurança", "/minha-conta?aba=seguranca"],
  ])("o item %s abre %s", async (item, href) => {
    renderMenu();

    await userEvent.click(screen.getByRole("button", { name: /Gabriel Rodrigues/ }));
    await userEvent.click(await screen.findByRole("menuitem", { name: item }));

    expect(push).toHaveBeenCalledWith(href);
  });
});
