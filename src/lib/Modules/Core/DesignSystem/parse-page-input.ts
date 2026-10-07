import { FIRST_PAGE } from "@/constants/Modules/Core/DesignSystem/ui";

const DIGITS_ONLY = /^\d+$/;

export function parsePageInput(value: string, totalPages: number): number | null {
  const trimmed = value.trim();
  if (!DIGITS_ONLY.test(trimmed)) return null;
  const page = Number(trimmed);
  if (page < FIRST_PAGE || page > totalPages) return null;
  return page;
}
