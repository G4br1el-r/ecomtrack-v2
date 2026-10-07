import { NAV_GROUPS, REPORT_LINKS } from "@/constants/Modules/Core/Shell/navigation";

export function getNavSlugs(): { slug: string[] }[] {
  const hrefs = [...NAV_GROUPS.flatMap((group) => group.items), ...REPORT_LINKS].map((item) => item.href);
  return hrefs.map((href) => ({ slug: href.split("/").filter(Boolean) }));
}
