import { User } from "lucide-react";

import type { TimelineEvent } from "@/@types/Modules/Core/DesignSystem/timeline-event";
import { getEventTypeConfig } from "@/lib/Modules/Core/DesignSystem/get-event-type-config";
import { cn } from "@/lib/utils";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="space-y-1">
      {events.map((event, index) => {
        const config = getEventTypeConfig(event.type);
        const Icon = event.icon ?? config.icon;
        const isLast = index === events.length - 1;
        return (
          <li key={event.id} className="relative flex gap-3 pb-4">
            {isLast ? null : (
              <span aria-hidden="true" className="absolute top-8 bottom-0 left-3.5 w-px -translate-x-1/2 bg-border" />
            )}
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full bg-card ring-1 ring-border",
                config.colorClassName,
              )}
            >
              <Icon className="size-3.5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium wrap-anywhere">{event.description}</p>
              <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <span>{event.meta}</span>
                {event.author ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <User className="size-3" aria-hidden="true" />
                      {event.author}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
