# CLAUDE.md — Projeto

Regras específicas deste projeto. Regras gerais (válidas em qualquer stack) estão em `~/.claude/CLAUDE.md` e carregam junto automaticamente.

## Stack

**Frontend**

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

**Estado e dados**

- Zustand (estado global/client)
- React Query (estado de servidor / cache de requisições)

**Formulários**

- React Hook Form
- Zod (validação e schemas)

**Animação**

- Motion (framer-motion)

**Qualidade**

- Biome (lint + format)

## Arquitetura

### Componentes: Server vs Client

- Server Component é o padrão. Tudo que puder ser Server, é Server.
- Client Component isolado no menor componente possível — nunca "sobe" a diretiva `'use client'` pra um componente pai só porque um filho precisa de interatividade.
- Route Handler para lógica de API/integração.

### Estrutura de pastas

**Regra central: cada pasta compartilhada da raiz de `src/` (`@types`, `hooks`, `lib`, `schemas`, `services`, `store`, `errors`, `components`, `constants`, `mocks`, e qualquer nova que surgir) repete internamente a MESMA árvore `Modules/<modulo>/<submodulo>/`.**

Nunca criar uma pasta compartilhada nova dentro de um módulo (ex: nunca `components/Modules/Logistica/WMS/services/`). A pasta compartilhada sempre nasce na raiz de `src/`, e é dentro dela que a árvore de módulo se repete.

```
src/
  hooks/
    Modules/
      Logistica/
        WMS/
          use-separacao.ts
        Frotas/
          use-veiculo.ts
      Comercial/
        CRM/
          use-lead.ts
  store/
    Modules/
      Logistica/
        WMS/
        Frotas/
      Comercial/
        CRM/
  services/
    Modules/
      Logistica/
        WMS/
        Frotas/
      Comercial/
        CRM/
  errors/
    Modules/
      Logistica/
        WMS/
        Frotas/
      Comercial/
        CRM/
  components/
    Modules/
      Logistica/
        WMS/
          Conferencia/
          Pedidos/
          Separacao/
        Frotas/
      Comercial/
        CRM/
```

A árvore `Modules/<modulo do projeto>/<submodulo>/` é a mesma em toda pasta compartilhada — muda só o que tem dentro da folha final (hook, store, service, error, componente).

Em projeto novo, esse padrão já nasce assim desde o início — não é algo que só se aplica depois que cresce.

### Criando novas pastas compartilhadas

A lista de pastas compartilhadas na raiz não é fechada. Se surgir necessidade de uma categoria nova e genérica (ex: `constants/`, `utils/`), ela nasce na raiz de `src/` e segue a mesma árvore `Modules/<modulo>/<submodulo>/` por dentro.

Antes de criar uma pasta compartilhada nova, informar o que está sendo criado e por quê — nome da pasta, o que vai dentro dela, e a razão de não caber em nenhuma pasta já existente. Não assumir silenciosamente que o nome bate com o padrão certo.

### Regras de componentização

- Nunca mais de uma função por arquivo. Sempre componentizar.
- Todo componente vive em sua própria pasta, com `index.tsx` dentro.
- Organização por contexto quando o projeto é simples/único domínio (ex: `hero/`, `about-me/`, `header/`, `footer/`).

### Reuso antes de criar

Antes de criar qualquer componente, hook, função, tipo ou constante, procurar nesta ordem:

1. `components/ui/` e `components/animate-ui/` (shadcn e Animate UI)
2. `components/Modules/Core/DesignSystem/` e `components/Modules/Core/Shell/`
3. `lib/Modules/**`, `hooks/Modules/**`, `@types/Modules/**`, `constants/Modules/**`, `schemas/Modules/**`, `store/Modules/**`, `services/Modules/**`, `mocks/Modules/**`

- Buscar pelo conceito, não só pelo nome (ex.: procurar `format`, `currency`, `date` antes de criar um `formatPrice`).
- Se existe algo parecido, estender (nova prop, novo parâmetro, nova variante). Nunca criar uma segunda versão do mesmo conceito.
- Estender algo compartilhado muda outras telas: avisar antes o que vai mudar e onde é usado.
- Nada de componente "quase igual" a um do design system com outro nome. Se o do design system não atende, discutir a mudança nele.

