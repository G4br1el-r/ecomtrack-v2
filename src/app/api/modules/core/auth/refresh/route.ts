import { type NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { SESSION_COOKIE_NAME, SESSION_EXPIRED_ERROR } from "@/constants/Modules/Core/Auth/auth";
import { callEcomtrackApi } from "@/services/Modules/Core/Api/call-ecomtrack-api";
import { forwardSessionResponse } from "@/services/Modules/Core/Auth/forward-session-response";

export async function POST(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!session) return NextResponse.json(SESSION_EXPIRED_ERROR, { status: HTTP_STATUS.unauthorized });
  return forwardSessionResponse(await callEcomtrackApi(API_ENDPOINTS.auth.refresh.path, request, { cookie: session }));
}
