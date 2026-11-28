import { perfil } from "./perfil";

export const perfilEn = {
  ...perfil,
  nome: "Waldir Figueiredo F. Reis",
  nomeCurto: "Waldir Reis",
  titulo: "Business Intelligence & Analytics",
  local: "São Luís, Brazil",
  subtitulo: "Business Intelligence and Analytics professional with 15+ years of experience turning operational challenges into technology solutions and measurable results.",
  resumo: [
    "Business Administrator and Data Science specialist with more than 15 years of experience in the energy sector, leading projects, managing teams and transforming processes through data and technology.",
    "I connect business, technology and data, turning operational challenges into solutions, metrics and measurable outcomes. My experience includes Power BI, SQL, Python, Snowflake and BigQuery for analytics, data querying and processing, process automation and business value creation.",
    "In recent years, I have expanded my work in technology and software development. I am currently studying Systems Analysis and Development while building my own web applications and deepening my knowledge of programming, solution architecture and data engineering.",
    "I see technology as a driver of business transformation. My goal is to combine my background in management and Analytics with the development of increasingly efficient and scalable technology solutions."
  ],
  destaques: [
    { valor: "+8.6 pp", label: "ROI improvement in Smart Collection's first year" },
    { valor: "7 months", label: "Project payback period" },
    { valor: "15+ years", label: "Business, data and project management" }
  ],
  contato: { ...perfil.contato },
  powerup: {
    ...perfil.powerup,
    titulo: "Presenting at Google Cloud Power UP 2025",
    texto: [
      "I was invited to represent Grupo Equatorial at Power UP 2025 in São Paulo, a Google Cloud event focused on the energy and utilities sector. I presented the Smart Collection case, a collections solution I managed, built on Google Cloud and powered by predictive models.",
      "The financial result originally projected for five years was achieved in just one year of operation, four times ahead of expectations. A joint achievement by the Equatorial and Accenture teams."
    ],
    numeros: [
      { valor: "+8.6 pp", label: "ROI, 2024 vs. 2023" },
      { valor: "7 months", label: "Payback" },
      { valor: "4×", label: "Above expectations" }
    ],
    porAcao: [
      { acao: "Reminder", pp: "+12.02" },
      { acao: "Symbolic", pp: "+5.04" },
      { acao: "Visit", pp: "+3.57" },
      { acao: "Reconnection", pp: "+1.77" },
      { acao: "Disconnection", pp: "+0.61" }
    ],
    fotos: perfil.powerup.fotos.map((f, i) => ({ ...f, alt: [
      "Waldir presenting Smart Collection ROI results at Power UP 2025",
      "Presentation of the project's key drivers at Power UP 2025",
      "Power UP 2025 stage screen with participating market leaders"
    ][i] }))
  },
  caseBI: {
    ...perfil.caseBI,
    problema: "Seven distribution companies carried out thousands of disconnection and reconnection actions every day, without a unified view of generated, assigned, completed and paid actions, or of teams falling behind target.",
    solucao: "A daily Power BI dashboard on Snowflake, showing target vs. completed vs. potential by day, month, distributor and region; the generated → assigned → completed → paid funnel; productivity by debt range; and a regional performance scatter plot.",
    impacto: "The dashboard became part of the collections management daily routine. Performance gaps are visible on the same day, allowing field teams to be reassigned before monthly targets are put at risk.",
    stack: ["Power BI", "DAX", "SQL", "Snowflake", "Dimensional modeling"]
  },
  caseERP: {
    ...perfil.caseERP,
    titulo: "SmartFarma WR",
    subtitulo: "A pharmacy management system for controlled-medicine sales, created to solve a real workflow challenge at the counter.",
    problema: "At the pharmacy, selling controlled medicines required checking batches in PDF inventory reports, manually registering customers and creating labels. The process was slow and prone to errors in a regulated environment.",
    solucao: "I started with a desktop app (Python, Tkinter and SQLite) and evolved it into a full web application: keyboard-driven single-screen service, SNGPC PDF inventory import, transactional stock updates, PDF labels, reports, after-sales and a technical manager module.",
    destaques: [
      "PBKDF2 password hashing, server-side sessions, CSRF protection and CSP nonce",
      "Module-level permissions and salesperson PIN with progressive lockout",
      "Full audit trail with CSV export",
      "Database reports: stockout forecasts, expiry losses and salesperson performance",
      "LGPD consent for customer registration and WhatsApp after-sales",
      "Automated tests"
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL / SQLite", "ReportLab", "pdfplumber", "HTML/CSS/JS"],
    imagens: perfil.caseERP.imagens.map((img, i) => ({ ...img, alt: [
      "Service screen with customer, medicine, batch and label review using keyboard shortcuts",
      "Management reports: monthly sales and salesperson performance, with fictional data",
      "After-sales screen with monthly birthdays, using fictional data"
    ][i] }))
  },
  trajetoria: [
    { periodo: "2009 – 2013", cargo: "Intern → Junior Commercial Analyst", empresa: "Equatorial Energia Maranhão", descricao: [
      "Joined as an intern through a selection program with more than 10,000 applicants for 10 positions; became a full-time employee in 2011.",
      "Managed negotiations for major overdue accounts, strategy definition and KPIs.",
      "Implemented the group's Relationship Consultant development program."
    ]},
    { periodo: "2014 – 2017", cargo: "Mid-level Commercial Analyst", empresa: "Equatorial Energia Maranhão and Pará", descricao: [
      "Revenue strategies and KPIs for high-voltage and public-sector customers (average annual revenue of BRL 9 million).",
      "Implemented and monitored collections strategies for corporate customers."
    ]},
    { periodo: "2018 – 2022", cargo: "Senior Commercial Analyst", empresa: "Equatorial Energia", descricao: [
      "Strategies, KPIs and revenue monitoring routines for retail operations (average annual revenue of BRL 35 million).",
      "Managed the collections value chain: business rules, prioritization and model feedback."
    ]},
    { periodo: "2022 – present", cargo: "Project Manager", empresa: "Equatorial Energia", descricao: [
      "Project Manager for Smart Collection: automation and predictive models for credit recovery, delivering +8.6 percentage points in ROI and a 7-month payback.",
      "Co-lead of the group's Collections Analytics team."
    ]}
  ],
  formacao: [
    { curso: "Systems Analysis and Development", instituicao: "UNDB", periodo: "2026 – 2028 (in progress)" },
    { curso: "MBA in Lean Management", instituicao: "", periodo: "In progress (final paper)" },
    { curso: "Specialization in Data Science", instituicao: "UNIASSELVI", periodo: "2022 – 2024" },
    { curso: "B.A. in Business Administration", instituicao: "UNDB / FACEM", periodo: "2011 – 2016" }
  ],
  competencias: [
    { grupo: "BI & Data", itens: ["Power BI", "DAX", "SQL / PL-SQL", "Snowflake", "BigQuery", "ETL", "Advanced Excel"] },
    { grupo: "Development", itens: ["Python", "FastAPI", "SQLAlchemy", "Streamlit", "Next.js / React", "TypeScript", "Git"] },
    { grupo: "Business", itens: ["Collections and credit recovery", "KPIs and targets", "Commercial strategy", "Project management", "SAP Commercial / CRM"] }
  ],
  idiomas: "Native Portuguese · Intermediate English · Basic Spanish"
};
