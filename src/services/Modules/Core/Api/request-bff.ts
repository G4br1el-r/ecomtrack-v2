import type { z } from "zod";

import { parseApiResponse } from "./parse-api-response";

export async function requestBff<TSchema extends z.ZodType>(
  path: string,
  schema: TSchema,
  body?: unknown,
): Promise<z.infer<TSchema>> {
  const response = await fetch(path, {
    method: "POST",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  }).catch(() => null);
  return parseApiResponse(response, schema);
}
