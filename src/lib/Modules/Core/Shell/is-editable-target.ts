import { EDITABLE_TAG_NAMES } from "@/constants/Modules/Core/Shell/hotkeys";

export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || EDITABLE_TAG_NAMES.includes(target.tagName);
}
