import { AUTH_BFF_ROUTES } from "@/constants/Modules/Core/Auth/auth";
import { isUnauthorizedError } from "@/lib/Modules/Core/Api/is-unauthorized-error";
import { type AuthTokens, authTokensSchema } from "@/schemas/Modules/Core/Auth/auth-tokens-schema";
import { requestBff } from "@/services/Modules/Core/Api/request-bff";

export async function refreshSession(): Promise<AuthTokens | null> {
  try {
    return await requestBff(AUTH_BFF_ROUTES.refresh, authTokensSchema);
  } catch (error) {
    if (isUnauthorizedError(error)) return null;
    throw error;
  }
}
