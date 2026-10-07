import type { Granularity } from "@/@types/Modules/VisaoGeral/Dashboard/granularity";
import { GRANULARITIES } from "@/constants/Modules/VisaoGeral/Dashboard/granularity";

export function isGranularity(value: unknown): value is Granularity {
  return GRANULARITIES.some((granularity) => granularity === value);
}
