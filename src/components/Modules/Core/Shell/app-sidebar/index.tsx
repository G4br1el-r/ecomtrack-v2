import { Sidebar, SidebarFooter } from "@/components/ui/sidebar";

import { SidebarBrand } from "../sidebar-brand";
import { SidebarMenuSections } from "../sidebar-menu-sections";
import { SidebarScrollArea } from "../sidebar-scroll-area";
import { UserMenu } from "../user-menu";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarBrand />
      <SidebarScrollArea>
        <SidebarMenuSections />
      </SidebarScrollArea>
      <SidebarFooter className="border-t">
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
