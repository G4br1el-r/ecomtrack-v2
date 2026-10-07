import { API_ENDPOINTS } from "../../src/constants/Modules/Core/Api/api-endpoints";
import { API_PROXY, AUTH_BFF } from "../constants";

const PARAM_PATTERN = /\{[^}]+\}/g;

const CATALOG = Object.entries(API_ENDPOINTS).flatMap(([group, actions]) =>
  Object.entries(actions).map(([action, endpoint]) => ({
    key: `${group}.${action}`,
    method: endpoint.method,
    pattern: new RegExp(`^${endpoint.path.replace(PARAM_PATTERN, "[^/]+")}$`),
    params: endpoint.path.match(PARAM_PATTERN)?.length ?? 0,
  })),
);

export function matchEndpointKey(method: string, url: string): string | null {
  const { pathname } = new URL(url, "http://localhost");
  if (pathname.startsWith(`${AUTH_BFF}/`)) return `auth.${pathname.slice(AUTH_BFF.length + 1)}`;
  if (!pathname.startsWith(`${API_PROXY}/`)) return null;
  const path = pathname.slice(API_PROXY.length);
  const match = CATALOG.filter((entry) => entry.method === method && entry.pattern.test(path)).sort(
    (first, second) => first.params - second.params,
  )[0];
  return match?.key ?? null;
}
