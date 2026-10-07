import { Showcase } from "../../components/showcase";
import { OrdersTableDemo } from "../../demos/orders-table-demo";

export function DataSection() {
  return (
    <Showcase
      id="dados"
      title="Tabelas e listagens"
      description="TanStack Table + React Query. Ordene, selecione (barra flutuante), troque a densidade e exclua com desfazer (atualização otimista)."
    >
      <OrdersTableDemo />
    </Showcase>
  );
}
