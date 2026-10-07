import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { API_UNAVAILABLE_ERROR, API_UNEXPECTED_ERROR_MESSAGE, HTTP_STATUS } from "@/constants/Modules/Core/Api/http";

import { requestBff } from "./request-bff";

const SCHEMA = z.object({ id: z.string() });

function mockFetch(response: Response | Promise<never>) {
  const fetchMock = vi.fn(() => (response instanceof Response ? Promise.resolve(response) : response));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("requestBff", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("faz POST com o corpo em JSON e devolve a resposta validada", async () => {
    const fetchMock = mockFetch(Response.json({ id: "1" }));

    expect(await requestBff("/api/x", SCHEMA, { email: "a@b.com" })).toEqual({ id: "1" });
    expect(fetchMock).toHaveBeenCalledWith("/api/x", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "a@b.com" }),
    });
  });

  it("aceita resposta sem conteúdo", async () => {
    mockFetch(new Response(null, { status: HTTP_STATUS.noContent }));

    expect(await requestBff("/api/x", z.null())).toBeNull();
  });

  it("usa a mensagem da API e guarda status e código no erro", async () => {
    mockFetch(
      Response.json({ code: "AUT01", message: "E-mail ou senha inválidos." }, { status: HTTP_STATUS.unauthorized }),
    );

    const error = await requestBff("/api/x", SCHEMA).catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("E-mail ou senha inválidos.");
    expect((error as Error).cause).toEqual({ status: HTTP_STATUS.unauthorized, code: "AUT01" });
  });

  it("troca erro fora do formato por uma mensagem amigável", async () => {
    mockFetch(new Response("falhou", { status: HTTP_STATUS.badGateway }));

    await expect(requestBff("/api/x", SCHEMA)).rejects.toThrow(API_UNEXPECTED_ERROR_MESSAGE);
  });

  it("recusa resposta de sucesso fora do contrato", async () => {
    mockFetch(Response.json({ outro: 1 }));

    await expect(requestBff("/api/x", SCHEMA)).rejects.toThrow(API_UNEXPECTED_ERROR_MESSAGE);
  });

  it("avisa quando não consegue falar com o servidor", async () => {
    mockFetch(Promise.reject(new TypeError("Failed to fetch")));

    await expect(requestBff("/api/x", SCHEMA)).rejects.toThrow(API_UNAVAILABLE_ERROR.message);
  });
});
