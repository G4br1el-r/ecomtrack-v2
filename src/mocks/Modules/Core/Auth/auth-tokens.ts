import type { AuthTokens } from "@/schemas/Modules/Core/Auth/auth-tokens-schema";

export const AUTH_TOKENS_MOCK = {
  accessToken: "token-de-teste",
  expiresAt: "2026-10-07T12:15:00Z",
  user: {
    id: "8f1c2a4e-0000-4000-8000-000000000001",
    firstName: "Gabriel",
    lastName: "Rodrigues",
    email: "gabriel@ecomtrack.com.br",
    avatarUrl: null,
    companyId: null,
    profileId: "8f1c2a4e-0000-4000-8000-000000000002",
    profileName: "Owner",
    isPlatformOwner: true,
    hasPinFour: false,
    hasPinSix: false,
    isViewingAs: false,
  },
} satisfies AuthTokens;
