# Portfólio Waldir Reis — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Site de portfólio em Next.js com um case de BI interativo (dados fictícios), destaque Power UP 2025, case do ERP de farmácia, trajetória e contato, publicado na Vercel; mais o currículo corrigido em PDF.

**Architecture:** Site de página única (App Router, renderização estática). O dashboard lê um JSON gerado por script determinístico (seed fixo) e filtra/agrega no cliente com funções puras testadas. Todo o texto fica em `src/content/` para facilitar revisões.

**Tech Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS 4, Recharts, Vitest, Playwright (screenshots/smoke), Vercel.

**Spec:** `docs/superpowers/specs/2026-11-23-portfolio-design.md`

## Global Constraints

- Idioma: português do Brasil em todo o site.
- Nenhuma ocorrência de `Equatorial`, `EQTL`, `equatorialenergia` nos **dados e telas do dashboard** nem do ERP; `Equatorial` só aparece em Trajetória e Power UP.
- Contato: `waldir.reis2@gmail.com`, `(98) 98406-7989` (link `https://wa.me/5598984067989`), `https://www.linkedin.com/in/waldirfigueiredo`, `https://github.com/waldirreis`.
- Números Smart Collection: ROI `+8,6 p.p.` (2024 vs 2023), payback `7 meses`, `4×` acima do esperado; por ação: Reaviso +12,02 · Simbólico +5,04 · Visita +3,57 · Recorte +1,77 · Corte +0,61 (p.p.).
- Trajetória: 2009 estagiário (programa com +10.000 candidatos para 10 vagas), efetivado 2011; Jr 2009–2013, Pleno 2014–2017, Sênior 2018–10/2022, Gerente de Projetos 10/2022–atual.
- Formação: Administração UNDB 2011–2014 e FACEM 2015–2016; Especialização Ciência de Dados UNIASSELVI 2022–2024; MBA Gestão Lean em andamento (TCC); ADS UNDB 08/2026–08/2028.
- Metas do dashboard: Executado×Atribuído `70%`, Atribuído×Gerado `80%`.
- Aviso visível no dashboard: "Dados fictícios gerados para demonstração."
- Lighthouse mobile ≥ 90 em Performance e Acessibilidade; sem scroll horizontal em 360 px.

## Review Focus

- Filtro que zera o conjunto (ex.: distribuidora sem dados no mês) → KPIs mostram 0/“—”, gráficos vazios, sem `NaN%` nem crash. (Task 3)
- Divisão por zero em percentuais (atribuído = 0) → `null`, exibido como “—”. (Task 3)
- Tela de 360 px → gráficos rolam dentro do card, página sem scroll horizontal. (Task 4/8)
- Vazamento de nome real em dados gerados ou screenshots. (Task 2, Task 6)
- Fotos pesadas do Power UP atrasando o carregamento → `next/image` com tamanhos responsivos. (Task 5)

---

### Task 1: Scaffold do projeto

**Files:** Create: `site/` (projeto Next.js), `site/vitest.config.ts`, `site/src/app/layout.tsx`, `site/src/app/globals.css`, `.gitignore`

- [ ] **Step 1:** `git init` na raiz `Portifolio/`; `.gitignore` exclui `Dados/*.pbix`, `Dados/*.pdf`, `node_modules`, `.next`. (Os PDFs de `Dados/` contêm dados reais — nunca versionar.)
- [ ] **Step 2:** `npx create-next-app@15 site --ts --tailwind --app --src-dir --eslint --no-turbopack --import-alias "@/*"`; instalar `recharts`, `vitest`, `@vitejs/plugin-react`, `@playwright/test`.
- [ ] **Step 3:** Tokens de tema em `globals.css` (fundo escuro `#0B0F14`, superfície `#121821`, texto `#E6EDF3`, acento único `#3DDC97`, vermelho meta `#F2545B`, verde meta `#3DDC97`); fontes via `next/font` (títulos: Space Grotesk; texto: Inter). `lang="pt-BR"`, metadata com título “Waldir Reis — Business Intelligence & Analytics”.
- [ ] **Step 4:** Copiar `Fotos/perfil.png` e `Fotos/Power Up Google 2025/*.jpg` para `site/public/img/` (renomear: `perfil.png`, `powerup-roi.jpg`, `powerup-lideres.jpg`, `powerup-motivadores.jpg`).
- [ ] **Step 5:** `npm run build` passa; `npx vitest run` roda (0 testes ok).
- [ ] **Step 6:** Commit `chore: scaffold next.js site`.

