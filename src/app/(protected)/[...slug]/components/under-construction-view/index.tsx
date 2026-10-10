"use client";

import { Construction } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { LucideIcon } from "@/components/Modules/Core/DesignSystem/lucide-icon";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { NOT_FOUND_ROUTE } from "@/constants/Modules/Core/Shell/not-found";
import { usePermissionMenu } from "@/hooks/Modules/Core/Access/use-permission-menu";
import { findMenuEntry } from "@/lib/Modules/Core/Shell/find-menu-entry";

import { ConstructionBlueprint } from "../construction-blueprint";
import { StatusIllustration } from "../status-illustration";
import { StatusScreen } from "../status-screen";

export function UnderConstructionView() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: menu, isPending } = usePermissionMenu();
  const entry = findMenuEntry(menu, pathname);
  const missing = !isPending && !entry;

  useEffect(() => {
    if (missing) router.replace(NOT_FOUND_ROUTE);
  }, [missing, router]);

  if (!entry) {
    return (
      <div className="flex flex-1 items-center justify-center p-8" aria-busy="true">
        <Skeleton className="h-64 w-full max-w-md rounded-xl" />
      </div>
    );
  }

  return (
    <StatusScreen
      illustration={
        <StatusIllustration icon={<LucideIcon name={entry.page.icon} fallback={Construction} />}>
          <ConstructionBlueprint label={entry.page.name} />
        </StatusIllustration>
      }
      eyebrow={
        <Badge variant="warning" className="gap-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full rounded-full bg-current opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex size-1.5 rounded-full bg-current" />
          </span>
          Em construção
        </Badge>
      }
      title={`${entry.page.name} está a caminho`}
      description="Estamos reconstruindo esta tela no novo Ecomtrack, mais rápida e mais simples de usar. Em breve ela estará disponível aqui."
    />
  );
}
