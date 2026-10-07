import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MotionGlobalConfig } from "motion/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import { AUDIT_LOGS_MOCK } from "@/mocks/Modules/Administracao/Auditoria/audit-logs";
import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { useAuditDetailStore } from "@/store/Modules/Administracao/Auditoria/audit-detail-store";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";
import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";

import { AuditWorkspace } from ".";

const PAGE = { page: 1, pageSize: 10, totalPages: 1, hasPreviousPage: false, hasNextPage: false };

function stubApi() {
  const searches: URLSearchParams[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn((input: string) => {
      const url = new URL(input, "http://localhost");
      const path = url.pathname.replace("/api/modules/core/ecomtrack", "");
      if (path === "/audit-logs") {
        searches.push(url.searchParams);
        return Promise.resolve(
          Response.json({
            ...PAGE,
            items: AUDIT_LOGS_MOCK,
            totalCount: 2,
            metadata: { creates: 0, updates: 1, deletes: 0, others: 1 },
          }),
        );
      }
      return Promise.resolve(
        Response.json({
          summary: AUDIT_LOGS_MOCK[0],
          oldValues: { Name: "Vendas" },
          newValues: { Name: "Comercial" },
          ip: "10.0.0.1",
          userAgent: "Chrome",
          correlationId: "req-123",
        }),
      );
    }),
  );
  return searches;
}

function renderWorkspace() {
  render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <AuditWorkspace />
    </QueryClientProvider>,
  );
}

describe("AuditWorkspace", () => {
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
    useSessionStore.getState().clearSession();
    useAuditDetailStore.setState({ logId: null, isOpen: false });
  });

  it("lista os registros, resume por tipo e filtra pelo tipo na API", async () => {
    const searches = stubApi();
    renderWorkspace();

    expect(await screen.findByText("Editou perfil 'Vendas'")).toBeInTheDocument();
    expect(screen.getByText("0 criações · 1 edições · 0 exclusões · 1 outros")).toBeInTheDocument();
    expect(screen.getByText("Sistema")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("combobox", { name: "Tipo de registro" }));
    await userEvent.click(await screen.findByRole("option", { name: "Login" }));

    await waitFor(() => expect(searches.some((search) => search.get("Type") === "Login")).toBe(true));
  });

  it("abre o detalhe com o antes e depois", async () => {
    stubApi();
    renderWorkspace();

    await userEvent.click(await screen.findByRole("button", { name: "Ver detalhe: Editou perfil 'Vendas'" }));
    const sheet = await screen.findByRole("dialog");

    expect(await within(sheet).findByText("Vendas")).toBeInTheDocument();
    expect(within(sheet).getByText("Comercial")).toBeInTheDocument();
    expect(within(sheet).getByText("req-123")).toBeInTheDocument();
  });
});
