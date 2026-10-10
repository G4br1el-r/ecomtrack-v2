import type { GenerateAiTaskRequest } from "@/@types/Modules/Administracao/AgentesIA/generate-ai-task-request";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type AiGeneration, aiGenerationSchema } from "@/schemas/Modules/Administracao/AgentesIA/ai-generation-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function generateAiTask({ key, ...body }: GenerateAiTaskRequest): Promise<AiGeneration> {
  return requestApi(API_ENDPOINTS.aiTasks.generate, aiGenerationSchema, { params: { key }, body });
}
