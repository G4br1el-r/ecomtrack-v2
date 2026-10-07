import { describe, expect, it } from "vitest";

import { isPipelineStage } from "./is-pipeline-stage";

describe("isPipelineStage", () => {
  it("aceita as etapas da esteira", () => {
    expect(isPipelineStage("precificacao")).toBe(true);
  });

  it("recusa valores desconhecidos", () => {
    expect(isPipelineStage("estoque")).toBe(false);
  });
});
