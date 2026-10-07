import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";

export function stringifyAuditValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return EMPTY_VALUE;
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(value);
}
