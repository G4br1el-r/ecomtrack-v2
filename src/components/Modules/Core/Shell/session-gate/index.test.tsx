import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { SESSION_EXPIRED_ERROR } from "@/constants/Modules/Core/Auth/auth";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

import { SessionGate } from ".";

const PATHNAME = "/visao-geral/dashboard";
const redirect = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => PATHNAME,
  redirect: (href: string) => redirect(href),
}));

function stubRefresh(...replies: Array<Response | Error>) {
  const fetchMock = vi.fn(() => {
    const reply = replies.shift();
    return reply instanceof Error ? Promise.reject(reply) : Promise.resolve(reply);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function renderGate() {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <SessionGate>
        <p>Conteúdo protegido</p>
      </SessionGate>
    </QueryClientProvider>,
  );
}

describe("SessionGate", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    redirect.mockClear();
    useSessionStore.getState().clearSession();
  });

  it("mostra carregando e depois o conteúdo com a sessão renovada", async () => {
    stubRefresh(Response.json(AUTH_TOKENS_MOCK));
    renderGate();

    expect(screen.getByRole("status", { name: "Carregando" })).toBeInTheDocument();
    expect(await screen.findByText("Conteúdo protegido")).toBeInTheDocument();
    expect(useSessionStore.getState().accessToken).toBe(AUTH_TOKENS_MOCK.accessToken);
  });

  it("manda para o login quando a sessão venceu", async () => {
    stubRefresh(Response.json(SESSION_EXPIRED_ERROR, { status: HTTP_STATUS.unauthorized }));
    renderGate();

    await vi.waitFor(() => expect(redirect).toHaveBeenCalledWith("/login?redirect=%2Fvisao-geral%2Fdashboard"));
    expect(screen.queryByText("Conteúdo protegido")).not.toBeInTheDocument();
  });

  it("mostra erro quando o servidor não responde e tenta de novo", async () => {
    stubRefresh(new TypeError("Failed to fetch"), Response.json(AUTH_TOKENS_MOCK));
    renderGate();

    expect(await screen.findByText("Não foi possível abrir sua sessão")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Tentar/ }));

    expect(await screen.findByText("Conteúdo protegido")).toBeInTheDocument();
  });
});
