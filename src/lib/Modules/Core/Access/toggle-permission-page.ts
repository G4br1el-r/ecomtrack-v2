import type { PermissionSelection } from "@/@types/Modules/Core/Access/permission-selection";
import type { CatalogPage } from "@/schemas/Modules/Core/Access/catalog-page-schema";

export function togglePermissionPage(
  selection: PermissionSelection,
  page: CatalogPage,
  checked: boolean,
): PermissionSelection {
  if (checked) {
    return selection.pages.includes(page.code) ? selection : { ...selection, pages: [...selection.pages, page.code] };
  }
  const pageComponents = new Set(page.components.map((component) => component.code));
  return {
    pages: selection.pages.filter((code) => code !== page.code),
    components: selection.components.filter((code) => !pageComponents.has(code)),
  };
}
