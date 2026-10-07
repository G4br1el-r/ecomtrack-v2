import { CheckCircle2, Clock, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";
import { FilterChipsDemo } from "../../demos/filter-chips-demo";
import { ORDER_STATUS_TONE } from "../../mocks/orders";

const TONES = [
  "default",
  "secondary",
  "outline",
  "success",
  "warning",
  "destructive",
  "info",
  "purple",
  "orange",
  "teal",
] as const;

export function BadgesSection() {
  return (
    <Showcase
      id="badges"
      title="Badges"
      description="Status sempre pela variante. Substitui as combinações soltas bg-green-100 text-green-700 dark:bg-green-900/30."
    >
      <Specimen title="Variantes">
        {TONES.map((tone) => (
          <Badge key={tone} variant={tone}>
            {tone}
          </Badge>
        ))}
      </Specimen>
      <div className="grid gap-5 lg:grid-cols-2">
        <Specimen title="Status de pedido" description="Uma cor por status em todo o sistema">
          {Object.values(ORDER_STATUS_TONE).map(({ label, tone }) => (
            <Badge key={label} variant={tone}>
              {label}
            </Badge>
          ))}
        </Specimen>
        <Specimen title="Com ícone e contador">
          <Badge variant="success">
            <CheckCircle2 data-icon="inline-start" aria-hidden="true" />
            Ativo
          </Badge>
          <Badge variant="warning">
            <Clock data-icon="inline-start" aria-hidden="true" />
            Aguardando
          </Badge>
          <Badge variant="destructive">
            <XCircle data-icon="inline-start" aria-hidden="true" />
            Inativo
          </Badge>
          <Badge variant="secondary" className="tabular-nums">
            12
          </Badge>
        </Specimen>
      </div>
      <Specimen title="Chips de filtro" description="Removível com X; o fixo é o filtro padrão da tela">
        <FilterChipsDemo />
      </Specimen>
    </Showcase>
  );
}
