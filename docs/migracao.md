# Migração Lovable → v2

Mapa das 67 páginas de `../ecomtrack-lovable/src/pages/` para as rotas do v2. Atualize o status ao terminar cada tela.

Status: ⬜ pendente · 🟨 em andamento · ✅ migrada · 🚫 descartada

Componentes do Lovable ficam em `src/components/<pasta>`; a coluna "Pastas" lista as que a página importa (sem `ui` e `design-system`). `fornecedores` aparece em muitas porque concentra filtros e sheets compartilhados.


## Visão geral

| Status | Página Lovable | Linhas | Rota Lovable | Rota v2 | Pastas | Observação |
|---|---|---:|---|---|---|---|
| ✅ | `Dashboard` | 118 | `/` | `/visao-geral/dashboard` | `dashboard`, `relatorios` | dados mockados; Evil Charts (ADR 0002); blocos novos: meta, canais, status, heatmap, estados |

## Vendas

| Status | Página Lovable | Linhas | Rota Lovable | Rota v2 | Pastas | Observação |
|---|---|---:|---|---|---|---|
| ⬜ | `Pedidos` | 22 | `/pedidos` | `/vendas/pedidos` | `pedidos` | lógica em `components/pedidos` |
| ⬜ | `Processamento` | 10 | `/processamento` | `/vendas/processamento` | — | placeholder no Lovable (só título) |
| ⬜ | `Clientes` | 20 | `/clientes` | `/vendas/clientes` | `clientes` | lógica em `components/clientes` |
| ⬜ | `Campanhas` | 202 | `/campanhas` | `/vendas/campanhas` | `campanhas` |  |
| ⬜ | `Atendimento` | 1035 | `/atendimento` | `/vendas/atendimento` | `atendimento`, `clientes`, `fornecedores` |  |

## Catálogo

| Status | Página Lovable | Linhas | Rota Lovable | Rota v2 | Pastas | Observação |
|---|---|---:|---|---|---|---|
| ⬜ | `Produtos` | 913 | `/produtos` | `/catalogo/produtos` | `fornecedores`, `produtos` |  |
| ⬜ | `Categorias` | 3567 | `/categorias` | `/catalogo/categorias` | `categorias`, `fornecedores` |  |
| ⬜ | `Marcas` | 1828 | `/marcas` | `/catalogo/marcas` | `fornecedores`, `marcas` |  |
| ⬜ | `Fornecedores` | 135 | `/estoque` | `/catalogo/fornecedores` | `fornecedores` | no Lovable a rota é `/estoque` |
| ⬜ | `GestaoPrecos` | 9852 | `/precificacao` | `/catalogo/precos` | `fornecedores`, `precificacao` | maior tela do projeto |
| 🟨 | `Cadastro` | 168 | `/cadastro` | `/catalogo/esteira-cadastro` | `esteira-cadastro` | visualização pronta (mock, sem ações); falta assistente, painéis e ações. Inventário em `docs/inventarios/esteira-cadastro.md` |
| ⬜ | `EsteiraCadastro` | 128 | — | — | `esteira-cadastro` | órfã (sem rota); provável versão antiga de Cadastro, confirmar |

## Operação

| Status | Página Lovable | Linhas | Rota Lovable | Rota v2 | Pastas | Observação |
|---|---|---:|---|---|---|---|
| ⬜ | `Envios` | 22 | `/envios` | `/operacao/envios` | `envios` | lógica em `components/envios` |
| ⬜ | `Resgate` | 185 | `/resgate` | `/operacao/resgates` | `resgate` |  |

## Financeiro

| Status | Página Lovable | Linhas | Rota Lovable | Rota v2 | Pastas | Observação |
|---|---|---:|---|---|---|---|
| ⬜ | `Financeiro` | 126 | `/financeiro` | `/financeiro/visao-geral` | `financeiro` |  |
| ⬜ | `Fiscal` | 85 | `/fiscal` | `/financeiro/fiscal` | `fiscal` |  |

## Relatórios