### Onde vai cada coisa

| O que é | Onde fica |
|---|---|
| Tipo | `@types/Modules/<modulo>/<submodulo>/` |
| Schema Zod | `schemas/Modules/<modulo>/<submodulo>/` |
| Função pura | `lib/Modules/<modulo>/<submodulo>/` |
| Literal, config, opções fixas | `constants/Modules/<modulo>/<submodulo>/` |
| Chamada de API | `services/Modules/<modulo>/<submodulo>/` |
| Hook (query, mutation ou UI) | `hooks/Modules/<modulo>/<submodulo>/` |
| Estado global | `store/Modules/<modulo>/<submodulo>/` |
| Dado mockado | `mocks/Modules/<modulo>/<submodulo>/` |

- Tipo de dado validado vem do schema com `z.infer`. Nunca escrever o mesmo tipo à mão de novo.
- Nome do arquivo = nome do que ele exporta, em `kebab-case`. Seguir os prefixos já usados em `lib/`: `format-`, `get-`, `is-`, `parse-`, `resolve-`, `validate-`, `find-`.

### Escopo e promoção

- Usado em uma página só: fica em `app/(protected)/<modulo>/<pagina>/components/`.
- Usado por mais de uma página do mesmo módulo: sobe para `components/Modules/<modulo>/<submodulo>/` (e o mesmo vale para hooks, lib etc.).
- Usado por mais de um módulo: sobe para `Modules/Core/`.
- Ao precisar de algo que está no escopo de outra página ou módulo, mover para o escopo comum. Nunca copiar.

### Simplicidade

- A solução mais simples que entrega o comportamento ganha. HTML semântico + Tailwind antes de JavaScript.
- Layout, espaçamento, responsividade, hover, foco e estados visuais resolvidos com CSS (grid, flex, variantes do Tailwind), não com estado React.
- Valor derivado é calculado no render, não guardado em `useState` nem sincronizado com `useEffect`.
- Sem `div` de enfeite, sem wrapper que não faz nada, sem prop que ninguém passa, sem abstração para um uso só.

### Rotas (App Router)

```
src/
  app/
    (protected)/
      <modulo>/            # ex: vendas, catalogo
        <pagina>/           # ex: pedidos, clientes, produtos
          components/       # componentes usados só nessa página
    (public)/
    api/
      modules/
        <modulo>/
          <departamento>/
```

- `(protected)` e `(public)` agrupam rotas privadas e públicas.
- Dentro de `(protected)`, uma pasta por módulo — o nome do módulo entra na URL.
- Route Handlers seguem o mesmo particionamento por módulo dentro de `api/modules`.

### Estado

- Zustand sempre, para qualquer estado global/client.

### Dados

- Toda consulta no front é feita com React Query (`useQuery` / `useMutation`). Nunca `fetch` em `useEffect` nem estado manual de loading/erro.
- Chamadas de API ficam em `services/Modules/<modulo>/<submodulo>/`; os hooks de query em `hooks/Modules/<modulo>/<submodulo>/`, com query keys centralizadas.
- Mutação que altera lista usa atualização otimista (`onMutate` → `onError` com rollback → `onSettled` invalidando a query).
- Nunca SWR. Quando a skill `vercel-react-best-practices` recomendar SWR (`client-swr-dedup`), aplicar o mesmo princípio com React Query, que já deduplica por query key.

### Dados mockados

Enquanto a API real não existe, as telas usam dados mockados, montados de forma que trocar pelo dado real mude só o service.

