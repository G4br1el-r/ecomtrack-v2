import { SidebarTrigger } from "@/components/ui/sidebar";

import { CommandPaletteTrigger } from "../command-palette-trigger";
import { CompanySwitcher } from "../company-switcher";
import { DevEndpointsButton } from "../dev-endpoints-button";
import { NotificationsMenu } from "../notifications-menu";
import { ThemeToggle } from "../theme-toggle";
import { TopbarBreadcrumbs } from "../topbar-breadcrumbs";

export function AppTopbar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
      <SidebarTrigger className="md:hidden" />
      <div className="min-w-0 flex-1 truncate">
        <TopbarBreadcrumbs />
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <CompanySwitcher />
        <DevEndpointsButton />
        <CommandPaletteTrigger />
        <NotificationsMenu />
        <ThemeToggle />
      </div>
    </header>
  );
}
