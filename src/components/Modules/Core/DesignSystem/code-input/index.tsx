"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { CODE_SLOT_GAP_PX, CODE_SLOT_SIZE_PX } from "@/constants/Modules/Core/DesignSystem/code-input";

export function CodeInput({
  length,
  invalid,
  ...props
}: Omit<React.ComponentProps<typeof InputOTP>, "maxLength" | "render" | "children" | "pattern"> & {
  length: number;
  invalid?: boolean;
}) {
  return (
    <InputOTP
      maxLength={length}
      pattern={REGEXP_ONLY_DIGITS}
      inputMode="numeric"
      aria-invalid={invalid ? true : undefined}
      containerClassName="justify-center"
      {...props}
    >
      <InputOTPGroup style={{ gap: CODE_SLOT_GAP_PX }}>
        {Array.from({ length }, (_, position) => position).map((slot) => (
          <InputOTPSlot
            key={slot}
            index={slot}
            aria-invalid={invalid ? true : undefined}
            className="rounded-md border font-mono text-lg first:rounded-md last:rounded-md"
            style={{ width: CODE_SLOT_SIZE_PX, height: CODE_SLOT_SIZE_PX }}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
