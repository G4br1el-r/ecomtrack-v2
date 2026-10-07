# Evil Charts (motor ECharts) para gráficos e dashboards

Os gráficos do sistema usam o Evil Charts, instalado pelo CLI do shadcn (`@evilcharts/echarts-*`), na variante com motor Apache ECharts. Ele entrega gráficos prontos com acabamento de produto (gradientes, brilho, revelação ao passar o mouse, rosca com total central, medidores semicirculares) sobre um motor em canvas que aguenta séries longas, e os arquivos ficam no projeto em `components/evilcharts/`, como o Animate UI.

## Considered Options

- **Tremor**: kit feito para dashboards, mas só instala copiando código à mão (o CLAUDE.md exige CLI) e traz ícones e cores próprios, fora dos tokens do design system.
- **Evil Charts com motor Recharts**: mesmo visual, mas sem heatmap nem mapas; esses blocos teriam que ser feitos em SVG à mão.
- **ECharts com wrappers próprios** (ADR-0001): poderoso, porém exigia desenhar todo o acabamento do zero.

## Consequences

- O código gerado foi ajustado às regras do projeto: comentários removidos e uma prop `valueFormatter` (e `labelFormatter` nos cartesianos) no `Tooltip`, para formatar valores em pt-BR. Reinstalar pelo CLI sobrescreve esses ajustes.
- Heatmap dia × hora e mapa de estados não existem no Evil Charts; são componentes próprios em grade (o mapa é um tile map: cada UF um quadrado na posição geográfica aproximada), com a mesma rampa de cor do tema. Um mapa com o contorno real (malha do IBGE na série `map` do ECharts) foi testado e descartado a pedido.
- As cores categóricas `--chart-1` a `--chart-5` seguem a paleta validada (contraste e daltonismo) da skill de visualização de dados.
