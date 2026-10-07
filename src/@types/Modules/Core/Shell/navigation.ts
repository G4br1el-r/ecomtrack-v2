import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
  ownerOnly?: boolean;
};

export type ReportLink = {
  title: string;
  href: string;
};

export type Breadcrumb = {
  label: string;
  href?: string;
};

export type PendingNavigation = {
  href: string;
  from: string;
};

export type NavEntry = {
  title: string;
  groupLabel: string;
  groupHref?: string;
  icon?: LucideIcon;
};
