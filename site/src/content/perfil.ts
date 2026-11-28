export const perfil = {
  nome: "Waldir Figueiredo F. Reis",
  nomeCurto: "Waldir Reis",
  titulo: "Business Intelligence & Analytics",
  local: "São Luís – MA",
  subtitulo:
    "15+ anos transformando problemas de negócio em resultados medidos — agora em dados e software.",
  resumo: [
    "Administrador, especialista em Ciência de Dados, com mais de 15 anos de experiência na primeira multi-utilities nacional, atuando na liderança de projetos, gestão de equipes e transformação de processos por meio de dados e tecnologia.",
    "Ao longo da minha trajetória, desenvolvi uma visão estratégica que conecta negócio, tecnologia e dados, transformando desafios operacionais em soluções, indicadores e resultados mensuráveis. Tenho experiência com Power BI, SQL, Python, Snowflake e BigQuery, aplicados à construção de soluções analíticas, consultas e processamento de dados, automação de processos e geração de valor para o negócio.",
    "Nos últimos anos, ampliei minha atuação no universo da tecnologia, descobrindo uma nova paixão pelo desenvolvimento de soluções. Atualmente, curso Análise e Desenvolvimento de Sistemas e desenvolvo aplicações web próprias, aprofundando meus conhecimentos em programação, arquitetura de soluções e engenharia de dados.",
    "Acredito na tecnologia como um instrumento de transformação dos negócios e busco integrar minha experiência em gestão e Analytics à construção de soluções tecnológicas cada vez mais eficientes e escaláveis.",
  ],
  destaques: [
    { valor: "+8,6 p.p.", label: "de ROI no 1º ano do Smart Collection" },
    { valor: "7 meses", label: "de payback do projeto" },
    { valor: "15+ anos", label: "de negócio, dados e gestão de projetos" },
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
    titulo: "SmartFarma WR",
    subtitulo:
      "Sistema web de gestão farmacêutica desenvolvido para digitalizar e otimizar a comercialização de medicamentos controlados. O projeto nasceu de uma necessidade real de balcão e evoluiu para uma solução integrada, conectando atendimento, estoque, rastreabilidade e responsabilidade técnica.",
    numeros: [
      { valor: "90%", label: "Redução no tempo de atendimento até a concretização da venda" },
      { valor: "Zero", label: "Retrabalho do responsável técnico no processo automatizado" },
      { valor: "FEFO", label: "Venda sugere primeiro o lote com vencimento mais próximo" },
    ],
    problema:
      "O processo de venda de medicamentos controlados era predominantemente manual. Os dados da venda precisavam ser preenchidos à mão, tornando o atendimento lento, aumentando a possibilidade de erros e gerando retrabalho para o responsável técnico, especialmente em um ambiente sujeito a exigências regulatórias.",
    solucao:
      "Desenvolvi uma aplicação web que centraliza o processo de venda em uma única interface, com operação otimizada para teclado e foco na agilidade do atendimento.",
    solucaoItens: [
      ["Atendimento em tela única", "fluxo simplificado para registrar vendas com rapidez."],
      ["Gestão de estoque", "baixa transacional e controle por lotes e vencimentos."],
      ["Impressão inteligente de etiquetas", "layouts adaptáveis à quantidade de medicamentos e lotes."],
      ["Relatórios e pós-venda", "consultas e acompanhamento das operações realizadas."],
      ["Módulo do responsável técnico", "centralização das atividades de conferência e controle."],
    ],
    complementares: [
      "Consulta e identificação de medicamentos correlacionados pela composição.",
      "Sugestão de venda priorizando lotes com vencimento mais próximo, seguindo a lógica FEFO (First Expire, First Out).",
      "Geração otimizada de etiquetas conforme a quantidade de itens e lotes envolvidos na operação.",
    ],
    seguranca: [
      "Autenticação com gerenciamento de sessões no servidor.",
      "Proteção contra CSRF e Content Security Policy (CSP) com nonce.",
      "Permissões de acesso configuráveis por módulo.",
      "Autorização de operações por PIN do vendedor, com bloqueio progressivo após tentativas inválidas.",
      "Trilha completa de auditoria, com exportação dos registros em CSV.",
    ],
    resultados: [
      "90% de redução no tempo de atendimento até a concretização da venda.",
      "Eliminação do retrabalho operacional do responsável técnico relacionado ao processo automatizado.",
      "Redução de inconsistências e riscos de inconformidade regulatória, por meio da padronização e rastreabilidade das operações.",
    ],
    diferencial:
      "Mais do que digitalizar uma rotina, o SmartFarma WR transformou um processo manual e fragmentado em um fluxo integrado, com foco em produtividade, segurança operacional e conformidade regulatória.",
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL / SQLite", "ReportLab", "pdfplumber", "HTML/CSS/JS"],
    imagens: [
      { src: "/img/erp-3.png", alt: "Tela de atendimento: cliente, medicamento e lote, e conferência das etiquetas, com atalhos de teclado" },
      { src: "/img/erp-2.png", alt: "Relatórios gerenciais: vendas por mês e desempenho por vendedor (dados fictícios)" },
      { src: "/img/erp-1.png", alt: "Pós-venda: aniversariantes do mês com dados fictícios" },
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
