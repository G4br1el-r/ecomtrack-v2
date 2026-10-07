import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useIsMounted } from "./use-is-mounted";

describe("useIsMounted", () => {
  it("retorna true no cliente", () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current).toBe(true);
  });
});
