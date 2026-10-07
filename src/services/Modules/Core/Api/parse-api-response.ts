import type { z } from "zod";

import { API_UNAVAILABLE_ERROR, API_UNEXPECTED_ERROR_MESSAGE, HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { apiErrorSchema } from "@/schemas/Modules/Core/Api/api-error-schema";

export async function parseApiResponse<TSchema extends z.ZodType>(
  response: Response | null,
  schema: TSchema,
): Promise<z.infer<TSchema>> {
  if (!response) throw new Error(API_UNAVAILABLE_ERROR.message, { cause: { status: HTTP_STATUS.badGateway } });

  const payload: unknown = response.status === HTTP_STATUS.noContent ? null : await response.json().catch(() => null);

  if (!response.ok) {
    const apiError = apiErrorSchema.safeParse(payload);
    throw new Error(apiError.success ? apiError.data.message : API_UNEXPECTED_ERROR_MESSAGE, {
      cause: {
        status: response.status,
        code: apiError.success ? apiError.data.code : undefined,
        errors: apiError.success ? (apiError.data.errors ?? undefined) : undefined,
      },
    });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) throw new Error(API_UNEXPECTED_ERROR_MESSAGE, { cause: { status: response.status } });
  return parsed.data;
}
