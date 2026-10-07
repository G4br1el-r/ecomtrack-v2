import { type NextRequest, NextResponse } from "next/server";

import type { HttpMethod } from "@/@types/Modules/Core/Api/api-endpoint";
import { API_NOT_FOUND_ERROR, API_PROXY_BLOCKED_PATHS, HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { callEcomtrackApi } from "@/services/Modules/Core/Api/call-ecomtrack-api";
import { relayApiResponse } from "@/services/Modules/Core/Api/relay-api-response";

async function forwardToApi(request: NextRequest, context: RouteContext<"/api/modules/core/ecomtrack/[...path]">) {
  const { path } = await context.params;
  const joined = path.join("/");
  if (API_PROXY_BLOCKED_PATHS.some((blocked) => joined === blocked || joined.startsWith(`${blocked}/`))) {
    return NextResponse.json(API_NOT_FOUND_ERROR, { status: HTTP_STATUS.notFound });
  }
  const method = request.method as HttpMethod;
  const body = method === "GET" || method === "DELETE" ? undefined : await request.text();
  const apiPath = `/${path.map(encodeURIComponent).join("/")}${request.nextUrl.search}`;
  return relayApiResponse(await callEcomtrackApi(apiPath, request, { method, body }));
}

export const GET = forwardToApi;
export const POST = forwardToApi;
export const PUT = forwardToApi;
export const DELETE = forwardToApi;
