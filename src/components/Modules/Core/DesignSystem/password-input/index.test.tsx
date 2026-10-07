import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { PasswordInput } from ".";

describe("PasswordInput", () => {
  it("começa escondendo a senha", () => {
    render(<PasswordInput aria-label="Senha" defaultValue="segredo" />);

    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: "Mostrar senha" })).toHaveAttribute("aria-pressed", "false");
  });

  it("mostra e esconde a senha no olhinho sem perder o valor", async () => {
    render(<PasswordInput aria-label="Senha" defaultValue="segredo" />);

    await userEvent.click(screen.getByRole("button", { name: "Mostrar senha" }));

    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Senha")).toHaveValue("segredo");
    expect(screen.getByRole("button", { name: "Ocultar senha" })).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(screen.getByRole("button", { name: "Ocultar senha" }));

    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");
  });

  it("não envia o formulário ao clicar no olhinho", async () => {
    let submitted = false;
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitted = true;
        }}
      >
        <PasswordInput aria-label="Senha" />
      </form>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Mostrar senha" }));

    expect(submitted).toBe(false);
  });
});
