import type { NextRequest } from "next/server";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { callEcomtrackApi } from "@/services/Modules/Core/Api/call-ecomtrack-api";
import { forwardSessionResponse } from "@/services/Modules/Core/Auth/forward-session-response";

export async function POST(request: NextRequest) {
  return forwardSessionResponse(
    await callEcomtrackApi(API_ENDPOINTS.auth.verify.path, request, { body: await request.text() }),
  );
}
