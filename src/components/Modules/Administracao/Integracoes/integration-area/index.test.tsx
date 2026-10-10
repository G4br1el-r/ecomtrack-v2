import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionGlobalConfig } from "motion/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { ownerPagePermissionsMock } from "@/mocks/Modules/Core/Access/owner-page-permissions";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useIntegrationPanelStore } from "@/store/Modules/Administracao/Integracoes/integration-panel-store";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";
import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";
import { useCompanyContextStore } from "@/store/Modules/Core/Shell/company-context-store";
import { IntegrationArea } from ".";

const toastSuccess = vi.fn();

vi.mock("sonner", () => ({ toast: { success: (...args: unknown[]) => toastSuccess(...args), error: vi.fn() } }));

const PROVIDER = {
  id: "prov-1",
  code: "nuvemshop",
  name: "Nuvemshop",
  description: "Loja virtual",
  kind: "Ecommerce",
  allowsMultiple: true,
  allowsPlatformDefault: false,
  fields: [
    { name: "storeUrl", label: "Endereço da loja", type: "url", required: true },
    { name: "apiKey", label: "Chave da API", type: "secret", required: true, isSecret: true },
  ],
};
const CONNECTION = {
  id: "int-1",
  providerId: "prov-1",
  providerCode: "nuvemshop",
  providerName: "Nuvemshop",
  kind: "Ecommerce",
  name: "Loja principal",
  isActive: true,
  isPlatform: false,
  values: { storeUrl: "https://loja.com.br", apiKey: "ab****9f" },
  updatedAt: "2026-10-01T10:00:00Z",
};
const PAGE = { page: 1, pageSize: 10, totalPages: 1, hasPreviousPage: false, hasNextPage: false };

type Call = { method: string; path: string; body: unknown };

function stubApi(providers: unknown[] = [PROVIDER]) {
  const calls: Call[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn((input: string, init?: RequestInit) => {
      const path = new URL(input, "http://localhost").pathname.replace("/api/modules/core/ecomtrack", "");
      const permissionsMatch = path.match(/^\/permissions\/([^/]+)\/components$/);
      if (permissionsMatch) return Promise.resolve(Response.json(ownerPagePermissionsMock(permissionsMatch[1])));
      const method = init?.method ?? "GET";
      calls.push({ method, path, body: init?.body ? JSON.parse(String(init.body)) : null });
      if (path === "/integrations/ecommerce/providers") return Promise.resolve(Response.json(providers));
      if (path === "/integrations/ecommerce/int-1" && method === "GET") {
        return Promise.resolve(Response.json({ ...CONNECTION, name: "Loja atualizada" }));
      }
      if (path === "/integrations/ecommerce" && method === "GET") {
        return Promise.resolve(
          Response.json({ ...PAGE, items: [CONNECTION], totalCount: 1, metadata: { active: 1, inactive: 0 } }),
        );
      }
      if (method === "POST" || method === "PUT") {
        const body = JSON.parse(String(init?.body));
        return Promise.resolve(
          Response.json({ ...CONNECTION, name: body.name ?? CONNECTION.name, isActive: body.isActive }),
        );
      }
      return Promise.resolve(new Response(null, { status: HTTP_STATUS.noContent }));
    }),
  );
  return calls;
}

function renderArea() {
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <IntegrationArea area="ecommerce" />
    </QueryClientProvider>,
  );
}

describe("IntegrationArea", () => {
  beforeAll(() => {
    MotionGlobalConfig.skipAnimations = true;
  });
  afterAll(() => {
    MotionGlobalConfig.skipAnimations = false;
  });

  beforeEach(() => {
    useSessionStore.getState().setSession(AUTH_TOKENS_MOCK);
    useCompanyContextStore.getState().setCompany({ id: "c-1", name: "Loja Teste" });
    useDataTablePreferencesStore.setState({ tables: {} });
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
    useCompanyContextStore.getState().setCompany(null);
    useIntegrationPanelStore.setState({ panel: null, isOpen: false });
  });

  it("avisa quando a plataforma ainda não liberou provedores", async () => {
    stubApi([]);
    renderArea();

    expect(await screen.findByText("Nenhum provedor disponível")).toBeInTheDocument();
  });

  it("mostra o provedor, a conexão e conecta uma loja nova validando os campos", async () => {
    const calls = stubApi();
    renderArea();

    expect(await screen.findByText("Loja principal")).toBeInTheDocument();
    expect(screen.getByText("1 conectada(s)")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText("Seu perfil não tem permissão para esta ação.")).not.toBeInTheDocument(),
    );

    await userEvent.click(screen.getByRole("button", { name: "Conectar outra" }));
    const sheet = await screen.findByRole("dialog");
    await userEvent.click(within(sheet).getByRole("button", { name: "Conectar" }));
    expect(await within(sheet).findByText("Informe Endereço da loja.")).toBeInTheDocument();

    await userEvent.type(within(sheet).getByLabelText("Nome da conexão"), "Outlet");
    await userEvent.type(within(sheet).getByLabelText("Endereço da loja"), "https://outlet.com.br");
    await userEvent.type(within(sheet).getByLabelText("Chave da API"), "chave-secreta");
    await userEvent.click(within(sheet).getByRole("button", { name: "Conectar" }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Conexão criada", expect.anything()));
    expect(calls.find((call) => call.method === "POST")?.body).toEqual({
      providerId: "prov-1",
      name: "Outlet",
      isActive: true,
      values: { storeUrl: "https://outlet.com.br", apiKey: "chave-secreta" },
    });
  });

  it("pausa uma conexão sem reenviar as credenciais e permite desfazer", async () => {
    const calls = stubApi();
    renderArea();
    await waitFor(() =>
      expect(screen.queryByText("Seu perfil não tem permissão para esta ação.")).not.toBeInTheDocument(),
    );

    await userEvent.click(await screen.findByRole("button", { name: "Ações da conexão Nuvemshop · Loja principal" }));
    await userEvent.click(await screen.findByRole("menuitem", { name: "Pausar" }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Conexão pausada", expect.anything()));
    expect(calls.find((call) => call.method === "PUT")).toMatchObject({
      path: "/integrations/ecommerce/int-1",
      body: { name: null, isActive: false, values: {} },
    });
  });

  it("abre a edição com a conexão atual buscada na API", async () => {
    const calls = stubApi();
    renderArea();

    await userEvent.click(await screen.findByRole("button", { name: "Ações da conexão Nuvemshop · Loja principal" }));
    await userEvent.click(await screen.findByRole("menuitem", { name: "Editar" }));

    expect(await screen.findByLabelText("Nome da conexão")).toHaveValue("Loja atualizada");
    expect(calls.some((call) => call.method === "GET" && call.path === "/integrations/ecommerce/int-1")).toBe(true);
  });
});
