import { describe, expect, it } from "vitest";

import { getPageRange } from "./get-page-range";

const ITEMS_PER_PAGE = 20;
const TOTAL_ITEMS = 45;

describe("getPageRange", () => {
  it("retorna o intervalo da primeira página", () => {
    expect(getPageRange(1, ITEMS_PER_PAGE, TOTAL_ITEMS)).toEqual({ start: 1, end: 20 });
  });

  it("limita o fim da última página ao total de itens", () => {
    expect(getPageRange(3, ITEMS_PER_PAGE, TOTAL_ITEMS)).toEqual({ start: 41, end: 45 });
  });

  it("retorna zero quando não há itens", () => {
    expect(getPageRange(1, ITEMS_PER_PAGE, 0)).toEqual({ start: 0, end: 0 });
  });
});
