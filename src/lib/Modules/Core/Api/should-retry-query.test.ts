import { describe, expect, it } from "vitest";

import { shouldRetryQuery } from "./should-retry-query";

const apiError = (status: number) => new Error("erro", { cause: { status } });

describe("shouldRetryQuery", () => {
  it("tenta de novo uma vez quando a rede falha ou o servidor erra", () => {
    expect(shouldRetryQuery(0, new TypeError("Failed to fetch"))).toBe(true);
    expect(shouldRetryQuery(0, apiError(500))).toBe(true);
    expect(shouldRetryQuery(0, apiError(502))).toBe(true);
  });

  it("não insiste depois da primeira nova tentativa", () => {
    expect(shouldRetryQuery(1, apiError(502))).toBe(false);
  });

  it.each([400, 401, 403, 404, 429])("não repete o erro %i, que não muda tentando de novo", (status) => {
    expect(shouldRetryQuery(0, apiError(status))).toBe(false);
  });
});
