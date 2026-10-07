# Inventário — Esteira de Cadastro

Rota Lovable `/cadastro` → rota v2 `/catalogo/esteira-cadastro`. Pasta `src/components/esteira-cadastro` (~15 mil linhas, das quais cerca de metade é código morto).

## O que a tela é

Fila de trabalho que leva um produto do catálogo do fornecedor até a loja. Seis abas, cada uma é uma etapa, com contador de itens:

1. **Importação** — produtos que chegaram pela API dos fornecedores e ainda não foram triados.
2. **Cadastro** — produtos aceitos, sendo cadastrados num assistente de 6 passos, e revisão do cadastro.
3. **Precificação** — definição do preço de venda e aprovação do preço.
4. **Publicação** — conferência final dos dados e envio para o e-commerce.
5. **Validação** — produto publicado aguardando ativação.
6. **Finalizados** — histórico de cadastros concluídos.

Fornecedores: UBIQFY e Codeswholesale. Produto sem fornecedor = **Manual**.

---

## 1. Importação

**KPIs:** A classificar (aguardando decisão) · Em estoque no fornecedor (oportunidade de venda) · Sem estoque (evitar cadastro até normalizar) · Ignorados (curadoria do catálogo).

**Tabela:** seleção, Produto (capa, nome, código do fornecedor), Fornecedor, Categoria, Região, Custo (em R$; se a moeda original não é BRL, mostra a original embaixo), Status (Disponível / Indisponível / Ignorado), Inserido (data e hora), ação Ver detalhes.

**Filtros:** busca por nome; Fornecedor (todos / UBIQFY / Codeswholesale); Disponibilidade (todas / disponível / indisponível, padrão **disponível**); alternar "Ignorados" (mostra só os ignorados).

**Cotações:** USD, EUR e GBP em R$, fonte Banco Central (PTAX) com data/hora de atualização. Custo em moeda estrangeira é convertido pela cotação.

**Ações:**
- Cadastrar (individual com confirmação, ou em massa com confirmação) → produto vai para a aba Cadastro como "Não iniciado". Toast: "Produto X transferido para fila de cadastro".
- Ignorar (individual ou em massa, confirmação, **destrutiva**) → vai para a lista de ignorados.
- Reativar (individual ou em massa, quando exibindo ignorados) → volta para A classificar.

**Detalhe (painel lateral):** Identificação (capa, nome, código), cotações, Dados do fornecedor (fornecedor, valor, estoque, data de importação), Descrição (região, categoria, marca, texto do fornecedor), Timeline (inserido no catálogo / ignorado). Rodapé: Ignorar + Cadastrar, ou Reativar.

**Vazio:** "Nenhum produto encontrado".

## 2. Cadastro

**KPIs:** Cadastros na fila (aguardando início) · Em andamento (sendo trabalhados) · Aguardando revisão (gargalo de conferência) · Para correção (impacta prazo e qualidade).

**Tabela:** Produto, Fornecedor (ou Manual), Status (Não iniciado / Em andamento / Revisar / Corrigir), Início (data e hora), Responsável, ações conforme o status: Cadastrar, Continuar, Revisar, Corrigir; sempre Remover.

**Filtros:** busca; Status (todos / pendentes = em andamento + revisar / cada status); Responsável.

**Ações:**
- **Cadastrar manual** → cria produto sem fornecedor e abre o assistente.
- Cadastrar / Continuar / Corrigir → abre o assistente.
- Revisar → abre o detalhe do produto.
- Remover (confirmação, **destrutiva**): "O produto será removido da tela de cadastro e todo o progresso será perdido." Volta para Importação.

### Assistente de cadastro (6 passos)

Painel lateral que não fecha ao clicar fora. Cabeçalho com nome e SKU. Indicador de passos (concluído, atual, bloqueado) e barra de progresso. Só se avança validando o passo; voltar é livre; pode-se clicar em passos já concluídos. Rodapé: Limpar (confirmação, limpa o passo), Voltar, Avançar / Concluir.

