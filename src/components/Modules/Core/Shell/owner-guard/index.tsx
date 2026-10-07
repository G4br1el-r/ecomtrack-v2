"use client";

import { ShieldAlert } from "lucide-react";

import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

export function OwnerGuard({ children }: { children: React.ReactNode }) {
  const isOwner = useSessionStore((state) => state.user?.isPlatformOwner ?? false);
  if (isOwner) return children;
  return (
    <EmptyState
      illustration={<ShieldAlert className="size-10 text-muted-foreground" aria-hidden="true" />}
      title="Área da plataforma"
      description="Só o Owner da plataforma gerencia empresas e planos."
    />
  );
}
