import { ShareBar } from "@/components/Modules/VisaoGeral/Dashboard/share-bar";
import { cn } from "@/lib/utils";

export function StateRankRow({
  rank,
  name,
  value,
  detail,
  share,
  maxShare,
  active,
  onActivate,
  onDeactivate,
}: {
  rank: number;
  name: string;
  value: string;
  detail: string;
  share: number;
  maxShare: number;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={active}
        onPointerEnter={onActivate}
        onPointerLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
        className={cn(
          "grid w-full grid-cols-[1.5rem_1fr_auto] items-center gap-x-3 gap-y-1.5 rounded-md px-2 py-2 text-left transition-colors outline-none hover:bg-accent/60 focus-visible:ring-[3px] focus-visible:ring-ring/50 active:bg-accent",
          active && "bg-accent/60",
        )}
      >
        <span className="text-xs text-muted-foreground tabular-nums">{rank}</span>
        <span className="truncate text-sm font-medium">{name}</span>
        <span className="text-sm font-semibold tabular-nums">{value}</span>
        <span />
        <ShareBar value={share} max={maxShare} />
        <span className="text-right text-xs text-muted-foreground tabular-nums">{detail}</span>
      </button>
    </li>
  );
}
