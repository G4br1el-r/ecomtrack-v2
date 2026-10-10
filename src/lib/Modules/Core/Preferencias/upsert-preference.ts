import type { UserPreference } from "@/schemas/Modules/Core/Preferencias/user-preference-schema";

export function upsertPreference(list: UserPreference[] | undefined, preference: UserPreference): UserPreference[] {
  const rest = (list ?? []).filter((item) => item.key !== preference.key);
  return [...rest, preference].sort((first, second) => first.key.localeCompare(second.key));
}
