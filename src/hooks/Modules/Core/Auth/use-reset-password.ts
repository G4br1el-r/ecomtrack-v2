"use client";

import { useMutation } from "@tanstack/react-query";

import { resetPassword } from "@/services/Modules/Core/Auth/reset-password";

export function useResetPassword() {
  return useMutation({ mutationFn: resetPassword });
}
