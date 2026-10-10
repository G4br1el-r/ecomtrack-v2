import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionGlobalConfig } from "motion/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { INVITES_MOCK } from "@/mocks/Modules/Administracao/Usuarios/invites";
import { PROFILES_MOCK } from "@/mocks/Modules/Administracao/Usuarios/profiles";
import { USERS_MOCK } from "@/mocks/Modules/Administracao/Usuarios/users";
import { ownerPagePermissionsMock } from "@/mocks/Modules/Core/Access/owner-page-permissions";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useUsersPanelStore } from "@/store/Modules/Administracao/Usuarios/users-panel-store";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";
import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";
import { UsersWorkspace } from ".";

const toastSuccess = vi.fn();

vi.mock("sonner", () => ({ toast: { success: (...args: unknown[]) => toastSuccess(...args), error: vi.fn() } }));

const PAGE_INFO = { page: 1, pageSize: 10, totalPages: 1, hasPreviousPage: false, hasNextPage: false };
const CATALOG = [
  {
    code: "usuarios",
    name: "Usuários",
    description: null,
    icon: null,
    sectionName: "Administração",
    sortOrder: 1,
    components: [{ code: "usuarios.verlogs", name: "Ver logs", description: null, icon: null }],
  },
];

type Call = { method: string; path: string; search: URLSearchParams; body: unknown };

function stubApi() {
  const calls: Call[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn((input: string, init?: RequestInit) => {
      const url = new URL(input, "http://localhost");
      const path = url.pathname.replace("/api/modules/core/ecomtrack", "");
      const permissionsMatch = path.match(/^\/permissions\/([^/]+)\/components$/);
      if (permissionsMatch) return Promise.resolve(Response.json(ownerPagePermissionsMock(permissionsMatch[1])));
      const method = init?.method ?? "GET";
      calls.push({ method, path, search: url.searchParams, body: init?.body ? JSON.parse(String(init.body)) : null });
      const reply = (body: unknown) => Promise.resolve(Response.json(body));
      if (path === "/users/u-1" && method === "GET") return reply({ ...USERS_MOCK[0], firstName: "Ana Paula" });
      if (path === "/users/u-1" && method === "PUT")
        return reply({ ...USERS_MOCK[0], ...(init?.body ? JSON.parse(String(init.body)) : {}) });
      if (path === "/users" && method === "GET") {
        return reply({
          ...PAGE_INFO,
          items: USERS_MOCK,
          totalCount: 2,
          metadata: { active: 1, invited: 0, inactive: 1 },
        });
      }
      if (path === "/users/invites" && method === "GET") {
        return reply({
          ...PAGE_INFO,
          items: INVITES_MOCK,
          totalCount: 2,
          metadata: { pending: 1, expired: 1, accepted: 0 },
        });
      }
      if (path === "/users/invites" && method === "POST")
        return reply({ ...INVITES_MOCK[0], email: "eva@empresa.com" });
      if (path === "/profiles" && method === "GET") {
        return reply({ ...PAGE_INFO, items: PROFILES_MOCK, totalCount: 2, metadata: { assignedUsers: 1 } });
      }
      if (path === "/profiles/catalog") return reply(CATALOG);
      if (path === "/profiles/p-2" && method === "GET") {
        return reply({ ...PROFILES_MOCK[1], pages: [], components: [] });
      }
      if (path === "/profiles/p-2/permissions") {
        return reply({ ...PROFILES_MOCK[1], version: 2, pages: ["usuarios"], components: ["usuarios.verlogs"] });
      }
      return Promise.resolve(new Response(null, { status: HTTP_STATUS.noContent }));
    }),
  );
  return calls;
}

function renderWorkspace() {
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <UsersWorkspace />
    </QueryClientProvider>,
  );
}

