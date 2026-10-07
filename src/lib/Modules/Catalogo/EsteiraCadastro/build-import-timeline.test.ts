import { describe, expect, it } from "vitest";

import { PIPELINE_PRODUCTS_MOCK } from "@/mocks/Modules/Catalogo/EsteiraCadastro/pipeline-products";

import { buildImportTimeline } from "./build-import-timeline";

const [PRODUCT] = PIPELINE_PRODUCTS_MOCK;

describe("buildImportTimeline", () => {
  it("registra a entrada no catálogo pelo sistema", () => {
    expect(buildImportTimeline({ ...PRODUCT, importedAt: "2026-10-05T09:12:00" })).toEqual([
      expect.objectContaining({
        type: "importacao",
        description: "Produto inserido no catálogo",
        meta: "05/10/2026 às 09:12",
        author: "Sistema",
      }),
    ]);
  });

  it("mostra o descarte primeiro quando o produto foi ignorado", () => {
    const events = buildImportTimeline({ ...PRODUCT, status: "ignorado", updatedAt: "2026-10-06T08:15:00" });
    expect(events.map((event) => event.description)).toEqual(["Produto ignorado", "Produto inserido no catálogo"]);
    expect(events[0].meta).toBe("06/10/2026 às 08:15");
  });
});
