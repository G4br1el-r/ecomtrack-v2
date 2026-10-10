import { useId } from "react";

import { LOGIN_DOTS } from "@/constants/Modules/Core/Auth/login";

export function ShowcaseDots() {
  const id = useId();
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 size-full text-primary-foreground/25 mask-radial-from-10% mask-radial-to-75% mask-radial-at-center"
    >
      <defs>
        <pattern id={id} width={LOGIN_DOTS.spacingPx} height={LOGIN_DOTS.spacingPx} patternUnits="userSpaceOnUse">
          <circle cx={LOGIN_DOTS.radiusPx} cy={LOGIN_DOTS.radiusPx} r={LOGIN_DOTS.radiusPx} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
