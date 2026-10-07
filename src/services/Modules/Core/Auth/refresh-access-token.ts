import type { AuthTokens } from "@/schemas/Modules/Core/Auth/auth-tokens-schema";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

import { refreshSession } from "./refresh-session";

let inFlight: Promise<AuthTokens | null> | null = null;

export function refreshAccessToken(): Promise<AuthTokens | null> {
  inFlight ??= refreshSession()
    .then((tokens) => {
      if (tokens) useSessionStore.getState().setSession(tokens);
      else useSessionStore.getState().clearSession();
      return tokens;
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}