| Passo | Campos | Validação (mensagem) |
|---|---|---|
| Informações | Nome (só manual), busca no IGDB (preenche especificações e descrição bruta), Descrição bruta, Especificações técnicas, Observações | Nome; descrição bruta; especificações técnicas |
| Tags | Agente de IA (gerar tags), tag manual, tags selecionadas, sugestões da IA | Pelo menos uma tag |
| SEO & Dados | Agente de IA (gera tudo), Título (70), SKU (15, botão gerar: 8 letras do nome + sequencial de 6 dígitos), Descrição (texto rico), Meta title (60), Meta description (250), Slug (70, botão gerar a partir do título) | Todos obrigatórios |
| Marca | Combobox de marcas + criar marca | Marca selecionada |
| Categoria | Árvore de categorias (até 4 níveis) + criar categoria (pai opcional, nome até 70) | Categoria selecionada |
| Galeria | Envio de imagens do computador (só imagens), definir capa, remover; origem da imagem (IGDB, Fornecedor, IA, Upload) | Pelo menos uma imagem; uma capa |

- Concluir → status **Revisar**. Toast "Cadastro concluído! Produto aguardando revisão."
- **Modo correção:** só os passos reprovados ficam acessíveis; os demais aparecem aprovados e travados. "N seção(ões) para corrigir". Último passo → "Enviar para revisão".

## 3. Precificação

**KPIs:** Aguardando precificação · Aguardando aprovação de preço.

**Tabela:** Produto, Fornecedor, Categoria (último nível, caminho completo no tooltip), Marca, Venda, Custo, Margem (% com cor + lucro em R$), Cadastrado, ação Precificar ou Revisar.

**Configuração global de preço:** Imposto 6,5% · Taxa 4,99% · Margem (markup) 30% · Arredondamento R$ 0,97. "Alterações aplicam-se a todos os produtos."

**Preço sugerido:** custo × (1 + markup) ÷ (1 − (imposto + taxa)); arredonda para o próximo valor terminado nos centavos configurados; nunca abaixo do custo. Se imposto + taxa ≥ 100%, soma as taxas em vez de dividir.

**Painel de precificação:** identificação, configuração, detalhamento da venda (sugerido com "Usar", preço de venda, − imposto, − taxa, total de deduções, valor líquido, − custo base; produto manual digita o custo), **Lucro líquido** e **Margem** com cor (≥ 20% verde, ≥ 10% âmbar, < 10% vermelho). Precificar só com preço > 0 (e custo > 0 se manual).

**Revisão do preço:** Aprovar → vai para Publicação ("Precificação aprovada! Produto enviado para publicação."). Reprovar → limpa o preço e reabre o painel.

## 4. Publicação

**KPIs:** Aguardando publicação (pronto para publicar) · Pendência de integração (marca ou categoria pendente).

**Tabela:** igual à de Precificação; ação "Ver cadastro e publicar".

**Detalhe do produto (o mesmo painel serve Cadastro/Revisar, Publicação, Validação e Finalizados):** Identificação (fornecedor, criado/atualizado em e por quem), E-commerce (nome, SKU, ID, link, "Sincronizado"), Galeria (primeira imagem é a capa; reordenar com setas; remover com confirmação), Tags, Dados do produto, SEO, Marca & Categoria (status Integrada / Não integrada + vínculo com marca/categoria do e-commerce), Detalhamento de venda (editar preço; editar custo se manual), Timeline.

- **Editar** → mesmos campos editáveis + agente de IA ("Descreva o produto" → gera título, descrição, SEO e slug).
- **Publicar** só quando: todos os campos obrigatórios preenchidos, preço > 0, **marca e categoria integradas ao e-commerce**. Senão mostra "Publicação bloqueada" com os motivos. → vai para Validação ("Produto enviado para validação!").
- **Recriar** (confirmação, **destrutiva**): apaga todos os dados de cadastro e preço; volta para Cadastro.

## 5. Validação

**KPI:** Aguardando aprovação. **Tabela:** como Publicação + Status (Ativo / Inativo) + "Abrir no e-commerce". Detalhe com Editar e **Ativar** → Finalizados ("Produto ativado").

## 6. Finalizados

**KPIs:** Finalizados (total) · No período. **Filtro:** período (hoje, ontem, 7 e 30 dias, este mês, mês passado, desde o início — padrão, personalizado). **Tabela:** como Validação. Detalhe só leitura.

## Comuns a todas as abas

- Busca por nome ou SKU, paginação de 20, estado vazio com texto explicando de onde o produto vem.
- Mobile: abas viram seletor; tabelas viram cards.
- Agente de IA: mostra o agente em uso e permite **editar o prompt e o nome do agente** (afeta o agente global).

---

## Problemas do Lovable

