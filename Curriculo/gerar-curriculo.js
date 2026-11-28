// Gera o currículo em .docx (editável) e .html (para PDF via Chrome) a partir do mesmo conteúdo.
const fs = require("fs");
const d = require("docx");
const [outDocx, outHtml] = process.argv.slice(2);

const cv = {
  nome: "WALDIR FIGUEIREDO F. REIS",
  titulo: "BUSINESS INTELLIGENCE | ANALYTICS | ENGENHARIA DE DADOS | GESTÃO DE PROJETOS",
  contato: "(98) 98406-7989 | waldir.reis2@gmail.com | São Luís – MA | linkedin.com/in/waldirfigueiredo | github.com/waldirreis | waldirreis.vercel.app",
  resumo:
    "Administrador, especialista em Ciência de Dados, com mais de 15 anos de experiência na Equatorial Energia, a primeira multi-utilities nacional, atuando na liderança de projetos, gestão de equipes e transformação de processos por meio de dados e tecnologia. Visão estratégica que conecta negócio, tecnologia e dados, transformando desafios operacionais em soluções, indicadores e resultados mensuráveis, com experiência em Power BI, SQL, Python, Snowflake e BigQuery aplicados a soluções analíticas, processamento de dados e automação de processos. Gerente do projeto Smart Collection, apresentado no Google Cloud Power UP 2025. Atualmente cursando Análise e Desenvolvimento de Sistemas e desenvolvendo aplicações web próprias, aprofundando conhecimentos em programação, arquitetura de soluções e engenharia de dados.",
  competencias:
    "Power BI • DAX • SQL / PL/SQL • Python • Snowflake • BigQuery • ETL • Modelagem de Dados • FastAPI • Next.js • Excel • Business Intelligence • Analytics • Engenharia de Dados • KPI e Indicadores • Regras de Negócio • Automação de Processos • Gestão de Projetos e Equipes • Estratégia Comercial • Cobrança e Recuperação de Crédito • SAP Comercial • CRM",
  experiencia: [
    {
      cab: "Equatorial Energia | Gerente de Projetos", periodo: "(10/2022 – Atual)",
      itens: [
        "Gerente do Smart Collection, solução pioneira no mercado, desenvolvida na Google Cloud para automatizar, centralizar e reduzir custos operacionais nos processos de recuperação de crédito, com modelos preditivos para aprimorar a tomada de decisão e maximizar a arrecadação.",
        "Resultados do primeiro ano de operação (2024 vs 2023): ROI +8,6 p.p. e payback em 7 meses; o resultado financeiro projetado para 5 anos foi alcançado em 1 ano, 4× acima do esperado. Case apresentado no Google Cloud Power UP 2025 (São Paulo).",
        "Co-responsável pela célula de Analytics da Cobrança do Grupo Equatorial; desenvolvimento de painéis diários em Power BI sobre o Snowflake para acompanhamento das ações de corte e recorte em 7 distribuidoras.",
      ],
    },
    {
      cab: "Equatorial Energia | Analista Comercial Sênior", periodo: "(2018 – 10/2022)",
      itens: [
        "Elaboração de estratégias comerciais, KPIs e rotinas de monitoramento voltadas à melhoria da arrecadação no segmento Varejo, com faturamento médio anual de R$ 35 milhões.",
        "Gerenciamento da cadeia de cobrança, com definição e acompanhamento de regras de negócio, priorização e retroalimentação dos modelos.",
      ],
    },
    {
      cab: "Equatorial Energia Maranhão e Pará | Analista Comercial Pleno", periodo: "(2014 – 2017)",
      itens: [
        "Elaboração de estratégias comerciais, KPIs e rotinas de monitoramento voltadas à melhoria da arrecadação nos segmentos Alta Tensão e Poder Público, com faturamento médio anual de R$ 9 milhões.",
        "Implantação e monitoramento de réguas de cobrança para clientes corporativos de alta tensão e poder público.",
        "Atendimento, negociação e tratamento de débitos, com foco em recuperação de crédito e melhoria dos resultados de arrecadação.",
      ],
    },
    {
      cab: "Equatorial Energia Maranhão | Estagiário → Analista Comercial Júnior", periodo: "(2009 – 2013)",
      itens: [
        "Ingresso em 2009 como estagiário por programa seletivo com mais de 10.000 candidatos para 10 vagas; efetivado em 2011.",
        "Gerenciamento da cadeia de negociação dos maiores débitos; definição de estratégias, elaboração de KPIs e monitoramento de resultados.",
        "Implantação do programa de desenvolvimento do Consultor de Relacionamento do Grupo Equatorial.",
      ],
    },
  ],
  projetos: [
    "SmartFarma WR — sistema web de gestão farmacêutica para a venda de medicamentos controlados (Python, FastAPI, SQLAlchemy, PostgreSQL/SQLite). Reduziu em 90% o tempo de atendimento até a concretização da venda e eliminou o retrabalho do responsável técnico no processo automatizado. Atendimento em tela única, baixa transacional de estoque por lotes com lógica FEFO, etiquetas inteligentes, relatórios, módulo do responsável técnico, auditoria completa e segurança com sessões no servidor, CSRF, CSP e PIN com bloqueio progressivo.",
    "Portfólio com dashboard interativo — recriação em Next.js/TypeScript do painel diário de corte e recorte, com dados fictícios.",
  ],
  formacao: [
    ["Análise e Desenvolvimento de Sistemas", "UNDB | Em andamento", "(08/2026 – Previsão: 08/2028)"],
    ["MBA em Gestão Lean", "Em conclusão (TCC)", ""],
    ["Especialização em Ciência de Dados", "UNIASSELVI", "(2022 – 2024)"],
    ["Bacharelado em Administração de Empresas", "UNDB (2011 – 2014) e FACEM (2015 – 2016)", ""],
  ],
  idiomas: "Português: Nativo | Inglês: Intermediário | Espanhol: Básico",
};

