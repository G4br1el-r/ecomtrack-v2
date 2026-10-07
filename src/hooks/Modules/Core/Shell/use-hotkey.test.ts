import { renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useHotkey } from "./use-hotkey";

const SLASH_HOTKEY = { key: "/" };
const MOD_HOTKEY = { key: "k", mod: true };

describe("useHotkey", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("dispara o atalho sem modificador fora de campos de digitação", async () => {
    const onTrigger = vi.fn();
    renderHook(() => useHotkey(SLASH_HOTKEY, onTrigger));
    await userEvent.keyboard("/");
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });

  it("não dispara o atalho sem modificador enquanto digita num campo", async () => {
    const onTrigger = vi.fn();
    renderHook(() => useHotkey(SLASH_HOTKEY, onTrigger));
    const input = document.createElement("input");
    document.body.append(input);
    input.focus();
    await userEvent.keyboard("/");
    expect(onTrigger).not.toHaveBeenCalled();
    expect(input).toHaveValue("/");
  });

  it("dispara o atalho com Ctrl/Cmd mesmo dentro de um campo", async () => {
    const onTrigger = vi.fn();
    renderHook(() => useHotkey(MOD_HOTKEY, onTrigger));
    const input = document.createElement("input");
    document.body.append(input);
    input.focus();
    await userEvent.keyboard("{Control>}k{/Control}");
    expect(onTrigger).toHaveBeenCalledTimes(1);
  });
});