**Fluxo quebrado (regra):**
1. "Revisar" na aba Cadastro abre o detalhe com o botão **Ativar**, que manda o produto direto para Finalizados, pulando Precificação, Publicação e Validação.
2. Não existe ação que leve um produto de "Revisar" para Precificação, nem que reprove seções (status "Corrigir" só aparece nos dados mockados).
3. Margem calculada de dois jeitos: a lista usa (venda − custo) ÷ venda; o painel desconta imposto e taxa. O detalhe de publicação usa imposto/taxa fixos em vez da configuração.
4. Contador da aba Importação = total da API − produtos na esteira (errado quando há ignorados).
5. Limpar filtros põe Disponibilidade em "todas"; remover o chip põe em "disponível".
6. Vínculo de marca/categoria com o e-commerce feito no painel é só local: some ao fechar.
7. Cadastrar manual cria "Novo Produto" na hora; fechar o assistente deixa lixo na fila.
8. Fechar o assistente perde o que foi digitado no passo atual (só salva ao avançar).
9. Galeria: no assistente a capa é marcada com estrela; no detalhe a capa é a primeira imagem. Botões IGDB/IA da galeria existem no código mas não aparecem.
10. Categoria e Região na Importação são texto fixo ("Jogos Digitais", "Global"); cotação GBP aparece mas não é usada.

**UI/UX:**
- Configuração global de preço editável dentro do painel de um produto — mudança com efeito em tudo escondida num lugar local.
- Edição do prompt global do agente de IA de dentro do cadastro de um produto.
- Skeleton falso a cada busca, troca de aba e página (atraso artificial).
- Paginação duplicada (topo e rodapé), 4 tabelas quase iguais copiadas, tabela e cards duplicados para mobile.
- Ações só por ícone, sem rótulo; a ação principal de cada linha não se destaca.
- Dois modelos de status convivendo (status antigo + etapa).

## Melhorias propostas

Visual/interação (aplico direto):
- `DataTable` com busca, colunas, densidade e paginação padrão; KPIs com `KpiCard`; abas animadas com contador; painéis `DetailSheet`; `Stepper` no assistente; `Timeline`; `FileDropzone` na galeria (arrastar e soltar); `ConfirmDialog` em toda ação destrutiva; Sonner em todos os retornos.
- Ação principal da linha com rótulo (Cadastrar, Continuar, Precificar, Publicar…), secundárias em menu.
- Clicar na linha abre o detalhe.
- Carregamento real via React Query (sem atraso falso).

Fluxo (precisa de aprovação):
- **A.** Revisão do cadastro com **Aprovar** (→ Precificação) e **Pedir correção** (escolhe as seções → Corrigir), no lugar de "Ativar".
- **B.** Um único status por produto: etapa + situação dentro da etapa.
- **C.** Margem sempre líquida (descontando imposto e taxa) em todas as telas, usando a configuração.
- **D.** Configuração de preço num botão "Regras de preço" no topo da aba Precificação, com confirmação.
- **E.** Assistente salva rascunho a cada passo; fechar = "Salvar e sair". Cadastro manual só entra na fila no primeiro salvamento.
- **F.** Galeria única: arrastar para reordenar, primeira imagem = capa (igual em assistente e detalhe).
- **G.** Agente de IA só mostra qual agente está em uso; editar prompt fica em Configurações.
- **H.** Vínculo marca/categoria com e-commerce: decidir se fica no painel (persistindo) ou se o painel só aponta a pendência com atalho para Marcas/Categorias.
- **I.** `EsteiraCadastro` (órfã) é versão antiga desta tela → descartar.

## Dúvidas para o grill

- Descrição do produto precisa de texto rico (negrito, listas)? O v2 não tem editor; seria uma dependência nova.
- IGDB e geração por IA entram agora (mockados) ou ficam para depois?
- Precificar e aprovar preço são feitos por pessoas diferentes (Comercial aprova)? Se não, juntar em um passo.
- Validação: o que o operador confere antes de Ativar? Existe "reprovar" nessa etapa?
- "Responsável": quem atribui? É quem iniciou o cadastro?
- Permissões por ação (Cadastrar, Ignorar, Remover, Aprovar preço, Publicar, Ativar, Recriar) — o v2 ainda não tem; seguir sem trava por enquanto?
- Ordem de entrega sugerida: (1) casca + Importação, (2) Cadastro + assistente, (3) Precificação, (4) Publicação + Validação + Finalizados.
