import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VariationBadge } from ".";

describe("VariationBadge", () => {
  it("mostra a variação positiva em verde", () => {
    render(<VariationBadge value={0.124} />);
    expect(screen.getByText("12,4%").closest("[data-slot=badge]")).toHaveAttribute("data-variant", "success");
  });

  it("mostra a variação negativa em vermelho, sem sinal duplicado", () => {
    render(<VariationBadge value={-0.05} />);
    expect(screen.getByText("5%").closest("[data-slot=badge]")).toHaveAttribute("data-variant", "destructive");
  });

  it("mostra traço sem base de comparação", () => {
    render(<VariationBadge value={null} />);
    expect(screen.getByLabelText("Sem base de comparação")).toHaveTextContent("—");
  });
});
