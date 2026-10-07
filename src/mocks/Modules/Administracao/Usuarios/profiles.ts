import type { Profile } from "@/schemas/Modules/Administracao/Usuarios/profile-schema";

export const PROFILES_MOCK = [
  {
    id: "p-1",
    name: "Atendimento",
    description: "Pedidos e clientes",
    kind: "Company",
    isDefault: true,
    version: 3,
    userCount: 1,
    updatedAt: "2026-10-01T10:00:00Z",
  },
  {
    id: "p-2",
    name: "Compras",
    description: null,
    kind: "Company",
    isDefault: false,
    version: 1,
    userCount: 0,
    updatedAt: null,
  },
] satisfies Profile[];
