import { apiErrorSchema } from "@/schemas/Modules/Core/Api/api-error-schema";

export async function readApiErrorCode(response: Response | null): Promise<string | undefined> {
  if (!response || response.ok) return undefined;
  const payload: unknown = await response
    .clone()
    .json()
    .catch(() => null);
  const parsed = apiErrorSchema.safeParse(payload);
  return parsed.success ? parsed.data.code : undefined;
}
