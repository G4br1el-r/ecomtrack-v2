import { FILE_SIZE_DECIMALS, FILE_SIZE_UNIT_STEP, FILE_SIZE_UNITS } from "@/constants/Modules/Core/DesignSystem/upload";

export function formatFileSize(bytes: number): string {
  let value = bytes;
  let unitIndex = 0;
  while (value >= FILE_SIZE_UNIT_STEP && unitIndex < FILE_SIZE_UNITS.length - 1) {
    value /= FILE_SIZE_UNIT_STEP;
    unitIndex += 1;
  }
  const decimals = unitIndex === 0 ? 0 : FILE_SIZE_DECIMALS;
  return `${value.toLocaleString("pt-BR", { maximumFractionDigits: decimals })} ${FILE_SIZE_UNITS[unitIndex]}`;
}
