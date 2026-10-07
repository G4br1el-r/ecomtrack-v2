import type { Plan } from "@/schemas/Modules/Plataforma/Planos/plan-schema";

export const PLANS_MOCK = [
  {
    id: "plan-1",
    name: "Completo",
    description: "Todas as páginas",
    pageCount: 12,
    componentCount: 40,
    companyCount: 3,
  },
  { id: "plan-2", name: "Básico", description: null, pageCount: 0, componentCount: 0, companyCount: 0 },
] satisfies Plan[];
