import {
  LOGIN_MOBILE_HEADER_BOTTOM_SPACE_PX,
  LOGIN_MOBILE_HEADER_HEIGHT,
  LOGIN_WELCOME,
} from "@/constants/Modules/Core/Auth/login";
import { APP_NAME } from "@/constants/Modules/Core/Shell/navigation";

import { CloudEdge } from "../cloud-edge";
import { LoginBrandMark } from "../login-brand-mark";

export function LoginBrandPanel() {
  return (
    <aside
      className="relative flex flex-col items-center justify-center gap-6 overflow-hidden bg-linear-to-b from-brand-from to-brand-to text-center text-primary-foreground lg:h-auto! lg:pr-40 lg:pb-0! lg:pl-10"
      style={{ height: LOGIN_MOBILE_HEADER_HEIGHT, paddingBottom: LOGIN_MOBILE_HEADER_BOTTOM_SPACE_PX }}
    >
      <p className="hidden font-medium text-2xl lg:block">{LOGIN_WELCOME.greeting}</p>
      <LoginBrandMark />
      <p className="hidden max-w-xs text-pretty text-primary-foreground/80 text-sm lg:mt-4 lg:block">
        {LOGIN_WELCOME.description}
      </p>
      <p className="absolute inset-x-0 bottom-8 hidden justify-center divide-x divide-primary-foreground/40 font-medium text-2xs text-primary-foreground/70 whitespace-nowrap uppercase tracking-widest lg:flex lg:pr-40 lg:pl-10 [&>span]:px-3">
        <span>
          © {new Date().getFullYear()} {APP_NAME}
        </span>
        <span>{LOGIN_WELCOME.tagline}</span>
      </p>
      <CloudEdge orientation="vertical" className="inset-y-0 right-0 hidden h-full lg:block" />
      <CloudEdge orientation="horizontal" className="inset-x-0 bottom-0 w-full lg:hidden" />
    </aside>
  );
}
