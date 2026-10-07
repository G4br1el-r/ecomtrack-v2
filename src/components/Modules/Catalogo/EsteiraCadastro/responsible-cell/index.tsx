import { UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/Modules/Core/Shell/get-initials";

export function ResponsibleCell({ name }: { name: string | null }) {
  if (name === null) {
    return (
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="grid size-7 place-items-center rounded-full border border-dashed">
          <UserRound className="size-3.5" aria-hidden="true" />
        </span>
        Sem responsável
      </span>
    );
  }
  return (
    <span className="flex min-w-0 items-center gap-2 text-sm">
      <Avatar className="size-7">
        <AvatarFallback className="text-[10px] font-medium">{getInitials(name)}</AvatarFallback>
      </Avatar>
      <span className="truncate">{name}</span>
    </span>
  );
}