- Mocks ficam em `src/mocks/Modules/<modulo>/<submodulo>/`, seguindo a mesma árvore das outras pastas compartilhadas. Um arquivo por entidade, `kebab-case` (ex.: `mocks/Modules/Vendas/Pedidos/pedidos.ts`), exportando uma constante `SCREAMING_SNAKE_CASE` com sufixo `_MOCK` (ex.: `PEDIDOS_MOCK`).
- Todo mock é tipado com o tipo de `@types` ou o `z.infer` do schema (`satisfies Pedido[]`). Mock fora do contrato não compila.
- Só o service importa mock. O service devolve o mock como se fosse a resposta da API (async, mesmo formato); hooks do React Query e componentes não sabem que é mock. Quando a API chegar, só o corpo do service muda.
- O service simula latência com `MOCK_LATENCY_IN_MS` (`constants/Modules/Core/Shell/mock.ts`) e a função `wait` (`lib/Modules/Core/Shell/wait.ts`), para os estados de carregamento aparecerem. Se ainda não existirem, criar os dois na primeira tela mockada; nunca um delay por service.
- Mutations mockadas também passam pelo service e devolvem o resultado esperado, para a atualização otimista funcionar igual à real.
- Dados realistas e em pt-BR, baseados nos campos e casos do Lovable: incluir casos de borda (lista vazia, textos longos, valores zerados, status variados) para exercitar todos os estados da tela.
- Mock de um módulo que outro módulo precisar sobe para o escopo comum, igual às outras pastas. Nunca copiar.
- Os dados mockados de `src/designsystem/` são da vitrine. Não usar nas telas.

## Projeto de origem (Lovable)

O v2 reescreve o sistema que o cliente fez no Lovable, em `/Users/gabriel/Projetos/ecomtrack/ecomtrack-lovable` (acesso de leitura liberado em `.claude/settings.local.json`; `.env` bloqueado; edição bloqueada).

### Onde está cada coisa no Lovable

- Páginas: `src/pages/` (67). Rotas em `src/App.tsx`.
- Componentes por domínio: `src/components/<area>/` (ex.: `pedidos`, `produtos`, `precificacao`). Várias páginas são casca e a lógica real está nessas pastas.
- Regras de negócio e consultas: `src/hooks/`, `src/lib/`, `src/contexts/` e `src/integrations/supabase/`.
- Banco: `supabase/` (migrations e functions) e `drizzle/`.
- Design system antigo: `src/design-system/foundational-design-guide-*/` (já absorvido pelo v2).

### Regras

- O código do Lovable é de baixa qualidade: muito código para pouco resultado. Ele serve para descobrir **o que** a tela faz, nunca **como** fazer.
- Do Lovable se aproveita só: dados exibidos, campos, regras de negócio, validações, fluxos, textos, permissões e casos de borda.
- Nunca copiar, adaptar ou "traduzir" código de lá: nem JSX, nem classes Tailwind, nem hooks, nem a árvore de componentes, nem a divisão de arquivos, nem o jeito de buscar ou guardar dados.
- A tela no v2 é projetada do zero a partir do inventário de comportamento, usando o design system, Animate UI, TanStack Table, React Query, Zustand, React Hook Form + Zod e a estrutura `Modules/`. O resultado tem que ser igual ou melhor em UX e bem menor em código.
- O Lovable é ponto de partida, não gabarito de UI/UX. Não se apegar ao layout, à ordem dos elementos, aos componentes nem aos fluxos de lá. Se existe um padrão melhor de UI/UX (menos cliques, hierarquia mais clara, feedback melhor, filtros e ações mais acessíveis, bons estados vazios e de carregamento), propor e adotar.
- Melhoria visual e de interação dentro do design system: pode aplicar direto e citar no resumo final.
- Mudança de fluxo (etapas, ordem, ações que somem ou mudam de lugar, telas que se juntam ou se separam): propor no inventário ou no `/grill-with-docs`, explicando o ganho, e só implementar depois de aprovada.
- Regra de negócio, validação e dado exibido seguem o Lovable. Mudar qualquer um deles só com aprovação explícita.
- O Lovable repete lógica entre telas. Se duas telas fazem a mesma coisa, no v2 isso existe uma vez só (ver "Reuso antes de criar").
- Nunca ler `.env` nem credenciais do Lovable.

Sinais de que está copiando o Lovable (parar e refazer):

- Componente do v2 com a mesma estrutura ou os mesmos nomes de um componente do Lovable.
- `useEffect` para buscar dados ou sincronizar estado, `useState` para valor derivado, estado de loading/erro manual.
- Lista de classes Tailwind longa e repetida, `<table>` manual, modal ou toast feito à mão.
- Arquivo grande fazendo várias coisas, lógica de negócio dentro do JSX.

### Mapa da migração

