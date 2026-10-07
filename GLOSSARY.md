# EcomTrack

Sistema de gestão de e-commerce: vendas, catálogo, operação e financeiro de uma loja online.

## Visão geral (Dashboard)

**Faturamento**:
Soma do valor dos pedidos pagos no período.
_Avoid_: Receita, vendas

**Pedidos**:
Quantidade de pedidos pagos e não cancelados no período.
_Avoid_: Vendas, compras

**Ticket médio**:
Faturamento dividido pela quantidade de pedidos do mesmo período. Nunca é a média dos ticket médios diários.
_Avoid_: Valor médio

**Lucro estimado**:
Faturamento menos o custo dos produtos vendidos no período.
_Avoid_: Lucro, lucro bruto, margem

**Produtos vendidos**:
Quantidade de SKUs distintos vendidos no período. O mesmo SKU vendido em vários dias conta uma vez.
_Avoid_: Itens vendidos

**Unidades vendidas**:
Soma das quantidades de todos os itens dos pedidos do período.
_Avoid_: Peças, volume

**Cliente novo**:
Cliente cujo primeiro pedido pago caiu dentro do período.

**Cliente recorrente**:
Cliente que já tinha pedido pago antes do início do período e comprou de novo dentro dele.
_Avoid_: Cliente existente, cliente antigo

**Período anterior**:
Intervalo de mesma duração imediatamente antes do período selecionado, usado como base de comparação.

**Variação**:
Diferença percentual entre o valor do período e o do período anterior. Não existe quando o período anterior é zero.
_Avoid_: Crescimento, delta

**Meta do mês**:
Valor de faturamento que a empresa quer atingir no mês corrente.

**Projeção de fechamento**:
Faturamento esperado no fim do mês se o ritmo diário atual se mantiver.
_Avoid_: Previsão, estimativa

**Canal de venda**:
Origem do pedido: loja própria ou marketplace (Mercado Livre, Shopee, Amazon, Magalu).
_Avoid_: Origem, plataforma

**Status do pedido**:
Etapa atual do pedido: aguardando pagamento, pago, em separação, enviado, entregue ou cancelado.
