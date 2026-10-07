import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";

export function CategoryCell({ path }: { path: string[] }) {
  const leaf = path.at(-1);
  if (leaf === undefined) return <span className="text-muted-foreground">{EMPTY_VALUE}</span>;
  return (
    <div className="flex min-w-0 flex-col" title={path.join(" › ")}>
      <span className="truncate text-sm">{leaf}</span>
      {path.length > 1 ? (
        <span className="truncate text-[11px] text-muted-foreground">{path.slice(0, -1).join(" › ")}</span>
      ) : null}
    </div>
  );
}
