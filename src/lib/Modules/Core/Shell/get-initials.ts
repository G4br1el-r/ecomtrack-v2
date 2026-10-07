import { INITIALS_LENGTH } from "@/constants/Modules/Core/Shell/initials";

export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? [words[0][0], words[words.length - 1][0]] : [...(words[0] ?? "")];
  return letters.slice(0, INITIALS_LENGTH).join("").toUpperCase();
}
