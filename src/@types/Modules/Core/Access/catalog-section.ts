import type { CatalogPage } from "@/schemas/Modules/Core/Access/catalog-page-schema";

export type CatalogSection = {
  name: string;
  pages: CatalogPage[];
};
