"use client";

import { useMutation } from "@tanstack/react-query";

import { acceptInvite } from "@/services/Modules/Core/Auth/accept-invite";

export function useAcceptInvite() {
  return useMutation({ mutationFn: acceptInvite });
}
