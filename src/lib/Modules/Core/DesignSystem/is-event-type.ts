import type { EventType } from "@/@types/Modules/Core/DesignSystem/event-type";
import { EVENT_TYPES } from "@/constants/Modules/Core/DesignSystem/event-types";

export function isEventType(value: string): value is EventType {
  return Object.hasOwn(EVENT_TYPES, value);
}
