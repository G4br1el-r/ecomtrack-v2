import { afterEach, describe, expect, it, vi } from "vitest";

import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { SESSION_EXPIRED_ERROR } from "@/constants/Modules/Core/Auth/auth";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

import { refreshAccessToken } from "./refresh-access-token";

describe("refreshAccessToken", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    useSessionStore.getState().clearSession();
  });

  it("faz uma renovação só quando várias chamadas pedem ao mesmo tempo", async () => {
    const fetchMock = vi.fn(() => Promise.resolve(Response.json(AUTH_TOKENS_MOCK)));
    vi.stubGlobal("fetch", fetchMock);

    const [first, second] = await Promise.all([refreshAccessToken(), refreshAccessToken()]);

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(first).toEqual(AUTH_TOKENS_MOCK);
    expect(second).toEqual(AUTH_TOKENS_MOCK);
    expect(useSessionStore.getState().accessToken).toBe(AUTH_TOKENS_MOCK.accessToken);
  });

  it("libera nova renovação depois que a anterior termina", async () => {
    const fetchMock = vi.fn(() => Promise.resolve(Response.json(AUTH_TOKENS_MOCK)));
    vi.stubGlobal("fetch", fetchMock);

    await refreshAccessToken();
    await refreshAccessToken();

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("limpa a sessão quando a renovação é recusada", async () => {
    useSessionStore.getState().setSession(AUTH_TOKENS_MOCK);
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(Response.json(SESSION_EXPIRED_ERROR, { status: HTTP_STATUS.unauthorized }))),
    );

    expect(await refreshAccessToken()).toBeNull();
    expect(useSessionStore.getState().accessToken).toBeNull();
  });
});