### Task 2: Gerador de dados fictícios

**Files:** Create: `site/scripts/generate-corte.ts`, `site/src/lib/corte/types.ts`, `site/src/lib/corte/generate.ts`, `site/src/data/corte.json`; Test: `site/src/lib/corte/generate.test.ts`

**Interfaces — Produces:**
```ts
type Modalidade = 'CORTE' | 'RECORTE';
type Prioridade = '01 - Maior 5K' | '02 - Maior 1K' | '03 - Menor 1K';
interface CorteRow { data: string /*YYYY-MM-DD*/; distribuidora: string; regional: string; modalidade: Modalidade; prioridade: Prioridade;
  gerado: number; atribuido: number; executado: number; improdutivo: number; pago: number; meta: number; potencial: number; }
function generateCorte(seed: number, ano: number, ateData: string): CorteRow[]
```
Distribuidoras fictícias (7): `Distribuidora Norte, Distribuidora Litoral, Distribuidora Sertão, Distribuidora Planalto, Distribuidora Delta, Distribuidora Serra, Distribuidora Sul`, cada uma com 2–5 regionais (`Centro, Norte, Sul, Leste, Oeste, Metropolitana…`). Dias úteis apenas; sazonalidade mensal suave; ~25% dos dias abaixo da meta.

- [ ] **Step 1: Testes:** `deterministic` (mesmo seed → `toEqual`); `invariants` (para toda linha `atribuido <= gerado`, `executado <= atribuido`, `pago <= executado`, `improdutivo <= executado`, todos inteiros ≥ 0); `no-real-names` (`JSON.stringify(rows)` não casa `/equatorial|eqtl/i`); `coverage` (7 distribuidoras, 2 modalidades, 3 prioridades, até `ateData`).
- [ ] **Step 2:** Rodar `npx vitest run src/lib/corte` → FAIL.
- [ ] **Step 3:** Implementar com PRNG `mulberry32(seed)`.
- [ ] **Step 4:** Testes passam; `npx tsx scripts/generate-corte.ts` grava `src/data/corte.json` (seed 2026, ano 2026, até `2026-11-12`), < 1,5 MB.
- [ ] **Step 5:** Commit `feat: fictitious corte dataset generator`.

### Task 3: Filtros e métricas

**Files:** Create: `site/src/lib/corte/metrics.ts`; Test: `site/src/lib/corte/metrics.test.ts`

**Interfaces — Consumes:** `CorteRow`. **Produces:**
```ts
interface Filtros { distribuidora?: string; regional?: string; mes?: number /*1-12*/; modalidade?: Modalidade; prioridade?: Prioridade }
function applyFilters(rows: CorteRow[], f: Filtros): CorteRow[]
function pct(n: number, d: number): number | null            // d===0 → null
function totals(rows): { gerado; atribuido; executado; pago; meta; potencial; pctExecAtrib: number|null; pctAtribGerado: number|null; pctImprodutivo: number|null; pctPagoExec: number|null }
function byDay(rows, mes: number): { dia: number; executado; meta; potencial; bateuMeta: boolean }[]
function byMonth(rows): { mes: number; executado; meta; potencial; bateuMeta: boolean }[]
function byGroup(rows, key: 'distribuidora'|'regional'): ({ nome: string } & ReturnType<typeof totals>)[]  // ordenado desc por pctExecAtrib
function byPrioridade(rows, key: 'distribuidora'|'regional'): { nome: string; '01 - Maior 5K': number|null; '02 - Maior 1K': number|null; '03 - Menor 1K': number|null }[]
```
- [ ] **Step 1: Testes** com fixture de 4 linhas escritas à mão: `pct(1,0) === null`; `pct(7,10) === 70`; `applyFilters` por distribuidora e mês; `totals([])` → zeros e `null` nos pct; `byDay` marca `bateuMeta` quando `executado >= meta`; `byGroup` ordena desc.
- [ ] **Step 2:** FAIL → **Step 3:** implementar → **Step 4:** PASS.
- [ ] **Step 5:** Commit `feat: corte metrics`.

