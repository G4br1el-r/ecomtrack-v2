import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActionButton } from ".";

describe("ActionButton", () => {
  it("fica habilitado no estado idle", () => {
    render(<ActionButton>Salvar</ActionButton>);
    const button = screen.getByRole("button", { name: "Salvar" });
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute("data-state", "idle");
  });

  it("trava e troca o texto durante o loading", () => {
    render(
      <ActionButton state="loading" loadingText="Salvando...">
        Salvar
      </ActionButton>,
    );
    const button = screen.getByRole("button", { name: /Salvando/ });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("mostra o texto de sucesso e continua travado", () => {
    render(
      <ActionButton state="success" successText="Salvo">
        Salvar
      </ActionButton>,
    );
    const button = screen.getByRole("button", { name: /Salvo/ });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-state", "success");
  });
});