// ---------- DOCX ----------
const BLUE = "1F4E79";
const F = "Arial";
const sec = (t) => new d.Paragraph({ children: [new d.TextRun({ text: t, bold: true, color: BLUE, size: 24, font: F })], spacing: { before: 200, after: 80 }, keepNext: true });
const body = (t) => new d.Paragraph({ children: [new d.TextRun({ text: t, size: 20, font: F })], alignment: d.AlignmentType.JUSTIFIED, spacing: { after: 60 } });
const bullet = (t) => new d.Paragraph({ children: [new d.TextRun({ text: t, size: 20, font: F })], numbering: { reference: "b", level: 0 }, alignment: d.AlignmentType.JUSTIFIED, spacing: { after: 30 } });

const kids = [
  new d.Paragraph({ alignment: d.AlignmentType.CENTER, children: [new d.TextRun({ text: cv.nome, bold: true, size: 36, font: F })] }),
  new d.Paragraph({ alignment: d.AlignmentType.CENTER, spacing: { before: 60 }, children: [new d.TextRun({ text: cv.titulo, bold: true, color: BLUE, size: 20, font: F })] }),
  new d.Paragraph({ alignment: d.AlignmentType.CENTER, spacing: { before: 60, after: 60 }, children: [new d.TextRun({ text: cv.contato, size: 18, font: F })] }),
  sec("RESUMO PROFISSIONAL"), body(cv.resumo),
  sec("COMPETÊNCIAS-CHAVE"), body(cv.competencias),
  sec("EXPERIÊNCIA PROFISSIONAL"),
];
for (const e of cv.experiencia) {
  const [emp, cargo] = e.cab.split(" | ");
  kids.push(new d.Paragraph({ keepNext: true, spacing: { before: 100, after: 40 }, children: [
    new d.TextRun({ text: emp + " | ", bold: true, size: 20, font: F }),
    new d.TextRun({ text: cargo + " ", bold: true, color: BLUE, size: 20, font: F }),
    new d.TextRun({ text: e.periodo, italics: true, color: "808080", size: 20, font: F }),
  ] }));
  e.itens.forEach((i) => kids.push(bullet(i)));
}
kids.push(sec("PROJETOS"));
cv.projetos.forEach((p) => kids.push(bullet(p)));
kids.push(sec("FORMAÇÃO ACADÊMICA"));
for (const [c, i, p] of cv.formacao) {
  kids.push(new d.Paragraph({ spacing: { after: 30 }, children: [
    new d.TextRun({ text: c, bold: true, size: 20, font: F }),
    new d.TextRun({ text: " | " + i + (p ? " " : ""), size: 20, font: F }),
    new d.TextRun({ text: p, color: "808080", size: 20, font: F }),
  ] }));
}
kids.push(sec("IDIOMAS"), body(cv.idiomas));

const doc = new d.Document({
  numbering: { config: [{ reference: "b", levels: [{ level: 0, format: d.LevelFormat.BULLET, text: "•", alignment: d.AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
  sections: [{ properties: { page: { margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } }, children: kids }],
});
d.Packer.toBuffer(doc).then((b) => fs.writeFileSync(outDocx, b));

// ---------- HTML (PDF) ----------
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Currículo Waldir Reis</title><style>
@page { size: A4; margin: 14mm 16mm; }
body { font-family: Arial, sans-serif; font-size: 10pt; color: #111; line-height: 1.35; }
h1 { text-align: center; font-size: 18pt; margin: 0; }
.t { text-align: center; color: #${BLUE}; font-weight: bold; margin: 4px 0; }
.c { text-align: center; font-size: 9pt; margin-bottom: 6px; }
h2 { color: #${BLUE}; font-size: 12pt; margin: 12px 0 4px; break-after: avoid; }
p { margin: 0 0 4px; text-align: justify; }
ul { margin: 2px 0 6px; padding-left: 20px; } li { text-align: justify; margin-bottom: 2px; }
.e { font-weight: bold; margin-top: 6px; break-after: avoid; } .e span { color: #${BLUE}; } .e i { color: #808080; font-weight: normal; }
.g { color: #808080; }
</style></head><body>
<h1>${cv.nome}</h1><div class="t">${cv.titulo}</div><div class="c">${cv.contato}</div>
<h2>RESUMO PROFISSIONAL</h2><p>${esc(cv.resumo)}</p>
<h2>COMPETÊNCIAS-CHAVE</h2><p>${cv.competencias}</p>
<h2>EXPERIÊNCIA PROFISSIONAL</h2>
${cv.experiencia.map((e) => { const [a, b] = e.cab.split(" | "); return `<div class="e">${a} | <span>${esc(b)}</span> <i>${e.periodo}</i></div><ul>${e.itens.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`; }).join("")}
<h2>PROJETOS</h2><ul>${cv.projetos.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
<h2>FORMAÇÃO ACADÊMICA</h2>${cv.formacao.map(([c, i, p]) => `<p><b>${c}</b> | ${i} <span class="g">${p}</span></p>`).join("")}
<h2>IDIOMAS</h2><p>${cv.idiomas}</p>
</body></html>`;
fs.writeFileSync(outHtml, html);
