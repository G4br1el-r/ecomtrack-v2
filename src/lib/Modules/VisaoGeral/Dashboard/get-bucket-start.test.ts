import { describe, expect, it } from "vitest";

import { getBucketStart } from "./get-bucket-start";

describe("getBucketStart", () => {
  it("mantém o dia quando agrupa por dia", () => {
    expect(getBucketStart("2026-10-04", "day")).toBe("2026-10-04");
  });

  it("usa a segunda-feira da semana", () => {
    expect(getBucketStart("2026-10-04", "week")).toBe("2026-09-28");
  });

  it("usa o primeiro dia do mês", () => {
    expect(getBucketStart("2026-10-04", "month")).toBe("2026-10-01");
  });
});
