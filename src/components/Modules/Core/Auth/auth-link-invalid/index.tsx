import { LinkIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function AuthLinkInvalid({
  message,
  actionHref,
  actionLabel,
}: {
  message: string;
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-destructive-soft text-destructive">
        <LinkIcon aria-hidden="true" />
      </span>
      <p className="text-muted-foreground text-sm">{message}</p>
      <Button asChild className="w-full">
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  );
}
