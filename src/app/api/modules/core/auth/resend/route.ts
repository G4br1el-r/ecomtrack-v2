import type { NextRequest } from "next/server";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { callEcomtrackApi } from "@/services/Modules/Core/Api/call-ecomtrack-api";
import { relayApiResponse } from "@/services/Modules/Core/Api/relay-api-response";

export async function POST(request: NextRequest) {
  return relayApiResponse(
    await callEcomtrackApi(API_ENDPOINTS.auth.resend.path, request, { body: await request.text() }),
  );
}
