import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NAV_GROUPS } from "@/constants/Modules/Core/Shell/navigation";
import { getPageEndpoints } from "@/lib/Modules/Core/Shell/get-page-endpoints";
import { OwnerOnly } from "../owner-only";
import { SidebarBrand } from "../sidebar-brand";
import { SidebarNavItem } from "../sidebar-nav-item";
import { SidebarScrollArea } from "../sidebar-scroll-area";
import { UserMenu } from "../user-menu";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarBrand />
      <SidebarScrollArea>
        {NAV_GROUPS.map((group) => {
          const content = (
            <SidebarGroup key={group.label} className="px-2 py-1">
              <SidebarGroupLabel className="h-7 group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:-mt-7">
                {group.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5 transition-[gap] duration-200 ease-linear group-data-[collapsible=icon]:gap-0">
                  {group.items.map(({ title, href, badge, icon: Icon }) => (
                    <SidebarNavItem
                      key={href}
                      title={title}
                      href={href}
                      badge={badge}
                      icon={<Icon aria-hidden="true" />}
                      integrated={getPageEndpoints(href).page.length > 0}
                    />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
          return group.ownerOnly ? <OwnerOnly key={group.label}>{content}</OwnerOnly> : content;
        })}
      </SidebarScrollArea>
      <SidebarFooter className="border-t">
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
