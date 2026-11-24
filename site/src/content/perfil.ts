export const perfil = {
  nome: "Waldir Figueiredo F. Reis",
  nomeCurto: "Waldir Reis",
  titulo: "Business Intelligence & Analytics",
  local: "São Luís – MA",
  subtitulo:
    "15+ anos transformando problemas de negócio em resultados medidos — agora em dados e software.",
  resumo:
    "Administrador com especialização em Ciência de Dados e carreira construída dentro da operação de cobrança de um dos maiores grupos de energia do país. Uso Power BI, SQL, Python e Snowflake para transformar a operação em indicadores, decisões e ROI, e estou cursando Análise e Desenvolvimento de Sistemas para levar isso ao desenvolvimento full-stack.",
  destaques: [
    { valor: "+8,6 p.p.", label: "de ROI no 1º ano do Smart Collection" },
    { valor: "7 meses", label: "de payback do projeto" },
    { valor: "15+ anos", label: "de negócio, dados e cobrança" },
  ],
  contato: {
    email: "waldir.reis2@gmail.com",
    telefone: "(98) 98406-7989",
    whatsapp: "https://wa.me/5598984067989",
    linkedin: "https://www.linkedin.com/in/waldirfigueiredo",
    github: "https://github.com/waldirreis",
    curriculo: "/curriculo-waldir-reis.pdf",
  },
  powerup: {
    titulo: "No palco do Google Cloud Power UP 2025",
    texto: [
      "Fui convidado a representar o Grupo Equatorial no Power UP 2025, em São Paulo, um evento do Google Cloud exclusivo para o setor de energia e utilities, e apresentei o case do Smart Collection: a solução de cobrança que gerenciei, construída na Google Cloud com modelos preditivos.",
      "O resultado financeiro projetado para cinco anos foi alcançado em apenas um ano de operação, um desempenho quatro vezes superior ao esperado. Uma conquista do time Equatorial e Accenture.",
    ],
    numeros: [
      { valor: "+8,6 p.p.", label: "ROI 2024 vs 2023" },
      { valor: "7 meses", label: "Payback" },
      { valor: "4×", label: "acima do esperado" },
    ],
    porAcao: [
      { acao: "Reaviso", pp: "+12,02" },
      { acao: "Simbólico", pp: "+5,04" },
      { acao: "Visita", pp: "+3,57" },
      { acao: "Recorte", pp: "+1,77" },
      { acao: "Corte", pp: "+0,61" },
    ],
    fotos: [
      { src: "/img/powerup-roi.jpg", alt: "Waldir apresentando os resultados de ROI do Smart Collection no palco do Power UP 2025" },
      { src: "/img/powerup-motivadores.jpg", alt: "Apresentação dos motivadores do projeto no Power UP 2025" },
      { src: "/img/powerup-lideres.jpg", alt: "Telão do Power UP 2025 com os líderes de mercado participantes" },
    ],
  },
  caseBI: {
    problema:
      "Sete distribuidoras executando milhares de ações de corte e recorte por dia, sem visão única de quanto foi gerado, atribuído às equipes, executado e efetivamente pago, nem de quem estava abaixo da meta.",
    solucao:
      "Painel diário em Power BI sobre o Snowflake, com meta × executado × potencial por dia, mês, distribuidora e regional, funil gerado → atribuído → executado → pago, produtividade por faixa de débito e mapa de dispersão para achar regionais fora da curva.",
    impacto:
      "Virou o rito diário da gestão de cobrança: desvios aparecem no mesmo dia e as equipes de campo são realocadas antes de a meta do mês ficar comprometida.",
    stack: ["Power BI", "DAX", "SQL", "Snowflake", "Modelagem dimensional"],
  },
  caseERP: {
    titulo: "Balcão de Controlados",
    subtitulo: "Sistema web para dispensação de medicamentos controlados em farmácia",
    problema:
      "Na farmácia, a venda de medicamentos controlados exigia consultar lotes no relatório de estoque em PDF, registrar o cliente à mão e montar etiquetas, um processo lento e sujeito a erro num ambiente regulado.",
    solucao:
      "Comecei com um app desktop (Python, Tkinter e SQLite) e evoluí para uma aplicação web completa: atendimento em tela única operado pelo teclado, importação do relatório SNGPC em PDF, baixa de estoque transacional, etiquetas em PDF, relatórios, pós-venda e um módulo do responsável técnico.",
    destaques: [
      "Login com hash PBKDF2, sessões no servidor, CSRF e CSP com nonce",
      "Permissões por módulo e PIN do vendedor com bloqueio progressivo",
      "Auditoria completa com exportação CSV",
      "Relatórios no banco: previsão de ruptura, perdas por vencimento e desempenho por vendedor",
      "Consentimento LGPD no cadastro e pós-venda via WhatsApp",
      "Testes automatizados",
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL / SQLite", "ReportLab", "pdfplumber", "HTML/CSS/JS"],
    imagens: [
      { src: "/img/erp-1.png", alt: "Tela do Balcão de Controlados com dados fictícios" },
      { src: "/img/erp-2.png", alt: "Tela do Balcão de Controlados com dados fictícios" },
      { src: "/img/erp-3.png", alt: "Tela do Balcão de Controlados com dados fictícios" },
    ],
  },
  trajetoria: [
    {
      periodo: "2009 – 2013",
      cargo: "Estagiário → Analista Comercial Júnior",
      empresa: "Equatorial Energia Maranhão",
      descricao: [
        "Entrei como estagiário por um programa seletivo com mais de 10.000 candidatos para 10 vagas; efetivado em 2011.",
        "Gestão da negociação dos maiores débitos, definição de estratégias e KPIs.",
        "Implantação do programa de desenvolvimento do Consultor de Relacionamento do grupo.",
      ],
    },
    {
      periodo: "2014 – 2017",
      cargo: "Analista Comercial Pleno",
      empresa: "Equatorial Energia Maranhão e Pará",
      descricao: [
        "Estratégias e KPIs de arrecadação para Alta Tensão e Poder Público (faturamento médio de R$ 9 mi/ano).",
        "Implantação e monitoramento de réguas de cobrança para clientes corporativos.",
      ],
    },
    {
      periodo: "2018 – 2022",
      cargo: "Analista Comercial Sênior",
      empresa: "Equatorial Energia",
      descricao: [
        "Estratégias, KPIs e rotinas de monitoramento da arrecadação do Varejo (faturamento médio de R$ 35 mi/ano).",
        "Gestão da cadeia de cobrança: regras de negócio, priorização e retroalimentação dos modelos.",
      ],
    },
    {
      periodo: "2022 – atual",
      cargo: "Gerente de Projetos",
      empresa: "Equatorial Energia",
      descricao: [
        "Gerente do Smart Collection: automação e modelos preditivos na recuperação de crédito, com ROI de +8,6 p.p. e payback em 7 meses.",
        "Co-responsável pela célula de Analytics da Cobrança do grupo.",
      ],
    },
  ],
  formacao: [
    { curso: "Análise e Desenvolvimento de Sistemas", instituicao: "UNDB", periodo: "2026 – 2028 (em andamento)" },
    { curso: "MBA em Gestão Lean", instituicao: "", periodo: "Em conclusão (TCC)" },
    { curso: "Especialização em Ciência de Dados", instituicao: "UNIASSELVI", periodo: "2022 – 2024" },
    { curso: "Bacharelado em Administração", instituicao: "UNDB / FACEM", periodo: "2011 – 2016" },
  ],
  competencias: [
    { grupo: "BI & Dados", itens: ["Power BI", "DAX", "SQL / PL-SQL", "Snowflake", "BigQuery", "ETL", "Excel avançado"] },
    { grupo: "Desenvolvimento", itens: ["Python", "FastAPI", "SQLAlchemy", "Streamlit", "Next.js / React", "TypeScript", "Git"] },
    { grupo: "Negócio", itens: ["Cobrança e recuperação de crédito", "KPIs e metas", "Estratégia comercial", "Gestão de projetos", "SAP Comercial / CRM"] },
  ],
  idiomas: "Português nativo · Inglês intermediário · Espanhol básico",
};
