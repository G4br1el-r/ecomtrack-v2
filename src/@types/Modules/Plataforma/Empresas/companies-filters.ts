import type { PagedFilters } from "@/@types/Modules/Core/Api/paged-filters";
import type { CompanyStatus } from "@/schemas/Modules/Plataforma/Empresas/company-schema";

export type CompaniesFilters = PagedFilters & { Status?: CompanyStatus };
