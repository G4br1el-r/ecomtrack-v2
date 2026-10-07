import { Lock } from "lucide-react";

export function ActionLockedTag() {
  return (
    <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Lock className="size-3" aria-hidden="true" />
      Sem permissão
    </span>
  );
}
