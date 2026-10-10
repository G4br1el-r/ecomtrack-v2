import { describe, expect, it } from "vitest";

import { readApiErrorCode } from "./read-api-error-code";

describe("readApiErrorCode", () => {
  it("lê o código do erro sem consumir a resposta", async () => {
    const response = Response.json({ code: "PIN01", message: "Informe o PIN." }, { status: 403 });

    await expect(readApiErrorCode(response)).resolves.toBe("PIN01");
    await expect(response.json()).resolves.toEqual({ code: "PIN01", message: "Informe o PIN." });
  });

  it("ignora resposta de sucesso, sem corpo ou fora do formato de erro", async () => {
    await expect(readApiErrorCode(Response.json({ ok: true }))).resolves.toBeUndefined();
    await expect(readApiErrorCode(new Response("x", { status: 500 }))).resolves.toBeUndefined();
    await expect(readApiErrorCode(null)).resolves.toBeUndefined();
  });
});
