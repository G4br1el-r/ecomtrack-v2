import { Showcase } from "../../components/showcase";
import { KpisDemo } from "../../demos/kpis-demo";

export function KpisSection() {
  return (
    <Showcase
      id="kpis"
      title="KPIs"
      description="Número animado, variação com cor semântica e sparkline do chart do shadcn. Skeleton com o mesmo formato do card."
    >
      <KpisDemo />
    </Showcase>
  );
}
