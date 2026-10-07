"use client";

import { usePathname } from "next/navigation";

export function CurrentPathname({ className }: { className?: string }) {
  const pathname = usePathname();
  return <span className={className}>{pathname}</span>;
}
