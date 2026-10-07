import { NextResponse } from "next/server";

import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";

export async function relayApiResponse(apiResponse: Response): Promise<NextResponse> {
  if (apiResponse.status === HTTP_STATUS.noContent) return new NextResponse(null, { status: HTTP_STATUS.noContent });
  return new NextResponse(await apiResponse.text(), {
    status: apiResponse.status,
    headers: { "Content-Type": apiResponse.headers.get("Content-Type") ?? "application/json" },
  });
}
