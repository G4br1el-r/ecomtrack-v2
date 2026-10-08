import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { usePointerOffset } from "./use-pointer-offset";

const BOUNDS = { left: 100, top: 50, width: 200, height: 400 };
const HALF = 0.5;

function pointerEvent(clientX: number, clientY: number) {
  return {
    clientX,
    clientY,
    currentTarget: { getBoundingClientRect: () => BOUNDS },
  } as unknown as React.PointerEvent<Element>;
}

describe("usePointerOffset", () => {
  it("começa centralizado", () => {
    const { result } = renderHook(() => usePointerOffset());
    expect(result.current.pointerX.get()).toBe(0);
    expect(result.current.pointerY.get()).toBe(0);
  });

  it("calcula o deslocamento relativo ao centro do elemento", () => {
    const { result } = renderHook(() => usePointerOffset());
    act(() => result.current.handlePointerMove(pointerEvent(BOUNDS.left + BOUNDS.width, BOUNDS.top)));
    expect(result.current.pointerX.get()).toBe(HALF);
    expect(result.current.pointerY.get()).toBe(-HALF);
  });

  it("volta ao centro quando o ponteiro sai", () => {
    const { result } = renderHook(() => usePointerOffset());
    act(() => result.current.handlePointerMove(pointerEvent(BOUNDS.left, BOUNDS.top + BOUNDS.height)));
    act(() => result.current.handlePointerLeave());
    expect(result.current.pointerX.get()).toBe(0);
    expect(result.current.pointerY.get()).toBe(0);
  });
});
