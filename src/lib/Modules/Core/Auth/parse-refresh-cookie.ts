import type { RefreshCookie } from "@/@types/Modules/Core/Auth/refresh-cookie";

const EXPIRES_ATTRIBUTE = "expires=";

export function parseRefreshCookie(setCookieHeaders: string[]): RefreshCookie | null {
  for (const header of setCookieHeaders) {
    const [pair, ...attributes] = header.split(";");
    const separatorIndex = pair.indexOf("=");
    const name = pair.slice(0, separatorIndex).trim();
    const value = pair.slice(separatorIndex + 1).trim();
    if (separatorIndex < 1 || !value) continue;
    const expiresAttribute = attributes
      .map((attribute) => attribute.trim())
      .find((attribute) => attribute.toLowerCase().startsWith(EXPIRES_ATTRIBUTE));
    const expires = expiresAttribute ? new Date(expiresAttribute.slice(EXPIRES_ATTRIBUTE.length)) : undefined;
    return { name, value, expires: expires && !Number.isNaN(expires.getTime()) ? expires : undefined };
  }
  return null;
}
