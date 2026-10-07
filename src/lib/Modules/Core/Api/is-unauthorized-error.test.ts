import { describe, expect, it } from "vitest";

import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";

import { isUnauthorizedError } from "./is-unauthorized-error";

describe("isUnauthorizedError", () => {
  it("reconhece erro 401", () => {
    expect(isUnauthorizedError(new Error("x", { cause: { status: HTTP_STATUS.unauthorized } }))).toBe(true);
  });

  it("recusa outros status e erros sem status", () => {
    expect(isUnauthorizedError(new Error("x", { cause: { status: HTTP_STATUS.badRequest } }))).toBe(false);
    expect(isUnauthorizedError(new Error("x"))).toBe(false);
    expect(isUnauthorizedError("x")).toBe(false);
  });
});
