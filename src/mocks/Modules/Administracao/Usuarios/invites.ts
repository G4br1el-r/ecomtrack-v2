import type { Invite } from "@/schemas/Modules/Administracao/Usuarios/invite-schema";

export const INVITES_MOCK = [
  {
    userId: "u-3",
    firstName: "Carla",
    lastName: "Mendes",
    email: "carla@gamesbrasil.com.br",
    profileId: "p-1",
    profileName: "Atendimento",
    status: "Pending",
    invitedByName: "Gabriel Rodrigues",
    sentAt: "2026-10-06T12:00:00Z",
    expiresAt: "2026-10-09T12:00:00Z",
    acceptedAt: null,
  },
  {
    userId: "u-4",
    firstName: "Diego",
    lastName: "Lima",
    email: "diego@gamesbrasil.com.br",
    profileId: null,
    profileName: null,
    status: "Expired",
    invitedByName: "Ana Souza",
    sentAt: "2026-09-01T12:00:00Z",
    expiresAt: "2026-09-04T12:00:00Z",
    acceptedAt: null,
  },
] satisfies Invite[];
