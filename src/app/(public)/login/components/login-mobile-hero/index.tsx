import { LOGIN_WAVE_THICKNESS_PX, LOGIN_WELCOME } from "@/constants/Modules/Core/Auth/login";

import { IntegrationScene } from "../integration-scene";
import { LoginBrandMark } from "../login-brand-mark";
import { ShowcaseDots } from "../showcase-dots";
import { WaveEdge } from "../wave-edge";

export function LoginMobileHero() {
  return (
    <header
      className="relative isolate overflow-hidden bg-linear-to-br from-brand-from to-brand-to px-6 pt-6 text-primary-foreground lg:hidden"
      style={{ paddingBottom: LOGIN_WAVE_THICKNESS_PX }}
    >
      <ShowcaseDots />
      <LoginBrandMark />
      <p className="mt-5 max-w-xs text-balance font-semibold text-xl tracking-tight">{LOGIN_WELCOME.headline}</p>
      <IntegrationScene layout="compact" className="mx-auto mt-6 max-w-sm" />
      <WaveEdge orientation="horizontal" className="inset-x-0 -bottom-px w-full" />
    </header>
  );
}
