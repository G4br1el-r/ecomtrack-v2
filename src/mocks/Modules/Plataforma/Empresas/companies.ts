import type { Company } from "@/schemas/Modules/Plataforma/Empresas/company-schema";

export const COMPANIES_MOCK = [
  {
    id: "c0a80101-0000-4000-8000-000000000001",
    name: "Games Brasil Ltda",
    document: "12345678000190",
    status: "Active",
    planId: "p0a80101-0000-4000-8000-000000000001",
    planName: "Completo",
    userCount: 12,
    createdAt: "2026-08-01T12:00:00Z",
  },
  {
    id: "c0a80101-0000-4000-8000-000000000002",
    name: "Loja do Zé — Acessórios, Consoles, Jogos Usados e Assistência Técnica Especializada",
    document: null,
    status: "Suspended",
    planId: "p0a80101-0000-4000-8000-000000000002",
    planName: null,
    userCount: 0,
    createdAt: "2026-09-15T08:30:00Z",
  },
] satisfies Company[];
