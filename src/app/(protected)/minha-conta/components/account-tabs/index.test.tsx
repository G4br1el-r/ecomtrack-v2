import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

import { AccountTabs } from ".";

const toastSuccess = vi.fn();

vi.mock("sonner", () => ({ toast: { success: (...args: unknown[]) => toastSuccess(...args), error: vi.fn() } }));
vi.mock("@/hooks/Modules/Core/Auth/use-logout", () => ({ useLogout: () => ({ mutate: vi.fn() }) }));

const ME = AUTH_TOKENS_MOCK.user;

type Call = [string, RequestInit];

function stubApi(handler: (url: string, init: RequestInit) => Response) {
  const fetchMock = vi.fn((url: string, init?: RequestInit) => Promise.resolve(handler(url, init ?? {})));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function renderTabs(defaultTab = "perfil") {
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <AccountTabs defaultTab={defaultTab} />
    </QueryClientProvider>,
  );
}

describe("AccountTabs", () => {
  beforeEach(() => {
    useSessionStore.getState().setSession(AUTH_TOKENS_MOCK);
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
    vi.clearAllMocks();
    useSessionStore.getState().clearSession();
  });

  it("carrega o perfil e salva o nome novo", async () => {
    const fetchMock = stubApi((_url, init) =>
      init.method === "PUT" ? Response.json({ ...ME, firstName: "Gabi" }) : Response.json(ME),
    );
    renderTabs();

    const firstName = await screen.findByLabelText("Nome");
    expect(firstName).toHaveValue(ME.firstName);
    await userEvent.clear(firstName);
    await userEvent.type(firstName, "Gabi");
    await userEvent.click(screen.getByRole("button", { name: "Salvar" }));

    await vi.waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Perfil atualizado"));
    const save = fetchMock.mock.calls.find((call) => (call as Call)[1]?.method === "PUT") as Call;
    expect(save[0]).toBe("/api/modules/core/ecomtrack/auth/me");
    expect(JSON.parse(String(save[1].body))).toEqual({ firstName: "Gabi", lastName: ME.lastName, avatarUrl: null });
    expect(useSessionStore.getState().user?.firstName).toBe("Gabi");
  });

  it("mostra a situação dos PINs e cria o PIN de 4 dígitos", async () => {
    const fetchMock = stubApi((_url, init) =>
      init.method === "PUT" ? new Response(null, { status: HTTP_STATUS.noContent }) : Response.json(ME),
    );
    renderTabs("seguranca");

    const pinCards = await screen.findAllByText("Não criado");
    expect(pinCards).toHaveLength(2);
    await userEvent.click(screen.getAllByRole("button", { name: "Criar PIN" })[0]);

    const dialog = await screen.findByRole("dialog");
    await userEvent.type(within(dialog).getByLabelText("Novo PIN"), "4815");
    await userEvent.type(within(dialog).getByLabelText("Repita o PIN"), "4815");
    await userEvent.type(within(dialog).getByLabelText("Senha atual"), "minhaSenha123");
    await userEvent.click(within(dialog).getByRole("button", { name: "Salvar PIN" }));

    await vi.waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("PIN de 4 dígitos criado"));
    const save = fetchMock.mock.calls.find((call) => (call as Call)[1]?.method === "PUT") as Call;
    expect(save[0]).toBe("/api/modules/core/ecomtrack/auth/me/pin");
    expect(JSON.parse(String(save[1].body))).toEqual({ type: "Four", pin: "4815", currentPassword: "minhaSenha123" });
  });

  it("confere a troca de senha antes de enviar", async () => {
    const fetchMock = stubApi(() => Response.json(ME));
    renderTabs("seguranca");

    await userEvent.type(await screen.findByLabelText("Senha atual"), "SenhaAntiga2026");
    await userEvent.type(screen.getByLabelText("Nova senha"), "SenhaAntiga2026");
    await userEvent.type(screen.getByLabelText("Repita a nova senha"), "SenhaAntiga2026");
    await userEvent.click(screen.getByRole("button", { name: "Trocar senha" }));

    expect(await screen.findByText("A nova senha precisa ser diferente da atual.")).toBeInTheDocument();
    expect(fetchMock.mock.calls.every((call) => (call as Call)[1]?.method !== "PUT")).toBe(true);
  });
});
