import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SegmentedFilter } from ".";

const OPTIONS = [
  { value: "todos", label: "Todos", count: 5 },
  { value: "ativos", label: "Ativos", count: 3 },
];

describe("SegmentedFilter", () => {
  it("mostra as opções com a contagem e avisa a troca", async () => {
    const onValueChange = vi.fn();
    render(<SegmentedFilter label="Situação" options={OPTIONS} value="todos" onValueChange={onValueChange} />);

    expect(screen.getByRole("radiogroup", { name: "Situação" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Ativos (3)" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: "Ativos (3)" }));

    expect(onValueChange).toHaveBeenCalledWith("ativos");
  });

  it("não deixa desmarcar a opção atual", async () => {
    const onValueChange = vi.fn();
    render(<SegmentedFilter label="Situação" options={OPTIONS} value="todos" onValueChange={onValueChange} />);

    await userEvent.click(screen.getByRole("radio", { name: "Todos (5)" }));

    expect(onValueChange).not.toHaveBeenCalled();
  });
});
