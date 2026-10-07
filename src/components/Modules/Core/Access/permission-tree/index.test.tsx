import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import type { PermissionSelection } from "@/@types/Modules/Core/Access/permission-selection";
import type { CatalogPage } from "@/schemas/Modules/Core/Access/catalog-page-schema";

import { PermissionTree } from ".";

const CATALOG: CatalogPage[] = [
  {
    code: "usuarios",
    name: "Usuários",
    description: "Gestão de usuários",
    icon: null,
    sectionName: "Administração",
    sortOrder: 1,
    components: [{ code: "usuarios.verlogs", name: "Ver logs", description: null, icon: null }],
  },
];

let latest: PermissionSelection = { pages: [], components: [] };

function Harness() {
  const [value, setValue] = useState<PermissionSelection>({ pages: [], components: [] });
  latest = value;
  return <PermissionTree catalog={CATALOG} value={value} onChange={setValue} />;
}

describe("PermissionTree", () => {
  it("libera o componente só depois de marcar a página", async () => {
    render(<Harness />);

    expect(screen.getByRole("region", { name: "Administração" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Ver logs" })).toBeDisabled();

    await userEvent.click(screen.getByRole("checkbox", { name: "Usuários" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "Ver logs" }));
    expect(latest).toEqual({ pages: ["usuarios"], components: ["usuarios.verlogs"] });

    await userEvent.click(screen.getByRole("checkbox", { name: "Usuários" }));
    expect(latest).toEqual({ pages: [], components: [] });
  });

  it("explica quando o plano não libera nenhuma página", () => {
    render(<PermissionTree catalog={[]} value={{ pages: [], components: [] }} onChange={() => undefined} />);

    expect(screen.getByText("Nenhuma página para liberar")).toBeInTheDocument();
  });
});
