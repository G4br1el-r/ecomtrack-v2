import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

import { getPreference } from "./get-preference";

function stubFetch(response: Response) {
  const fetchMock = vi.fn(() => Promise.resolve(response));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("getPreference", () => {
  beforeEach(() => {
    useSessionStore.getState().setSession(AUTH_TOKENS_MOCK);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    useSessionStore.getState().clearSession();
  });

  it("lê a preferência pela chave", async () => {
    const fetchMock = stubFetch(
      Response.json({ key: "ai.task.tags", value: { model: "gpt" }, updatedAt: "2026-10-09T10:00:00Z" }),
    );

    await expect(getPreference("ai.task.tags")).resolves.toEqual({
      key: "ai.task.tags",
      value: { model: "gpt" },
      updatedAt: "2026-10-09T10:00:00Z",
    });
    expect(String(fetchMock.mock.calls[0]?.at(0))).toContain("/auth/me/preferences/ai.task.tags");
  });

  it("devolve nulo para chave nunca salva (404)", async () => {
    stubFetch(Response.json({ code: "NFD01", message: "Não encontrado." }, { status: 404 }));

    await expect(getPreference("ai.task.tags")).resolves.toBeNull();
  });

  it("repassa os outros erros da API", async () => {
    stubFetch(Response.json({ code: "SEC03", message: "Sem permissão." }, { status: 403 }));

    await expect(getPreference("ai.task.tags")).rejects.toThrow("Sem permissão.");
  });
});
