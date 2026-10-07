import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

export function InlineEditButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button variant="ghost" size="icon-xs" aria-label={label} onClick={onClick}>
      <Pencil className="text-muted-foreground" aria-hidden="true" />
    </Button>
  );
}
