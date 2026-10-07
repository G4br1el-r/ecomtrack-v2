import { describe, expect, it } from "vitest";

import { matchesHotkey } from "./matches-hotkey";

const HOTKEY = { key: "k", mod: true };

describe("matchesHotkey", () => {
  it("aceita Cmd+K", () => {
    expect(matchesHotkey({ key: "k", metaKey: true, ctrlKey: false }, HOTKEY)).toBe(true);
  });

  it("aceita Ctrl+K e maiúscula", () => {
    expect(matchesHotkey({ key: "K", metaKey: false, ctrlKey: true }, HOTKEY)).toBe(true);
  });

  it("rejeita sem modificador", () => {
    expect(matchesHotkey({ key: "k", metaKey: false, ctrlKey: false }, HOTKEY)).toBe(false);
  });

  it("rejeita modificador quando o atalho não usa", () => {
    expect(matchesHotkey({ key: "k", metaKey: true, ctrlKey: false }, { key: "k" })).toBe(false);
  });

  it("rejeita outra tecla", () => {
    expect(matchesHotkey({ key: "j", metaKey: true, ctrlKey: false }, HOTKEY)).toBe(false);
  });
});
