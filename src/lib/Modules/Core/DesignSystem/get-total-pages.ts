import { FIRST_PAGE } from "@/constants/Modules/Core/DesignSystem/ui";

export function getTotalPages(itemsPerPage: number, totalItems: number): number {
  if (totalItems <= 0) return FIRST_PAGE;
  return Math.ceil(totalItems / itemsPerPage);
}
