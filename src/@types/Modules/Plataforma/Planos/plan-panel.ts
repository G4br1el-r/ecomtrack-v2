import type { Plan } from "@/schemas/Modules/Plataforma/Planos/plan-schema";

export type PlanPanel = { kind: "form"; plan: Plan | null } | { kind: "permissions"; plan: Plan };
