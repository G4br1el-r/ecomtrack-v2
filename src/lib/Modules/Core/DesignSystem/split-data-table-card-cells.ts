import type { DataTableCardSlot } from "@/@types/Modules/Core/DesignSystem/data-table";
import {
  DATA_TABLE_CARD_FOOTER_COLUMN_IDS,
  DATA_TABLE_CARD_LEADING_COLUMN_IDS,
  DATA_TABLE_CARD_TRAILING_COLUMN_IDS,
  DATA_TABLE_CARD_VISIBLE_FIELDS,
} from "@/constants/Modules/Core/DesignSystem/data-table";

type CardCell = { column: { id: string; columnDef: { meta?: { card?: DataTableCardSlot } } } };

export function splitDataTableCardCells<TCell extends CardCell>(cells: TCell[]) {
  const utilityIds = [
    ...DATA_TABLE_CARD_LEADING_COLUMN_IDS,
    ...DATA_TABLE_CARD_TRAILING_COLUMN_IDS,
    ...DATA_TABLE_CARD_FOOTER_COLUMN_IDS,
  ];
  const content = cells.filter((cell) => !utilityIds.includes(cell.column.id));
  const inSlot = (slot: DataTableCardSlot) => content.filter((cell) => cell.column.columnDef.meta?.card === slot);
  const unassigned = content.filter((cell) => cell.column.columnDef.meta?.card === undefined);
  const title = inSlot("title")[0] ?? unassigned[0];
  const fields = content.filter((cell) => cell !== title && (cell.column.columnDef.meta?.card ?? "field") === "field");
  return {
    leading: cells.filter((cell) => DATA_TABLE_CARD_LEADING_COLUMN_IDS.includes(cell.column.id)),
    trailing: cells.filter((cell) => DATA_TABLE_CARD_TRAILING_COLUMN_IDS.includes(cell.column.id)),
    title,
    badges: inSlot("badge"),
    highlights: inSlot("highlight"),
    fields: fields.slice(0, DATA_TABLE_CARD_VISIBLE_FIELDS),
    extraFields: fields.slice(DATA_TABLE_CARD_VISIBLE_FIELDS),
  };
}
