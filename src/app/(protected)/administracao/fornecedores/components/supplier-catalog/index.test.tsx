import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { SupplierProduct } from "@/schemas/Modules/Administracao/Fornecedores/supplier-product-schema";
import { useDataTablePreferencesStore } from "@/store/Modules/Core/DesignSystem/data-table-preferences-store";

import { SupplierCatalog } from ".";

const PAGE = { page: 1, pageSize: 10, totalPages: 1, hasPreviousPage: false, hasNextPage: false };
const PRODUCT: SupplierProduct = {
  id: "sp-1",
  integrationId: "int-1",
  providerCode: "codeswholesale",
  providerName: "CodesWholesale",
  externalId: "CW-9001",
  name: "Gift Card PlayStation 100",
  description: null,
  imageUrl: null,
  platform: "PSN",
  region: "BR",
  languages: ["pt", "en"],
  currency: "USD",
  price: 18.5,
  minPrice: 18.5,
  maxPrice: 18.5,
  commission: null,
  quantity: -1,
  isOnDemand: true,
  syncedAt: "2026-10-07T06:00:00Z",
  isIntegrated: false,
  integratedAt: null,
};

describe("SupplierCatalog", () => {
  beforeEach(() => {
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
  afterEach(() => vi.unstubAllGlobals());

  it("mostra o catálogo na moeda do fornecedor e inclui os integrados sob pedido", async () => {
    const searches: URLSearchParams[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn((input: string) => {
        const url = new URL(input, "http://localhost");
        if (url.pathname.endsWith("/suppliers/products")) {
          searches.push(url.searchParams);
          return Promise.resolve(
            Response.json({ ...PAGE, items: [PRODUCT], totalCount: 1, metadata: { available: 1, integrated: 4 } }),
          );
        }
        return Promise.resolve(
          Response.json({ ...PAGE, items: [], totalCount: 0, metadata: { active: 0, inactive: 0 } }),
        );
      }),
    );
    render(
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <SupplierCatalog />
      </QueryClientProvider>,
    );

    expect(await screen.findByText("Gift Card PlayStation 100")).toBeInTheDocument();
    expect(screen.getByText("USD 18,50")).toBeInTheDocument();
    expect(screen.getByText("Sob demanda")).toBeInTheDocument();
    expect(searches[0].get("IncludeIntegrated")).toBe("false");

    await userEvent.click(screen.getByRole("radio", { name: "Todos (5)" }));

    await waitFor(() => expect(searches.at(-1)?.get("IncludeIntegrated")).toBe("true"));
  });
});
