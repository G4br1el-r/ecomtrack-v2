import { AUTH_BFF_ROUTES } from "@/constants/Modules/Core/Auth/auth";
import { type LoginChallenge, loginChallengeSchema } from "@/schemas/Modules/Core/Auth/login-challenge-schema";
import { requestBff } from "@/services/Modules/Core/Api/request-bff";

export function resendLoginCode(challengeId: string): Promise<LoginChallenge> {
  return requestBff(AUTH_BFF_ROUTES.resend, loginChallengeSchema, { challengeId });
}
