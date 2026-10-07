import { describe, expect, it } from "vitest";

import type { UserActivity } from "@/schemas/Modules/Administracao/Usuarios/user-activity-page-schema";

import { getPeriodStart } from "./get-period-start";
import { groupActivityByDay } from "./group-activity-by-day";

const NOW = new Date("2026-10-07T15:00:00");
const SEVEN_DAYS = 7;

const ACTIVITIES: UserActivity[] = [
  {
    id: "1",
    createdAt: "2026-10-07T09:30:00",
    type: "Login",
    label: "Login no sistema",
    summary: null,
    ip: "10.0.0.1",
  },
  {
    id: "2",
    createdAt: "2026-10-06T18:00:00",
    type: "Update",
    label: "Editou perfil 'Vendas'",
    summary: "Nome: Vendas → Comercial",
    ip: null,
  },
  { id: "3", createdAt: "2026-10-01T08:00:00", type: "Custom", label: null, summary: null, ip: null },
];

describe("atividade do usuário", () => {
  it("agrupa por dia com Hoje e Ontem e monta a linha do tempo", () => {
    const days = groupActivityByDay(ACTIVITIES, NOW);

    expect(days.map((day) => day.label)).toEqual(["Hoje", "Ontem", "01/10/2026"]);
    expect(days[0].events[0]).toMatchObject({ description: "Login no sistema", meta: "09:30 · IP 10.0.0.1" });
    expect(days[1].events[0].meta).toBe("18:00 · Nome: Vendas → Comercial");
    expect(days[2].events[0].description).toBe("Outro");
  });

  it("calcula o começo do período", () => {
    expect(getPeriodStart(null, NOW)).toBeUndefined();
    expect(getPeriodStart(SEVEN_DAYS, NOW)).toBe(new Date("2026-09-30T00:00:00").toISOString());
  });
});
