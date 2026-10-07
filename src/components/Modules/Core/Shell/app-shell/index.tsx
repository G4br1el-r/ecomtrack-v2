import { cookies } from "next/headers";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SIDEBAR_COOKIE_NAME, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from "@/constants/Modules/Core/Shell/sidebar";

import { AppSidebar } from "../app-sidebar";
import { AppTopbar } from "../app-topbar";
import { CommandPalette } from "../command-palette";
import { ViewAsBanner } from "../view-as-banner";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value !== "false";
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <ViewAsBanner />
        <AppTopbar />
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      </SidebarInset>
      <CommandPalette />
    </SidebarProvider>
  );
}
