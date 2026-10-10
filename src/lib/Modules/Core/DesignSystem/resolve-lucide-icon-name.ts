import { type IconName, iconNames } from "lucide-react/dynamic";

const ICON_NAMES = new Set<string>(iconNames);

export function resolveLucideIconName(name: string | null | undefined): IconName | null {
  if (!name) return null;
  const normalized = name
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([a-zA-Z])([0-9])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
  return ICON_NAMES.has(normalized) ? (normalized as IconName) : null;
}
