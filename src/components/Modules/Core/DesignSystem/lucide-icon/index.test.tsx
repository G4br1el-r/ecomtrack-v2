import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LucideIcon } from ".";

describe("LucideIcon", () => {
  it("carrega o ícone do Lucide pelo nome vindo da API", async () => {
    const { container } = render(<LucideIcon name="user-cog" data-testid="icone" />);

    await waitFor(() => expect(container.querySelector("svg.lucide-user-cog")).not.toBeNull());
  });

  it("mostra o ícone padrão quando o nome é nulo ou não existe", () => {
    const { container, rerender } = render(<LucideIcon name={null} />);
    expect(container.querySelector("svg.lucide-circle")).not.toBeNull();

    rerender(<LucideIcon name="nao-existe" />);
    expect(container.querySelector("svg.lucide-circle")).not.toBeNull();
  });
});
