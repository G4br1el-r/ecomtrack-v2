import { beforeEach, describe, expect, it } from "vitest";

import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";

import { useSessionStore } from "./session-store";

describe("useSessionStore", () => {
  beforeEach(() => useSessionStore.getState().clearSession());

  it("começa sem sessão", () => {
    expect(useSessionStore.getState()).toMatchObject({ accessToken: null, user: null });
  });

  it("guarda o token e o usuário", () => {
    useSessionStore.getState().setSession(AUTH_TOKENS_MOCK);

    expect(useSessionStore.getState()).toMatchObject({
      accessToken: AUTH_TOKENS_MOCK.accessToken,
      user: AUTH_TOKENS_MOCK.user,
    });
  });

  it("limpa a sessão", () => {
    useSessionStore.getState().setSession(AUTH_TOKENS_MOCK);
    useSessionStore.getState().clearSession();

    expect(useSessionStore.getState()).toMatchObject({ accessToken: null, user: null });
  });
});
