import type { DataTableFeature, DataTableFeatureFlags } from "@/@types/Modules/Core/DesignSystem/data-table";

export function resolveDataTableFeatures(
  declared: Partial<DataTableFeatureFlags>,
  stored: Partial<DataTableFeatureFlags> = {},
): DataTableFeatureFlags {
  const resolve = (feature: DataTableFeature) =>
    declared[feature] === undefined ? false : (stored[feature] ?? declared[feature]);
  return {
    sorting: resolve("sorting"),
    columnResizing: resolve("columnResizing"),
    expanding: resolve("expanding"),
    rowPinning: resolve("rowPinning"),
  };
}
