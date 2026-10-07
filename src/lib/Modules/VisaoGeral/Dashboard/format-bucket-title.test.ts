import { describe, expect, it } from "vitest";

import { formatBucketTitle } from "./format-bucket-title";

describe("formatBucketTitle", () => {
  it("mostra o dia da semana e a data completa", () => {
    expect(formatBucketTitle("2026-10-04", "day")).toBe("Domingo, 04/10/2026");
  });

  it("mostra o início da semana", () => {
    expect(formatBucketTitle("2026-09-28", "week")).toBe("Semana de 28/09/2026");
  });

  it("mostra o mês por extenso", () => {
    expect(formatBucketTitle("2026-10-01", "month")).toBe("Outubro de 2026");
  });
});
