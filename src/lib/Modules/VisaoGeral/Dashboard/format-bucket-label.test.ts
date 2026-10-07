import { describe, expect, it } from "vitest";

import { formatBucketLabel } from "./format-bucket-label";

describe("formatBucketLabel", () => {
  it("mostra dia e mês para dia e semana", () => {
    expect(formatBucketLabel("2026-10-04", "day")).toBe("04/10");
    expect(formatBucketLabel("2026-09-28", "week")).toBe("28/09");
  });

  it("mostra mês abreviado e ano para mês", () => {
    expect(formatBucketLabel("2026-10-01", "month")).toBe("out/26");
  });
});
