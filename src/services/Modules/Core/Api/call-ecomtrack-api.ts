import type { NextRequest } from "next/server";

import type { HttpMethod } from "@/@types/Modules/Core/Api/api-endpoint";
import { API_UNAVAILABLE_ERROR, FORWARDED_API_HEADERS, HTTP_STATUS } from "@/constants/Modules/Core/Api/http";

export async function callEcomtrackApi(
  path: string,
  request: NextRequest,
  { method = "POST", body, cookie }: { method?: HttpMethod; body?: string; cookie?: string } = {},
): Promise<Response> {
  const baseUrl = process.env.ECOMTRACK_API_URL;
  if (!baseUrl) return Response.json(API_UNAVAILABLE_ERROR, { status: HTTP_STATUS.badGateway });

  const headers = new Headers({ Accept: "application/json" });
  for (const name of FORWARDED_API_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  if (body) headers.set("Content-Type", "application/json");
  if (cookie) headers.set("Cookie", cookie);

  try {
    return await fetch(`${baseUrl}${path}`, { method, headers, body: body || undefined, cache: "no-store" });
  } catch {
    return Response.json(API_UNAVAILABLE_ERROR, { status: HTTP_STATUS.badGateway });
  }
}
