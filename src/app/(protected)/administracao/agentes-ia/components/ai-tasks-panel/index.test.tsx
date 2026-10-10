import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionGlobalConfig } from "motion/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

import { AiTasksPanel } from ".";

const toastSuccess = vi.fn();
const toastError = vi.fn();

vi.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccess(...args),
    error: (...args: unknown[]) => toastError(...args),
  },
}));

const TASKS = [
  {
    key: "tags",
    name: "Tags do produto",
    description: "Sugere tags a partir do título e dos gêneros",
    defaultPrompt: "Gere tags para {titulo}",
    variables: [
      { name: "titulo", label: "Título" },
      { name: "generos", label: "Gêneros" },
    ],
  },
  {
    key: "product_info",
    name: "Informações do produto",
    description: "Título, descrição, meta tags e slug",
    defaultPrompt: "Descreva {titulo}",
    variables: [{ name: "titulo", label: "Título" }],
  },
];
const CONNECTION = {
  id: "ia-1",
  providerId: "prov-openai",
  providerCode: "openai",
  providerName: "OpenAI",
  kind: "AI",
  name: "Principal",
  isActive: true,
  isPlatform: false,
  values: { apiKey: "sk-****9f" },
  updatedAt: "2026-10-01T10:00:00Z",
};
const PAGE = { page: 1, pageSize: 100, totalPages: 1, hasPreviousPage: false, hasNextPage: false };
const SAVED_AT = "2026-10-09T10:00:00Z";

type Call = { method: string; path: string; body: unknown };

function stubApi(saved: Record<string, unknown> = {}) {
  const calls: Call[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn((input: string, init?: RequestInit) => {
      const path = decodeURIComponent(
        new URL(input, "http://localhost").pathname.replace("/api/modules/core/ecomtrack", ""),
      );
      const method = init?.method ?? "GET";
      const body = init?.body ? JSON.parse(String(init.body)) : null;
      calls.push({ method, path, body });
      if (path === "/ai/tasks") return Promise.resolve(Response.json(TASKS));
      if (path === "/auth/me/preferences") {
        return Promise.resolve(
          Response.json(Object.entries(saved).map(([key, value]) => ({ key, value, updatedAt: SAVED_AT }))),
        );
      }
      if (path === "/integrations/ai") {
        return Promise.resolve(
          Response.json({ ...PAGE, items: [CONNECTION], totalCount: 1, metadata: { active: 1, inactive: 0 } }),
        );
      }
      if (path.startsWith("/auth/me/preferences/")) {
        const key = path.replace("/auth/me/preferences/", "");
        if (method === "PUT") return Promise.resolve(Response.json({ key, value: body.value, updatedAt: SAVED_AT }));
        if (method === "DELETE") return Promise.resolve(new Response(null, { status: HTTP_STATUS.noContent }));
        return key in saved
          ? Promise.resolve(Response.json({ key, value: saved[key], updatedAt: SAVED_AT }))
          : Promise.resolve(Response.json({ code: "NFD01", message: "Não encontrado." }, { status: 404 }));
      }
      if (path === "/ai/tasks/product_info/generate") {
        return Promise.resolve(
          Response.json({
            text: '{"titulo":"Hades","slug":"hades"}',
            integrationId: "ia-1",
            providerCode: "openai",
            model: "gpt-5",
          }),
        );
      }
      return Promise.resolve(new Response(null, { status: HTTP_STATUS.noContent }));
    }),
  );
  return calls;
}

function renderPanel() {
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <AiTasksPanel />
    </QueryClientProvider>,
  );
}

