import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { PERMISSIONS_QUERY_KEY } from "@/constants/Modules/Core/Access/access";
import { ME_QUERY_KEY } from "@/constants/Modules/Core/Conta/account";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useViewAsStore } from "@/store/Modules/Core/Access/view-as-store";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

import { usePermissionsHub } from "./use-permissions-hub";

const HUB_URL = "https://localhost:7251/hubs/permissions";

const signalr = vi.hoisted(() => {
  const handlers = new Map<string, (payload: unknown) => void>();
  const connection = {
    on: vi.fn((event: string, handler: (payload: unknown) => void) => handlers.set(event, handler)),
    start: vi.fn(() => Promise.resolve()),
    stop: vi.fn(() => Promise.resolve()),
  };
  const options: { accessTokenFactory?: () => string } = {};
  const builder = {
    withUrl: vi.fn((_url: string, value: { accessTokenFactory: () => string }) => {
      options.accessTokenFactory = value.accessTokenFactory;
      return builder;
    }),
    withAutomaticReconnect: vi.fn(() => builder),
    configureLogging: vi.fn(() => builder),
    build: vi.fn(() => connection),
  };
  return { handlers, connection, builder, options };
});

vi.mock("@microsoft/signalr", () => ({
  HubConnectionBuilder: vi.fn(function HubConnectionBuilder() {
    return signalr.builder;
  }),
  LogLevel: { None: 6 },
}));

function renderHub(hubUrl: string | null, client = new QueryClient()) {
  return renderHook(() => usePermissionsHub(hubUrl), {
    wrapper: ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>,
  });
}

describe("usePermissionsHub", () => {
  beforeEach(() => {
    useSessionStore.getState().setSession(AUTH_TOKENS_MOCK);
  });

  afterEach(() => {
    useSessionStore.getState().clearSession();
    useViewAsStore.getState().stop();
    signalr.handlers.clear();
    vi.clearAllMocks();
  });

  it("conecta no hub com o token da sessão e desconecta ao sair", () => {
    const { unmount } = renderHub(HUB_URL);

    expect(signalr.builder.withUrl).toHaveBeenCalledWith(HUB_URL, expect.any(Object));
    expect(signalr.options.accessTokenFactory?.()).toBe(AUTH_TOKENS_MOCK.accessToken);
    expect(signalr.connection.start).toHaveBeenCalled();

    unmount();
    expect(signalr.connection.stop).toHaveBeenCalled();
  });

  it("usa o token do visualizar como enquanto ele estiver ativo", () => {
    useViewAsStore
      .getState()
      .start({ token: "token-visualizacao", expiresAt: "2026-10-09T12:00:00Z", label: "Vendas" });
    renderHub(HUB_URL);

    expect(signalr.options.accessTokenFactory?.()).toBe("token-visualizacao");
  });

  it("recarrega menu, componentes e usuário quando as permissões mudam", async () => {
    const client = new QueryClient();
    const invalidate = vi.spyOn(client, "invalidateQueries");
    renderHub(HUB_URL, client);

    await act(async () => signalr.handlers.get("PermissionsChanged")?.({ profileId: "p1", version: 2 }));

    expect(invalidate).toHaveBeenCalledWith({ queryKey: PERMISSIONS_QUERY_KEY });
    expect(invalidate).toHaveBeenCalledWith({ queryKey: ME_QUERY_KEY });
  });

  it("ignora aviso fora do formato esperado", async () => {
    const client = new QueryClient();
    const invalidate = vi.spyOn(client, "invalidateQueries");
    renderHub(HUB_URL, client);

    await act(async () => signalr.handlers.get("PermissionsChanged")?.({ qualquer: true }));

    expect(invalidate).not.toHaveBeenCalled();
  });

  it("não conecta sem URL do hub ou sem sessão", () => {
    renderHub(null);
    useSessionStore.getState().clearSession();
    renderHub(HUB_URL);

    expect(signalr.builder.build).not.toHaveBeenCalled();
  });
});