- `docs/migracao.md` é o mapa das 67 páginas (rota antiga → rota nova, pastas envolvidas, status). Ao começar uma tela, marcar 🟨; ao terminar, ✅. Tela descartada: 🚫 com o motivo.

### Fluxo para migrar uma tela

1. Achar a linha da tela em `docs/migracao.md` (ou a próxima ⬜ do módulo pedido).
2. Ler a página no Lovable e todas as pastas de componentes listadas para ela; seguir os imports até hooks e queries do Supabase. O objetivo da leitura é extrair comportamento, não implementação.
3. Escrever o inventário da tela em linguagem de produto, sem código: dados exibidos, filtros, ações (e quais são destrutivas), validações, estados vazios, de carregamento e de erro, permissões, textos. Junto, listar os problemas de UI/UX da tela atual e as melhorias propostas.
4. Rodar `/grill-with-docs` com essa lista para fechar dúvidas e registrar termos no `GLOSSARY.md` e decisões em `docs/adr/`.
5. Mapear cada item do inventário para o que já existe no v2 (design system, lib, hooks, schemas). Listar o que falta criar e onde vai ficar, antes de escrever código.
6. Implementar no v2 a partir do inventário. Voltar ao Lovable só para tirar dúvida de regra, nunca para ver como foi feito.
7. Atualizar o status em `docs/migracao.md`.

## Skills do projeto

Instaladas em `.claude/skills/` pelo CLI `skills` (`pnpm dlx skills add ... -a claude-code`), versões travadas em `skills-lock.json`. São de terceiros: não editar; atualizar com `pnpm dlx skills update -p`.

- `vercel-react-best-practices`: regras de performance React/Next. Prevalecem as regras deste arquivo quando houver conflito.
- `grill-with-docs` (usa `grilling` + `domain-modeling`): sessão de perguntas para fechar um plano, gerando `GLOSSARY.md` e ADRs em `docs/adr/`. Usar antes de migrar cada módulo do Lovable.
- `find-skills`: busca skills no ecossistema skills.sh. Ao usar, valem estas regras no lugar das da skill:
  - Sempre `pnpm dlx skills ...`, nunca `npx`.
  - Nunca instalar com `-y` nem `-g` por conta própria: apresentar a skill, ler o `SKILL.md` e os arquivos dela, apontar riscos e só instalar depois que o usuário aprovar.
  - Instalar no projeto com `-a claude-code` e registrar a skill nesta seção.

## UI e componentes

### shadcn primeiro

- Sempre usar o componente do shadcn quando ele existir (incluindo registries pelo CLI do shadcn, como `@animate-ui`). Só criar componente próprio quando não houver equivalente, e montado em cima dos componentes do shadcn.
- Instalar sempre pelo CLI: `pnpm dlx shadcn@latest add <componente>`. Nunca copiar código à mão.
- Código gerado pelo CLI é exceção à regra de "uma função por arquivo" e ao lint do Biome: `components/ui/`, `components/animate-ui/`, `components/evilcharts/`, `hooks/use-controlled-state.tsx`, `hooks/use-data-state.tsx` e `lib/get-strict-context.tsx`. Mesmo nele: sem `any` e sem comentários.
- Quando existir versão animada no Animate UI, usar ela e não a do `components/ui/` (os duplicados foram removidos de propósito).
- Seleção de opções usa combobox (Popover do Animate UI + Command do shadcn), não o `Select` do shadcn, que não anima com Motion.
- Toast: sempre o Sonner do shadcn (`toast`, `toast.success`, `toast.error`, `toast.promise` de `sonner`). Nada de toast customizado. Quando usar: ver "Feedback de ações (toast)".

### Gráficos

- Todo gráfico usa o Evil Charts com motor ECharts (`pnpm dlx shadcn@latest add @evilcharts/echarts-<tipo>`), em `components/evilcharts/`. Ver `docs/adr/0002-evil-charts-motor-echarts.md`.
- Cores das séries vêm dos tokens (`var(--chart-1)`…`var(--chart-5)`, `var(--primary)`), nunca hex solto. Valores no tooltip sempre com `valueFormatter` + `formatNumber`.

### Tabelas

