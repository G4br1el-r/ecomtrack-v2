import { z } from "zod";

export const catalogPageSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  sectionName: z.string().nullable(),
  sortOrder: z.number(),
  components: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      description: z.string().nullable(),
      icon: z.string().nullable(),
    }),
  ),
});

export type CatalogPage = z.infer<typeof catalogPageSchema>;
