# Portfólio Waldir Reis — Design

Data: 2026-11-23

## Intenção

Site de portfólio que faça um recrutador querer contratar o Waldir. Ele é analista de negócio / gerente de projetos
com 15+ anos na Equatorial Energia e está migrando para tecnologia: **primeiro BI, depois full-stack**.
A narrativa transforma a origem em negócio no diferencial: *"entendo o problema de negócio e construo a solução em dados e software"*.

## Objetivos

- Recrutador de BI entende em < 10 s quem ele é, vê resultado real (Smart Collection / Power UP) e um dashboard interativo.
- Recrutador técnico vê que ele programa: o próprio site (código no GitHub) + o ERP da farmácia.
- Contato com 1 clique (e-mail, WhatsApp, LinkedIn, currículo PDF).

## Não-objetivos (por agora)

- Mais de um case de BI ("Continua Suspenso" fica fora; entra depois).
- Smart Investment WR fica fora da 1ª versão (pode entrar depois em "Outros projetos").
- Blog, CMS, área administrativa, inglês (versão EN pode vir depois).

## Anti-objetivos (seria fracasso mesmo funcionando)

- Expor dado real, logo ou nome interno da Equatorial nos dashboards, ou o e-mail corporativo.
- Parecer template genérico de portfólio dev.
- Dashboard lento ou quebrado no celular.

## Abordagens consideradas

| Opção | Trade-off | Decisão |
|---|---|---|
| **A) Next.js + Vercel, dashboards recriados em código com dados fictícios** | Mais trabalho; mas o site é prova técnica para BI e full-stack | **Escolhida pelo usuário** |
| B) HTML/JS estático no GitHub Pages | Rápido; impressiona menos como dev | Descartada |
| C) Embed do Power BI "Publicar na Web" | Mostra Power BI real; exige republicar com dados fictícios, conta que permita, lento, não mostra dev | Descartada |

## Conteúdo (decidido com o usuário)

**Contato:** waldir.reis2@gmail.com · (98) 98406-7989 (WhatsApp) · linkedin.com/in/waldirfigueiredo · São Luís – MA.

**Seções, nesta ordem:**

1. **Hero** — nome, posicionamento ("Business Intelligence · Analytics · em transição para desenvolvimento"),
   frase de valor, CTAs: "Ver dashboard" e "Falar comigo". Foto do perfil (pedir ao usuário um arquivo de foto).
2. **Destaque Power UP 2025 (Google Cloud)** — fotos de `Fotos/Power Up Google 2025/`, texto baseado na postagem.
   Números (versão do slide, decidida pelo usuário): ROI **+8,6 p.p.** no primeiro ano de operação (2024 vs 2023),
   **payback em 7 meses**, resultado projetado para 5 anos atingido em 1 ano (**4× acima do esperado**).
   Detalhe por ação: Reaviso +12,02 pp · Visita +3,57 pp · Recorte +1,77 pp · Simbólico +5,04 pp · Corte +0,61 pp.
   Créditos ao time Equatorial e Accenture (sem listar nomes de gestores).
3. **Case de BI — Painel Diário de Corte e Recorte** (recriação interativa):
   - Problema → solução → impacto (KPIs operacionais diários para 7 distribuidoras, fonte Snowflake).
   - Dashboard com filtros (distribuidora, regional, mês, prioridade, modalidade corte/recorte):
     executado × meta × potencial por dia e por mês; acumulado corte/recorte; barras de % Executado×Atribuído (meta 70%),
     Atribuído×Gerado (meta 80%), Improdutivo, Pago×Executado; dispersão por regional; empilhado por prioridade.
     Verde/vermelho para bateu/não bateu meta, como no original.
   - **Anonimização:** distribuidoras e regionais fictícias, números gerados por script com sazonalidade realista,
     sem logo, sem e-mail corporativo, com aviso "dados fictícios".
   - Bloco "Stack": Power BI, DAX, SQL, Snowflake + screenshot estilizado (anonimizado) do original.
4. **Case de Software — Balcão de Controlados (ERP de farmácia)** — problema real, solução (Python, Tkinter, SQLite,
   leitura de PDF de estoque, etiquetas), roadmap para versão web. Screenshots com dados fictícios. Sem PIN/dados reais.
5. **Trajetória** — linha do tempo:
   - 2009: entrada como **estagiário**, via programa com **+10.000 candidatos para 10 vagas**.
   - 2009–2013 Analista Comercial Jr · 2014–2017 Pleno (MA e PA) · 2018–2022 Sênior · 10/2022– Gerente de Projetos (Smart Collection,
     co-responsável pela célula de Analytics da Cobrança).
   - Formação: Administração, MBA/Especialização em Ciência de Dados, ADS (UNDB, em andamento).
6. **Competências** — agrupadas: BI & Dados (Power BI, SQL/PL-SQL, Snowflake, BigQuery, ETL, Excel), Programação (Python),
   Negócio (cobrança, KPIs, estratégia, gestão de projetos).
7. **Contato** — e-mail, WhatsApp, LinkedIn, botão "Baixar currículo (PDF)".

## Entregável paralelo: currículo corrigido

Gerar nova versão do currículo alinhada ao site: Smart Collection com números do slide (ROI +8,6 p.p. no 1º ano,
payback 7 meses, 4×); entrada em 2009 como estagiário via programa seletivo (+10.000 candidatos / 10 vagas), efetivação em 2011;
e-mail gmail. PDF publicado no site e arquivo editável entregue ao usuário.

## Decisões técnicas (escolhas do Claude, corrigíveis)

- Next.js (App Router) + TypeScript + Tailwind, gráficos com Recharts, deploy na Vercel (subdomínio grátis; domínio próprio opcional).
- Dados fictícios gerados por script (seed fixo) em JSON estático; filtros calculados no cliente.
- Visual: escuro/sofisticado com acento de cor único, tipografia marcante; responsivo e rápido no celular.
- Código em repositório público no GitHub do usuário.

## Deixado para quem implementar

Paleta e tipografia exatas, animações, estrutura de componentes, formato do gerador de dados.

## Dados confirmados pelo usuário (2026-11-24)

- Foto: `Fotos/perfil.png`.
- GitHub: github.com/waldirreis · Vercel: vercel.com/waldirreis2-7601.
- Screenshots do Balcão de Controlados: autorizado gerar com dados fictícios.
- Formação: Administração — UNDB (2011–2014) e FACEM (2015–2016); MBA/Especialização em Ciência de Dados — UNIASSELVI (2022–2024);
  MBA em Gestão Lean — em andamento (falta TCC); ADS — UNDB (08/2026 – previsão 08/2028).
