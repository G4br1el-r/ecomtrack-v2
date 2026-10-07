---
status: superseded by ADR-0002
---

# Apache ECharts como biblioteca de gráficos

O Dashboard precisava de gráficos mais completos que o Recharts (zoom, comparação com período anterior, agrupamento, tooltips ricos, performance). Escolhemos o Apache ECharts com wrappers próprios no design system. O resultado ficou visualmente genérico — o motor era bom, mas os wrappers próprios não entregavam o acabamento esperado — e a decisão foi substituída pela ADR-0002.
