import { cn } from "@/lib/utils";

import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";
import { COLOR_GROUPS } from "../../mocks/tokens";

export function ColorsSection() {
  return (
    <Showcase
      id="cores"
      title="Cores"
      description="Sempre o token semântico. Nunca cor crua do Tailwind (bg-green-100, text-red-600, bg-white)."
    >
      {COLOR_GROUPS.map((group) => (
        <Specimen
          key={group.title}
          title={group.title}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {group.tokens.map((token) => (
            <div key={token.name} className="flex min-w-0 items-center gap-3">
              <span
                className={cn(
                  "size-9 shrink-0 rounded-lg shadow-xs ring-1 ring-foreground/10 ring-inset",
                  token.className,
                )}
              />
              <div className="min-w-0">
                <p className="truncate font-mono text-xs font-medium">{token.name}</p>
                <p className="truncate text-xs text-muted-foreground">{token.usage}</p>
              </div>
            </div>
          ))}
        </Specimen>
      ))}
    </Showcase>
  );
}
