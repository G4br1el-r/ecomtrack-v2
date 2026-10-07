const DIACRITICS = /\p{Diacritic}/gu;

export function normalizeSearchText(value: string): string {
  return value.normalize("NFD").replace(DIACRITICS, "").toLowerCase().trim();
}
