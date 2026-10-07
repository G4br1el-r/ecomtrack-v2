import type { CatalogSection } from "@/@types/Modules/Core/Access/catalog-section";
import { NO_SECTION_LABEL } from "@/constants/Modules/Core/Access/access";
import type { CatalogPage } from "@/schemas/Modules/Core/Access/catalog-page-schema";

export function groupCatalogBySection(catalog: CatalogPage[]): CatalogSection[] {
  const sections = new Map<string, CatalogPage[]>();
  for (const page of [...catalog].sort((first, second) => first.sortOrder - second.sortOrder)) {
    const name = page.sectionName ?? NO_SECTION_LABEL;
    sections.set(name, [...(sections.get(name) ?? []), page]);
  }
  return [...sections].map(([name, pages]) => ({ name, pages }));
}
