import type { PermissionSelection } from "@/@types/Modules/Core/Access/permission-selection";

export function togglePermissionComponent(
  selection: PermissionSelection,
  pageCode: string,
  componentCode: string,
  checked: boolean,
): PermissionSelection {
  if (!checked) return { ...selection, components: selection.components.filter((code) => code !== componentCode) };
  return {
    pages: selection.pages.includes(pageCode) ? selection.pages : [...selection.pages, pageCode],
    components: selection.components.includes(componentCode)
      ? selection.components
      : [...selection.components, componentCode],
  };
}
