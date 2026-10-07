import { SCROLL_END_THRESHOLD_PX } from "@/constants/Modules/Core/Shell/sidebar";

export function isScrolledToEnd({
  scrollTop,
  scrollHeight,
  clientHeight,
}: Pick<HTMLElement, "scrollTop" | "scrollHeight" | "clientHeight">): boolean {
  const scrollable = scrollHeight - clientHeight;
  return scrollable <= SCROLL_END_THRESHOLD_PX || scrollTop >= scrollable - SCROLL_END_THRESHOLD_PX;
}
