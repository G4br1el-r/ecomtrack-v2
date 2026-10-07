import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DateTimeCell } from ".";

describe("DateTimeCell", () => {
  it("mostra data e hora", () => {
    render(<DateTimeCell value="2026-10-07T09:05:00" />);

    expect(screen.getByText("07/10/2026")).toBeInTheDocument();
    expect(screen.getByText("09:05")).toBeInTheDocument();
  });

  it("mostra o texto de vazio quando não há data", () => {
    render(<DateTimeCell value={null} empty="Nunca entrou" />);

    expect(screen.getByText("Nunca entrou")).toBeInTheDocument();
  });
});
