import { z } from "zod";

export function pagedResultSchema<TItem extends z.ZodType, TMetadata extends z.ZodType>(
  item: TItem,
  metadata: TMetadata,
) {
  return z.object({
    items: z.array(item),
    metadata,
    page: z.number(),
    pageSize: z.number(),
    totalCount: z.number(),
    totalPages: z.number(),
    hasPreviousPage: z.boolean(),
    hasNextPage: z.boolean(),
  });
}