- Toda tabela usa TanStack Table v9 (`@tanstack/react-table`) através do `DataTable` do design system (`components/Modules/Core/DesignSystem/data-table`). Nunca montar `<table>` com `.map` manual nem criar outra tabela.
- Dado em linhas × colunas é tabela, mesmo dentro de card: usa `DataTable`. Nunca grid ou flex de `div` imitando tabela. Legenda ou ranking ao lado de gráfico, sem cabeçalho de colunas, não é tabela.
- Modelo de referência: rota `/tabela` (`app/(protected)/tabela/`). Toda tabela de tela segue esse modelo **igualmente**; ao criar ou mexer numa tabela, abrir a `/tabela` e copiar o padrão de lá.
- Faltou recurso? Estender o `DataTable` (e os componentes `data-table-*`), nunca criar outra tabela nem um componente "quase igual".

#### Montagem

- Colunas em `lib/Modules/<modulo>/<submodulo>/create-<entidade>-columns.tsx`, com `createColumnHelper<DataTableFeatures, T>()` e retorno `DataTableColumn<T>[]`. A tela chama a função uma vez fora do componente (`const COLUMNS = createXColumns();`).
- Toda coluna de dado tem `meta: { label }` (nome no painel Colunas e na busca), `size` vindo de constante (`<ENTIDADE>_COLUMN_SIZE` em `constants/`) e `header: ({ column }) => <DataTableSortHeader column={column} />`. Coluna calculada usa `accessorFn` com `id`.
- Células: número e moeda com `NumberCell`; produto com `ProductCell`; data com `formatDisplayDate`; status com `Badge` e tom vindo de constante (`<ENTIDADE>_STATUS_BADGE`). Célula específica do módulo vira componente em `components/Modules/<modulo>/<submodulo>/`.
- Configuração da tabela numa constante `<ENTIDADE>_TABLE_SETTINGS: DataTableSettings` em `constants/Modules/<modulo>/<submodulo>/`:
  - `id` único e estável (é a chave das preferências salvas no navegador);
  - `features`: recursos que aparecem na engrenagem e se começam ligados. Padrão: todos declarados e desligados (`sorting`, `columnResizing`, `expanding`, `rowPinning`);
  - `searchPlaceholder` opcional para o texto da busca (padrão "Buscar...");
  - `pagination: { pageSizeOptions }` com as opções de "Por página" (padrão `[10, 20, 50, 100]`, a primeira é a inicial). Sem `pagination`, a tabela mostra todas as linhas.
- Dados pelo hook do React Query. A tela passa `loading={isPending}` (skeleton), `empty={<EmptyState ... />}` e trata erro com `ErrorState` + `refetch` antes de renderizar o `DataTable`.
- Seleção: passar `rowSelection` + `onRowSelectionChange` (com `settings`, o `DataTable` cria a coluna de checkbox sozinho, com Shift + clique para selecionar intervalo; sem `settings`, incluir `createSelectColumn()` nas colunas) e `BulkBar` com a contagem para ações em massa. Sem `onRowSelectionChange`, não há checkbox; seleção não é configurável pela engrenagem.
- Filtros e atalhos da tela vão na própria barra da tabela pela prop `toolbar` (`DataTableToolbarSlots`): `start` (depois da busca: `FilterSheet` com Aplicar e botões de atalho), `end` (antes da engrenagem: informação de contexto, ex. cotações) e `below` (linha de `FilterChip` com `field`, mais "Limpar filtros"). Modelo: Importação da esteira de cadastro (`import-table`).
- Detalhe expandido: `renderDetail={(row) => <XDetail row={row} />}`; só aparece com o recurso `expanding` ligado.
- Sem `settings` (ex.: tabela pequena dentro de card), o `DataTable` fica simples: sem barra, sem paginação, só ordenação.
- Lista paginada pela API: `const table = useDataTableServerState(SETTINGS)`, `table.query` (`Page`, `PageSize`, `Search`) entra no hook do React Query e o `DataTable` recebe `server={table.server(data?.totalCount ?? 0)}`. Busca e paginação passam a ser da API; filtros extras da tela chamam `table.resetPage()` ao mudar.
- Ações por linha: coluna `actions` com `RowActionsMenu` (botão "⋯"); filtro rápido por situação com contagem: `SegmentedFilter` (valor "todos" = `ALL_FILTER_VALUE`).