| Status | Página Lovable | Linhas | Rota Lovable | Rota v2 | Pastas | Observação |
|---|---|---:|---|---|---|---|
| ⬜ | `Relatorios` | 460 | `/relatorios` | `/relatorios/todos` | — | hub |
| ⬜ | `RelatorioDetalhes` | 136 | `/relatorios/:id` | `/relatorios/[id]` | — | detalhe genérico por id; decidir se continua existindo |
| ⬜ | `RelatorioAuditoriaCodigos` | 1183 | — | `/relatorios/auditoria-codigos` | — | órfã (sem rota), confirmar |
| ⬜ | `RelatorioAuditoriaEnvios` | 766 | — | `/relatorios/auditoria-envios` | — | órfã (sem rota), confirmar |
| ⬜ | `RelatorioAuditoriaEstoque` | 1224 | `/relatorios/42` | `/relatorios/auditoria-estoque` | `auditoria-estoque`, `fornecedores`, `produtos`, `relatorios` |  |
| ⬜ | `RelatorioAuditoriaPedidosProdutos` | 198 | `/relatorios/16` | `/relatorios/auditoria-pedidos-produtos` | `qualidade` |  |
| ⬜ | `RelatorioAuditoriaPerdaCodigos` | 319 | `/relatorios/24` | `/relatorios/auditoria-perda-codigos` | `auditoria-perda` |  |
| ⬜ | `RelatorioClientesAltoVolume` | 209 | `/relatorios/17` | `/relatorios/clientes-alto-volume` | `alto-volume` |  |
| ⬜ | `RelatorioClientesLTV` | 609 | `/relatorios/44` | `/relatorios/clientes-ltv` | `clientes-ltv`, `clientes`, `fornecedores` |  |
| ⬜ | `RelatorioCodigosDuplicados` | 84 | `/relatorios/25` | `/relatorios/codigos-duplicados` | `codigos-duplicados` |  |
| ⬜ | `RelatorioCodigosSemPedido` | 812 | `/relatorios/30` | `/relatorios/codigos-sem-pedido` | `codigos-sem-pedido`, `fornecedores`, `produtos`, `relatorios` |  |
| ⬜ | `RelatorioCompliance` | 854 | `/relatorios/26` | `/relatorios/compliance` | `fornecedores` |  |
| ⬜ | `RelatorioConciliacaoCodigos` | 778 | `/relatorios/29` | `/relatorios/conciliacao-codigos` | `conciliacao-codigos`, `fornecedores`, `produtos`, `relatorios` |  |
| ⬜ | `RelatorioConciliacaoPedidos` | 524 | `/relatorios/43` | `/relatorios/conciliacao-pedidos` | `conciliacao-pedidos`, `fornecedores` |  |
| ⬜ | `RelatorioCurvaABC` | 533 | `/relatorios/28` | `/relatorios/curva-abc` | `curva-abc`, `fornecedores`, `produtos`, `relatorios` |  |
| ⬜ | `RelatorioDetalhamentoPedidos` | 1050 | `/relatorios/2` | `/relatorios/detalhamento-pedidos` | `pedidos` |  |
| ⬜ | `RelatorioDiagnosticoBugs` | 488 | `/relatorios/33` | `/relatorios/diagnostico-bugs` | `diagnostico-bugs`, `fornecedores` |  |
| ⬜ | `RelatorioDiarioBordo` | 401 | `/relatorios/46` | `/relatorios/diario-bordo` | `fechamento-mensal` |  |
| ⬜ | `RelatorioEmailsSuspeitos` | 481 | `/relatorios/40` | `/relatorios/emails-suspeitos` | `emails-suspeitos`, `fornecedores` |  |
| ⬜ | `RelatorioEntregaEmails` | 601 | `/relatorios/39` | `/relatorios/entrega-emails` | `entrega-emails`, `fornecedores` |  |
| ⬜ | `RelatorioEstoqueImobilizado` | 551 | `/relatorios/36` | `/relatorios/estoque-imobilizado` | `estoque-imobilizado`, `fornecedores`, `produtos`, `relatorios` |  |
| ⬜ | `RelatorioFalhasEnvio` | 263 | `/relatorios/18` | `/relatorios/falhas-envio` | `falhas-envio` |  |
| ⬜ | `RelatorioFechamentoMensal` | 45 | `/relatorios/32` | `/relatorios/fechamento-mensal` | `fechamento-mensal`, `produtos`, `relatorios` |  |
| ⬜ | `RelatorioFornecedorApiMatch` | 391 | `/relatorios/22` | `/relatorios/fornecedor-api-match` | `fornecedor-api-match` |  |
| ⬜ | `RelatorioHistoricoPrecoEnvios` | 944 | `/relatorios/34` | `/relatorios/historico-preco-envios` | `fornecedores`, `historico-preco-envios` |  |
| ⬜ | `RelatorioLogAtividade` | 825 | `/relatorios/31` | `/relatorios/log-atividade` | `fornecedores`, `log-atividade`, `produtos`, `relatorios` |  |
| ⬜ | `RelatorioLucratividadeFornecedor` | 456 | `/relatorios/35` | `/relatorios/lucratividade-fornecedor` | `fornecedores`, `lucratividade-fornecedor` |  |
| ⬜ | `RelatorioOrigemPedidos` | 685 | `/relatorios/45` | `/relatorios/origem-pedidos` | `fornecedores`, `origem-pedidos` |  |
| ⬜ | `RelatorioPedidosDuplicadosTecnico` | 144 | `/relatorios/19` | `/relatorios/pedidos-duplicados` | `pedidos-duplicados` |  |
| ⬜ | `RelatorioPedidosDuplicados` | 856 | — | `/relatorios/—` | — | órfã (sem rota); a versão em uso é a Técnica, confirmar |
| ⬜ | `RelatorioPedidosNaoPagos` | 253 | `/relatorios/20` | `/relatorios/pedidos-nao-pagos` | `pedidos-nao-pagos` |  |
| ⬜ | `RelatorioPedidosPagosNaoProcessados` | 317 | `/relatorios/21` | `/relatorios/pedidos-pagos-nao-processados` | `pedidos-pagos-nao-processados` |  |
| ⬜ | `RelatorioPrevisoes` | 745 | `/relatorios/1` | `/relatorios/previsoes` | `relatorios` |  |
| ⬜ | `RelatorioProdutosDivergentes` | 455 | `/relatorios/38` | `/relatorios/produtos-divergentes` | `fornecedores`, `produtos-divergentes` |  |
| ⬜ | `RelatorioRastreioCodigos` | 454 | `/relatorios/23` | `/relatorios/rastreio-codigos` | `rastreio-codigos` |  |
| ⬜ | `RelatorioReposicao` | 576 | `/relatorios/27` | `/relatorios/reposicao` | `fornecedores`, `produtos` |  |
| ⬜ | `RelatorioResgatesExpirados` | 735 | `/relatorios/37` | `/relatorios/resgates-expirados` | `fornecedores`, `produtos`, `relatorios`, `resgates-expirados` |  |
| ⬜ | `RelatorioSegurancaAcessos` | 571 | `/relatorios/41` | `/relatorios/seguranca-acessos` | `fornecedores`, `seguranca` |  |

