import type { CodeSlotPosition } from "@/@types/Modules/Core/Auth/code-slot-position";
import { CODE_CIRCLE_RADIUS_PX, CODE_CIRCLE_START_ANGLE_DEGREES } from "@/constants/Modules/Core/Auth/login-success";
import { CODE_SLOT_GAP_PX, CODE_SLOT_SIZE_PX } from "@/constants/Modules/Core/DesignSystem/code-input";

const FULL_TURN_DEGREES = 360;
const HALF_TURN_DEGREES = 180;
const HALF = 2;

export function getCodeSlotPositions(count: number): CodeSlotPosition[] {
  const step = CODE_SLOT_SIZE_PX + CODE_SLOT_GAP_PX;
  const center = (count - 1) / HALF;
  return Array.from({ length: count }, (_, index) => {
    const angle =
      ((CODE_CIRCLE_START_ANGLE_DEGREES + (FULL_TURN_DEGREES / count) * index) * Math.PI) / HALF_TURN_DEGREES;
    return {
      rowX: (index - center) * step,
      circleX: Math.round(Math.cos(angle) * CODE_CIRCLE_RADIUS_PX),
      circleY: Math.round(Math.sin(angle) * CODE_CIRCLE_RADIUS_PX),
    };
  });
}
