import { describe, expect, it } from "vitest";

import { getApiErrorCode } from "./get-api-error-code";

describe("getApiErrorCode", () => {
  it("lê o código de erro da API", () => {
    expect(getApiErrorCode(new Error("x", { cause: { status: 400, code: "AUT07" } }))).toBe("AUT07");
  });

  it("devolve vazio sem código", () => {
    expect(getApiErrorCode(new Error("x", { cause: { status: 400 } }))).toBeUndefined();
    expect(getApiErrorCode(new Error("x"))).toBeUndefined();
    expect(getApiErrorCode(null)).toBeUndefined();
  });
});
