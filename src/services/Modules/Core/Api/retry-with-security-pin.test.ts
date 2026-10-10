import { afterEach, describe, expect, it, vi } from "vitest";

import { useSecurityPinStore } from "@/store/Modules/Core/Access/security-pin-store";

import { retryWithSecurityPin } from "./retry-with-security-pin";

const FORBIDDEN = 403;

function pinError(code: string) {
  return Response.json({ code, message: `Erro ${code}` }, { status: FORBIDDEN });
}

async function answerNextPrompt(pin: string | null) {
  await vi.waitFor(() => expect(useSecurityPinStore.getState().prompt).not.toBeNull());
  const prompt = useSecurityPinStore.getState().prompt;
  useSecurityPinStore.getState().answer(pin);
  return prompt;
}

describe("retryWithSecurityPin", () => {
  afterEach(() => {
    useSecurityPinStore.setState({ pins: {}, prompt: null });
  });

  it("devolve a resposta sem pedir PIN quando a API não exige", async () => {
    const ok = Response.json({ ok: true });
    const send = vi.fn();

    await expect(retryWithSecurityPin("Six", ok, send)).resolves.toBe(ok);
    expect(send).not.toHaveBeenCalled();
  });

  it("pede o PIN, guarda em memória e refaz a chamada", async () => {
    const ok = Response.json({ ok: true });
    const send = vi.fn(() => Promise.resolve(ok));
    const result = retryWithSecurityPin("Six", pinError("PIN01"), send);

    expect((await answerNextPrompt("123456"))?.mode).toBe("ask");
    await expect(result).resolves.toBe(ok);
    expect(send).toHaveBeenCalledTimes(1);
    expect(useSecurityPinStore.getState().pins.Six).toBe("123456");
  });

  it("avisa PIN incorreto e pede de novo", async () => {
    const ok = Response.json({ ok: true });
    const send = vi.fn().mockResolvedValueOnce(pinError("PIN03")).mockResolvedValueOnce(ok);
    const result = retryWithSecurityPin("Four", pinError("PIN01"), send);

    await answerNextPrompt("1111");
    expect((await answerNextPrompt("2580"))?.mode).toBe("invalid");
    await expect(result).resolves.toBe(ok);
  });

  it("desiste quando a pessoa cancela e devolve o erro da API", async () => {
    const first = pinError("PIN01");
    const send = vi.fn();
    const result = retryWithSecurityPin("Six", first, send);

    await answerNextPrompt(null);
    await expect(result).resolves.toBe(first);
    expect(send).not.toHaveBeenCalled();
  });

  it("oferece criar o PIN quando ele ainda não existe", async () => {
    const missing = pinError("PIN02");

    await expect(retryWithSecurityPin("Six", missing, vi.fn())).resolves.toBe(missing);
    expect(useSecurityPinStore.getState().prompt?.mode).toBe("missing");
  });
});
