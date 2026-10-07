import { beforeEach, describe, expect, it } from "vitest";

import { usePipelineDetailStore } from "./pipeline-detail-store";

describe("usePipelineDetailStore", () => {
  beforeEach(() => {
    usePipelineDetailStore.setState({ productId: null, open: false });
  });

  it("abre o detalhe do produto escolhido", () => {
    usePipelineDetailStore.getState().openDetail("est-001");
    expect(usePipelineDetailStore.getState()).toMatchObject({ productId: "est-001", open: true });
  });

  it("mantém o produto ao fechar para a animação de saída", () => {
    usePipelineDetailStore.getState().openDetail("est-001");
    usePipelineDetailStore.getState().setOpen(false);
    expect(usePipelineDetailStore.getState()).toMatchObject({ productId: "est-001", open: false });
  });
});
