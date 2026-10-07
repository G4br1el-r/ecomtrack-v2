import type { NextResponse } from "next/server";

import type { RefreshCookie } from "@/@types/Modules/Core/Auth/refresh-cookie";
import { SESSION_COOKIE_NAME } from "@/constants/Modules/Core/Auth/auth";

export function writeSessionCookie(response: NextResponse, refreshCookie: RefreshCookie): void {
  response.cookies.set(SESSION_COOKIE_NAME, `${refreshCookie.name}=${refreshCookie.value}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    expires: refreshCookie.expires,
  });
}
