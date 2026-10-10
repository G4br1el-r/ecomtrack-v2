"use client";

import { useQuery } from "@tanstack/react-query";

import { AI_TASKS_QUERY_KEY } from "@/constants/Modules/Administracao/AgentesIA/ai-agents";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { listAiTasks } from "@/services/Modules/Administracao/AgentesIA/list-ai-tasks";

export function useAiTasks() {
  return useQuery({ ...QUERY_CACHE_POLICY.static, queryKey: AI_TASKS_QUERY_KEY, queryFn: listAiTasks });
}
