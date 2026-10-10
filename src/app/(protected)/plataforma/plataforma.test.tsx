import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionGlobalConfig } from "motion/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { ownerPagePermissionsMock } from "@/mocks/Modules/Core/Access/owner-page-permissions";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { COMPANIES_MOCK } from "@/mocks/Modules/Plataforma/Empresas/companies";
import { PLANS_MOCK } from "@/mocks/Modules/Plataforma/Planos/plans";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";
import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";
import { useCompanyPanelStore } from "@/store/Modules/Plataforma/Empresas/company-panel-store";
import { usePlanPanelStore } from "@/store/Modules/Plataforma/Planos/plan-panel-store";
import { CompaniesWorkspace } from "./empresas/components/companies-workspace";
import { PlansWorkspace } from "./planos/components/plans-workspace";

const toastSuccess = vi.fn();

vi.mock("sonner", () => ({ toast: { success: (...args: unknown[]) => toastSuccess(...args), error: vi.fn() } }));

const PAGE = { page: 1, pageSize: 10, totalPages: 1, hasPreviousPage: false, hasNextPage: false };
const CATALOG = ["usuarios", "empresas"].map((code, index) => ({
  code,
  name: code === "usuarios" ? "Usuários" : "Empresas",
  description: null,
  icon: null,
  sectionName: "Administração",
  sortOrder: index,
  components: [],
}));

type Call = { method: string; path: string; headers: Headers; body: unknown };

function stubApi() {
  const calls: Call[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn((input: string, init?: RequestInit) => {
      const path = new URL(input, "http://localhost").pathname.replace("/api/modules/core/ecomtrack", "");
      const permissionsMatch = path.match(/^\/permissions\/([^/]+)\/components$/);
      if (permissionsMatch) return Promise.resolve(Response.json(ownerPagePermissionsMock(permissionsMatch[1])));
      const method = init?.method ?? "GET";
      const body = init?.body ? JSON.parse(String(init.body)) : null;
      calls.push({ method, path, headers: new Headers(init?.headers), body });
      const reply = (value: unknown) => Promise.resolve(Response.json(value));
      if (path === "/companies" && method === "GET") {
        return reply({ ...PAGE, items: COMPANIES_MOCK, totalCount: 2, metadata: { active: 1, suspended: 1 } });
      }
      if (path === "/companies" && method === "POST")
        return reply({ ...COMPANIES_MOCK[0], id: "nova", name: body.name });
      if (path === "/plans" && method === "GET") {
        return reply({ ...PAGE, items: PLANS_MOCK, totalCount: 2, metadata: { companies: 3 } });
      }
      if (path === "/plans/plan-2" && method === "GET") return reply({ ...PLANS_MOCK[1], pages: [], components: [] });
      if (path === "/plans/plan-2/permissions") return reply({ ...PLANS_MOCK[1], ...body });
      if (path === "/profiles/catalog") return reply(CATALOG);
      return Promise.resolve(new Response(null, { status: 204 }));
    }),
  );
  return calls;
}

function renderWith(node: React.ReactNode) {
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      {node}
    </QueryClientProvider>,
  );
}

async function waitPermissions() {
  await waitFor(() =>
    expect(screen.queryByText("Seu perfil não tem permissão para esta ação.")).not.toBeInTheDocument(),
  );
}

describe("Plataforma", () => {
  beforeAll(() => {
    MotionGlobalConfig.skipAnimations = true;
  });
  afterAll(() => {
    MotionGlobalConfig.skipAnimations = false;
  });

  beforeEach(() => {
    useSessionStore.getState().setSession(AUTH_TOKENS_MOCK);
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
    useCompanyPanelStore.setState({ company: null, isOpen: false });
    usePlanPanelStore.setState({ panel: null, isOpen: false });
  });

  it("cria uma empresa validando o documento", async () => {
    const calls = stubApi();
    renderWith(<CompaniesWorkspace />);

    expect(await screen.findByText("12.345.678/0001-90")).toBeInTheDocument();
    await waitPermissions();
    await userEvent.click(screen.getByRole("button", { name: "Nova empresa" }));
    const sheet = await screen.findByRole("dialog");
    await userEvent.type(within(sheet).getByLabelText("Nome"), "Loja Nova");
    await userEvent.type(within(sheet).getByLabelText(/CNPJ ou CPF/), "123");
    await userEvent.click(within(sheet).getByRole("combobox", { name: "Plano" }));
    await userEvent.click(await screen.findByRole("option", { name: "Completo" }));
    await userEvent.click(within(sheet).getByRole("button", { name: "Criar empresa" }));
    expect(await within(sheet).findByText("Informe um CNPJ (14 números) ou CPF (11 números).")).toBeInTheDocument();

    await userEvent.clear(within(sheet).getByLabelText(/CNPJ ou CPF/));
    await userEvent.type(within(sheet).getByLabelText(/CNPJ ou CPF/), "12.345.678/0001-90");
    await userEvent.click(within(sheet).getByRole("button", { name: "Criar empresa" }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Empresa criada", expect.anything()));
    const created = calls.find((call) => call.method === "POST" && call.path === "/companies");
    expect(created?.body).toEqual({ name: "Loja Nova", document: "12.345.678/0001-90", planId: "plan-1" });
    expect(created?.headers.get("X-Company-Id")).toBeNull();
  });

  it("suspende uma empresa depois de confirmar e permite desfazer", async () => {
    const calls = stubApi();
    renderWith(<CompaniesWorkspace />);

    await waitPermissions();
    await userEvent.click(await screen.findByRole("button", { name: "Ações da empresa Games Brasil Ltda" }));
    await userEvent.click(await screen.findByRole("menuitem", { name: "Suspender" }));
    await userEvent.click(await screen.findByRole("button", { name: "Suspender empresa" }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Empresa suspensa", expect.anything()));
    expect(calls.some((call) => call.path === `/companies/${COMPANIES_MOCK[0].id}/suspend`)).toBe(true);
  });

  it("salva as páginas do plano sem mostrar as páginas da plataforma", async () => {
    const calls = stubApi();
    renderWith(<PlansWorkspace />);

    await waitPermissions();
    await userEvent.click(await screen.findByRole("button", { name: "Ações do plano Básico" }));
    await userEvent.click(await screen.findByRole("menuitem", { name: "Permissões" }));
    await userEvent.click(await screen.findByRole("checkbox", { name: "Usuários" }));
    expect(screen.queryByRole("checkbox", { name: "Empresas" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Salvar permissões" }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Permissões do plano salvas", expect.anything()));
    expect(calls.find((call) => call.path === "/plans/plan-2/permissions")?.body).toEqual({
      pages: ["usuarios"],
      components: [],
    });
  });
});
