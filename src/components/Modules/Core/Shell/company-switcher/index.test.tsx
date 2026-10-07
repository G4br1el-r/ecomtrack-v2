import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AUTH_TOKENS_MOCK } from "@/mocks/Modules/Core/Auth/auth-tokens";
import { COMPANIES_MOCK } from "@/mocks/Modules/Plataforma/Empresas/companies";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";
import { useCompanyContextStore } from "@/store/Modules/Core/Shell/company-context-store";

import { CompanySwitcher } from ".";

const [FIRST_COMPANY] = COMPANIES_MOCK;
const PAGE = {
  metadata: { active: 1, suspended: 1 },
  page: 1,
  pageSize: 100,
  totalCount: 2,
  totalPages: 1,
  hasPreviousPage: false,
  hasNextPage: false,
};

function stubApi() {
  const fetchMock = vi.fn((url: string) =>
    Promise.resolve(
      url.includes("/companies/me") ? Response.json(FIRST_COMPANY) : Response.json({ ...PAGE, items: COMPANIES_MOCK }),
    ),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function renderSwitcher(isPlatformOwner: boolean) {
  useSessionStore.getState().setSession({
    ...AUTH_TOKENS_MOCK,
    user: { ...AUTH_TOKENS_MOCK.user, isPlatformOwner, companyId: isPlatformOwner ? null : FIRST_COMPANY.id },
  });
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={queryClient}>
      <CompanySwitcher />
    </QueryClientProvider>,
  );
}

describe("CompanySwitcher", () => {
  beforeEach(() => {
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
    useCompanyContextStore.getState().setCompany(null);
  });

  it("o Owner começa na plataforma e escolhe uma empresa", async () => {
    stubApi();
    renderSwitcher(true);

    const trigger = screen.getByRole("combobox", { name: "Empresa em uso" });
    expect(trigger).toHaveTextContent("Plataforma");

    await userEvent.click(trigger);
    await userEvent.click(await screen.findByRole("option", { name: FIRST_COMPANY.name }));

    expect(useCompanyContextStore.getState().company).toEqual({ id: FIRST_COMPANY.id, name: FIRST_COMPANY.name });
  });

  it("o Owner volta para a plataforma", async () => {
    stubApi();
    useCompanyContextStore.getState().setCompany({ id: FIRST_COMPANY.id, name: FIRST_COMPANY.name });
    renderSwitcher(true);

    await userEvent.click(screen.getByRole("combobox", { name: "Empresa em uso" }));
    await userEvent.click(await screen.findByRole("option", { name: "Plataforma" }));

    expect(useCompanyContextStore.getState().company).toBeNull();
  });

  it("quem não é Owner vê só o nome da própria empresa", async () => {
    stubApi();
    renderSwitcher(false);

    expect(await screen.findByText(FIRST_COMPANY.name)).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });
});
