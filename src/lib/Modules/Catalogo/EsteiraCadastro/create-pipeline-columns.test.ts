import { describe, expect, it } from "vitest";

import { PIPELINE_STAGE_IDS } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import { PIPELINE_STAGE_COLUMNS } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline-table";

import { createPipelineColumns } from "./create-pipeline-columns";

describe("createPipelineColumns", () => {
  it.each(PIPELINE_STAGE_IDS)("monta as colunas da etapa %s na ordem configurada", (stage) => {
    expect(createPipelineColumns(stage).map((column) => column.id)).toEqual(PIPELINE_STAGE_COLUMNS[stage]);
  });

  it("dá rótulo a todas as colunas", () => {
    const columns = createPipelineColumns("finalizado");
    expect(columns.every((column) => typeof column.meta?.label === "string")).toBe(true);
  });
});
