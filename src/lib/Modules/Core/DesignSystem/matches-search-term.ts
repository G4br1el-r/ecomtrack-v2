import { normalizeSearchText } from "./normalize-search-text";

export function matchesSearchTerm(fields: string[], term: string): boolean {
  const needle = normalizeSearchText(term);
  if (!needle) return true;
  return fields.some((field) => normalizeSearchText(field).includes(needle));
}
