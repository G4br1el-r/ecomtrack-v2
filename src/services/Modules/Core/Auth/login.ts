import { AUTH_BFF_ROUTES } from "@/constants/Modules/Core/Auth/auth";
import { type LoginChallenge, loginChallengeSchema } from "@/schemas/Modules/Core/Auth/login-challenge-schema";
import type { LoginFormValues } from "@/schemas/Modules/Core/Auth/login-schema";
import { requestBff } from "@/services/Modules/Core/Api/request-bff";

export function login(values: LoginFormValues): Promise<LoginChallenge> {
  return requestBff(AUTH_BFF_ROUTES.login, loginChallengeSchema, values);
}
