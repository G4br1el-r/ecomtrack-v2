import Link from "next/link";

import { SidebarHeader } from "@/components/ui/sidebar";
import { APP_NAME, HOME_HREF } from "@/constants/Modules/Core/Shell/navigation";

import { SidebarToggle } from "../sidebar-toggle";

export function SidebarBrand() {
  return (
    <SidebarHeader className="h-14 flex-row items-center gap-0 border-b px-2 group-data-[collapsible=icon]:justify-center">
      <Link
        href={HOME_HREF}
        className="min-w-0 flex-1 truncate pl-1 text-xl font-bold text-primary transition-[opacity,visibility] duration-200 ease-linear group-data-[collapsible=icon]:invisible group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:flex-none group-data-[collapsible=icon]:pl-0 group-data-[collapsible=icon]:opacity-0"
      >
        {APP_NAME}
      </Link>
      <SidebarToggle />
    </SidebarHeader>
  );
}
