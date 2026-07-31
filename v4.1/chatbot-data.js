/* ===========================================================
   CHATBOT KNOWLEDGE BASE
   Edit this file to change what the chatbot knows.
   Each entry: keywords (what triggers it), answer (what it says),
   and optional followUps (quick-reply chips shown after the answer).

   Matching is keyword-based   the bot picks the entry whose keywords
   best match the visitor's message. No AI, no API calls, fully offline.
=========================================================== */

const CHATBOT_KB = [

  /* ---------------- ABOUT KAUSTUBH ---------------- */

  {
    id: "intro",
    keywords: ["who are you", "who is kaustubh", "about you", "about kaustubh", "tell me about", "introduce"],
    answer: "Kaustubh Narayankar is a recent M.Sc. Data Science graduate based in Mumbai, India. He builds Power BI dashboards the way a consultant would   starting from the business question, not the chart type   and is currently looking for full-time roles as a Power BI Developer, BI Developer, Data Analyst, or Data Scientist.",
    followUps: ["What are his projects?", "What's his tech stack?", "How do I contact him?"]
  },
  {
    id: "education",
    keywords: ["education", "degree", "college", "university", "study", "qualification", "academic"],
    answer: "Kaustubh holds an M.Sc. in Data Science, with coursework covering statistics, machine learning, SQL, and data visualization. That's the analytical foundation behind the dashboards in his projects.",
    followUps: ["What certifications does he have?", "What are his projects?"]
  },
  {
    id: "location",
    keywords: ["location", "based in", "where is he", "city", "live", "mumbai"],
    answer: "He's based in Mumbai, India, and open to remote, hybrid, or on-site roles depending on the opportunity.",
    followUps: ["How do I contact him?", "What roles is he looking for?"]
  },
  {
    id: "career-goal",
    keywords: ["looking for", "job search", "role", "position", "hiring", "career goal", "open to work", "seeking"],
    answer: "He's actively looking for full-time roles as a Power BI Developer, Business Intelligence Developer, Data Analyst, or Data Scientist.",
    followUps: ["What's his tech stack?", "How do I contact him?", "What are his projects?"]
  },
  {
    id: "projects-overview",
    keywords: ["projects", "portfolio work", "case studies", "what has he built", "work experience"],
    answer: "Three main projects: a Deloitte manufacturing analytics dashboard, a PwC Switzerland Power BI simulation (three dashboards), and a freelance HR analytics dashboard. Each has a full case-study page with business problem, findings, and recommendations   check the Projects section above.",
    followUps: ["Tell me about the Deloitte project", "Tell me about the PwC project", "Tell me about the HR analytics project"]
  },
  {
    id: "deloitte-project",
    keywords: ["deloitte", "manufacturing", "downtime", "factory", "laser welder", "laser cutter", "daikibo"],
    answer: "The Deloitte Data Analytics Job Simulation involved building a Power BI dashboard to identify production downtime across factories. Key finding: Daikibo Factory Seiko had 480 unhealthy devices (highest downtime), Daikibo Shenzhen had 420 (second highest), and the Laser Welder and Laser Cutter were the top two failing machine types   informing a preventive maintenance plan.",
    followUps: ["Tell me about the PwC project", "What tools did he use?"]
  },
  {
    id: "pwc-project",
    keywords: ["pwc", "switzerland", "call centre", "call center", "customer retention", "diversity", "inclusion", "d&i"],
    answer: "The PwC Switzerland Power BI Job Simulation involved building three connected executive dashboards: Call Centre Trends, Customer Retention, and Diversity & Inclusion   each designed for executive KPI reporting off a single shared data model.",
    followUps: ["Tell me about the Deloitte project", "Tell me about the HR analytics project"]
  },
  {
    id: "hr-project",
    keywords: ["hr analytics", "hr dashboard", "salary", "compensation", "workplace equality", "freelance project", "gender pay"],
    answer: "A freelance HR Analytics dashboard analyzing salary patterns and workplace equality across gender, age, occupation, marital status, and family size   delivering 20+ business insights into compensation trends and workforce diversity.",
    followUps: ["Tell me about the Deloitte project", "Tell me about the PwC project"]
  },
  {
    id: "tech-stack",
    keywords: ["tech stack", "skills", "tools", "technologies", "programming languages", "software", "what does he know"],
    answer: "Business Intelligence: Power BI, DAX, Power Query, Tableau. Data & programming: SQL, Python (Pandas, NumPy), Excel. Analytics: statistics, EDA, and machine learning fundamentals. Also comfortable with Git/GitHub for version control.",
    followUps: ["What certifications does he have?", "What are his projects?"]
  },
  {
    id: "certifications",
    keywords: ["certifications", "certified", "certificate", "courses", "simulations"],
    answer: "Job simulations with PwC Switzerland and Deloitte, plus certifications including Google Data Analytics, IBM Data Analyst, and TCS iON Career Edge.",
    followUps: ["What are his projects?", "What's his tech stack?"]
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach him", "get in touch", "hire", "linkedin", "github link"],
    answer: "You can reach Kaustubh directly at k.narayankar3030@gmail.com, or use the contact form and LinkedIn/GitHub links in the Contact section below.",
    followUps: ["Can I see his resume?", "Is he open to freelance work?"]
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "download resume"],
    answer: "You can download his resume from the button in the hero section at the top of the page, or from the Contact section.",
    followUps: ["How do I contact him?"]
  },
  {
    id: "freelance",
    keywords: ["freelance", "contract", "part time", "consulting available"],
    answer: "He's primarily focused on full-time roles right now, but the best way to check current availability for freelance work is to reach out directly by email.",
    followUps: ["How do I contact him?"]
  },

  /* ---------------- DOMAIN KNOWLEDGE: POWER BI ---------------- */

  {
    id: "what-is-powerbi",
    keywords: ["what is power bi", "power bi definition", "explain power bi"],
    answer: "Power BI is Microsoft's business intelligence platform for connecting to data sources, modeling data, and building interactive dashboards and reports. It's made up of Power BI Desktop (for building), the Power BI Service (for sharing and collaboration), and Power BI Mobile.",
    followUps: ["What is DAX?", "What is Power Query?", "Power BI vs Tableau?"]
  },
  {
    id: "what-is-dax",
    keywords: ["what is dax", "dax formula", "dax language", "explain dax"],
    answer: "DAX (Data Analysis Expressions) is the formula language used in Power BI to create calculated columns, measures, and custom tables. Measures are the most common use   dynamic calculations like totals or ratios that recompute based on filters applied in a report.",
    followUps: ["Measure vs calculated column?", "What is Power Query?"]
  },
  {
    id: "measure-vs-column",
    keywords: ["measure vs calculated column", "difference between measure and column", "calculated column"],
    answer: "A calculated column is computed row-by-row and stored in the table, taking up memory   good for values that don't change with filtering (like a category label). A measure is calculated on the fly based on the current filter context   better for aggregations like sums, averages, or ratios, and generally more memory-efficient.",
    followUps: ["What is DAX?", "What is a star schema?"]
  },
  {
    id: "what-is-power-query",
    keywords: ["what is power query", "power query editor", "explain power query", "etl", "data cleaning"],
    answer: "Power Query is Power BI's data connection and transformation engine   used to clean, reshape, and combine data from multiple sources before it's loaded into the data model. It's Power BI's ETL (Extract, Transform, Load) layer.",
    followUps: ["What is DAX?", "What is a star schema?"]
  },
  {
    id: "star-schema",
    keywords: ["star schema", "data model", "fact table", "dimension table"],
    answer: "A star schema is a data modeling approach with one central fact table (containing measurable events, like sales) connected to multiple dimension tables (containing descriptive attributes, like date, product, or customer). It's the recommended structure for Power BI models because it keeps DAX calculations fast and predictable.",
    followUps: ["What is DAX?", "What is row-level security?"]
  },
  {
    id: "row-level-security",
    keywords: ["row level security", "rls", "data security power bi"],
    answer: "Row-Level Security (RLS) in Power BI restricts what data each user can see within the same report, based on roles you define   for example, a regional manager only seeing their own region's data. It's set up in Power BI Desktop and enforced through the Power BI Service.",
    followUps: ["What is a star schema?", "What is Power Query?"]
  },

  /* ---------------- DOMAIN KNOWLEDGE: TABLEAU ---------------- */

  {
    id: "what-is-tableau",
    keywords: ["what is tableau", "tableau definition", "explain tableau"],
    answer: "Tableau is a data visualization and business intelligence platform known for its drag-and-drop interface and strong focus on visual analytics. Like Power BI, it connects to data sources and builds interactive dashboards, but it's traditionally been favored for highly custom, exploratory visualizations.",
    followUps: ["Power BI vs Tableau?", "What is Power BI?"]
  },
  {
    id: "powerbi-vs-tableau",
    keywords: ["power bi vs tableau", "tableau vs power bi", "which is better", "compare power bi and tableau", "difference between power bi and tableau"],
    answer: "Both build interactive dashboards from data, but they differ in emphasis. Power BI is tightly integrated with the Microsoft ecosystem (Excel, Azure, Teams), generally more affordable, and uses DAX for calculations. Tableau is known for more flexible, highly customized visuals and a slightly steeper learning curve, with calculated fields as its formula layer. Neither is strictly 'better'   the right choice depends on the existing tech stack and the complexity of the visuals needed.",
    followUps: ["What is Power BI?", "What is Tableau?"]
  },

  /* ---------------- SMALL TALK / META ---------------- */

  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
    answer: "Hi! I can answer questions about Kaustubh's background, projects, and skills, or explain Power BI / Tableau concepts. What would you like to know?",
    followUps: ["Tell me about Kaustubh", "What are his projects?", "Power BI vs Tableau?"]
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "cheers", "appreciate it"],
    answer: "You're welcome! Anything else you'd like to know?",
    followUps: ["What are his projects?", "How do I contact him?"]
  },
  {
    id: "help",
    keywords: ["help", "what can you do", "how does this work", "commands"],
    answer: "Ask me anything about Kaustubh's background, education, projects, skills, or certifications   or ask a general Power BI / Tableau question. Try one of the quick options below, or just type your own question.",
    followUps: ["Tell me about Kaustubh", "Power BI vs Tableau?", "How do I contact him?"]
  }
];

/* Fallback shown when nothing matches well enough */
const CHATBOT_FALLBACK = {
  answer: "I don't have a good answer for that one. Try asking about Kaustubh's projects, skills, or contact info   or email him directly at k.narayankar3030@gmail.com.",
  followUps: ["Tell me about Kaustubh", "What are his projects?", "How do I contact him?"]
};

/* Opening message shown when the chat first opens */
const CHATBOT_GREETING = {
  answer: "👋 Hi, I'm here to help. Ask me about Kaustubh's background and projects, or about Power BI / Tableau.",
  followUps: ["Tell me about Kaustubh", "What are his projects?", "Power BI vs Tableau?"]
};
