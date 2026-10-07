import { cn } from "@/lib/utils";

import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";
import { TokenCode } from "../../components/token-code";
import { RADIUS_SCALE, SHADOW_SCALE, SPACING_RULES } from "../../mocks/tokens";

export function SpacingSection() {
  return (
    <Showcase
      id="espacamento"
      title="Espaçamento, raios e elevação"
      description="Escala base de 4px. Só os valores abaixo; nada de w-[137px] ou p-[13px]."
    >
      <Specimen title="Espaçamento" className="block divide-y p-0">
        {SPACING_RULES.map((rule) => (
          <div key={rule.token} className="grid items-center gap-2 px-5 py-3 md:grid-cols-[12rem_4rem_1fr]">
            <TokenCode>{rule.token}</TokenCode>
            <span className="text-xs text-muted-foreground tabular-nums">{rule.pixels}</span>
            <span className="text-sm">{rule.usage}</span>
          </div>
        ))}
      </Specimen>
      <div className="grid gap-5 lg:grid-cols-2">
        <Specimen title="Raios" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {RADIUS_SCALE.map((item) => (
            <div key={item.token} className="flex items-center gap-3">
              <span className={cn("size-9 shrink-0 border border-primary/40 bg-primary/10", item.token)} />
              <div>
                <p className="font-mono text-xs font-medium">{item.token}</p>
                <p className="text-xs text-muted-foreground">{item.usage}</p>
              </div>
            </div>
          ))}
        </Specimen>
        <Specimen title="Elevação" className="grid grid-cols-1 gap-5 bg-muted/30 sm:grid-cols-2">
          {SHADOW_SCALE.map((item) => (
            <div key={item.token} className="flex items-center gap-3">
              <span className={cn("size-9 shrink-0 rounded-lg bg-card", item.token)} />
              <div>
                <p className="font-mono text-xs font-medium">{item.token}</p>
                <p className="text-xs text-muted-foreground">{item.usage}</p>
              </div>
            </div>
          ))}
        </Specimen>
      </div>
    </Showcase>
  );
}
