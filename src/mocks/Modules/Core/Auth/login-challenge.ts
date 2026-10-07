import type { LoginChallenge } from "@/schemas/Modules/Core/Auth/login-challenge-schema";

export const LOGIN_CHALLENGE_MOCK = {
  challengeId: "8f1c2a4e-0000-4000-8000-000000000003",
  maskedEmail: "ga****@ecomtrack.com.br",
  expiresAt: "2026-10-07T12:05:00Z",
  resendAvailableAt: "2026-10-07T12:01:00Z",
} satisfies LoginChallenge;
