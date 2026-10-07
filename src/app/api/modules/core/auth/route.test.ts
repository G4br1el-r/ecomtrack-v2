import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { API_UNAVAILABLE_ERROR, HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { SESSION_COOKIE_NAME, SESSION_EXPIRED_ERROR } from "@/constants/Modules/Core/Auth/auth";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { LOGIN_CHALLENGE_MOCK } from "@/mocks/Modules/Core/Auth/login-challenge";

import { POST as login } from "./login/route";
import { POST as logout } from "./logout/route";
import { POST as refresh } from "./refresh/route";
import { POST as verify } from "./verify/route";

const API_URL = "https://api.teste";
const API_REFRESH_COOKIE =
  "ecomtrack_refresh=refresh-novo; expires=Wed, 14 Oct 2026 01:00:00 GMT; path=/auth; httponly";
const STORED_SESSION = "ecomtrack_refresh=refresh-antigo";

function request(path: string, { body, session }: { body?: unknown; session?: string } = {}) {
  const headers = new Headers({ "user-agent": "vitest" });
  if (session) headers.set("cookie", `${SESSION_COOKIE_NAME}=${encodeURIComponent(session)}`);
  return new NextRequest(`http://localhost:3000${path}`, {
    method: "POST",
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

function apiResponse(body: unknown, init: ResponseInit & { setCookie?: string } = {}) {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (init.setCookie) headers.append("Set-Cookie", init.setCookie);
  return new Response(body === null ? null : JSON.stringify(body), { status: init.status, headers });
}

function stubApi(response: Response) {
  const fetchMock = vi.fn((_url: string, _init: RequestInit) => Promise.resolve(response));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function sentHeaders(fetchMock: ReturnType<typeof stubApi>) {
  return new Headers(fetchMock.mock.calls[0][1].headers);
}

describe("rotas de sessão", () => {
  beforeEach(() => vi.stubEnv("ECOMTRACK_API_URL", API_URL));
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  describe("login", () => {
    it("repassa e-mail e senha para a API e devolve o desafio", async () => {
      const fetchMock = stubApi(apiResponse(LOGIN_CHALLENGE_MOCK));
      const credentials = { email: "a@b.com", password: "segredo" };

      const response = await login(request("/api/modules/core/auth/login", { body: credentials }));

      expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/auth/login`, expect.objectContaining({ method: "POST" }));
      expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify(credentials));
      expect(sentHeaders(fetchMock).get("user-agent")).toBe("vitest");
      expect(await response.json()).toEqual(LOGIN_CHALLENGE_MOCK);
    });

    it("repassa o erro da API com o mesmo status", async () => {
      const error = { code: "AUT01", message: "E-mail ou senha inválidos." };
      stubApi(apiResponse(error, { status: HTTP_STATUS.unauthorized }));

      const response = await login(request("/api/modules/core/auth/login", { body: {} }));

      expect(response.status).toBe(HTTP_STATUS.unauthorized);
      expect(await response.json()).toEqual(error);
    });

    it("avisa quando a API está fora do ar", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn(() => Promise.reject(new TypeError("fetch failed"))),
      );

      const response = await login(request("/api/modules/core/auth/login", { body: {} }));

      expect(response.status).toBe(HTTP_STATUS.badGateway);
      expect(await response.json()).toEqual(API_UNAVAILABLE_ERROR);
    });
  });

  describe("verify", () => {
    it("grava a sessão no cookie do front e não repassa o cookie da API", async () => {
      stubApi(apiResponse(AUTH_TOKENS_MOCK, { setCookie: API_REFRESH_COOKIE }));

      const response = await verify(
        request("/api/modules/core/auth/verify", { body: { challengeId: "x", code: "1" } }),
      );
      const session = response.cookies.get(SESSION_COOKIE_NAME);

      expect(await response.json()).toEqual(AUTH_TOKENS_MOCK);
      expect(session?.value).toBe("ecomtrack_refresh=refresh-novo");
      expect(session?.httpOnly).toBe(true);
      expect(session?.path).toBe("/");
      expect(response.cookies.get("ecomtrack_refresh")).toBeUndefined();
    });

    it("não grava sessão quando o código está errado", async () => {
      stubApi(apiResponse({ code: "AUT03", message: "Código inválido." }, { status: HTTP_STATUS.unauthorized }));

      const response = await verify(request("/api/modules/core/auth/verify", { body: {} }));

      expect(response.status).toBe(HTTP_STATUS.unauthorized);
      expect(response.cookies.get(SESSION_COOKIE_NAME)?.value).toBeFalsy();
    });
  });

  describe("refresh", () => {
    it("sem sessão responde 401 sem chamar a API", async () => {
      const fetchMock = stubApi(apiResponse(AUTH_TOKENS_MOCK));

      const response = await refresh(request("/api/modules/core/auth/refresh"));

      expect(response.status).toBe(HTTP_STATUS.unauthorized);
      expect(await response.json()).toEqual(SESSION_EXPIRED_ERROR);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("manda o refresh guardado para a API e troca pelo novo", async () => {
      const fetchMock = stubApi(apiResponse(AUTH_TOKENS_MOCK, { setCookie: API_REFRESH_COOKIE }));

      const response = await refresh(request("/api/modules/core/auth/refresh", { session: STORED_SESSION }));

      expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/auth/refresh`, expect.anything());
      expect(sentHeaders(fetchMock).get("cookie")).toBe(STORED_SESSION);
      expect(response.cookies.get(SESSION_COOKIE_NAME)?.value).toBe("ecomtrack_refresh=refresh-novo");
    });

    it("apaga a sessão quando a API recusa o refresh", async () => {
      stubApi(apiResponse(SESSION_EXPIRED_ERROR, { status: HTTP_STATUS.unauthorized }));

      const response = await refresh(request("/api/modules/core/auth/refresh", { session: STORED_SESSION }));

      expect(response.status).toBe(HTTP_STATUS.unauthorized);
      expect(response.cookies.get(SESSION_COOKIE_NAME)?.value).toBe("");
    });
  });

  describe("logout", () => {
    it("encerra a sessão na API e apaga o cookie", async () => {
      const fetchMock = stubApi(apiResponse(null, { status: HTTP_STATUS.noContent }));

      const response = await logout(request("/api/modules/core/auth/logout", { session: STORED_SESSION }));

      expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/auth/logout`, expect.anything());
      expect(sentHeaders(fetchMock).get("cookie")).toBe(STORED_SESSION);
      expect(response.status).toBe(HTTP_STATUS.noContent);
      expect(response.cookies.get(SESSION_COOKIE_NAME)?.value).toBe("");
    });

    it("sem sessão só apaga o cookie", async () => {
      const fetchMock = stubApi(apiResponse(null, { status: HTTP_STATUS.noContent }));

      const response = await logout(request("/api/modules/core/auth/logout"));

      expect(fetchMock).not.toHaveBeenCalled();
      expect(response.status).toBe(HTTP_STATUS.noContent);
    });
  });
});