### Task 4: Dashboard interativo

**Files:** Create: `site/src/components/dashboard/{CorteDashboard,Filtros,KpiStrip,ChartDiario,ChartMensal,ChartRanking,ChartPrioridade,ChartDispersao}.tsx` (`'use client'`), `site/src/lib/format.ts`; Test: `site/src/lib/format.test.ts`

- `format.ts`: `fmtInt(n)` → `"11.522"`; `fmtPct(n|null)` → `"92,7%"` ou `"—"`.
- Layout (desktop 2 colunas, mobile 1): Filtros (distribuidora, regional dependente, mês, modalidade, prioridade, botão limpar) → KpiStrip (Gerado, Atribuído, Executado, Pago, % Exec×Atrib, % Pago×Exec) → Executado×Meta×Potencial por dia (barras verdes/vermelhas + linha meta pontilhada + linha potencial cinza) → acumulado mensal (mesmo padrão) → rankings horizontais Exec×Atrib (linha de meta 70%) e Atrib×Gerado (meta 80%) → empilhado por prioridade → dispersão % Prod. Atribuído × % Atribuição por regional, com medianas tracejadas.
- Agrupamento automático: sem distribuidora selecionada → por distribuidora; com → por regional.
- Gráficos em `ResponsiveContainer`; contêiner com `overflow-x-auto` e `min-w` no mobile.
- [ ] **Step 1:** testes de `format.ts` (`fmtPct(null)==='—'`, `fmtInt(11522)==='11.522'`) → FAIL → implementar → PASS.
- [ ] **Step 2:** Implementar componentes; selo “Dados fictícios gerados para demonstração.”
- [ ] **Step 3:** Smoke Playwright `e2e/dashboard.spec.ts`: carregar `/`, selecionar `Distribuidora Norte`, KPI “Executado” muda; selecionar mês sem dados não gera texto `NaN`; viewport 360 px → `document.documentElement.scrollWidth <= 360`.
- [ ] **Step 4:** Commit `feat: interactive corte dashboard`.

### Task 5: Seções de conteúdo

**Files:** Create: `site/src/content/perfil.ts` (contatos, trajetória, formação, competências, textos), `site/src/components/sections/{Hero,PowerUp,CaseBI,CaseERP,Trajetoria,Competencias,Contato,Nav}.tsx`, `site/src/app/page.tsx`; Test: `site/src/content/perfil.test.ts`