#### Comportamento padrão (já vem do `DataTable`, não reimplementar)

- Barra acima da tabela: à esquerda a busca (`DataTableSearch`) com o botão de lupa; à direita só a engrenagem, que reúne todas as configurações. Os controles têm a mesma altura do input (36px, `h-9`), o mesmo arredondamento (`rounded-md`) e a mesma borda (`border-input`).
- Busca: filtra só ao clicar na lupa ou dar Enter (preparado para virar chamada de API); apagar todo o texto ou clicar no X dentro do campo volta a mostrar tudo. A tecla `/` foca a busca (o campo mostra a dica `/`; com texto digitado, a dica dá lugar ao X).
- Engrenagem: popover com três abas (`DataTableSettingsMenu`); um ponto no ícone avisa quando há coluna oculta.
  - **Colunas** (`DataTableColumnsPanel`): rascunho; arrastar para reordenar (cursor de mão), checkbox para mostrar/ocultar, "Restaurar padrão" no topo e Cancelar/Aplicar no rodapé. Nada muda na tabela antes de Aplicar.
  - **Exibição**: densidade das linhas (`DensityToggle`).
  - **Recursos** (`DataTableFeaturesPanel`): um switch por recurso declarado, aplicado na hora, com "Restaurar padrão". Desligar um recurso limpa o estado dele. A aba some quando a tabela não declara recursos.
- Largura: as colunas se expandem proporcionalmente para ocupar toda a largura da tabela; quando a soma das larguras passa do espaço disponível, a tabela rola na horizontal.
- Redimensionar: alça na borda direita de cada cabeçalho (linha fina, cursor de duas setas, 10px de cada lado da borda); duplo clique volta ao tamanho original; largura mínima de 80px.
- Fixar linhas: alfinete no começo da linha; a linha sobe com animação. Ordenar não anima.
- Paginação: `PaginationBar` acima e abaixo da tabela (a mesma barra nos dois lugares) com "Mostrando X–Y de Z", "Por página" (`Combobox`), setas e campo de página. Pesquisar volta para a primeira página. O checkbox do cabeçalho seleciona as linhas da página.
- Estado vazio fora da área com rolagem horizontal, sempre centralizado na parte visível.
- Preferências por tabela (recursos, ordem, colunas ocultas, larguras, itens por página) salvas no navegador pelo `data-table-preferences-store` (validação Zod; campo inválido é descartado sozinho, sem apagar o resto).
- Mudou o conjunto de recursos do `DataTable`? Atualizar `DATA_TABLE_FEATURE_KEYS`, `DATA_TABLE_FEATURE_OPTIONS`, `resolveDataTableFeatures`, `resetDataTableFeature`, o schema de preferências, os testes e esta seção.

#### Testes de tabela

- Teste da tela ao lado do componente (ver `products-table/index.test.tsx`): estado inicial, seleção (um, intervalo, página), busca com Enter e com a lupa, `/`, paginação e quantidade por página, abas da engrenagem (Colunas, Exibição e Recursos).
- Mock de `wait` no teste e `ResizeObserver` com `vi.stubGlobal`.

### Interação

- Todo elemento clicável tem `cursor-pointer`; desabilitado tem `cursor-not-allowed`. A regra base já está no `globals.css`; componente novo clicável que não seja `button`/`a`/`[role=...]` precisa da classe.
- Todo elemento interativo tem feedback visual de hover antes do clique (fundo, borda, cor ou sombra, com os tokens do tema), além de `focus-visible` para teclado e estado `active`. Isso vale para botões, links, linhas de tabela clicáveis, cards clicáveis, itens de menu e de lista, chips e ícones clicáveis. Elemento desabilitado não reage a hover.
- Hover só com CSS (variantes `hover:`, `focus-visible:`, `active:`, `group-hover:` do Tailwind), com transição curta. Nunca estado React para hover.
- Componente do shadcn/Animate UI já traz hover: não sobrescrever sem motivo. Componente próprio precisa definir os três estados.
- Tudo que abre, fecha, expande ou recolhe (modal, sheet, drawer, popover, dropdown, select, tooltip, accordion, collapsible, linhas e itens de lista) anima obrigatoriamente com Motion. Overlays vêm do Animate UI (`@animate-ui/components-radix-*`), que já usa Motion.
- Durações, curvas e springs vêm de `constants/Modules/Core/DesignSystem/motion.ts`. Nada de número solto em `transition`.
- Respeitar `prefers-reduced-motion` (já configurado no `MotionProvider`).

