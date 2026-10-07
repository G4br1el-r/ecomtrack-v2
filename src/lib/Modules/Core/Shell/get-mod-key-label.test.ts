import { describe, expect, it } from "vitest";

import { getModKeyLabel } from "./get-mod-key-label";

describe("getModKeyLabel", () => {
  it("mostra ⌘ no Mac e no iPad", () => {
    expect(getModKeyLabel("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)")).toBe("⌘");
    expect(getModKeyLabel("Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)")).toBe("⌘");
  });

  it("mostra Ctrl no Windows e no Linux", () => {
    expect(getModKeyLabel("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")).toBe("Ctrl");
    expect(getModKeyLabel("Mozilla/5.0 (X11; Linux x86_64)")).toBe("Ctrl");
  });
});
