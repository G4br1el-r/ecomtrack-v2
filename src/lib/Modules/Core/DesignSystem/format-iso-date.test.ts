import { describe, expect, it } from "vitest";

import { formatIsoDate } from "./format-iso-date";

describe("formatIsoDate", () => {
  it("formata a data local como yyyy-MM-dd", () => {
    expect(formatIsoDate(new Date(2026, 9, 4, 23, 30))).toBe("2026-10-04");
  });
});
