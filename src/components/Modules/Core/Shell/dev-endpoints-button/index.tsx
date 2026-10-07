"use client";

import { CodeXml } from "lucide-react";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/animate-ui/components/radix/popover";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPageEndpoints } from "@/lib/Modules/Core/Shell/get-page-endpoints";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";

import { DevEndpointItem } from "../dev-endpoint-item";

export function DevEndpointsButton() {
  const isOwner = useSessionStore((state) => state.user?.isPlatformOwner ?? false);
  const pathname = usePathname();
  if (!isOwner) return null;

  const { page, shell } = getPageEndpoints(pathname);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={`Endpoints da API nesta página: ${page.length}`}
          className="relative size-8 rounded-full"
        >
          <CodeXml aria-hidden="true" />
          {page.length > 0 ? (
            <span
              aria-hidden="true"
              className="absolute -top-1.5 -right-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 font-medium text-[10px] text-primary-foreground tabular-nums"
            >
              {page.length}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(28rem,calc(100vw-2rem))] p-0">
        <div className="border-b px-4 py-3">
          <p className="font-medium text-sm">Endpoints da API</p>
          <p className="truncate font-mono text-muted-foreground text-xs">{pathname}</p>
        </div>
        <ScrollArea className="[&>[data-slot=scroll-area-viewport]]:max-h-[min(32rem,70vh)]">
          <section aria-label="Nesta página" className="p-2">
            <h3 className="px-2 pt-1 pb-1.5 font-medium text-muted-foreground text-xs">Nesta página ({page.length})</h3>
            {page.length > 0 ? (
              <ul className="space-y-0.5">
                {page.map((endpoint) => (
                  <DevEndpointItem key={endpoint.key} endpoint={endpoint} />
                ))}
              </ul>
            ) : (
              <EmptyState
                className="min-h-0 py-4"
                illustration={null}
                title="Nenhum endpoint nesta página"
                description="Esta página ainda usa dados simulados."
              />
            )}
          </section>
          <section aria-label="Em todas as páginas" className="border-t p-2">
            <h3 className="px-2 pt-1 pb-1.5 font-medium text-muted-foreground text-xs">
              Em todas as páginas ({shell.length})
            </h3>
            <ul className="space-y-0.5">
              {shell.map((endpoint) => (
                <DevEndpointItem key={endpoint.key} endpoint={endpoint} />
              ))}
            </ul>
          </section>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
