"use client";

import { CODE_FAILURE_DROP } from "@/constants/Modules/Core/Auth/code-feedback";
import { getCodeSlotOffsets } from "@/lib/Modules/Core/Auth/get-code-slot-offsets";

import { CodeRow } from "../code-row";
import { CodeSlot } from "../code-slot";

const EVEN = 2;

export function LoginFailureAnimation({ code, onComplete }: { code: string; onComplete: () => void }) {
  const digits = [...code];
  const offsets = getCodeSlotOffsets(digits.length);
  const lastIndex = digits.length - 1;

  return (
    <CodeRow aria-hidden="true">
      {offsets.map((offset, index) => (
        <CodeSlot
          key={offset}
          digit={digits[index]}
          tone="error"
          digitProps={{
            animate: {
              y: CODE_FAILURE_DROP.fallPx,
              rotate: index % EVEN === 0 ? CODE_FAILURE_DROP.tiltDegrees : -CODE_FAILURE_DROP.tiltDegrees,
              opacity: 0,
            },
            transition: {
              delay: CODE_FAILURE_DROP.delaySeconds + index * CODE_FAILURE_DROP.staggerSeconds,
              duration: CODE_FAILURE_DROP.durationSeconds,
              ease: [...CODE_FAILURE_DROP.ease],
            },
            onAnimationComplete: index === lastIndex ? onComplete : undefined,
          }}
        />
      ))}
    </CodeRow>
  );
}
