import { describe, expect, it } from "vitest";

import { getMarginTone } from "./get-margin-tone";

describe("getMarginTone", () => {
  it("é saudável a partir de 20%", () => {
    expect(getMarginTone(0.2)).toBe("success");
  });

  it("é de atenção entre 10% e 20%", () => {
    expect(getMarginTone(0.15)).toBe("warning");
  });

  it("é crítica abaixo de 10%", () => {
    expect(getMarginTone(0.05)).toBe("destructive");
    expect(getMarginTone(-0.1)).toBe("destructive");
  });
});
