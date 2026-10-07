import type { EventTypeConfig } from "@/@types/Modules/Core/DesignSystem/event-type";
import { EVENT_TYPES, FALLBACK_EVENT_TYPE } from "@/constants/Modules/Core/DesignSystem/event-types";

import { isEventType } from "./is-event-type";

export function getEventTypeConfig(type: string): EventTypeConfig {
  return isEventType(type) ? EVENT_TYPES[type] : EVENT_TYPES[FALLBACK_EVENT_TYPE];
}
