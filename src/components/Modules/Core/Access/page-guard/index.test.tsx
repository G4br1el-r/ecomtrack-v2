import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PERMISSION_MENU_QUERY_KEY } from "@/constants/Modules/Core/Access/access";
import { PERMISSION_MENU_MOCK } from "@/mocks/Modules/Core/Access/permission-menu";

import { PageGuard } from ".";

const navigation = vi.hoisted(() => ({ pathname: "/administracao/usuarios", replace: vi.fn() }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ replace: navigation.replace }),
}));

function renderGuard(pathname: string) {
  navigation.pathname = pathname;
  const client = new QueryClient();
  client.setQueryData(PERMISSION_MENU_QUERY_KEY, PERMISSION_MENU_MOCK);
  render(
    <QueryClientProvider client={client}>
      <PageGuard>
        <p>conteúdo</p>
      </PageGuard>
    </QueryClientProvider>,
  );
}

describe("PageGuard", () => {
  afterEach(() => {
    navigation.replace.mockClear();
  });

  it("mostra a página liberada no menu", () => {
    renderGuard("/administracao/usuarios");

    expect(screen.getByText("conteúdo")).toBeInTheDocument();
    expect(navigation.replace).not.toHaveBeenCalled();
  });

  it("manda para sem-permissão a página bloqueada para o perfil", async () => {
    renderGuard("/administracao/auditoria");

    expect(screen.queryByText("conteúdo")).not.toBeInTheDocument();
    await waitFor(() => expect(navigation.replace).toHaveBeenCalledWith("/sem-permissao"));
  });

  it("libera rotas que não estão no menu, como minha conta", () => {
    renderGuard("/minha-conta");

    expect(screen.getByText("conteúdo")).toBeInTheDocument();
  });
});
