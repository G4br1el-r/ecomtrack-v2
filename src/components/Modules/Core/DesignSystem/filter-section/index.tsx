import { RotateCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FilterSection({
  title,
  htmlFor,
  description,
  selectedCount = 0,
  onClear,
  children,
}: {
  title: string;
  htmlFor?: string;
  description?: string;
  selectedCount?: number;
  onClear?: () => void;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={title} className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-0.5">
          <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm font-medium">
            {title}
            {selectedCount > 0 ? (
              <Badge variant="secondary" className="tabular-nums">
                {selectedCount}
              </Badge>
            ) : null}
          </label>
          {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
        </div>
        {onClear ? (
          <Button
            variant="ghost"
            size="xs"
            className="-mt-0.5 -mr-1.5 shrink-0 text-muted-foreground hover:text-foreground"
            disabled={selectedCount === 0}
            aria-label={`Limpar ${title}`}
            onClick={onClear}
          >
            <RotateCcw data-icon="inline-start" aria-hidden="true" />
            Limpar
          </Button>
        ) : null}
      </div>
      {children}
    </section>
  );
}
