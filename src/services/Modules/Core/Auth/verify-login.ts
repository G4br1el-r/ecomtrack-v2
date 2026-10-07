import { AUTH_BFF_ROUTES } from "@/constants/Modules/Core/Auth/auth";
import { type AuthTokens, authTokensSchema } from "@/schemas/Modules/Core/Auth/auth-tokens-schema";
import { requestBff } from "@/services/Modules/Core/Api/request-bff";

export function verifyLogin(request: { challengeId: string; code: string }): Promise<AuthTokens> {
  return requestBff(AUTH_BFF_ROUTES.verify, authTokensSchema, request);
}