- Ordem na página: Nav fixa → Hero → PowerUp → CaseBI (texto problema/solução/impacto + `<CorteDashboard/>` + stack Power BI, DAX, SQL, Snowflake) → CaseERP → Trajetoria → Competencias → Contato.
- Hero: foto `perfil.png` (redonda/recortada), nome “Waldir Figueiredo F. Reis”, título “Business Intelligence & Analytics”, subtítulo “15+ anos transformando problemas de negócio em resultados — agora em dados e software.”, CTAs “Ver dashboard” (#bi) e “Falar comigo” (#contato), chips com 3 números (ROI +8,6 p.p. · Payback 7 meses · 15+ anos).
- PowerUp: título “Palco Google Cloud Power UP 2025”, texto adaptado da postagem (sem nomes de gestores; créditos “time Equatorial e Accenture”), grade com as 3 fotos (`next/image`, `sizes` responsivo), cartões com os números das Global Constraints.
- CaseERP: problema (balcão de controlados), solução (Python, Tkinter, SQLite, leitura de PDF de estoque, etiquetas), próximo passo (versão web), screenshots da Task 6.
- Contato: e-mail, WhatsApp, LinkedIn, GitHub, botão “Baixar currículo (PDF)” → `/curriculo-waldir-reis.pdf`.
- [ ] **Step 1: Testes** de `perfil.ts`: email === `waldir.reis2@gmail.com`; nenhum valor contém `equatorialenergia.com.br`; trajetória começa em 2009 com texto contendo `10.000`; ROI === `+8,6 p.p.`.
- [ ] **Step 2:** FAIL → implementar conteúdo e seções → PASS; `npm run build` ok.
- [ ] **Step 3:** Commit `feat: portfolio sections`.

### Task 6: Screenshots do ERP com dados fictícios

**Files:** Create: `site/scripts/erp-fake-db.py`, `site/public/img/erp-*.png`

- [ ] **Step 1:** Ler `C:\Users\waldi\balcao-controlados\versao-desktop\balcao_controlados.py` para descobrir o schema SQLite; criar script que gera `farmacia.db` **numa cópia temporária no scratchpad** com medicamentos, lotes e atendimentos fictícios (clientes `Cliente Exemplo 01…`). Não alterar nada no repositório do ERP.
- [ ] **Step 2:** Rodar a cópia apontando para o banco fictício; capturar 3 telas (consulta, atendimento, etiqueta) com PowerShell/`System.Drawing`; salvar em `site/public/img/erp-consulta.png`, `erp-atendimento.png`, `erp-etiqueta.png`.
- [ ] **Step 3:** Conferir visualmente cada imagem: sem PIN, sem nome real. Commit `feat: erp screenshots (fictitious data)`.

### Task 7: Currículo corrigido

**Files:** Create: `Curriculo/Curriculo_Waldir_Reis_2026.docx`, `site/public/curriculo-waldir-reis.pdf`

- [ ] **Step 1:** Usar o skill `anthropic-skills:docx` para recriar o currículo ATS (mesma estrutura do PDF atual) com as correções das Global Constraints: e-mail gmail; Smart Collection “ROI +8,6 p.p. no primeiro ano de operação (2024), payback em 7 meses, resultado projetado para 5 anos atingido em 1 ano (4× acima do esperado), apresentado no Google Cloud Power UP 2025”; trajetória iniciando em 2009 como estagiário (programa com +10.000 candidatos para 10 vagas), efetivado em 2011; formação corrigida; GitHub e portfólio adicionados.
- [ ] **Step 2:** Converter para PDF; ler o PDF e conferir cada item corrigido.
- [ ] **Step 3:** Commit `docs: updated resume`.

### Task 8: Acabamento, verificação e deploy

**Files:** Create: `site/src/app/opengraph-image.png` (ou `.tsx`), `site/src/app/icon.svg`; Modify: `site/src/app/layout.tsx`

- [ ] **Step 1:** Metadata OG (título, descrição, imagem com nome + foto) e favicon com iniciais “WR”.
- [ ] **Step 2:** `npm run build && npx vitest run && npx playwright test` → tudo verde.
- [ ] **Step 3:** Lighthouse mobile (Chrome DevTools MCP) em `npm start` → Performance e Acessibilidade ≥ 90; corrigir o que faltar.
- [ ] **Step 4:** **Pedir confirmação ao usuário** antes de: criar repositório público `waldirreis/portfolio` no GitHub e fazer push; deploy de produção na Vercel (conta `waldirreis2-7601`).
- [ ] **Step 5:** Deploy; abrir a URL publicada em 1280 px e 360 px e conferir todas as seções.
