import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { Kpi } from "@/@types/Modules/Core/DesignSystem/kpi";

import { KpiCard } from ".";

vi.mock("../sparkline", () => ({ Sparkline: () => null }));

const KPI: Kpi = { id: "revenue", title: "Faturamento", value: 1000, kind: "currency", change: 0.1, series: [] };

describe("KpiCard", () => {
  it("é só leitura quando não recebe onSelect", () => {
    render(<KpiCard kpi={KPI} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("vira um botão selecionável quando recebe onSelect", async () => {
    const onSelect = vi.fn();
    render(<KpiCard kpi={KPI} selected onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("button", { pressed: true }));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("mostra traço quando não há variação", () => {
    render(<KpiCard kpi={{ ...KPI, change: null }} />);
    expect(screen.getByLabelText("Sem base de comparação")).toHaveTextContent("—");
  });
});
