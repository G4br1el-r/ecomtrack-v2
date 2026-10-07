"use client";

import { useQuery } from "@tanstack/react-query";

import { ME_QUERY_KEY } from "@/constants/Modules/Core/Conta/account";
import { getMe } from "@/services/Modules/Core/Conta/get-me";

export function useMe() {
  return useQuery({ queryKey: ME_QUERY_KEY, queryFn: getMe });
}
