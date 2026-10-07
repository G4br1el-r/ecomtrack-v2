import { describe, expect, it } from "vitest";

import { parseRefreshCookie } from "./parse-refresh-cookie";

const EXPIRES = "Wed, 14 Oct 2026 01:00:00 GMT";

describe("parseRefreshCookie", () => {
  it("lê nome, valor e validade do cookie da API", () => {
    expect(
      parseRefreshCookie([
        `ecomtrack_refresh=abc.123; expires=${EXPIRES}; path=/auth; secure; samesite=strict; httponly`,
      ]),
    ).toEqual({ name: "ecomtrack_refresh", value: "abc.123", expires: new Date(EXPIRES) });
  });

  it("mantém o sinal de igual dentro do valor", () => {
    expect(parseRefreshCookie(["ecomtrack_refresh=abc==; path=/auth"])).toEqual({
      name: "ecomtrack_refresh",
      value: "abc==",
      expires: undefined,
    });
  });

  it("ignora cookie apagado e pega o próximo com valor", () => {
    expect(parseRefreshCookie(["outro=; path=/", "ecomtrack_refresh=xyz; path=/auth"])?.value).toBe("xyz");
  });

  it("ignora validade inválida", () => {
    expect(parseRefreshCookie(["ecomtrack_refresh=xyz; expires=amanhã"])?.expires).toBeUndefined();
  });

  it("devolve nulo sem cookie", () => {
    expect(parseRefreshCookie([])).toBeNull();
    expect(parseRefreshCookie(["sem-separador"])).toBeNull();
  });
});
