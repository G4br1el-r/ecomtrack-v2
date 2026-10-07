import type { RemovedItem } from "@/@types/Modules/Core/DesignSystem/removed-item";

export function restoreAt<T extends { id: string }>(list: T[], { item, index }: RemovedItem<T>): T[] {
  if (list.some((entry) => entry.id === item.id)) return list;
  const position = Math.min(Math.max(index, 0), list.length);
  return [...list.slice(0, position), item, ...list.slice(position)];
}
