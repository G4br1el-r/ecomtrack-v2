import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";

import { AcceptInvite } from ".";

const replace = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }) }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const INVITE = {
  firstName: "Ana",
  lastName: "Souza",
  email: "ana@empresa.com",
  companyName: "Games Brasil",
  expiresAt: "2026-10-10T15:00:00Z",
};

function renderInvite(...replies: Response[]) {
  const fetchMock = vi.fn((_url: string, _init?: RequestInit) => Promise.resolve(replies.shift() ?? new Response()));
  vi.stubGlobal("fetch", fetchMock);
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <AcceptInvite token="convite-123" />
    </QueryClientProvider>,
  );
  return fetchMock;
}

describe("AcceptInvite", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("cumprimenta o convidado e cria a senha", async () => {
    const fetchMock = renderInvite(Response.json(INVITE), new Response(null, { status: HTTP_STATUS.noContent }));

    expect(await screen.findByText("Ana")).toBeInTheDocument();
    expect(screen.getByText("Games Brasil")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toHaveValue(INVITE.email);

    await userEvent.type(screen.getByLabelText("Nova senha"), "SenhaNova2026");
    await userEvent.type(screen.getByLabelText("Repita a nova senha"), "SenhaNova2026");
    await userEvent.click(screen.getByRole("button", { name: "Criar senha e entrar" }));

    await vi.waitFor(() => expect(replace).toHaveBeenCalledWith("/login"));
    expect(fetchMock.mock.calls[0][0]).toBe("/api/modules/core/ecomtrack/auth/invites/convite-123");
    expect(fetchMock.mock.calls[1][1]?.body).toBe(JSON.stringify({ token: "convite-123", password: "SenhaNova2026" }));
  });

  it("explica quando o convite venceu", async () => {
    renderInvite(Response.json({ code: "AUT07", message: "Link inválido." }, { status: HTTP_STATUS.badRequest }));

    expect(await screen.findByText(/Este convite venceu ou já foi usado/)).toBeInTheDocument();
  });
});
