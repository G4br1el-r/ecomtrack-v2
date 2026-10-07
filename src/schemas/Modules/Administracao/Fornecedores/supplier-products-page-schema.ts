import { z } from "zod";

import { pagedResultSchema } from "@/schemas/Modules/Core/Api/paged-result-schema";

import { supplierProductSchema } from "./supplier-product-schema";

export const supplierProductsPageSchema = pagedResultSchema(
  supplierProductSchema,
  z.object({ available: z.number(), integrated: z.number() }),
);

export type SupplierProductsPage = z.infer<typeof supplierProductsPageSchema>;
