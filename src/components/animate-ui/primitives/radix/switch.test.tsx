import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Switch, SwitchThumb } from "./switch";

describe("Switch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("alterna e avisa o novo estado sem vazar props do Radix para o DOM", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const onCheckedChange = vi.fn();
    render(
      <Switch aria-label="Comparar" onCheckedChange={onCheckedChange}>
        <SwitchThumb />
      </Switch>,
    );
    const control = screen.getByRole("switch", { name: "Comparar" });
    expect(control).toHaveAttribute("aria-checked", "false");
    await userEvent.click(control);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(control).toHaveAttribute("aria-checked", "true");
    expect(control).not.toHaveAttribute("oncheckedchange");
    expect(consoleError).not.toHaveBeenCalledWith(expect.stringContaining("Unknown event handler"), expect.anything());
  });

  it("respeita o estado controlado e o desabilitado", () => {
    render(<Switch aria-label="Comparar" checked disabled />);
    const control = screen.getByRole("switch", { name: "Comparar" });
    expect(control).toHaveAttribute("aria-checked", "true");
    expect(control).toBeDisabled();
  });
});