## Sistema

| Status | Página Lovable | Linhas | Rota Lovable | Rota v2 | Pastas | Observação |
|---|---|---:|---|---|---|---|
| ⬜ | `CentralAjuda` | 1517 | `/central-ajuda` | `/suporte/central-ajuda` | `central-ajuda`, `fornecedores` | já no menu (Atendimento) |
| ⬜ | `Configuracoes` | 10 | — | `/configuracoes/geral` | — | placeholder no Lovable (só título) |

## Públicas (`(public)`)

| Status | Página Lovable | Linhas | Rota Lovable | Rota v2 | Pastas | Observação |
|---|---|---:|---|---|---|---|
| ✅ | `Login` | 345 | `/login` | `/login` | — | login real em duas etapas (código por e-mail, 6 quadradinhos), proxy e sessão renovada |
| ✅ | `EsqueciSenha` | 80 | `/esqueci-senha` | `/login?etapa=esqueci-senha` | — | `POST /auth/password/forgot`; virou etapa do `/login` (troca no mesmo lugar); `/esqueci-senha` redireciona |
| ✅ | `RedefinirSenha` | 307 | `/redefinir-senha` | `/redefinir-senha/[token]` | — | link do e-mail (`/reset-password/:token` redireciona) |
| ✅ | `Convite` | 418 | `/convite` | `/convite/[token]` | — | link do e-mail (`/invite/:token` redireciona) |
| ⬜ | `Configurar2FA` | 266 | `/configurar-2fa` | `/configurar-2fa` | — |  |
| ⬜ | `ResgatePreview` | 726 | `/resgate/preview` | `/resgate` | `resgate` | página do cliente final para resgatar código |
| ⬜ | `CentralAjudaPreview` | 949 | `/central-ajuda-preview` | `/ajuda/[...slug]` | `central-ajuda` | central de ajuda pública |
| ⬜ | `CentralAjudaMenusPreview` | 593 | `/central-ajuda-menus` | — | `central-ajuda` | preview interno de menus, confirmar se migra |

## Telas novas (ecomtrack.api)

Telas que não existem no Lovable e nasceram dos endpoints da `ecomtrack.api`. O botão `</>` do header (só Owner) mostra os endpoints de cada uma.

| Status | Tela | Rota v2 | Endpoints |
|---|---|---|---|
| ✅ | Minha conta | `/minha-conta` | `auth/me` (dados, senha, PIN) |
| ✅ | Usuários (usuários, convites, perfis) | `/administracao/usuarios` | `users*`, `users/invites*`, `profiles*` |
| ✅ | Comunicação (e-mails + conta de envio) | `/administracao/comunicacao` | `communication*`, `integrations/email*` |
| ✅ | E-commerce | `/administracao/ecommerce` | `integrations/ecommerce*` |
| ✅ | Agentes IA (conexões + tarefas) | `/administracao/agentes-ia` | `integrations/ai*`, `ai/tasks*`, `auth/me/preferences/ai.task.*` |
| ✅ | Fornecedores (conexões + catálogo) | `/administracao/fornecedores` | `integrations/suppliers*`, `suppliers/products` |
| ✅ | Auditoria | `/administracao/auditoria` | `audit-logs*` |
| ✅ | Empresas (só Owner) | `/plataforma/empresas` | `companies*` |
| ✅ | Planos (só Owner) | `/plataforma/planos` | `plans*` |
| ✅ | Casca do app (menu, permissões, preferências, tempo real) | todas | `permissions/menu`, `permissions/{code}/components`, `auth/me/preferences*`, hub `/hubs/permissions` |

## Sistema de rotas

| Status | Página Lovable | Linhas | Rota Lovable | Rota v2 | Pastas | Observação |
|---|---|---:|---|---|---|---|
| ✅ | `NotFound` | 61 | `/sem-permissao` | `app/not-found.tsx`, `(public)/sem-permissao`, `/nao-encontrado` | — | página inteira, fora do shell; rota fora do menu cai no 404; `/sem-permissao` usa a variante 403 |
| ⬜ | `Index` | 36 | — | — | — | órfã (sem rota), provavelmente descartável |
