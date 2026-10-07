"use client";

import { useQuery } from "@tanstack/react-query";

import { INVITE_QUERY_KEY } from "@/constants/Modules/Core/Auth/auth";
import { getInvite } from "@/services/Modules/Core/Auth/get-invite";

export function useInvite(token: string) {
  return useQuery({ queryKey: [...INVITE_QUERY_KEY, token], queryFn: () => getInvite(token), retry: false });
}
