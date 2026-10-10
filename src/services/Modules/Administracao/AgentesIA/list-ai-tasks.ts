import { z } from "zod";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type AiTask, aiTaskSchema } from "@/schemas/Modules/Administracao/AgentesIA/ai-task-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function listAiTasks(): Promise<AiTask[]> {
  return requestApi(API_ENDPOINTS.aiTasks.list, z.array(aiTaskSchema));
}
