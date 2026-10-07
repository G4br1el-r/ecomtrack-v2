import { Check, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function IntegrationCell({ brandLinked, categoryLinked }: { brandLinked: boolean; categoryLinked: boolean }) {
  const items = [
    { id: "brand", label: "Marca", linked: brandLinked },
    { id: "category", label: "Categoria", linked: categoryLinked },
  ];
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => {
        const Icon = item.linked ? Check : X;
        return (
          <Badge
            key={item.id}
            variant={item.linked ? "success" : "destructive"}
            aria-label={`${item.label} ${item.linked ? "integrada" : "não integrada"}`}
          >
            <Icon data-icon="inline-start" aria-hidden="true" />
            {item.label}
          </Badge>
        );
      })}
    </div>
  );
}
