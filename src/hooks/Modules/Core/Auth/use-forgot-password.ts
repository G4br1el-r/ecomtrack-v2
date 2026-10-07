"use client";

import { useMutation } from "@tanstack/react-query";

import { forgotPassword } from "@/services/Modules/Core/Auth/forgot-password";

export function useForgotPassword() {
  return useMutation({ mutationFn: forgotPassword });
}