### Feedback de ações (toast)

Toda ação relevante do usuário termina com um toast do Sonner (o `<Toaster />` já está nos providers do Shell).

- **O que é relevante:** criar, salvar, editar, excluir, ignorar, reativar, mudar de etapa ou status, ações em massa, importar, exportar, enviar, copiar para a área de transferência, aprovar, publicar.
- **O que não leva toast:** filtrar, buscar, paginar, ordenar, abrir/fechar painel, trocar aba, preferências de tabela (densidade, colunas, recursos). O próprio visual já mostra o resultado.
- **Sucesso:** `toast.success` dizendo o que aconteceu, com quantidade quando for em massa (ex.: "3 produtos enviados para cadastro"). Título curto, sem ponto final; detalhe opcional em `description`.
- **Erro:** `toast.error` com o motivo e o que fazer (ex.: "Não foi possível ignorar o produto" + "Tente de novo em alguns instantes."). Nunca mensagem técnica crua.
- **Ação assíncrona:** `toast.promise` ligado à chamada (carregando → sucesso/erro), ou `toast.success`/`toast.error` no `onSuccess`/`onError` do `useMutation`. Com atualização otimista, o erro aparece depois do rollback.
- **Ação reversível ou destrutiva** (ignorar, excluir, arquivar, mudar de etapa): toast com `action: { label: "Desfazer", onClick }` sempre que der para desfazer. Exclusão sem volta continua pedindo confirmação antes (AlertDialog) e mostra o toast depois.
- **Validação de formulário** fica no campo (`FieldError`), não em toast.
- Textos em pt-BR, no vocabulário da tela (os mesmos nomes de botões, etapas e status).


## Design system

- `src/designsystem/` é a vitrine de referência: seções, demos, dados mockados e funções auxiliares das demos. **Não modificar nada dentro dela**; ela existe só para ser consultada e usada como está.
- A rota `app/(protected)/components/` contém apenas `page.tsx`, que importa e renderiza a vitrine. Nada mais nessa pasta.
- Componentes reais e reutilizáveis ficam em `components/Modules/Core/DesignSystem/` (padrões) e `components/Modules/Core/Shell/` (casca do app). Telas novas usam esses componentes, não os de `src/designsystem/`.
- Constantes nomeadas ficam em `constants/Modules/<modulo>/<submodulo>/`.

### Integração com a ecomtrack.api (implementado)

- Catálogo único dos endpoints em `constants/Modules/Core/Api/api-endpoints.ts` (`API_ENDPOINTS.<grupo>.<acao>`: método, caminho, resumo, página e componente de permissão). Endpoint novo da API entra primeiro aqui.
- Service chama `requestApi(API_ENDPOINTS.x.y, schema, { params, query, body })` (`services/Modules/Core/Api/request-api.ts`): passa pelo repasse `app/api/modules/core/ecomtrack/[...path]`, põe o Bearer da sessão, o `X-Company-Id` do Owner (exceto rotas `platformScope` e `skipCompany`), renova o token em 401 e valida a resposta com Zod. Sessão (login, verify, refresh, logout) tem rotas próprias em `app/api/modules/core/auth/*`, com o refresh em cookie `httpOnly` do front.
- Toda página que usa endpoints declara as chaves em `PAGE_ENDPOINT_KEYS` (`constants/Modules/Core/Shell/page-endpoints.ts`); é o que o botão `</>` do Owner mostra. Um teste garante que os 83 endpoints estão mapeados.
- Permissões: `useCan()` → `can(API_ENDPOINTS.x.y.component)` lê `GET /permissions/me` (Owner sempre pode). Sem permissão, `ActionLockTooltip` no botão e `ActionLockedTag` no item de menu; na dúvida (carregando), bloqueia. A API valida de novo (403).
- Mutação que mexe em lista paginada usa `useOptimisticListMutation` (`hooks/Modules/Core/Api/`).
- Owner escolhe a empresa no seletor do header (`company-context-store`); "visualizar como" usa o `view-as-store` (token só de leitura + faixa no topo).
- E2E (Playwright, pasta `e2e/`): `pnpm e2e:login` pede o código; `E2E_LOGIN_CODE=xxxxxx pnpm e2e:login` grava a sessão; `pnpm e2e` roda tudo numa sessão única, dentro da empresa "E2E Testes Automatizados". Credenciais em `.env.e2e.local` (fora do git).
  - Cobertura: toda chamada ao BFF durante o E2E é registrada; no fim, `e2e/.coverage/relatorio.md` lista os 83 endpoints com os status recebidos e a execução falha se algum ficou sem resposta válida (sem 5xx nem 429). Endpoint novo precisa de teste E2E.
  - A API limita `/auth/*` a 10 chamadas por minuto por IP (cada página aberta renova a sessão). O E2E espera e repete quando recebe 429 (`e2e/support/retry-rate-limited.ts`), por isso a execução leva alguns minutos.
  - Áreas sem provedor cadastrado na API (hoje Agentes IA e Fornecedores) são testadas pelo aviso na tela e pela recusa (4xx) da API para conexões inexistentes.

