import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { COPY_FEEDBACK_DURATION_MS } from "@/constants/Modules/Core/DesignSystem/ui";

import { useCopyToClipboard } from "./use-copy-to-clipboard";

describe("useCopyToClipboard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("copia e volta ao estado inicial depois do tempo de feedback", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy("PSN-100-BR");
    });
    expect(writeText).toHaveBeenCalledWith("PSN-100-BR");
    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(COPY_FEEDBACK_DURATION_MS);
    });
    expect(result.current.copied).toBe(false);
  });

  it("não marca como copiado quando a API falha", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("negado"));
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    const { result } = renderHook(() => useCopyToClipboard());

    let ok = true;
    await act(async () => {
      ok = await result.current.copy("x");
    });
    expect(ok).toBe(false);
    expect(result.current.copied).toBe(false);
  });
});
