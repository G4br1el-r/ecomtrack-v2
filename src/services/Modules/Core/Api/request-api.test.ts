import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { COMPANY_HEADER, HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { SESSION_EXPIRED_ERROR } from "@/constants/Modules/Core/Auth/auth";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useViewAsStore } from "@/store/Modules/Core/Access/view-as-store";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";
import { useCompanyContextStore } from "@/store/Modules/Core/Shell/company-context-store";

import { requestApi } from "./request-api";

const SCHEMA = z.object({ ok: z.boolean() });
const COMPANY = { id: "empresa-1", name: "Loja Teste" };
const NEW_TOKEN = "token-novo";

type Call = [string, RequestInit];

function stubFetch(...replies: Response[]) {
  const fetchMock = vi.fn((_url: string, _init?: RequestInit) => Promise.resolve(replies.shift() ?? new Response()));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function headersOf(fetchMock: ReturnType<typeof stubFetch>, index: number) {
  return new Headers((fetchMock.mock.calls[index] as Call)[1].headers);
}

describe("requestApi", () => {
  beforeEach(() => useSessionStore.getState().setSession(AUTH_TOKENS_MOCK));
  afterEach(() => {
    vi.unstubAllGlobals();
    useSessionStore.getState().clearSession();
    useCompanyContextStore.getState().setCompany(null);
    useViewAsStore.getState().stop();
  });

  it("usa o token do visualizar como, sem empresa, e volta ao token normal quando ele vence", async () => {
    useCompanyContextStore.getState().setCompany(COMPANY);
    useViewAsStore.getState().start({
      token: "token-visualizacao",
      expiresAt: "2026-10-07T12:30:00Z",
      label: "Vendas",
      permissions: { profileId: "p1", profileName: "Vendas", version: 1, kind: "Company", pages: [], components: [] },
    });
    const fetchMock = stubFetch(
      Response.json({ ok: true }),
      Response.json({ code: "SEC01", message: "x" }, { status: HTTP_STATUS.unauthorized }),
      Response.json({ ok: true }),
    );

    await requestApi(API_ENDPOINTS.users.list, SCHEMA);
    expect(headersOf(fetchMock, 0).get("Authorization")).toBe("Bearer token-visualizacao");
    expect(headersOf(fetchMock, 0).get(COMPANY_HEADER)).toBeNull();

    await requestApi(API_ENDPOINTS.users.list, SCHEMA);
    expect(useViewAsStore.getState().session).toBeNull();
    expect(headersOf(fetchMock, 2).get("Authorization")).toBe(`Bearer ${AUTH_TOKENS_MOCK.accessToken}`);
  });

  it("chama o repasse com método, token e corpo", async () => {
    const fetchMock = stubFetch(Response.json({ ok: true }));

    const result = await requestApi(API_ENDPOINTS.users.update, SCHEMA, {
      params: { id: "u1" },
      body: { firstName: "Ana" },
    });

    expect(result).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0] as Call;
    expect(url).toBe("/api/modules/core/ecomtrack/users/u1");
    expect(init.method).toBe("PUT");
    expect(init.body).toBe(JSON.stringify({ firstName: "Ana" }));
    expect(headersOf(fetchMock, 0).get("Authorization")).toBe(`Bearer ${AUTH_TOKENS_MOCK.accessToken}`);
  });

  it("manda a empresa escolhida só quando o usuário é Owner", async () => {
    useCompanyContextStore.getState().setCompany(COMPANY);
    const fetchMock = stubFetch(Response.json({ ok: true }), Response.json({ ok: true }));

    await requestApi(API_ENDPOINTS.users.list, SCHEMA);
    useSessionStore.getState().setSession({
      ...AUTH_TOKENS_MOCK,
      user: { ...AUTH_TOKENS_MOCK.user, isPlatformOwner: false },
    });
    await requestApi(API_ENDPOINTS.users.list, SCHEMA);

    expect(headersOf(fetchMock, 0).get(COMPANY_HEADER)).toBe(COMPANY.id);
    expect(headersOf(fetchMock, 1).get(COMPANY_HEADER)).toBeNull();
  });

  it("não manda a empresa nas rotas da plataforma (empresas e planos)", async () => {
    useCompanyContextStore.getState().setCompany(COMPANY);
    const fetchMock = stubFetch(Response.json({ ok: true }), Response.json({ ok: true }));

    await requestApi(API_ENDPOINTS.plans.list, SCHEMA);
    await requestApi(API_ENDPOINTS.companies.mine, SCHEMA);

    expect(headersOf(fetchMock, 0).get(COMPANY_HEADER)).toBeNull();
    expect(headersOf(fetchMock, 1).get(COMPANY_HEADER)).toBe(COMPANY.id);
  });

  it("deixa a chamada pedir para não mandar a empresa", async () => {
    useCompanyContextStore.getState().setCompany(COMPANY);
    const fetchMock = stubFetch(Response.json({ ok: true }));

    await requestApi(API_ENDPOINTS.profiles.catalog, SCHEMA, { skipCompany: true });

    expect(headersOf(fetchMock, 0).get(COMPANY_HEADER)).toBeNull();
  });

  it("renova o token e repete a chamada quando a API responde 401", async () => {
    const fetchMock = stubFetch(
      Response.json({ code: "SEC01", message: "x" }, { status: HTTP_STATUS.unauthorized }),
      Response.json({ ...AUTH_TOKENS_MOCK, accessToken: NEW_TOKEN }),
      Response.json({ ok: true }),
    );

    expect(await requestApi(API_ENDPOINTS.users.list, SCHEMA)).toEqual({ ok: true });
    expect((fetchMock.mock.calls[1] as Call)[0]).toBe("/api/modules/core/auth/refresh");
    expect(headersOf(fetchMock, 2).get("Authorization")).toBe(`Bearer ${NEW_TOKEN}`);
  });

  it("manda para o login quando a renovação falha", async () => {
    const assign = vi.fn();
    vi.stubGlobal("location", { ...window.location, pathname: "/administracao/usuarios", assign });
    stubFetch(
      Response.json({ code: "SEC01", message: "x" }, { status: HTTP_STATUS.unauthorized }),
      Response.json(SESSION_EXPIRED_ERROR, { status: HTTP_STATUS.unauthorized }),
    );

    await expect(requestApi(API_ENDPOINTS.users.list, SCHEMA)).rejects.toThrow(SESSION_EXPIRED_ERROR.message);
    expect(assign).toHaveBeenCalledWith("/login?redirect=%2Fadministracao%2Fusuarios");
  });

  it("não tenta renovar em rota pública", async () => {
    const fetchMock = stubFetch(
      Response.json({ code: "AUT07", message: "Link inválido." }, { status: HTTP_STATUS.unauthorized }),
    );

    await expect(requestApi(API_ENDPOINTS.auth.getInvite, SCHEMA, { params: { token: "x" } })).rejects.toThrow(
      "Link inválido.",
    );
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
