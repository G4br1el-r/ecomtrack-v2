import { endOfMonth, isSameDay, isSameMonth, startOfMonth } from "date-fns";

export function isFullMonth(from: Date, to: Date): boolean {
  return isSameMonth(from, to) && isSameDay(from, startOfMonth(from)) && isSameDay(to, endOfMonth(to));
}
