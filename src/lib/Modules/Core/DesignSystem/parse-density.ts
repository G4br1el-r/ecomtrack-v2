import type { Density } from "@/@types/Modules/Core/DesignSystem/density";
import { DEFAULT_DENSITY, DENSITIES } from "@/constants/Modules/Core/DesignSystem/density";

export function parseDensity(value: unknown): Density {
  return DENSITIES.find((density) => density === value) ?? DEFAULT_DENSITY;
}
