export function buildGenerationVariables(values: Record<string, string>): Record<string, string | null> {
  return Object.fromEntries(Object.entries(values).map(([name, value]) => [name, value.trim() || null]));
}
