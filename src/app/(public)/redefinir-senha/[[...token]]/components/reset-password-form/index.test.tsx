import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";

import { ResetPasswordForm } from ".";

const replace = vi.fn();
const toastSuccess = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }) }));
vi.mock("sonner", () => ({ toast: { success: (...args: unknown[]) => toastSuccess(...args), error: vi.fn() } }));

const STRONG_PASSWORD = "NovaSenha2026";

function renderForm(reply: Response) {
  const fetchMock = vi.fn((_url: string, _init?: RequestInit) => Promise.resolve(reply));
  vi.stubGlobal("fetch", fetchMock);
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { mutations: { retry: false } } })}>
      <ResetPasswordForm token="token-do-link" />
    </QueryClientProvider>,
  );
  return fetchMock;
}

async function fillPasswords(password: string, confirm = password) {
  await userEvent.type(screen.getByLabelText("Nova senha"), password);
  await userEvent.type(screen.getByLabelText("Repita a nova senha"), confirm);
  await userEvent.click(screen.getByRole("button", { name: "Salvar nova senha" }));
}

describe("ResetPasswordForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("aplica a política de senha e confere a repetição", async () => {
    const fetchMock = renderForm(new Response(null, { status: HTTP_STATUS.noContent }));

    await fillPasswords("curta1");
    expect(await screen.findByText("Use pelo menos 10 caracteres.")).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText("Nova senha"));
    await userEvent.clear(screen.getByLabelText("Repita a nova senha"));
    await fillPasswords(STRONG_PASSWORD, "OutraSenha2026");
    expect(await screen.findByText("As senhas não são iguais.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("salva a nova senha e volta para o login", async () => {
    const fetchMock = renderForm(new Response(null, { status: HTTP_STATUS.noContent }));

    await fillPasswords(STRONG_PASSWORD);

    await vi.waitFor(() => expect(replace).toHaveBeenCalledWith("/login"));
    expect(fetchMock.mock.calls[0][1]?.body).toBe(
      JSON.stringify({ token: "token-do-link", password: STRONG_PASSWORD }),
    );
    expect(toastSuccess).toHaveBeenCalledWith("Senha alterada", expect.anything());
  });

  it("explica quando o link venceu", async () => {
    renderForm(Response.json({ code: "AUT07", message: "Link inválido." }, { status: HTTP_STATUS.badRequest }));

    await fillPasswords(STRONG_PASSWORD);

    expect(await screen.findByText(/já foi usado ou venceu/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Pedir novo link" })).toHaveAttribute("href", "/esqueci-senha");
  });
});
