"use client";

import { RotateCw } from "lucide-react";

import { LucideIcon } from "@/components/Modules/Core/DesignSystem/lucide-icon";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { NO_SECTION_LABEL } from "@/constants/Modules/Core/Access/access";
import { SIDEBAR_SKELETON_ITEMS } from "@/constants/Modules/Core/Shell/sidebar";
import { usePermissionMenu } from "@/hooks/Modules/Core/Access/use-permission-menu";
import { getPageEndpoints } from "@/lib/Modules/Core/Shell/get-page-endpoints";
import { getVisibleMenuSections } from "@/lib/Modules/Core/Shell/get-visible-menu-sections";

import { SidebarNavItem } from "../sidebar-nav-item";

export function SidebarMenuSections() {
  const { data, isPending, isError, refetch } = usePermissionMenu();

  if (isPending) {
    return (
      <SidebarGroup className="px-2 py-1" aria-busy="true" aria-label="Carregando menu">
        <SidebarMenu>
          {SIDEBAR_SKELETON_ITEMS.map((key) => (
            <SidebarMenuSkeleton key={key} showIcon />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  if (isError) {
    return (
      <SidebarGroup className="px-2 py-1 group-data-[collapsible=icon]:hidden">
        <p className="px-2 text-xs text-muted-foreground">Não foi possível carregar o menu.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-1 inline-flex cursor-pointer items-center gap-1.5 px-2 text-xs font-medium text-primary hover:underline focus-visible:underline focus-visible:outline-none"
        >
          <RotateCw className="size-3" aria-hidden="true" />
          Tentar de novo
        </button>
      </SidebarGroup>
    );
  }

  return getVisibleMenuSections(data).map((section) => (
    <SidebarGroup key={section.sectionId ?? NO_SECTION_LABEL} className="px-2 py-1">
      <SidebarGroupLabel className="h-7 gap-2 group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:-mt-7">
        {section.icon ? <LucideIcon name={section.icon} className="size-3.5" aria-hidden="true" /> : null}
        {section.name || NO_SECTION_LABEL}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5 transition-[gap] duration-200 ease-linear group-data-[collapsible=icon]:gap-0">
          {section.pages.map((page) => {
            const route = page.route ?? "";
            return (
              <SidebarNavItem
                key={page.id}
                title={page.name}
                href={route}
                icon={<LucideIcon name={page.icon} aria-hidden="true" />}
                integrated={getPageEndpoints(route).page.length > 0}
                locked={!page.enabled}
              />
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
}
