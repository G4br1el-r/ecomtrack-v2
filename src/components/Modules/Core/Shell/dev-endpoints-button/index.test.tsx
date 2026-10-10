import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

import { DevEndpointsButton } from ".";

const pathname = vi.hoisted(() => ({ current: "/administracao/usuarios" }));

vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

const USERS_PAGE_ENDPOINTS = 21;
const SHELL_ENDPOINTS = 9;

function loginAs(isPlatformOwner: boolean) {
  useSessionStore.getState().setSession({ ...AUTH_TOKENS_MOCK, user: { ...AUTH_TOKENS_MOCK.user, isPlatformOwner } });
}

describe("DevEndpointsButton", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    useSessionStore.getState().clearSession();
    pathname.current = "/administracao/usuarios";
  });

  it("não aparece para quem não é Owner", () => {
    loginAs(false);
    render(<DevEndpointsButton />);

    expect(screen.queryByRole("button", { name: /Endpoints da API/ })).not.toBeInTheDocument();
  });

  it("mostra a contagem e lista os endpoints da página atual", async () => {
    loginAs(true);
    render(<DevEndpointsButton />);

    await userEvent.click(
      screen.getByRole("button", { name: `Endpoints da API nesta página: ${USERS_PAGE_ENDPOINTS}` }),
    );

    const page = await screen.findByRole("region", { name: "Nesta página" });
    expect(within(page).getAllByRole("listitem")).toHaveLength(USERS_PAGE_ENDPOINTS);
    expect(within(page).getByText("/users/{id}/view-as")).toBeInTheDocument();
    expect(within(page).getByText("usuarios.visualizarcomo")).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "Em todas as páginas" })).getAllByRole("listitem")).toHaveLength(
      SHELL_ENDPOINTS,
    );
  });

  it("avisa quando a página ainda não usa a API", async () => {
    pathname.current = "/visao-geral/dashboard";
    loginAs(true);
    render(<DevEndpointsButton />);

    await userEvent.click(screen.getByRole("button", { name: "Endpoints da API nesta página: 0" }));

    expect(await screen.findByText("Esta página ainda usa dados simulados.")).toBeInTheDocument();
  });
});
