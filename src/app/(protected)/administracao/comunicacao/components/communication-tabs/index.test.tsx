import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionGlobalConfig } from "motion/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { COMMUNICATION_MOCK, INVITE_NOTIFICATION_MOCK } from "@/mocks/Modules/Administracao/Comunicacao/communication";
import { ownerPagePermissionsMock } from "@/mocks/Modules/Core/Access/owner-page-permissions";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useNotificationEditorStore } from "@/store/Modules/Administracao/Comunicacao/notification-editor-store";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";
import { CommunicationTabs } from ".";

const toastSuccess = vi.fn();
const CURSOR_BEFORE_CLOSING_TAG = "<p>Olá ".length;

vi.mock("sonner", () => ({ toast: { success: (...args: unknown[]) => toastSuccess(...args), error: vi.fn() } }));

type Call = { method: string; path: string; body: { contentHtml?: string } | null };

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
      calls.push({ method, path, body });
      const reply = (value: unknown) => Promise.resolve(Response.json(value));
      if (path === "/communication") return reply(COMMUNICATION_MOCK);
      if (path.endsWith("/preview")) return reply({ subject: body.subject, html: `<html>${body.contentHtml}</html>` });
      if (path.endsWith("/status")) return reply({ ...INVITE_NOTIFICATION_MOCK, isEnabled: body.isEnabled });
      if (path === "/communication/notifications/users.invite") {
        return reply(method === "PUT" ? { ...INVITE_NOTIFICATION_MOCK, ...body } : INVITE_NOTIFICATION_MOCK);
      }
      return reply({});
    }),
  );
  return calls;
}

function renderTabs() {
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <CommunicationTabs />
    </QueryClientProvider>,
  );
}

describe("CommunicationTabs", () => {
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
    useNotificationEditorStore.setState({ notification: null, isOpen: false });
  });

  it("não deixa desligar e-mail de segurança e desliga os outros", async () => {
    const calls = stubApi();
    renderTabs();

    expect(await screen.findByRole("switch", { name: "Desligar Código de login" })).toBeDisabled();
    await waitFor(() => expect(screen.getByRole("switch", { name: "Desligar Convite de usuário" })).toBeEnabled());
    await userEvent.click(screen.getByRole("switch", { name: "Desligar Convite de usuário" }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("E-mail desligado", expect.anything()));
    expect(calls.find((call) => call.path.endsWith("/status"))?.body).toEqual({ isEnabled: false });
  });

  it("edita o e-mail inserindo variável, atualiza a prévia e salva", async () => {
    const calls = stubApi();
    renderTabs();

    await userEvent.click(await screen.findByRole("button", { name: "Editar Convite de usuário" }));
    const sheet = await screen.findByRole("dialog");
    const content = (await within(sheet).findByLabelText("Conteúdo (HTML)")) as HTMLTextAreaElement;
    expect(content).toHaveValue("<p>Olá </p>");
    expect(await within(sheet).findByTitle("Prévia do e-mail")).toBeInTheDocument();

    content.focus();
    content.setSelectionRange(CURSOR_BEFORE_CLOSING_TAG, CURSOR_BEFORE_CLOSING_TAG);
    await userEvent.click(within(sheet).getByRole("button", { name: "nome" }));
    expect(content).toHaveValue("<p>Olá {{nome}}</p>");

    await userEvent.click(within(sheet).getByRole("button", { name: "Atualizar prévia" }));
    await waitFor(() =>
      expect(
        calls.some((call) => call.path.endsWith("/preview") && call.body?.contentHtml === "<p>Olá {{nome}}</p>"),
      ).toBe(true),
    );

    await waitFor(() =>
      expect(screen.queryByText("Seu perfil não tem permissão para esta ação.")).not.toBeInTheDocument(),
    );
    await userEvent.click(within(sheet).getByRole("button", { name: "Salvar" }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("E-mail salvo", expect.anything()));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(calls.find((call) => call.method === "PUT" && call.path.endsWith("users.invite"))?.body).toEqual({
      subject: "Você foi convidado",
      contentHtml: "<p>Olá {{nome}}</p>",
    });
  });
});
