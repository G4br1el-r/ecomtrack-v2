import { describe, expect, it } from "vitest";

import { formatHotkey } from "./format-hotkey";

describe("formatHotkey", () => {
  it("junta o ⌘ com a tecla no Mac", () => {
    expect(formatHotkey({ key: "b", mod: true }, "⌘")).toBe("⌘B");
  });

  it("separa Ctrl e a tecla com + fora do Mac", () => {
    expect(formatHotkey({ key: "b", mod: true }, "Ctrl")).toBe("Ctrl+B");
  });

  it("mostra só a tecla quando não há modificador", () => {
    expect(formatHotkey({ key: "/" }, "Ctrl")).toBe("/");
  });
});
