import type { NextResponse } from "next/server";
import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { SESSION_COOKIE_NAME } from "@/constants/Modules/Core/Auth/auth";
import { parseRefreshCookie } from "@/lib/Modules/Core/Auth/parse-refresh-cookie";
import { writeSessionCookie } from "@/lib/Modules/Core/Auth/write-session-cookie";
import { relayApiResponse } from "@/services/Modules/Core/Api/relay-api-response";

export async function forwardSessionResponse(apiResponse: Response): Promise<NextResponse> {
  const response = await relayApiResponse(apiResponse);
  const refreshCookie = parseRefreshCookie(apiResponse.headers.getSetCookie());
  if (apiResponse.ok && refreshCookie) writeSessionCookie(response, refreshCookie);
  if (apiResponse.status === HTTP_STATUS.unauthorized) response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
