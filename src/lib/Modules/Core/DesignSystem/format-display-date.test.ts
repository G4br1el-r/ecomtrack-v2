import { describe, expect, it } from "vitest";

import { formatDisplayDate } from "./format-display-date";

describe("formatDisplayDate", () => {
  it("formata a data ISO em dd/MM/yyyy", () => {
    expect(formatDisplayDate("2026-09-28")).toBe("28/09/2026");
  });

  it("mostra traço quando não há data", () => {
    expect(formatDisplayDate(null)).toBe("—");
  });
});
