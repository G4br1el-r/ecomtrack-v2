import type { PageRange } from "@/@types/Modules/Core/DesignSystem/page-range";
import { FIRST_PAGE } from "@/constants/Modules/Core/DesignSystem/ui";

export function getPageRange(currentPage: number, itemsPerPage: number, totalItems: number): PageRange {
  if (totalItems <= 0) return { start: 0, end: 0 };
  const start = (currentPage - FIRST_PAGE) * itemsPerPage + FIRST_PAGE;
  const end = Math.min(currentPage * itemsPerPage, totalItems);
  return { start, end };
}