### Permissões de ação (botões dentro da tela) — PLANEJADO, AINDA NÃO IMPLEMENTADO

Nada desta seção existe no v2 ainda (`useMenuActions`, `assertActionAccess`, `MenuActionsRefType`, `SIDEBAR_MODULE_ROUTES`, catálogos de ações). Não importar nem chamar esses símbolos. Ela descreve o padrão que será construído; quando uma tela precisar de permissão de ação antes disso, avisar e perguntar como seguir.

Cada menu pode ter ações cadastradas em Configurações > Ações (ex.: WMS / ORDERS / CANCEL), liberadas por perfil em Configurações > Permissões.

1. Catálogo do menu em `lib/Modules/<modulo>/<submodulo>/`, com `satisfies MenuActionsRefType` (ex.: `ORDER_ACTIONS_WMS`). Os nomes são iguais ao cadastro.
2. Na tela: `useMenuActions(CATALOGO)` → `can("ACAO")` e `isChecking`. Sem permissão, o botão fica desabilitado com cadeado (`ActionLockTooltip` em botão, `ActionLockedTag` em item de menu). Na dúvida (carregando, erro, ação não cadastrada, menu bloqueado), bloqueia.
3. No Route Handler que executa a ação: `await assertActionAccess(accessToken, CATALOGO, "ACAO")` antes de chamar o BFF. A trava da tela sozinha não impede uma chamada direta.
4. Só funciona em módulo que está em `SIDEBAR_MODULE_ROUTES` (as ações vêm dos menus do módulo).
5. WMS Pedidos: faturar (`INVOICE`), cancelar (`CANCEL`), prioridade (`CHANGE_PRIORITY`), operadores (`CHANGE_OPERATOR`) e resolver ocorrência (`RESOLVE`) já chamam `assertActionAccess`.

## Convenções de código

- **Arquivos**: `kebab-case`
- **Componentes**: `PascalCase` (padrão React)
- **Hooks**: `camelCase` com prefixo `use` (`useAlgumaCoisa`)
- **Tipos**: `PascalCase`, sem sufixo `Type` (ex.: `PageRange`, `TimelineEvent`)
- **Constantes**: `SCREAMING_SNAKE_CASE`

## Comandos

- Dev: `pnpm dev`
- Lint: `pnpm biome check .`
- Typecheck: `pnpm tsc --noEmit`
- Testes: `pnpm test` (Vitest + Testing Library; teste ao lado do arquivo, `*.test.ts(x)`)
- E2E: `pnpm e2e` (Playwright contra a API real; antes, `pnpm e2e:login`)
- Build: `pnpm build`
- Start: `pnpm start`

## Ao terminar uma tarefa

1. Rodar lint, typecheck e testes; tudo verde antes de dizer que terminou.
2. No resumo final, listar:
   - o que foi **reaproveitado** (componentes, hooks, funções já existentes);
   - o que foi **criado do zero**, onde ficou e por que nada existente servia;
   - o que foi **estendido** em código compartilhado e quais telas isso afeta.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
