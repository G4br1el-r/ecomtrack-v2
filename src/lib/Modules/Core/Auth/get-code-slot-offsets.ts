import { CODE_SLOT_GAP_PX, CODE_SLOT_SIZE_PX } from "@/constants/Modules/Core/DesignSystem/code-input";

const HALF = 2;

export function getCodeSlotOffsets(count: number): number[] {
  const step = CODE_SLOT_SIZE_PX + CODE_SLOT_GAP_PX;
  const center = (count - 1) / HALF;
  return Array.from({ length: count }, (_, index) => (index - center) * step);
}
