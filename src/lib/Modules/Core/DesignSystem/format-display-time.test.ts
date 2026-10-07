import { describe, expect, it } from "vitest";

import { formatDisplayTime } from "./format-display-time";

describe("formatDisplayTime", () => {
  it("mostra hora e minuto no horário local", () => {
    expect(formatDisplayTime("2026-10-07T09:05:00")).toBe("09:05");
  });
});
