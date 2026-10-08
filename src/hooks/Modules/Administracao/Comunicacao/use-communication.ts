"use client";

import { useQuery } from "@tanstack/react-query";

import { COMMUNICATION_QUERY_KEY } from "@/constants/Modules/Administracao/Comunicacao/communication";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { getCommunication } from "@/services/Modules/Administracao/Comunicacao/get-communication";

export function useCommunication() {
  return useQuery({ ...QUERY_CACHE_POLICY.reference, queryKey: COMMUNICATION_QUERY_KEY, queryFn: getCommunication });
}
