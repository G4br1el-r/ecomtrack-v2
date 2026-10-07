import type { User } from "@/schemas/Modules/Administracao/Usuarios/user-schema";

export const USERS_MOCK = [
  {
    id: "u-1",
    firstName: "Ana",
    lastName: "Souza",
    email: "ana.souza@gamesbrasil.com.br",
    avatarUrl: null,
    status: "Active",
    profileId: "p-1",
    profileName: "Atendimento",
    lastLoginAt: "2026-10-07T09:12:00Z",
    createdAt: "2026-08-02T10:00:00Z",
    invitedByName: "Gabriel Rodrigues",
  },
  {
    id: "u-2",
    firstName: "Bruno",
    lastName: "de Albuquerque Cavalcanti Figueiredo",
    email: "bruno.figueiredo.compras.internacionais@gamesbrasil.com.br",
    avatarUrl: null,
    status: "Inactive",
    profileId: "p-2",
    profileName: "Compras",
    lastLoginAt: null,
    createdAt: "2026-09-10T14:30:00Z",
    invitedByName: null,
  },
] satisfies User[];
