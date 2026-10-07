import type { NavEntry } from "@/@types/Modules/Core/Shell/navigation";
import { NAV_GROUPS, REPORT_LINKS } from "@/constants/Modules/Core/Shell/navigation";

const REPORTS_GROUP_LABEL = "Supervisão";
const REPORTS_HUB_HREF = "/relatorios/todos";

export function findNavEntry(pathname: string): NavEntry | null {
  for (const group of NAV_GROUPS) {
    const item = group.items.find((entry) => entry.href === pathname);
    if (item) return { title: item.title, groupLabel: group.label, icon: item.icon };
  }
  const report = REPORT_LINKS.find((entry) => entry.href === pathname);
  if (report) return { title: report.title, groupLabel: REPORTS_GROUP_LABEL, groupHref: REPORTS_HUB_HREF };
  return null;
}
