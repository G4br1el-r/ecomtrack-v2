import { LOGIN_WELCOME } from "@/constants/Modules/Core/Auth/login";
import { APP_NAME } from "@/constants/Modules/Core/Shell/navigation";

import { IntegrationScene } from "../integration-scene";
import { LoginBrandMark } from "../login-brand-mark";
import { ShowcaseDots } from "../showcase-dots";
import { WaveEdge } from "../wave-edge";

export function LoginShowcase() {
  return (
    <aside className="relative isolate hidden h-dvh flex-col gap-6 overflow-hidden bg-linear-to-br from-brand-from to-brand-to py-10 pr-36 pl-10 text-primary-foreground lg:sticky lg:top-0 lg:flex xl:py-12 xl:pl-12">
      <ShowcaseDots />
      <LoginBrandMark />
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <IntegrationScene layout="full" className="max-h-full max-w-lg" />
      </div>
      <div className="space-y-3">
        <p className="max-w-md text-balance font-semibold text-3xl tracking-tight xl:text-4xl">
          {LOGIN_WELCOME.headline}
        </p>
        <p className="max-w-md text-pretty text-primary-foreground/80 [@media(max-height:46rem)]:hidden">
          {LOGIN_WELCOME.description}
        </p>
        <p className="flex divide-x divide-primary-foreground/30 pt-4 font-medium text-2xs text-primary-foreground/60 uppercase tracking-widest [&>span:first-child]:pl-0 [&>span]:px-3">
          <span>
            © {new Date().getFullYear()} {APP_NAME}
          </span>
          <span>{LOGIN_WELCOME.tagline}</span>
        </p>
      </div>
      <WaveEdge orientation="vertical" className="inset-y-0 -right-px h-full" />
    </aside>
  );
}
