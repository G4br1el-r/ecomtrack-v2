import type { RemovalResult } from "@/@types/Modules/Core/DesignSystem/removed-item";

export function removeById<T extends { id: string }>(list: T[], id: string): RemovalResult<T> {
  const index = list.findIndex((item) => item.id === id);
  const item = list[index];
  if (item === undefined) return { list, removed: null };
  return { list: list.filter((entry) => entry.id !== id), removed: { item, index } };
}
