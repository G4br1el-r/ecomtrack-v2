import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  PREFERENCE_SAVE_DEBOUNCE_IN_MS,
  PREFERENCES_QUERY_KEY,
} from "@/constants/Modules/Core/Preferencias/preferences";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useViewAsStore } from "@/store/Modules/Core/Access/view-as-store";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";
import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";
import { useDensityStore } from "@/store/Modules/Core/DesignSystem/density-store";

import { usePreferencesSync } from "./use-preferences-sync";

const UPDATED_AT = "2026-10-09T10:00:00Z";
const REMOTE = [
  { key: "table.administracao-usuarios", value: { pageSize: 50 }, updatedAt: UPDATED_AT },
  { key: "ui.density", value: "compact", updatedAt: UPDATED_AT },
];

type Call = { method: string; path: string; body: unknown };

function stubFetch() {
  const calls: Call[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn((input: string, init?: RequestInit) => {
      const path = new URL(input, "http://localhost").pathname.replace("/api/modules/core/ecomtrack", "");
      const method = init?.method ?? "GET";
      const body = init?.body ? JSON.parse(String(init.body)) : null;
      calls.push({ method, path, body });
      if (method === "DELETE") return Promise.resolve(new Response(null, { status: 204 }));
      const key = decodeURIComponent(path.split("/").pop() ?? "");
      return Promise.resolve(Response.json({ key, value: body?.value, updatedAt: UPDATED_AT }));
    }),
  );
  return calls;
}

function renderSync() {
  const client = new QueryClient();
  client.setQueryData(PREFERENCES_QUERY_KEY, REMOTE);
  renderHook(() => usePreferencesSync(), {
    wrapper: ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>,
  });
}

async function flushDebounce() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(PREFERENCE_SAVE_DEBOUNCE_IN_MS);
  });
}

describe("usePreferencesSync", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useSessionStore.getState().setSession(AUTH_TOKENS_MOCK);
    useDataTablePreferencesStore.setState({ tables: {} });
    useDensityStore.setState({ density: "comfortable" });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    useViewAsStore.getState().stop();
    useSessionStore.getState().clearSession();
  });

  it("aplica nas tabelas e na densidade o que está salvo na API, sem regravar", async () => {
    const calls = stubFetch();
    renderSync();
    await flushDebounce();

    expect(useDataTablePreferencesStore.getState().tables["administracao-usuarios"]).toEqual({ pageSize: 50 });
    expect(useDensityStore.getState().density).toBe("compact");
    expect(calls).toEqual([]);
  });

  it("salva na API a mudança da tabela uma vez só, depois da pausa", async () => {
    const calls = stubFetch();
    renderSync();

    act(() => {
      useDataTablePreferencesStore.getState().patchTable("administracao-auditoria", { pageSize: 20 });
      useDataTablePreferencesStore.getState().patchTable("administracao-auditoria", { pageSize: 100 });
    });
    await flushDebounce();

    expect(calls).toEqual([
      { method: "PUT", path: "/auth/me/preferences/table.administracao-auditoria", body: { value: { pageSize: 100 } } },
    ]);
  });

  it("apaga na API quando a tabela volta ao padrão", async () => {
    const calls = stubFetch();
    renderSync();

    act(() => {
      useDataTablePreferencesStore.setState((state) => ({
        tables: { ...state.tables, "administracao-usuarios": { features: {} } },
      }));
    });
    await flushDebounce();

    expect(calls).toEqual([
      { method: "DELETE", path: "/auth/me/preferences/table.administracao-usuarios", body: null },
    ]);
  });

  it("salva a densidade escolhida", async () => {
    const calls = stubFetch();
    renderSync();

    act(() => useDensityStore.getState().setDensity("comfortable"));
    await flushDebounce();

    expect(calls).toEqual([{ method: "PUT", path: "/auth/me/preferences/ui.density", body: { value: "comfortable" } }]);
  });

  it("não grava nada no modo visualizar como", async () => {
    const calls = stubFetch();
    renderSync();
    useViewAsStore.getState().start({ token: "t", expiresAt: UPDATED_AT, label: "Vendas" });

    act(() => useDensityStore.getState().setDensity("comfortable"));
    await flushDebounce();

    expect(calls).toEqual([]);
  });
});
