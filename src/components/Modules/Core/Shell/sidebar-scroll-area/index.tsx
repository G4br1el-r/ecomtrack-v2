"use client";

import { SidebarContent } from "@/components/ui/sidebar";
import { useScrollEnd } from "@/hooks/Modules/Core/Shell/use-scroll-end";

export function SidebarScrollArea({ children }: { children: React.ReactNode }) {
  const { ref, atEnd } = useScrollEnd<HTMLDivElement>();
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <SidebarContent ref={ref} className="gap-1">
        {children}
      </SidebarContent>
      <div
        aria-hidden="true"
        data-visible={!atEnd}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-sidebar to-transparent opacity-0 transition-opacity duration-200 data-[visible=true]:opacity-100"
      />
    </div>
  );
}
