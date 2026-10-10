import { describe, expect, it } from "vitest";

import type { DataTableCardSlot } from "@/@types/Modules/Core/DesignSystem/data-table";

import { splitDataTableCardCells } from "./split-data-table-card-cells";

const cell = (id: string, card?: DataTableCardSlot) => ({ column: { id, columnDef: { meta: { card } } } });
const ids = (cells: { column: { id: string } }[]) => cells.map((item) => item.column.id);

describe("splitDataTableCardCells", () => {
  it("separa seleção, título, badges, destaques, campos e alfinete/ações", () => {
    const { leading, trailing, title, badges, highlights, fields, extraFields } = splitDataTableCardCells([
      cell("select"),
      cell("expand"),
      cell("row-pin"),
      cell("name"),
      cell("status", "badge"),
      cell("price", "highlight"),
      cell("category"),
      cell("actions"),
    ]);
    expect(ids(leading)).toEqual(["select"]);
    expect(ids(trailing)).toEqual(["row-pin", "actions"]);
    expect(title?.column.id).toBe("name");
    expect(ids(badges)).toEqual(["status"]);
    expect(ids(highlights)).toEqual(["price"]);
    expect(ids(fields)).toEqual(["category"]);
    expect(extraFields).toEqual([]);
  });

  it("usa a coluna marcada como título, mesmo que não seja a primeira", () => {
    const { title, fields } = splitDataTableCardCells([cell("createdAt"), cell("description", "title")]);
    expect(title?.column.id).toBe("description");
    expect(ids(fields)).toEqual(["createdAt"]);
  });

  it("sem marcação, o título é a primeira coluna de dado", () => {
    const { title, fields } = splitDataTableCardCells([cell("status"), cell("name")]);
    expect(title?.column.id).toBe("status");
    expect(ids(fields)).toEqual(["name"]);
  });

  it("deixa de fora as colunas ocultas no card", () => {
    const { fields } = splitDataTableCardCells([cell("name"), cell("rank", "hidden"), cell("brand")]);
    expect(ids(fields)).toEqual(["brand"]);
  });

  it("manda os campos além do limite para a lista de extras", () => {
    const { fields, extraFields } = splitDataTableCardCells(
      ["name", "a", "b", "c", "d", "e", "f"].map((id) => cell(id)),
    );
    expect(ids(fields)).toEqual(["a", "b", "c", "d"]);
    expect(ids(extraFields)).toEqual(["e", "f"]);
  });

  it("fica sem título quando só há colunas utilitárias", () => {
    const { title, fields } = splitDataTableCardCells([cell("select"), cell("actions")]);
    expect(title).toBeUndefined();
    expect(fields).toEqual([]);
  });
});
