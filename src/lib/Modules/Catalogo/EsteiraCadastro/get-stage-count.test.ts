import { describe, expect, it } from "vitest";

import { getStageCount } from "./get-stage-count";

describe("getStageCount", () => {
  it("soma as situações que pertencem à etapa", () => {
    expect(getStageCount({ disponivel: 3, indisponivel: 2, revisar: 4 }, "importacao")).toBe(5);
  });

  it("devolve zero quando a etapa não tem produtos", () => {
    expect(getStageCount({ disponivel: 3 }, "finalizado")).toBe(0);
  });
});
