import { describe, expect, it } from "vitest";

import { getShare } from "./get-share";

describe("getShare", () => {
  it("calcula a fração do total", () => {
    expect(getShare(25, 100)).toBe(0.25);
  });

  it("devolve zero quando o total é zero", () => {
    expect(getShare(10, 0)).toBe(0);
  });
});
