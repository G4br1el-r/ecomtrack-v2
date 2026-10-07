"use client";

import { useQuery } from "@tanstack/react-query";

import { COMMUNICATION_QUERY_KEY } from "@/constants/Modules/Administracao/Comunicacao/communication";
import { getCommunication } from "@/services/Modules/Administracao/Comunicacao/get-communication";

export function useCommunication() {
  return useQuery({ queryKey: COMMUNICATION_QUERY_KEY, queryFn: getCommunication });
}
