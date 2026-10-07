import type { Kpi } from "@/@types/Modules/Core/DesignSystem/kpi";

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function series(values: number[]) {
  return values.map((value, index) => ({ label: DAYS[index] ?? String(index), value }));
}

export const KPIS: Kpi[] = [
  {
    id: "faturamento",
    title: "Faturamento",
    value: 184320,
    kind: "currency",
    change: 0.124,
    series: series([21, 24, 22, 28, 26, 31, 33]),
  },
  {
    id: "pedidos",
    title: "Pedidos",
    value: 1248,
    kind: "integer",
    change: 0.081,
    series: series([160, 172, 168, 181, 175, 190, 202]),
  },
  {
    id: "ticket",
    title: "Ticket médio",
    value: 147.69,
    kind: "currency",
    change: -0.032,
    series: series([152, 150, 151, 148, 149, 147, 147]),
  },
  {
    id: "conversao",
    title: "Taxa de conversão",
    value: 0.038,
    kind: "percent",
    change: 0.006,
    series: series([3.1, 3.3, 3.2, 3.5, 3.6, 3.7, 3.8]),
  },
];
