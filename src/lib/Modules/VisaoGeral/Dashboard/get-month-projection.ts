import type { MonthlyGoal } from "@/@types/Modules/VisaoGeral/Dashboard/monthly-goal";

export function getMonthProjection({ achieved, daysElapsed, daysInMonth }: MonthlyGoal): number {
  if (daysElapsed === 0) return 0;
  return (achieved / daysElapsed) * daysInMonth;
}
