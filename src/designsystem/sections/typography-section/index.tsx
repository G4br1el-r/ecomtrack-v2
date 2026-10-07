import { Showcase } from "../../components/showcase";
import { Specimen } from "../../components/specimen";
import { TokenCode } from "../../components/token-code";
import { TYPE_SCALE } from "../../mocks/tokens";

export function TypographySection() {
  return (
    <Showcase
      id="tipografia"
      title="Tipografia"
      description="Inter com alternativas tipográficas (cv11, ss01). Corpo padrão text-sm; números sempre tabulares."
    >
      <Specimen title="Escala" className="block divide-y p-0">
        {TYPE_SCALE.map((item) => (
          <div key={item.name} className="grid gap-2 px-5 py-3.5 md:grid-cols-[1fr_14rem_16rem] md:items-center">
            <p className={item.className}>{item.name}</p>
            <TokenCode>{item.spec}</TokenCode>
            <p className="text-xs text-muted-foreground">{item.usage}</p>
          </div>
        ))}
      </Specimen>
    </Showcase>
  );
}
