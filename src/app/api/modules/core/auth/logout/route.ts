import { type NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { SESSION_COOKIE_NAME } from "@/constants/Modules/Core/Auth/auth";
import { callEcomtrackApi } from "@/services/Modules/Core/Api/call-ecomtrack-api";

export async function POST(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (session) await callEcomtrackApi(API_ENDPOINTS.auth.logout.path, request, { cookie: session });
  const response = new NextResponse(null, { status: HTTP_STATUS.noContent });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
