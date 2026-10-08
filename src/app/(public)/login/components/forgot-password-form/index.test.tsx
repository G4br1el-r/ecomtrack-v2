import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ForgotPasswordForm } from ".";

const ACCEPTED = 202;
const onBack = vi.fn();

function renderForm() {
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { mutations: { retry: false } } })}>
      <ForgotPasswordForm defaultEmail="" onBack={onBack} />
    </QueryClientProvider>,
  );
}

describe("ForgotPasswordForm", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("valida o e-mail antes de enviar", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderForm();

    await userEvent.click(screen.getByRole("button", { name: "Enviar link" }));

    expect(await screen.findByText("Informe o e-mail.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("envia o pedido e mostra sempre a mesma mensagem", async () => {
    const fetchMock = vi.fn((_url: string, _init?: RequestInit) =>
      Promise.resolve(new Response(null, { status: ACCEPTED })),
    );
    vi.stubGlobal("fetch", fetchMock);
    renderForm();

    await userEvent.type(screen.getByLabelText("E-mail"), "ana@empresa.com");
    await userEvent.click(screen.getByRole("button", { name: "Enviar link" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Se ana@empresa.com estiver cadastrado");
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/modules/core/ecomtrack/auth/password/forgot");
    expect(init?.body).toBe(JSON.stringify({ email: "ana@empresa.com" }));

    await userEvent.click(screen.getByRole("button", { name: "Voltar para o login" }));
    expect(onBack).toHaveBeenCalled();
  });
});
