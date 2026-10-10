"use client";

import { Circle, type LucideProps } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";

import { resolveLucideIconName } from "@/lib/Modules/Core/DesignSystem/resolve-lucide-icon-name";

type LucideIconProps = Omit<LucideProps, "ref" | "name"> & {
  name: string | null | undefined;
  fallback?: React.ComponentType<LucideProps>;
};

export function LucideIcon({ name, fallback: Fallback = Circle, ...props }: LucideIconProps) {
  const iconName = resolveLucideIconName(name);
  if (!iconName) return <Fallback {...props} />;
  return <DynamicIcon name={iconName} fallback={() => <Fallback {...props} />} {...props} />;
}
