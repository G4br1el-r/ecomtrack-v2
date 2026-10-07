import type { PagedFilters } from "@/@types/Modules/Core/Api/paged-filters";

export type SupplierProductsFilters = PagedFilters & { IntegrationId?: string; IncludeIntegrated?: boolean };