describe("UsersWorkspace", () => {
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
    useUsersPanelStore.setState({ panel: null, isOpen: false });
  });

  it("lista os usuários com as contagens e filtra por situação na API", async () => {
    const calls = stubApi();
    renderWorkspace();

    expect(await screen.findByText("Ana Souza")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Todos (2)" })).toBeInTheDocument();
    expect(screen.getByText("Nunca entrou")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("radio", { name: "Inativos (1)" }));

    await waitFor(() =>
      expect(calls.some((call) => call.path === "/users" && call.search.get("Status") === "Inactive")).toBe(true),
    );
  });

  it("convida com o perfil padrão já escolhido", async () => {
    const calls = stubApi();
    renderWorkspace();

    await waitFor(() =>
      expect(screen.queryByText("Seu perfil não tem permissão para esta ação.")).not.toBeInTheDocument(),
    );
    await userEvent.click(screen.getByRole("button", { name: "Convidar usuário" }));
    const dialog = await screen.findByRole("dialog");
    await userEvent.type(await within(dialog).findByLabelText("Nome"), "Eva");
    await userEvent.type(within(dialog).getByLabelText("Sobrenome"), "Prado");
    await userEvent.type(within(dialog).getByLabelText("E-mail"), "eva@empresa.com");
    await userEvent.click(within(dialog).getByRole("button", { name: "Enviar convite" }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Convite enviado", expect.anything()));
    expect(calls.find((call) => call.method === "POST" && call.path === "/users/invites")?.body).toEqual({
      firstName: "Eva",
      lastName: "Prado",
      email: "eva@empresa.com",
      profileId: "p-1",
    });
  });

  it("desativa um usuário e permite desfazer", async () => {
    const calls = stubApi();
    renderWorkspace();

    await userEvent.click(await screen.findByRole("button", { name: "Ações de Ana Souza" }));
    await userEvent.click(await screen.findByRole("menuitem", { name: "Desativar" }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Usuário desativado", expect.anything()));
    expect(calls.some((call) => call.method === "POST" && call.path === "/users/u-1/deactivate")).toBe(true);

    const [, options] = toastSuccess.mock.calls[0] as [string, { action: { onClick: () => void } }];
    options.action.onClick();
    await waitFor(() =>
      expect(calls.some((call) => call.method === "POST" && call.path === "/users/u-1/activate")).toBe(true),
    );
  });

  it("edita o usuário a partir do cadastro atual buscado na API", async () => {
    const calls = stubApi();
    renderWorkspace();

    await userEvent.click(await screen.findByRole("button", { name: "Ações de Ana Souza" }));
    await userEvent.click(await screen.findByRole("menuitem", { name: "Editar" }));

    const firstName = await screen.findByRole("textbox", { name: "Nome" });
    expect(firstName).toHaveValue("Ana Paula");
    await userEvent.clear(firstName);
    await userEvent.type(firstName, "Ana Maria");
    await userEvent.click(screen.getByRole("button", { name: "Salvar" }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Usuário atualizado", expect.anything()));
    expect(calls.some((call) => call.method === "GET" && call.path === "/users/u-1")).toBe(true);
    expect(calls.find((call) => call.method === "PUT" && call.path === "/users/u-1")?.body).toMatchObject({
      firstName: "Ana Maria",
    });
  });

  it("salva as permissões de um perfil", async () => {
    const calls = stubApi();
    renderWorkspace();

    await userEvent.click(await screen.findByRole("tab", { name: "Perfis" }));
    await userEvent.click(await screen.findByRole("button", { name: "Ações do perfil Compras" }));
    await userEvent.click(await screen.findByRole("menuitem", { name: "Permissões" }));

    await userEvent.click(await screen.findByRole("checkbox", { name: "Usuários" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Ver logs" }));
    await userEvent.click(screen.getByRole("button", { name: "Salvar permissões" }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Permissões salvas", expect.anything()));
    expect(calls.find((call) => call.method === "PUT" && call.path === "/profiles/p-2/permissions")?.body).toEqual({
      version: 1,
      pages: ["usuarios"],
      components: ["usuarios.verlogs"],
    });
  });
});
