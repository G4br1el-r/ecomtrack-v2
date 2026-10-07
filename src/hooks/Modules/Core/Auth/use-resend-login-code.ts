"use client";

import { useMutation } from "@tanstack/react-query";

import { resendLoginCode } from "@/services/Modules/Core/Auth/resend-login-code";

export function useResendLoginCode() {
  return useMutation({ mutationFn: resendLoginCode });
}
