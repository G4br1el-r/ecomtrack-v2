"use client";

import { Lock } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { SIDEBAR_LOCKED_LABEL } from "@/constants/Modules/Core/Shell/sidebar";
import { useNavItemActive } from "@/hooks/Modules/Core/Shell/use-nav-item-active";
import { cn } from "@/lib/utils";

export function SidebarNavItem({
  title,
  href,
  badge,
  icon,
  integrated = false,
  locked = false,
}: {
  title: string;
  href: string;
  badge?: string;
  icon: React.ReactNode;
  integrated?: boolean;
  locked?: boolean;
}) {
  const { isActive, markPending } = useNavItemActive(href);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    markPending();
  };

  if (locked) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          aria-disabled="true"
          tooltip={`${title} · ${SIDEBAR_LOCKED_LABEL}`}
          className="cursor-not-allowed text-sidebar-foreground/40 hover:bg-transparent hover:text-sidebar-foreground/40 active:bg-transparent"
        >
          <span className="grid place-items-center">{icon}</span>
          <span>{title}</span>
          <Lock className="ml-auto size-3" aria-label={SIDEBAR_LOCKED_LABEL} />
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      {isActive ? (
        <motion.span
          aria-hidden="true"
          layoutId="sidebar-active-item"
          transition={SPRING_SNAPPY}
          className="absolute inset-0 rounded-md bg-sidebar-accent"
        />
      ) : null}
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={title}
        data-integrated={integrated || undefined}
        className={cn(
          "relative text-sidebar-foreground/70 transition-[width,height,padding,color] hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent data-active:bg-transparent data-active:text-sidebar-accent-foreground",
          integrated && "text-info/80 hover:text-info data-active:text-info",
        )}
      >
        <Link href={href} onClick={handleClick}>
          <span className="grid place-items-center">{icon}</span>
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
      {badge ? <SidebarMenuBadge className="tabular-nums">{badge}</SidebarMenuBadge> : null}
    </SidebarMenuItem>
  );
}
