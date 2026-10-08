import { describe, expect, it } from "vitest";

import { getApiErrorStatus } from "./get-api-error-status";

describe("getApiErrorStatus", () => {
  it("lê o status guardado no erro da API", () => {
    expect(getApiErrorStatus(new Error("x", { cause: { status: 403, code: "SEC03" } }))).toBe(403);
  });

  it("devolve undefined para erro sem status", () => {
    expect(getApiErrorStatus(new TypeError("Failed to fetch"))).toBeUndefined();
    expect(getApiErrorStatus("texto")).toBeUndefined();
  });
});
