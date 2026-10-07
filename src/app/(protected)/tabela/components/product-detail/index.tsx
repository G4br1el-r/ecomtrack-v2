import type { Product } from "@/@types/Modules/Tabela/Produtos/product";
import { DetailGroup } from "@/components/Modules/Core/DesignSystem/detail-group";
import { DetailRow } from "@/components/Modules/Core/DesignSystem/detail-row";
import { formatDisplayDate } from "@/lib/Modules/Core/DesignSystem/format-display-date";

export function ProductDetail({ product }: { product: Product }) {
  const belowMinimum = product.stock < product.minStock;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">Descrição</p>
        <p className="text-sm leading-relaxed">{product.description}</p>
      </div>
      <DetailGroup divided>
        <DetailRow
          label="Situação do estoque"
          value={belowMinimum ? "Abaixo do mínimo" : "Dentro do mínimo"}
          valueClassName={belowMinimum ? "text-destructive" : "text-success"}
        />
        <DetailRow label="Fornecedor" value={product.supplier} />
        <DetailRow label="Última venda" value={formatDisplayDate(product.lastSaleAt)} />
        <DetailRow label="Cadastrado em" value={formatDisplayDate(product.createdAt)} />
      </DetailGroup>
    </div>
  );
}
