import { describe, expect, it } from "vitest";

import { getLoopWindowTimes } from "./get-loop-window-times";

describe("getLoopWindowTimes", () => {
  it("monta entrada e saída suaves dentro do ciclo", () => {
    expect(getLoopWindowTimes(0.25, 0.75, 0.05)).toEqual([0, 0.25, 0.3, 0.7, 0.75, 1]);
  });

  it("aceita janela que começa no início do ciclo", () => {
    expect(getLoopWindowTimes(0, 0.5, 0.1)).toEqual([0, 0, 0.1, 0.4, 0.5, 1]);
  });
});
