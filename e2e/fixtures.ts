import { existsSync } from "node:fs";

import { type APIResponse, type BrowserContext, test as base, type Page } from "@playwright/test";
import { PLATFORM_ONLY_PAGE_CODES } from "../src/constants/Modules/Core/Access/access";
import {
  API_PAGE_SIZE,
  API_PROXY,
  AUTH_BFF,
  COMPANY_CONTEXT_STORAGE_KEY,
  E2E_BASE_URL,
  E2E_COMPANY_NAME,
  E2E_PLAN_NAME,
  E2E_STATE_FILE,
} from "./constants";
import { bffRequest } from "./support/bff-request";
import { instrumentContext } from "./support/instrument-context";

type Company = { id: string; name: string; status: string; planId: string };
type Plan = { id: string; name: string };
type PlanDetail = Plan & { pages: string[] };
type CatalogPage = { code: string; components: { code: string }[] };
type Method = "GET" | "POST" | "PUT" | "DELETE";

export type OwnerApi = {
  call: (method: Method, path: string, options?: { body?: unknown; companyId?: string }) => Promise<APIResponse>;
  get: <T>(path: string, companyId?: string) => Promise<T>;
  send: <T>(method: Exclude<Method, "GET">, path: string, body?: unknown, companyId?: string) => Promise<T>;
};

type WorkerFixtures = { ownerContext: BrowserContext; ownerApi: OwnerApi; e2eCompany: Company };
type TestFixtures = { page: Page; anonymous: BrowserContext; trackTest: undefined };

const ACCESS_TOKEN_REUSE_MS = 600_000;

let currentTest = "preparo";

async function readJson<T>(response: APIResponse): Promise<T> {
  const text = await response.text();
  if (!response.ok()) throw new Error(`${response.url()} respondeu ${response.status()}: ${text}`);
  return (text ? JSON.parse(text) : null) as T;
}

export const test = base.extend<TestFixtures, WorkerFixtures>({
  trackTest: [
    async ({ browserName: _browserName }, use, testInfo) => {
      currentTest = testInfo.titlePath.slice(1).join(" › ");
      await use(undefined);
    },
    { auto: true },
  ],

  ownerContext: [
    async ({ browser }, use) => {
      if (!existsSync(E2E_STATE_FILE)) throw new Error("Sem sessão do E2E. Rode pnpm e2e:login.");
      const context = await browser.newContext({
        storageState: E2E_STATE_FILE,
        baseURL: E2E_BASE_URL,
        locale: "pt-BR",
        timezoneId: "America/Sao_Paulo",
      });
      await instrumentContext(context, () => currentTest);
      await use(context);
      await context.storageState({ path: E2E_STATE_FILE });
      await context.close();
    },
    { scope: "worker" },
  ],

  ownerApi: [
    async ({ ownerContext }, use) => {
      let token: { value: string; at: number } | null = null;
      const accessToken = async () => {
        if (token && Date.now() - token.at < ACCESS_TOKEN_REUSE_MS) return token.value;
        const response = await bffRequest(ownerContext.request, "POST", `${AUTH_BFF}/refresh`, { test: currentTest });
        token = { value: (await readJson<{ accessToken: string }>(response)).accessToken, at: Date.now() };
        await ownerContext.storageState({ path: E2E_STATE_FILE });
        return token.value;
      };
      const call: OwnerApi["call"] = async (method, path, options = {}) =>
        bffRequest(ownerContext.request, method, `${API_PROXY}${path}`, {
          data: options.body,
          headers: {
            Authorization: `Bearer ${await accessToken()}`,
            ...(options.companyId ? { "X-Company-Id": options.companyId } : {}),
          },
          test: currentTest,
        });
      await use({
        call,
        get: async (path, companyId) => readJson(await call("GET", path, { companyId })),
        send: async (method, path, body, companyId) => readJson(await call(method, path, { body, companyId })),
      });
    },
    { scope: "worker" },
  ],

  e2eCompany: [
    async ({ ownerApi }, use) => {
      const search = encodeURIComponent(E2E_COMPANY_NAME);
      const found = await ownerApi.get<{ items: Company[] }>(`/companies?Search=${search}&PageSize=${API_PAGE_SIZE}`);
      let company = found.items.find((item) => item.name === E2E_COMPANY_NAME);
      if (!company) {
        const plans = await ownerApi.get<{ items: Plan[] }>(`/plans?PageSize=${API_PAGE_SIZE}`);
        const plan =
          plans.items.find((item) => item.name === E2E_PLAN_NAME) ??
          (await ownerApi.send<Plan>("POST", "/plans", { name: E2E_PLAN_NAME, description: "Plano dos testes E2E." }));
        company = await ownerApi.send<Company>("POST", "/companies", { name: E2E_COMPANY_NAME, planId: plan.id });
      }
      const plan = await ownerApi.get<PlanDetail>(`/plans/${company.planId}`);
      if (plan.pages.length === 0) {
        const catalog = (await ownerApi.get<CatalogPage[]>("/profiles/catalog")).filter(
          (page) => !(PLATFORM_ONLY_PAGE_CODES as readonly string[]).includes(page.code),
        );
        await ownerApi.send("PUT", `/plans/${plan.id}/permissions`, {
          pages: catalog.map((page) => page.code),
          components: catalog.flatMap((page) => page.components.map((component) => component.code)),
        });
      }
      if (company.status === "Suspended") await ownerApi.send("POST", `/companies/${company.id}/activate`);
      await use(company);
    },
    { scope: "worker" },
  ],

  page: async ({ ownerContext, e2eCompany }, use) => {
    const page = await ownerContext.newPage();
    await page.addInitScript(
      ([key, value]) => window.localStorage.setItem(key, value),
      [
        COMPANY_CONTEXT_STORAGE_KEY,
        JSON.stringify({ state: { company: { id: e2eCompany.id, name: e2eCompany.name } }, version: 0 }),
      ],
    );
    await use(page);
    await page.close();
  },

  anonymous: async ({ browser }, use) => {
    const context = await browser.newContext({
      baseURL: E2E_BASE_URL,
      locale: "pt-BR",
      timezoneId: "America/Sao_Paulo",
    });
    await instrumentContext(context, () => currentTest);
    await use(context);
    await context.close();
  },
});

export { expect } from "@playwright/test";
