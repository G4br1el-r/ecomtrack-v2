import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionGlobalConfig } from "motion/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import type { LoginEntryStepName } from "@/@types/Modules/Core/Auth/login";
import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { AUTH_BFF_ROUTES } from "@/constants/Modules/Core/Auth/auth";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { LOGIN_CHALLENGE_MOCK } from "@/mocks/Modules/Core/Auth/login-challenge";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

import { LoginFlow } from ".";

const replace = vi.fn();
const toastSuccess = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }) }));
vi.mock("sonner", () => ({ toast: { success: (...args: unknown[]) => toastSuccess(...args), error: vi.fn() } }));

const REDIRECT_TO = "/tabela";
const TYPED_EMAIL = "gabriel@ecomtrack.com.br";
const WRONG_CODE_ERROR = { code: "AUT03", message: "Código inválido. Confira e tente de novo." };
const RESENT_CHALLENGE = { ...LOGIN_CHALLENGE_MOCK, challengeId: "desafio-novo" };

type ApiReply = { status?: number; body: unknown };

function stubBff(replies: Partial<Record<keyof typeof AUTH_BFF_ROUTES, ApiReply[]>>) {
  const fetchMock = vi.fn((url: string) => {
    const route = Object.entries(AUTH_BFF_ROUTES).find(([, path]) => path === url)?.[0] as keyof typeof AUTH_BFF_ROUTES;
    const reply = replies[route]?.shift();
    if (!reply) return Promise.reject(new Error(`Chamada inesperada: ${url}`));
    return Promise.resolve(Response.json(reply.body, { status: reply.status ?? HTTP_STATUS.ok }));
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function renderFlow(initialStep?: LoginEntryStepName) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  render(
    <QueryClientProvider client={queryClient}>
      <LoginFlow redirectTo={REDIRECT_TO} initialStep={initialStep} />
    </QueryClientProvider>,
  );
  return queryClient;
}

async function submitCredentials() {
  await userEvent.type(screen.getByLabelText("E-mail"), TYPED_EMAIL);
  await userEvent.type(screen.getByLabelText("Senha"), "senha-certa");
  await userEvent.click(screen.getByRole("button", { name: "Entrar" }));
}

function sentBody(fetchMock: ReturnType<typeof stubBff>, callIndex: number): unknown {
  const init = fetchMock.mock.calls[callIndex] as unknown as [string, RequestInit];
  return JSON.parse(String(init[1].body));
}

describe("LoginFlow", () => {
  beforeAll(() => {
    MotionGlobalConfig.skipAnimations = true;
  });
  afterAll(() => {
    MotionGlobalConfig.skipAnimations = false;
  });
  beforeEach(() => useSessionStore.getState().clearSession());
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("valida os campos antes de chamar a API", async () => {
    const fetchMock = stubBff({});
    renderFlow();

    await userEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("Informe o e-mail.")).toBeInTheDocument();
    expect(screen.getByText("Informe a senha.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("mostra o erro da API quando a senha está errada", async () => {
    stubBff({
      login: [{ status: HTTP_STATUS.unauthorized, body: { code: "AUT01", message: "E-mail ou senha inválidos." } }],
    });
    renderFlow();

    await submitCredentials();

    expect(await screen.findByText("E-mail ou senha inválidos.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Bem-vindo de volta" })).toBeInTheDocument();
  });

  it("entra com o código certo, guarda a sessão e volta para a rota pedida", async () => {
    const fetchMock = stubBff({
      login: [{ body: LOGIN_CHALLENGE_MOCK }],
      verify: [{ status: HTTP_STATUS.unauthorized, body: WRONG_CODE_ERROR }, { body: AUTH_TOKENS_MOCK }],
    });
    renderFlow();

    await submitCredentials();

    expect(await screen.findByRole("heading", { name: "Verificação em duas etapas" })).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(LOGIN_CHALLENGE_MOCK.maskedEmail.replace(/\*/g, "\\*"))),
    ).toBeInTheDocument();
    expect(sentBody(fetchMock, 0)).toEqual({ email: "gabriel@ecomtrack.com.br", password: "senha-certa" });

    const codeInput = screen.getByLabelText("Código de verificação");
    await userEvent.type(codeInput, "123");
    await userEvent.click(screen.getByRole("button", { name: "Verificar" }));
    expect(await screen.findByText("O código tem 6 dígitos.")).toBeInTheDocument();

    await userEvent.type(codeInput, "111");
    expect(await screen.findByText(WRONG_CODE_ERROR.message)).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();

    const retryInput = await screen.findByLabelText("Código de verificação");
    expect(retryInput).toHaveValue("");
    await userEvent.type(retryInput, "654321");

    expect(await screen.findByRole("status", { name: "Código confirmado. Entrando..." })).toBeInTheDocument();
    await vi.waitFor(() => expect(replace).toHaveBeenCalledWith(REDIRECT_TO));
    expect(sentBody(fetchMock, 2)).toEqual({ challengeId: LOGIN_CHALLENGE_MOCK.challengeId, code: "654321" });
    expect(useSessionStore.getState().user).toEqual(AUTH_TOKENS_MOCK.user);
  });

  it("reenvia o código e passa a usar o desafio novo", async () => {
    const fetchMock = stubBff({
      login: [{ body: LOGIN_CHALLENGE_MOCK }],
      resend: [{ body: RESENT_CHALLENGE }],
      verify: [{ body: AUTH_TOKENS_MOCK }],
    });
    renderFlow();
    await submitCredentials();

    await userEvent.click(await screen.findByRole("button", { name: "Reenviar código" }));

    await vi.waitFor(() => expect(toastSuccess).toHaveBeenCalledWith("Código reenviado", expect.anything()));
    expect(sentBody(fetchMock, 1)).toEqual({ challengeId: LOGIN_CHALLENGE_MOCK.challengeId });

    await userEvent.type(screen.getByLabelText("Código de verificação"), "654321");

    await vi.waitFor(() => expect(replace).toHaveBeenCalledWith(REDIRECT_TO));
    expect(sentBody(fetchMock, 2)).toEqual({ challengeId: RESENT_CHALLENGE.challengeId, code: "654321" });
  });

  it("volta para o e-mail e a senha", async () => {
    stubBff({ login: [{ body: LOGIN_CHALLENGE_MOCK }] });
    renderFlow();
    await submitCredentials();

    await userEvent.click(await screen.findByRole("button", { name: "Voltar" }));

    expect(await screen.findByRole("heading", { name: "Bem-vindo de volta" })).toBeInTheDocument();
    expect(await screen.findByLabelText("E-mail")).toHaveValue(TYPED_EMAIL);
  });

  it("abre o esqueci a senha no mesmo lugar levando o e-mail digitado", async () => {
    const fetchMock = stubBff({});
    renderFlow();

    await userEvent.type(screen.getByLabelText("E-mail"), TYPED_EMAIL);
    await userEvent.click(screen.getByRole("button", { name: "Esqueci minha senha" }));

    expect(await screen.findByRole("heading", { name: "Esqueci a senha" })).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toHaveValue(TYPED_EMAIL);

    await userEvent.click(screen.getByRole("button", { name: "Voltar" }));

    expect(await screen.findByRole("heading", { name: "Bem-vindo de volta" })).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toHaveValue(TYPED_EMAIL);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("começa no esqueci a senha quando a etapa vem no link", () => {
    renderFlow("forgot");

    expect(screen.getByRole("heading", { name: "Esqueci a senha" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enviar link" })).toBeInTheDocument();
  });
});
