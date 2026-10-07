import { afterEach, describe, expect, it, vi } from "vitest";

import { wait } from "./wait";

const DELAY_MS = 500;

describe("wait", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolve depois do tempo pedido", async () => {
    vi.useFakeTimers();
    const resolved = vi.fn();
    wait(DELAY_MS).then(resolved);
    await vi.advanceTimersByTimeAsync(DELAY_MS - 1);
    expect(resolved).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(resolved).toHaveBeenCalled();
  });
});
