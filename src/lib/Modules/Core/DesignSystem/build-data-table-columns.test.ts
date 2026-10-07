import { describe, expect, it } from "vitest";

import { buildDataTableColumns } from "./build-data-table-columns";

type Row = { name: string };

const COLUMNS = [{ accessorKey: "name" as const }];

describe("buildDataTableColumns", () => {
  it("põe seleção, expandir e fixar linha antes das colunas de dados", () => {
    const columns = buildDataTableColumns<Row>(COLUMNS, { select: true, expand: true, rowPin: true });
    expect(columns.map((column) => column.id ?? "data")).toEqual(["select", "expand", "row-pin", "data"]);
  });

  it("não adiciona coluna utilitária de recurso desligado", () => {
    expect(buildDataTableColumns<Row>(COLUMNS, { select: false, expand: false, rowPin: false })).toEqual(COLUMNS);
  });
});
