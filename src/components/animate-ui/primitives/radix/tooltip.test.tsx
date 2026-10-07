import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "./tooltip";

function renderTooltip() {
  const onOpenChange = vi.fn();
  render(
    <TooltipProvider delayDuration={0}>
      <Tooltip disableHoverableContent onOpenChange={onOpenChange}>
        <TooltipTrigger>Gatilho</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>Dica</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>,
  );
  return onOpenChange;
}

function hover(trigger: HTMLElement) {
  fireEvent.pointerMove(trigger);
  act(() => {
    vi.runOnlyPendingTimers();
  });
}

describe("Tooltip", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("abre ao passar o mouse", () => {
    const onOpenChange = renderTooltip();
    hover(screen.getByText("Gatilho"));
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });

  it("reabre quando o mouse volta durante a animação de saída", () => {
    const onOpenChange = renderTooltip();
    const trigger = screen.getByText("Gatilho");

    hover(trigger);
    fireEvent.pointerLeave(trigger);
    fireEvent.pointerMove(trigger);

    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    expect(trigger).not.toHaveAttribute("data-state", "closed");
  });
});