describe("AiTasksPanel", () => {
  beforeAll(() => {
    MotionGlobalConfig.skipAnimations = true;
  });
  afterAll(() => {
    MotionGlobalConfig.skipAnimations = false;
  });

  beforeEach(() => {
    useSessionStore.getState().setSession(AUTH_TOKENS_MOCK);
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
  });

  it("lista as tarefas e marca as que já têm configuração salva", async () => {
    stubApi({ "ai.task.tags": { integrationId: "ia-1", model: null, prompt: null } });
    renderPanel();

    const tags = (await screen.findByText("Tags do produto")).closest("[data-slot=card]") as HTMLElement;
    const info = screen.getByText("Informações do produto").closest("[data-slot=card]") as HTMLElement;
    await waitFor(() => expect(within(tags).getByText("Configurada")).toBeInTheDocument());
    expect(within(info).getByText("Padrão")).toBeInTheDocument();
    expect(within(tags).getByText("2 variáveis")).toBeInTheDocument();
  });

  it("exige a conexão e salva a configuração da tarefa nas preferências", async () => {
    const calls = stubApi();
    renderPanel();

    const card = (await screen.findByText("Tags do produto")).closest("[data-slot=card]") as HTMLElement;
    await userEvent.click(within(card).getByRole("button", { name: "Configurar" }));
    const sheet = await screen.findByRole("dialog");
    expect(await within(sheet).findByDisplayValue("Gere tags para {titulo}")).toBeInTheDocument();
    expect(within(sheet).getByText("{titulo}")).toBeInTheDocument();

    await userEvent.click(within(sheet).getByRole("button", { name: "Salvar" }));
    expect(await within(sheet).findByText("Escolha qual IA usar nesta tarefa.")).toBeInTheDocument();

    await userEvent.click(within(sheet).getByRole("combobox", { name: "Conexão de IA" }));
    await userEvent.click(await screen.findByRole("option", { name: "OpenAI · Principal" }));
    await userEvent.type(within(sheet).getByLabelText(/Modelo/), "gpt-5");
    await userEvent.click(within(sheet).getByRole("button", { name: "Salvar" }));

    await waitFor(() =>
      expect(calls.find((call) => call.method === "PUT")).toEqual({
        method: "PUT",
        path: "/auth/me/preferences/ai.task.tags",
        body: { value: { integrationId: "ia-1", model: "gpt-5", prompt: null } },
      }),
    );
    expect(toastSuccess).toHaveBeenCalledWith("Configuração salva", { description: "Tags do produto" });
  });

  it("testa a geração com os valores do formulário e mostra os campos do JSON", async () => {
    const calls = stubApi({ "ai.task.product_info": { integrationId: "ia-1", model: "gpt-5", prompt: "Meu prompt" } });
    renderPanel();

    const card = (await screen.findByText("Informações do produto")).closest("[data-slot=card]") as HTMLElement;
    await userEvent.click(within(card).getByRole("button", { name: "Configurar" }));
    const sheet = await screen.findByRole("dialog");
    await userEvent.type(await within(sheet).findByLabelText("Título"), "Hades");
    await userEvent.click(within(sheet).getByRole("button", { name: "Gerar com IA" }));

    expect(await within(sheet).findByText("hades")).toBeInTheDocument();
    expect(calls.find((call) => call.path === "/ai/tasks/product_info/generate")?.body).toEqual({
      integrationId: "ia-1",
      model: "gpt-5",
      prompt: "Meu prompt",
      variables: { titulo: "Hades" },
    });
  });

  it("restaura o padrão apagando a preferência e permite desfazer", async () => {
    const calls = stubApi({ "ai.task.tags": { integrationId: "ia-1", model: null, prompt: "Meu prompt" } });
    renderPanel();

    const card = (await screen.findByText("Tags do produto")).closest("[data-slot=card]") as HTMLElement;
    await userEvent.click(within(card).getByRole("button", { name: "Configurar" }));
    const sheet = await screen.findByRole("dialog");
    await userEvent.click(await within(sheet).findByRole("button", { name: "Restaurar padrão" }));

    await waitFor(() =>
      expect(calls.find((call) => call.method === "DELETE")?.path).toBe("/auth/me/preferences/ai.task.tags"),
    );
    expect(toastSuccess).toHaveBeenCalledWith(
      "Configuração restaurada",
      expect.objectContaining({ action: expect.objectContaining({ label: "Desfazer" }) }),
    );
  });
});
