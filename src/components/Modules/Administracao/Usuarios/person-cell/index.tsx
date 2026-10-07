import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/Modules/Core/Shell/get-initials";

export function PersonCell({ name, email, avatarUrl }: { name: string; email: string; avatarUrl?: string | null }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5" title={`${name} · ${email}`}>
      <Avatar className="size-8 shrink-0">
        {avatarUrl ? <AvatarImage src={avatarUrl} alt="" /> : null}
        <AvatarFallback className="font-medium text-[11px]">{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate font-medium text-sm">{name}</p>
        <p className="truncate text-muted-foreground text-xs">{email}</p>
      </div>
    </div>
  );
}
