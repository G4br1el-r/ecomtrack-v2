import { useId } from "react";

import type { CloudOrientation } from "@/@types/Modules/Core/Auth/login";
import {
  LOGIN_CLOUD_LAYERS,
  LOGIN_CLOUD_THICKNESS_PX,
  LOGIN_CLOUD_TONE_CLASS,
} from "@/constants/Modules/Core/Auth/login";
import { cn } from "@/lib/utils";

export function CloudEdge({ orientation, className }: { orientation: CloudOrientation; className?: string }) {
  const id = useId();
  const vertical = orientation === "vertical";
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      style={vertical ? { width: LOGIN_CLOUD_THICKNESS_PX } : { height: LOGIN_CLOUD_THICKNESS_PX }}
    >
      <defs>
        {LOGIN_CLOUD_LAYERS.map((layer) => (
          <pattern
            key={layer.id}
            id={`${id}-${layer.id}`}
            patternUnits="userSpaceOnUse"
            width={vertical ? LOGIN_CLOUD_THICKNESS_PX : layer.tile}
            height={vertical ? layer.tile : LOGIN_CLOUD_THICKNESS_PX}
            x={vertical ? 0 : layer.offset}
            y={vertical ? layer.offset : 0}
          >
            <path d={layer.paths[orientation]} className={LOGIN_CLOUD_TONE_CLASS[layer.tone]} />
          </pattern>
        ))}
      </defs>
      {LOGIN_CLOUD_LAYERS.map((layer) => (
        <rect key={layer.id} width="100%" height="100%" fill={`url(#${id}-${layer.id})`} />
      ))}
    </svg>
  );
}
