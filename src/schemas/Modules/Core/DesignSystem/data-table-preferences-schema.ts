import { z } from "zod";

import { DATA_TABLE_FEATURE_KEYS } from "@/constants/Modules/Core/DesignSystem/data-table";

export const dataTablePreferencesSchema = z.object({
  features: z.partialRecord(z.enum(DATA_TABLE_FEATURE_KEYS), z.boolean()).optional().catch(undefined),
  columnOrder: z.array(z.string()).optional().catch(undefined),
  columnVisibility: z.record(z.string(), z.boolean()).optional().catch(undefined),
  columnSizing: z.record(z.string(), z.number().nonnegative()).optional().catch(undefined),
  pageSize: z.number().int().positive().optional().catch(undefined),
});

export const dataTablePreferencesMapSchema = z.record(z.string(), dataTablePreferencesSchema);

export type DataTablePreferences = z.infer<typeof dataTablePreferencesSchema>;
