import type { QueryKey } from "@tanstack/react-query";

import { SESSION_QUERY_KEY } from "@/constants/Modules/Core/Auth/auth";

export function isSessionQuery(queryKey: QueryKey): boolean {
  return JSON.stringify(queryKey) === JSON.stringify(SESSION_QUERY_KEY);
}
