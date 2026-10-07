import { type NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE_NAME } from "@/constants/Modules/Core/Auth/auth";
import { resolveAuthRedirect } from "@/lib/Modules/Core/Auth/resolve-auth-redirect";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const target = resolveAuthRedirect(pathname, search, request.cookies.has(SESSION_COOKIE_NAME));
  return target ? NextResponse.redirect(new URL(target, request.url)) : NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.[\\w]+$).*)"],
};
