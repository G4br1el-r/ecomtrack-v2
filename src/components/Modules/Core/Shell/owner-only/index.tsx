"use client";

import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

export function OwnerOnly({ children }: { children: React.ReactNode }) {
  const isOwner = useSessionStore((state) => state.user?.isPlatformOwner ?? false);
  return isOwner ? children : null;
}
