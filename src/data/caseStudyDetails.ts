export type SolutionArea = {
  id: string;
  navLabel: string;
  title: string;
  description: string;
  deliverables: string[];
  technologies: string;
};

export type StudyDetail = {
  heroTitle?: string;
  heroDescription: string;
  industries: string;
  services: string[];
  solutions: string[];
  technologies: string[];
  callout?: { title: string; body: string };
  outcomes: string[];
  quote?: { text: string; author: string; role: string };
  solutionAreas: SolutionArea[];
  ctaTitle: string;
  ctaDescription: string;
};

const defaultCta = {
  ctaTitle: "Want to build an award-winning app?",
  ctaDescription:
    "Partner with QUORIXA to design, engineer, and scale products trusted by global brands — from VC startups to Fortune 500 teams.",
};

export const detailsById: Record<string, StudyDetail> = {
  triplelift: {
    heroTitle: "AI-powered AdTech trusted by AdAge 100 brands.",
    heroDescription:
      "TripleLift needed to transform AdTech with microservices and AI while staying trusted by AdAge 100 brands. QUORIXA partnered across AI engineering, data pipelines, full-stack delivery, and UI/UX to modernize creatives workflows, APIs, and product architecture at advertising scale.",
    industries: "AdTech, Advertising, Marketing, B2B, SaaS",
    services: [
      "AI engineering",
      "Data engineering",
      "Full-stack development",
      "UI/UX design",
      "Back-end development",
    ],
    solutions: [
      "AI",
      "Data pipeline",
      "B2B application",
      "UI architecture",
      "Product architecture",
      "API",
      "System optimization",
    ],
    technologies: [
      "Python",
      "AWS",
      "SageMaker",
      "PyTorch",
      "Golang",
      "TypeScript",
      "PHP",
      "Symfony",
      "Laravel",
      "Node.js",
      "Express",
      "React",
      "Angular",
      "Vue",
      "Java",
      "Spring",
      "CloudFormation",
      "Docker",
      "MySQL",
      "PostgreSQL",
      "Kafka",
      "RabbitMQ",
      "Elasticsearch",
      "Helm",
      "MongoDB",
      "Grafana",
      "Prometheus",
      "Kubernetes",
    ],
    outcomes: [
      "Time for incoming creatives reduced from 2 days to 1 hour",
      "AdTech platform modernization across PHP, Node, Java, Angular, and React stacks",
      "Scalable microservices and AI-assisted workflows trusted by AdAge 100 brands",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Transforming AdTech with microservices and AI",
        description:
          "QUORIXA helped TripleLift evolve from legacy AdTech surfaces into a microservices-oriented platform — connecting AI, data pipelines, and modern front ends so creative and campaign workflows could move at brand speed.",
        deliverables: [
          "Architecture assessment and microservices roadmap",
          "Modernization of PHP, Node.js, and Java services",
          "Angular and React UI modernization for operator and brand workflows",
          "API design and system optimization for high-volume creatives",
          "Observability with Grafana, Prometheus, and Kubernetes tooling",
        ],
        technologies:
          "PHP, Symfony, Laravel, Node.js, Express, Java, Spring, Angular, React, Vue, TypeScript, Docker, Kubernetes, Helm, Grafana, Prometheus",
      },
      {
        id: "ai-data",
        navLabel: "AI & data",
        title: "AI and data pipelines for advertising scale",
        description:
          "Data engineering and AI Studio specialists built pipelines and model workflows on AWS so creative intelligence and AdTech decisioning stayed reliable under load.",
        deliverables: [
          "Data pipeline design for creatives and campaign signals",
          "SageMaker and PyTorch model workflows",
          "Streaming and messaging with Kafka and RabbitMQ",
          "Search and storage with Elasticsearch, MySQL, PostgreSQL, and MongoDB",
        ],
        technologies:
          "Python, AWS, SageMaker, PyTorch, Kafka, RabbitMQ, Elasticsearch, MySQL, PostgreSQL, MongoDB, Golang, CloudFormation",
      },
    ],
    ...defaultCta,
  },

  syncurity: {
    heroTitle: "QA for a cybersecurity platform featured by NBC and CRN",
    heroDescription:
      "A cybersecurity B2B SaaS platform featured by NBC and CRN needed trustworthy release quality. QUORIXA established BDD practices and full QA coverage from scratch — test strategy and automation that protect security-critical product surfaces.",
    industries: "Cybersecurity, B2B SaaS, Enterprise software",
    services: ["QA and software testing"],
    solutions: ["Test strategy", "Test automation"],
    technologies: ["Selenium", "Python", "Java"],
    outcomes: [
      "BDD and full QA coverage established from scratch",
      "Automated regression protecting cybersecurity product releases",
      "Repeatable test strategy aligned to B2B SaaS release cadence",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "BDD and full QA coverage from the ground up",
        description:
          "QUORIXA’s Quality Studio embedded with the Syncurity product team to define behavior-driven scenarios, automate critical journeys, and give engineering a green-build signal they could trust before every release.",
        deliverables: [
          "QA strategy and coverage map for cybersecurity workflows",
          "BDD scenario suites owned jointly with product and engineering",
          "Selenium-based automation in Python and Java",
          "Regression reporting and release-gate recommendations",
        ],
        technologies: "Selenium, Python, Java, BDD tooling",
      },
      {
        id: "automation",
        navLabel: "Test automation",
        title: "Automation that keeps security SaaS shipping safely",
        description:
          "Automated suites focused on high-risk authentication, policy, and alert paths so the team could ship features without sacrificing the trust NBC- and CRN-level visibility demands.",
        deliverables: [
          "Smoke and deep regression layers",
          "CI-friendly automation hooks",
          "Defect triage playbooks for security-sensitive bugs",
        ],
        technologies: "Selenium, Python, Java, CI integration",
      },
    ],
    ...defaultCta,
  },

  starz: {
    heroTitle: "Starz: ML and data solutions for a premium TV network",
    heroDescription:
      "Starz needed modern data infrastructure and machine learning to protect subscription revenue. QUORIXA delivered data pipeline modernization and AI Studio churn models — predictive analytics that help a premium TV network retain viewers more efficiently than acquiring new ones.",
    industries: "Digital media, Entertainment, Subscription",
    services: [
      "Data engineering",
      "AI engineering",
      "Backend development",
      "Modernization",
    ],
    solutions: [
      "AI",
      "Predictive analytics",
      "Churn prediction",
      "Data pipeline",
      "ML models",
    ],
    technologies: [
      "Python",
      "SQL",
      "SageMaker",
      "AWS Batch",
      "AWS ECS",
      "AWS EMR",
      "Airflow",
      "Snowflake",
      "Tableau",
    ],
    outcomes: [
      "95% projected accuracy for churn prediction models",
      "Up to 50× cost savings via retention versus acquisition",
      "Modernized data pipelines feeding ML and BI reliably",
    ],
    solutionAreas: [
      {
        id: "pipelines",
        navLabel: "Data pipelines",
        title: "Data pipeline modernization for subscription media",
        description:
          "QUORIXA modernized Starz’s data estate so viewer, engagement, and subscription signals flow cleanly into analytics and ML — with Airflow orchestration and Snowflake as the analytical backbone.",
        deliverables: [
          "Pipeline audit and modernization roadmap",
          "Orchestration with Airflow on AWS batch and container workloads",
          "Snowflake modeling for subscription and engagement KPIs",
          "Tableau-ready semantic layers for operators",
        ],
        technologies:
          "Python, SQL, Airflow, Snowflake, AWS Batch, AWS ECS, AWS EMR, Tableau",
      },
      {
        id: "ai-studio",
        navLabel: "AI Studio",
        title: "Churn prediction ML models",
        description:
          "AI Studio specialists built and operationalized churn prediction models on SageMaker so retention teams could act before subscribers left — turning predictive accuracy into measurable retention economics.",
        deliverables: [
          "Feature engineering for churn signals",
          "Model training and evaluation on SageMaker",
          "Scoring pipelines integrated with retention workflows",
          "Monitoring for model drift and business KPI alignment",
        ],
        technologies: "Python, SageMaker, SQL, Snowflake, AWS",
      },
    ],
    ...defaultCta,
  },

  "funny-or-die": {
    heroTitle: "Funny or Die: mobile app revamp for an Emmy-winning brand",
    heroDescription:
      "Funny or Die needed a mobile app revamp worthy of an Emmy-winning comedy brand. QUORIXA delivered full-stack and mobile engineering that brings funny content to fans with modern performance, playback, and discovery on Android and iOS.",
    industries: "Comedy, Media, Entertainment",
    services: ["Full-stack development", "Mobile development"],
    solutions: [
      "Mobile application",
      "Content discovery",
      "App modernization",
    ],
    technologies: ["Java", "Kotlin", "C++", "Android", "iOS"],
    outcomes: [
      "Revamped mobile experience for an Emmy-winning brand",
      "Modern playback and discovery flows for comedy content",
      "Maintainable full-stack foundations for ongoing releases",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Bringing funny content to mobile",
        description:
          "QUORIXA rebuilt core mobile surfaces so Funny or Die’s library, clips, and brand personality feel native on modern devices — with engineering focused on performance, stability, and content-first UX.",
        deliverables: [
          "Mobile app architecture and revamp roadmap",
          "Android delivery with Java and Kotlin",
          "Performance-sensitive media paths with C++ where needed",
          "Content browsing, playback, and engagement flows",
        ],
        technologies: "Java, Kotlin, C++, Android SDK, mobile CI",
      },
      {
        id: "fullstack",
        navLabel: "Full-stack",
        title: "Full-stack support for comedy at mobile speed",
        description:
          "Behind the app, full-stack work kept APIs, content feeds, and release tooling aligned so editorial and product teams could ship humor without fighting the platform.",
        deliverables: [
          "API and content feed integrations",
          "Release and QA support for store submissions",
          "Instrumentation for engagement and crash insights",
        ],
        technologies: "Java, Kotlin, REST APIs, mobile analytics",
      },
    ],
    ...defaultCta,
  },

  "bleacher-report": {
    heroTitle: "Digital media solutions for a Webby's winner",
    heroDescription:
      "Bleacher Report needed digital media solutions that keep pace with sports fandom at Webby's-winning quality. QUORIXA delivered full-stack, UI, and backend engineering — web apps, admin tools, and data aggregation that support scale and editorial velocity.",
    industries: "Digital media, Entertainment, Sports media",
    services: [
      "Full-stack development",
      "UI development",
      "Backend development",
    ],
    solutions: ["Web application", "Admin tool", "Data aggregation"],
    technologies: [
      "JavaScript",
      "Ruby on Rails",
      "React",
      "PostgreSQL",
      "MySQL",
      "Kafka",
      "Redis",
      "RabbitMQ",
    ],
    outcomes: [
      "Digital media stack supporting Webby's-caliber experiences",
      "Admin and aggregation tooling for high-velocity sports content",
      "Reliable messaging and caching for peak traffic moments",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Full-stack digital media for sports at scale",
        description:
          "QUORIXA worked across Rails backends, React UIs, and data aggregation services so Bleacher Report could publish, moderate, and distribute sports content under intense traffic spikes.",
        deliverables: [
          "Web application features for fans and editors",
          "Admin tooling for content operations",
          "Data aggregation services for feeds and stats",
          "Caching and messaging with Redis, Kafka, and RabbitMQ",
        ],
        technologies:
          "JavaScript, Ruby on Rails, React, PostgreSQL, MySQL, Kafka, Redis, RabbitMQ",
      },
      {
        id: "ui-backend",
        navLabel: "UI & backend",
        title: "UI architecture and backend resilience",
        description:
          "Front-end and backend specialists tightened the experience for readers while hardening services that feed live sports moments — so quality and scale moved together.",
        deliverables: [
          "React UI improvements for discovery and article journeys",
          "Backend performance and reliability hardening",
          "Database and queue tuning for peak events",
        ],
        technologies: "React, Rails, PostgreSQL, MySQL, Redis, Kafka",
      },
    ],
    ...defaultCta,
  },

  vmware: {
    heroTitle:
      "VMware: product and AQA solutions for a leader in cloud computing",
    heroDescription:
      "As a leader in cloud computing, VMware needed product engineering support and automated QA that match enterprise release standards. QUORIXA’s Quality Studio delivered AQA solutions — Selenium-driven automation in Python and Java — that protect cloud product quality at every gate.",
    industries: "Cloud computing, Enterprise software, Infrastructure",
    services: ["QA and software testing", "Product engineering support"],
    solutions: ["Test automation", "AQA pipelines", "Release quality"],
    technologies: ["Selenium", "Python", "Java"],
    outcomes: [
      "Automated QA coverage for cloud computing product surfaces",
      "Stronger release confidence through AQA pipelines",
      "Repeatable Selenium suites in Python and Java",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Product and AQA for cloud computing leadership",
        description:
          "QUORIXA embedded Quality Studio specialists with VMware product teams to design automation that mirrors real operator workflows and catches regressions before enterprise customers feel them.",
        deliverables: [
          "AQA strategy aligned to cloud product release trains",
          "Selenium automation in Python and Java",
          "Regression suites for critical product journeys",
          "Defect reporting integrated with engineering workflows",
        ],
        technologies: "Selenium, Python, Java",
      },
      {
        id: "aqa",
        navLabel: "AQA pipelines",
        title: "Automation that scales with enterprise releases",
        description:
          "Automation pipelines emphasized stability, environment parity, and clear failure signals so VMware teams could trust green builds as a release gate — not a noise source.",
        deliverables: [
          "CI-oriented automation packaging",
          "Flake reduction and suite triage practices",
          "Coverage expansion for high-risk product paths",
        ],
        technologies: "Selenium, Python, Java, CI tooling",
      },
    ],
    ...defaultCta,
  },

  kantox: {
    heroTitle:
      "Kantox: web app bringing new clients to a BNP Paribas subsidiary",
    heroDescription:
      "Kantox, a BNP Paribas subsidiary in FX and payments, needed a web application that wins new clients. QUORIXA led UI development and a migration to a modern single-page architecture — enterprise UX that matches FinTech expectations for clarity, speed, and trust.",
    industries: "FinTech, FX, Payments, Banking",
    services: ["UI development"],
    solutions: ["Enterprise applications", "Web application", "UI architecture"],
    technologies: [
      "Backbone.js",
      "Grunt",
      "Webpack",
      "CoffeeScript",
      "Pattern Lab",
      "BEM",
      "Node.js",
      "Ember",
      "HTML5",
      "CSS",
      "Haml",
    ],
    outcomes: [
      "Migration to a modern SPA experience",
      "UI architecture supporting enterprise FX and payments workflows",
      "Client-facing web app positioned to attract new business",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Migration to a modern SPA",
        description:
          "QUORIXA redesigned and re-implemented Kantox’s front-end toward a maintainable SPA stack — Pattern Lab and BEM for design consistency, Webpack-era tooling for delivery, and Ember/Backbone-era patterns modernized for enterprise operators.",
        deliverables: [
          "UI architecture and component system with Pattern Lab and BEM",
          "SPA migration plan and incremental cutover",
          "Build tooling with Grunt and Webpack",
          "HTML5, CSS, and Haml templating modernization",
        ],
        technologies:
          "Backbone.js, Ember, CoffeeScript, Pattern Lab, BEM, Grunt, Webpack, Node.js, HTML5, CSS, Haml",
      },
      {
        id: "enterprise-ui",
        navLabel: "Enterprise UI",
        title: "Enterprise FX and payments interfaces",
        description:
          "UI specialists focused on clarity for complex FX and payments journeys so new clients could complete high-stakes flows with confidence.",
        deliverables: [
          "Operator and client journey UI refinements",
          "Responsive layouts for enterprise workflows",
          "Front-end performance and accessibility improvements",
        ],
        technologies: "Ember, Backbone.js, CSS, HTML5, BEM",
      },
    ],
    ...defaultCta,
  },

  dialpad: {
    heroTitle:
      "AI-powered customer communications platform leveraged by Uber and Motorola",
    heroDescription:
      "Dialpad’s AI-powered customer communications platform — leveraged by Uber, Motorola, and other enterprises — needed engineering that keeps next-gen voice and video conferencing reliable at SaaS scale. QUORIXA contributed AI Studio, mobile, and backend expertise across the product.",
    industries: "Telecom, SaaS, Customer communications",
    services: [
      "AI engineering",
      "Mobile development",
      "Backend development",
    ],
    solutions: [
      "AI",
      "Customer communications",
      "Video conferencing",
      "Mobile application",
      "Cloud SaaS",
    ],
    technologies: [
      "Python",
      "AI/ML services",
      "Mobile SDKs",
      "Node.js",
      "Cloud infrastructure",
    ],
    outcomes: [
      "AI-assisted communications features for enterprise customers",
      "Mobile and backend hardening for high-availability conferencing",
      "Product velocity supporting brands like Uber and Motorola",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Next-gen AI customer communications",
        description:
          "QUORIXA collaborated with Dialpad teams on AI-powered communications capabilities — connecting intelligent features to the mobile and backend systems enterprises rely on for everyday collaboration.",
        deliverables: [
          "AI feature engineering and integration support",
          "Backend services for communications workflows",
          "Mobile client contributions for voice and video journeys",
          "Reliability and observability improvements",
        ],
        technologies: "Python, AI/ML services, Node.js, mobile SDKs, cloud infra",
      },
      {
        id: "mobile-backend",
        navLabel: "Mobile & backend",
        title: "Mobile and backend at telecom SaaS scale",
        description:
          "Mobile and backend specialists kept client apps and APIs aligned under real-world load — so AI features feel instant and calls stay dependable.",
        deliverables: [
          "Mobile UX and performance workstreams",
          "API and service layer improvements",
          "Release support for enterprise customers",
        ],
        technologies: "Mobile SDKs, Node.js, cloud infrastructure",
      },
    ],
    ...defaultCta,
  },

  monarch: {
    heroTitle:
      "AI/ML-powered predictive maintenance for tens of thousands of EVs",
    heroDescription:
      "Monarch needed AI/ML predictive maintenance across tens of thousands of EVs. QUORIXA brought full-stack, data engineering, and AI to automotive manufacturing — helping the client save up to 35% on component replacement while modernizing how maintenance decisions get made.",
    industries: "Automotive, Manufacturing, Big data",
    services: [
      "Full-stack development",
      "Data engineering",
      "AI engineering",
    ],
    solutions: [
      "Predictive maintenance",
      "AI/ML models",
      "Data platforms",
      "Industrial IoT analytics",
    ],
    technologies: [
      "Python",
      "Machine learning",
      "Data pipelines",
      "Cloud services",
      "Full-stack web",
    ],
    outcomes: [
      "Up to 35% savings on component replacement",
      "Predictive maintenance spanning tens of thousands of EVs",
      "AI brought into day-to-day EV manufacturing operations",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Bringing AI to EV manufacturing",
        description:
          "QUORIXA connected shop-floor and vehicle signals to predictive models and operator-facing applications — so maintenance teams replace components based on foresight, not failure.",
        deliverables: [
          "Predictive maintenance model development",
          "Data pipelines for vehicle and component telemetry",
          "Full-stack applications for maintenance operators",
          "Measurement framework for replacement-cost savings",
        ],
        technologies: "Python, ML stack, data pipelines, cloud services, web apps",
      },
      {
        id: "data-ai",
        navLabel: "Data & AI",
        title: "Big data foundations for predictive maintenance",
        description:
          "Data Studio and AI Studio specialists built the analytics backbone that scores component risk at fleet scale and feeds actionable insights into manufacturing workflows.",
        deliverables: [
          "Feature stores and training datasets",
          "Model scoring services",
          "Dashboards and alerting for maintenance planners",
        ],
        technologies: "Python, big data tooling, cloud ML, visualization",
      },
    ],
    ...defaultCta,
  },

  "medical-team": {
    heroTitle: "Top-ranking healthcare agency: web and mobile for home care",
    heroDescription:
      "The Medical Team, a top-ranking healthcare agency, needed web and mobile systems for home care operations. QUORIXA delivered full-stack and mobile solutions on .NET — platforms so durable that, nearly a decade later, they remain in active use.",
    industries: "HealthTech, Healthcare, Home care",
    services: ["Full-stack development", "Mobile development"],
    solutions: [
      "Web application",
      "Mobile application",
      "Home care operations",
      "Healthcare workflows",
    ],
    technologies: [
      ".NET",
      "C#",
      "ASP.NET MVC",
      "SQL Server",
      "Mobile clients",
    ],
    callout: {
      title: "Longevity that proves the architecture",
      body: "Nearly a decade later, the web and mobile systems QUORIXA delivered are still supporting home care operations — a rare durability signal in healthcare software.",
    },
    outcomes: [
      "Nearly a decade later, systems still in active use",
      "Web and mobile home care workflows for a top-ranking agency",
      "Durable .NET architecture suited to healthcare operations",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Transforming home care with web and mobile",
        description:
          "QUORIXA built the digital backbone for scheduling, care coordination, and field operations — pairing ASP.NET MVC web apps with mobile experiences caregivers and coordinators rely on daily.",
        deliverables: [
          "ASP.NET MVC web applications for agency operations",
          "Mobile experiences for field and home care staff",
          "C# domain services and SQL Server data layer",
          "Secure workflows aligned to healthcare practice",
        ],
        technologies: ".NET, C#, ASP.NET MVC, SQL Server, mobile clients",
      },
      {
        id: "mobile",
        navLabel: "Mobile & ops",
        title: "Mobile tools for home care teams",
        description:
          "Mobile delivery focused on reliable field use — so care teams stay connected to schedules, notes, and agency systems away from the desk.",
        deliverables: [
          "Mobile feature delivery for caregivers",
          "Sync and offline-tolerant patterns where needed",
          "Long-term maintainability and support handoff",
        ],
        technologies: "C#, .NET, mobile clients, SQL Server",
      },
    ],
    ...defaultCta,
  },

  techstyle: {
    heroTitle: "TechStyle: UI architecture, DevOps, and custom e-commerce tools",
    heroDescription:
      "TechStyle needed UI architecture, DevOps, and custom e-commerce tools for fashion commerce at brand scale. QUORIXA delivered a 360-degree digital commerce foundation — React, Redux, and Next.js experiences backed by modern delivery practices.",
    industries: "Fashion, Ecommerce, Retail",
    services: [
      "UI architecture",
      "DevOps",
      "Custom e-commerce tooling",
      "Front-end development",
    ],
    solutions: [
      "UI architecture",
      "Digital commerce",
      "Design system components",
      "DevOps automation",
    ],
    technologies: ["React", "Redux", "Next.js", "Node.js", "CI/CD"],
    outcomes: [
      "360-degree digital commerce experience",
      "UI architecture enabling faster fashion storefront iteration",
      "DevOps and custom tools accelerating commerce releases",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "360-degree digital commerce",
        description:
          "QUORIXA partnered with TechStyle to elevate storefront UI architecture and the tooling around it — so fashion brands ship cohesive experiences without reinventing commerce primitives each season.",
        deliverables: [
          "React and Next.js UI architecture",
          "Redux state patterns for commerce journeys",
          "Custom e-commerce tools for merchandising and ops",
          "DevOps pipelines for reliable storefront releases",
        ],
        technologies: "React, Redux, Next.js, Node.js, CI/CD",
      },
      {
        id: "ui-devops",
        navLabel: "UI & DevOps",
        title: "Composable UI with delivery automation",
        description:
          "UI Studio and platform engineers paired component architecture with automated delivery so design-quality UX and shipping speed reinforced each other.",
        deliverables: [
          "Reusable commerce UI modules",
          "Environment and release automation",
          "Performance budgets for critical shopping paths",
        ],
        technologies: "React, Next.js, Redux, DevOps tooling",
      },
    ],
    ...defaultCta,
  },

  hotspot: {
    heroTitle: "Hotspot Cover: InsurTech solutions for high-risk travel",
    heroDescription:
      "Hotspot Cover needed InsurTech solutions for high-risk travel and medical tourism. QUORIXA optimized architecture, automation, and admin tools — TypeScript, Python, Node, and Figma-informed product work that helps underwriters and operators move faster with confidence.",
    industries: "InsurTech, Travel, Medical tourism",
    services: [
      "Architecture optimization",
      "Automation",
      "Admin tooling",
      "Full-stack development",
      "Product design support",
    ],
    solutions: [
      "InsurTech platform",
      "Admin tools",
      "Workflow automation",
      "System architecture",
    ],
    technologies: ["TypeScript", "Python", "Node.js", "Figma"],
    outcomes: [
      "Optimized architecture for high-risk travel insurance workflows",
      "Automation reducing manual admin load",
      "Admin tools tailored to InsurTech operators",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "InsurTech for high-risk travel",
        description:
          "QUORIXA strengthened Hotspot Cover’s platform so quotes, policies, and claims-adjacent operations for high-risk travel stay coherent under complexity — with architecture and automation as first-class deliverables.",
        deliverables: [
          "Architecture review and optimization roadmap",
          "TypeScript and Node service improvements",
          "Python automation for operational workflows",
          "Admin tool enhancements for underwriting and support",
        ],
        technologies: "TypeScript, Python, Node.js, Figma",
      },
      {
        id: "admin",
        navLabel: "Admin & design",
        title: "Admin tools informed by product design",
        description:
          "Design and engineering collaborated in Figma and code so admin surfaces match how InsurTech teams actually work — fewer clicks, clearer states, safer actions.",
        deliverables: [
          "Admin UX flows and interaction design",
          "Front-end implementation of operator tools",
          "Automation hooks between admin and core services",
        ],
        technologies: "Figma, TypeScript, Node.js",
      },
    ],
    ...defaultCta,
  },

  "delivery-hero": {
    heroTitle: "Enhancing the flagship product of a food delivery unicorn",
    heroDescription:
      "Delivery Hero needed enhancements to the flagship product of a food delivery unicorn operating at massive scale. QUORIXA contributed Node, React, and Docker engineering that keeps ordering, logistics, and operator experiences shipping under real-world peak load.",
    industries: "Food delivery, Marketplace, Logistics",
    services: ["Backend development", "Front-end development", "Platform engineering"],
    solutions: [
      "Flagship product enhancement",
      "High-scale web application",
      "Containerized delivery",
    ],
    technologies: ["Node.js", "React", "Docker"],
    outcomes: [
      "Flagship product enhancements at unicorn scale",
      "Node and React features hardened for peak ordering traffic",
      "Dockerized delivery practices supporting reliable releases",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Rapid food delivery at massive scale",
        description:
          "QUORIXA embedded with Delivery Hero product teams to enhance flagship experiences — focusing on performance, reliability, and developer velocity across Node services and React clients.",
        deliverables: [
          "Feature delivery on Node.js services",
          "React UI enhancements for consumer and operator journeys",
          "Docker-based packaging and environment consistency",
          "Scale-oriented performance and reliability fixes",
        ],
        technologies: "Node.js, React, Docker",
      },
      {
        id: "scale",
        navLabel: "Scale engineering",
        title: "Engineering for peak marketplace moments",
        description:
          "Workstreams prioritized the moments that define food delivery — surge traffic, real-time status, and resilient checkouts — so the flagship product stays dependable when demand spikes.",
        deliverables: [
          "Load-sensitive backend improvements",
          "Front-end resilience for intermittent network conditions",
          "Release practices suited to continuous marketplace shipping",
        ],
        technologies: "Node.js, React, Docker, observability practices",
      },
    ],
    ...defaultCta,
  },

  "farmers-edge": {
    heroTitle: "AgriTech platform featured by the World Economic Forum",
    heroDescription:
      "Farmers Edge — an AgriTech platform featured by the World Economic Forum — needed mobile, UI, and QA excellence for sustainable agriculture. QUORIXA delivered TypeScript, React, React Native, and supporting backend work so growers get smart tech that holds up in the field.",
    industries: "AgriTech, Agriculture, Sustainability",
    services: [
      "Mobile development",
      "UI development",
      "QA and software testing",
    ],
    solutions: [
      "Mobile application",
      "Field data platforms",
      "Maps and geospatial UX",
      "Test automation",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "React Native",
      "Redux",
      "Maps APIs",
      "Firebase",
      "Django",
      "MySQL",
    ],
    outcomes: [
      "Mobile and web experiences for a WEF-featured AgriTech platform",
      "UI and QA practices suited to field and farm operations",
      "Smart technology supporting sustainable agriculture workflows",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Smart tech for sustainable agriculture",
        description:
          "QUORIXA helped Farmers Edge ship grower-facing and operator experiences — maps, field data, and mobile workflows — with UI polish and QA rigor that agricultural platforms need outdoors and online.",
        deliverables: [
          "React and React Native application features",
          "Redux state management for complex field workflows",
          "Maps API integrations for geospatial farming views",
          "QA coverage across critical AgriTech journeys",
        ],
        technologies:
          "TypeScript, React, React Native, Redux, Maps APIs, Firebase, Node.js, Django, MySQL",
      },
      {
        id: "mobile-qa",
        navLabel: "Mobile & QA",
        title: "Field-ready mobile with quality gates",
        description:
          "Mobile and Quality Studio specialists focused on reliability for growers — so map-heavy, data-entry-heavy sessions stay trustworthy from barn Wi-Fi to open fields.",
        deliverables: [
          "React Native feature delivery and hardening",
          "Firebase-backed mobile services where appropriate",
          "Automated and exploratory QA for field scenarios",
        ],
        technologies: "React Native, TypeScript, Firebase, QA tooling",
      },
    ],
    ...defaultCta,
  },

  indeed: {
    heroTitle:
      "AI, data systems, and custom applications for the #1 job search website globally",
    heroDescription:
      "Indeed, the #1 job search website globally, partnered with QUORIXA for more than a decade on AI, data systems, and custom applications — spanning user-facing products and enterprise tools that keep recruiting and HR workflows moving worldwide.",
    industries: "Recruiting, HR, Employment marketplace",
    services: [
      "Full-stack development",
      "Mobile development",
      "AI engineering",
      "Data systems",
    ],
    solutions: [
      "User-facing applications",
      "Enterprise applications",
      "AI features",
      "Data platforms",
      "Mobile products",
    ],
    technologies: [
      "React",
      "Python",
      "Django",
      "AWS",
      "Mobile",
      "Data tooling",
    ],
    callout: {
      title: "10+ years of cooperation",
      body: "QUORIXA’s multi-year partnership with Indeed spans AI, data systems, and custom applications — a durable collaboration behind the world’s leading job search experience.",
    },
    outcomes: [
      "10+ years of continuous product cooperation",
      "User-facing and enterprise applications shipped at global job-search scale",
      "AI and data systems supporting recruiting and HR workflows",
      "Full-stack and mobile delivery across multiple product lines",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Building for the world’s #1 job search site",
        description:
          "QUORIXA teams contributed across Indeed’s stack — React experiences, Python/Django services on AWS, mobile surfaces, and data/AI capabilities that connect job seekers and employers at planetary scale.",
        deliverables: [
          "Full-stack feature delivery on React and Django",
          "AWS-hosted services and data system contributions",
          "Mobile application workstreams",
          "AI-assisted product capabilities where applicable",
        ],
        technologies: "React, Python, Django, AWS, mobile, data tooling",
      },
      {
        id: "enterprise",
        navLabel: "Enterprise & AI",
        title: "Enterprise apps and intelligent systems",
        description:
          "Beyond consumer job search, QUORIXA supported enterprise recruiting products and intelligent systems that help employers hire with better signal and less friction.",
        deliverables: [
          "Enterprise application features for hiring teams",
          "Data pipelines and analytical support",
          "AI experiments and productionization support",
        ],
        technologies: "Python, Django, React, AWS, AI/ML services",
      },
    ],
    ...defaultCta,
  },

  banner: {
    heroTitle:
      "The Banner: AI, data, and mobile solutions driving subscription growth",
    heroDescription:
      "The Banner needed AWS-based data, AI, and mobile solutions that turn journalism into sustainable subscription growth. QUORIXA delivered platforms and intelligence that help a major digital news organization understand audiences, personalize experiences, and grow paid relationships.",
    industries: "Media, Digital journalism, Subscriptions",
    services: [
      "Data engineering",
      "AI engineering",
      "Mobile development",
    ],
    solutions: [
      "Data platform on AWS",
      "AI for media",
      "Subscription growth tooling",
      "Mobile experiences",
    ],
    technologies: [
      "AWS",
      "Data lakes / warehouses",
      "Python",
      "AI/ML",
      "Mobile",
    ],
    callout: {
      title: "At scale that powers over 50 million unique visitors",
      body: "QUORIXA’s data and AI work sits behind audience and subscription systems built for media traffic measured in the tens of millions — not boutique dashboards.",
    },
    outcomes: [
      "Subscription growth supported by data and AI programs",
      "AWS-based data foundations for audience intelligence",
      "Mobile experiences aligned to retention and engagement goals",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "AWS data and AI for subscription media",
        description:
          "QUORIXA built and evolved AWS-centered data and AI capabilities so The Banner’s teams can measure engagement, predict churn risk, and act on subscription opportunities in near real time.",
        deliverables: [
          "AWS data platform design and implementation",
          "AI models and analytics for audience and subscription KPIs",
          "Mobile feature work tied to engagement and retention",
          "Operational dashboards for growth and editorial stakeholders",
        ],
        technologies: "AWS, Python, AI/ML, data warehouse tooling, mobile",
      },
      {
        id: "growth",
        navLabel: "Growth systems",
        title: "Mobile and intelligence for paid growth",
        description:
          "Data, AI, and mobile workstreams converged on the journeys that convert readers into subscribers and keep them — personalized prompts, reliable apps, and measurable experiments.",
        deliverables: [
          "Experimentation support for subscription funnels",
          "Mobile UX improvements for loyal readers",
          "Model and pipeline monitoring for growth metrics",
        ],
        technologies: "AWS, mobile clients, Python, analytics stack",
      },
    ],
    ...defaultCta,
  },

  regtech: {
    heroTitle: "AI-driven RegTech monitoring Nasdaq and the NYSE trading",
    heroDescription:
      "A Washington, D.C.-based RegTech overseeing brokerage firms and exchange markets partnered with QUORIXA on AI-driven monitoring of Nasdaq and NYSE trading. Data Studio and Quality Studio delivered oversight systems where accuracy, auditability, and release quality are non-negotiable.",
    industries: "FinTech, RegTech, Capital markets, Financial services",
    services: ["Data engineering", "QA and software testing", "AI engineering"],
    solutions: [
      "AI-driven market oversight",
      "RegTech monitoring",
      "Data pipelines",
      "Quality assurance",
    ],
    technologies: [
      "Python",
      "Data platforms",
      "AI/ML",
      "Test automation",
      "Cloud services",
    ],
    outcomes: [
      "AI-driven oversight spanning Nasdaq and NYSE trading activity",
      "Data pipelines supporting brokerage and exchange monitoring",
      "Quality gates protecting RegTech correctness under regulatory scrutiny",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "AI-driven RegTech for exchange market oversight",
        description:
          "QUORIXA helped the client operationalize AI and data systems that watch trading activity with the rigor regulators and brokerages expect — from ingestion to alert to audit trail.",
        deliverables: [
          "Data pipeline architecture for market and brokerage signals",
          "AI-assisted monitoring and anomaly detection support",
          "Quality strategy for RegTech-critical releases",
          "Operational runbooks for oversight workflows",
        ],
        technologies: "Python, data platforms, AI/ML, cloud services, QA tooling",
      },
      {
        id: "quality",
        navLabel: "Data & quality",
        title: "Data integrity meets Quality Studio",
        description:
          "Data Studio and Quality Studio worked as one so models and pipelines stay trustworthy — automated tests, data checks, and release discipline around every change that touches market oversight.",
        deliverables: [
          "Automated tests for critical monitoring paths",
          "Data quality checks in pipelines",
          "Regression suites for alert and reporting flows",
        ],
        technologies: "Python, test automation, data validation tooling",
      },
    ],
    ...defaultCta,
  },

  "supply-chain": {
    heroTitle: "AI-native supply chain platform rewiring American manufacturing",
    heroDescription:
      "QUORIXA drives the development of an AI-native supply chain platform serving 50,000+ manufacturers — combining backend, front-end, data, and AI so American manufacturing can plan, source, and respond with intelligence built into the product core.",
    industries: "Manufacturing, Supply chain, Industrial technology",
    services: [
      "Backend development",
      "Front-end development",
      "Data engineering",
      "AI engineering",
    ],
    solutions: [
      "AI-native platform",
      "Supply chain intelligence",
      "Manufacturing operations software",
      "Data and ML services",
    ],
    technologies: [
      "TypeScript",
      "Python",
      "Cloud services",
      "React",
      "Data pipelines",
      "AI/ML",
    ],
    callout: {
      title: "Built for 50,000+ manufacturers",
      body: "The platform QUORIXA helps build is designed for American manufacturing at population scale — AI-native workflows that still feel operable for everyday planners and operators.",
    },
    outcomes: [
      "AI-native supply chain platform serving 50,000+ manufacturers",
      "Integrated backend, front-end, data, and AI delivery",
      "Manufacturing workflows rewired around intelligent planning and response",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Rewiring American manufacturing with AI-native software",
        description:
          "QUORIXA engineers ship the product end to end — APIs and services, operator UIs, data platforms, and AI capabilities that make supply chain decisions faster and more accurate.",
        deliverables: [
          "Backend services for supply chain domain workflows",
          "Front-end applications for planners and operators",
          "Data pipelines feeding AI and analytics",
          "AI features embedded in manufacturing decision paths",
        ],
        technologies:
          "TypeScript, Python, React, cloud services, data pipelines, AI/ML",
      },
      {
        id: "ai-data",
        navLabel: "AI & data",
        title: "Intelligence in the supply chain core",
        description:
          "Data and AI Studio specialists treat models as product features — scored, monitored, and wired into the same interfaces manufacturers use every day.",
        deliverables: [
          "Feature pipelines for manufacturing and logistics signals",
          "Model services and evaluation harnesses",
          "Operator-facing insight surfaces",
        ],
        technologies: "Python, AI/ML, data platforms, React",
      },
    ],
    ...defaultCta,
  },

  geotap: {
    heroTitle:
      "Bringing a live social map application from vision to App Store launch",
    heroDescription:
      "GeoTap empowers socially active people in local communities and friend groups to coordinate offline plans around nearby places. QUORIXA’s engineering team took this product from an early-stage prototype to an App Store-approved app. The resulting application combines map-first friend visibility, tap-ins at places, nearby discovery, and user-controlled privacy modes.",
    industries: "Social networking, Location-based services",
    services: [
      "Backend development",
      "QA and software testing",
      "DevOps",
      "Security",
      "Accessibility",
    ],
    solutions: [
      "MVP",
      "Mobile application",
      "Geospatial and location",
      "Geofencing",
      "Test automation",
      "Cloud",
      "CI/CD",
    ],
    technologies: [
      "TypeScript",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "PostGIS",
      "AWS",
      "Terraform",
      "Flutter",
      "Redis",
      "GitHub Actions",
    ],
    callout: {
      title: "AI tools that powered our workflow",
      body: "Claude Code and modern LLM copilots accelerated scaffolding, reviews, and documentation while senior engineers retained ownership of architecture and release quality.",
    },
    outcomes: [
      "Less than six months from project start to App Store launch",
      "Production-ready backend, infrastructure, and CI/CD from a founder prototype",
      "WCAG-aligned accessibility hardening ahead of store submission",
      "Ongoing post-launch support with a lean, flexible release cadence",
    ],
    quote: {
      text: "I’ve been impressed with how they’ve planned for contingencies before they happen. They’ve not only uncovered risks but also suggested solutions.",
      author: "Randy Helmcamp",
      role: "Founder, GeoTap",
    },
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Building the application backend and infrastructure",
        description:
          "GeoTap approached QUORIXA with a founder-defined product vision and front-end prototype. Our team expanded this prototype into a production-ready app by developing its backend and infrastructure, connecting core social and geospatial flows.",
        deliverables: [
          "Production backend built from scratch",
          "Core functionality including authentication, profiles, friend system, place discovery, tap-ins, privacy-first location tracking, and notifications",
          "Repository (monorepo) and database setup",
          "Refinement of filter logic, map, tap-in, and city search functionality",
          "API layer development and third-party integrations",
          "Flutter integration connecting social and geospatial flows",
          "Cloud infrastructure on AWS, Terraform, and Cloudflare with cost-efficient self-hosted data layers",
          "CI/CD with automated tests and OpenAPI-driven client regeneration",
          "Analytics and error monitoring",
        ],
        technologies:
          "TypeScript, NestJS, Express, Node.js, Zod, PostgreSQL, PostGIS, Prisma ORM, Docker Compose, AWS (EC2, S3, CloudWatch, SNS, ECR, Lambda), Terraform, Flutter, Redis, BullMQ, GitHub Actions, Firebase Cloud Messaging, Sentry, PostHog, Foursquare API, Mapbox, Turborepo",
      },
      {
        id: "hardening",
        navLabel: "Hardening for launch",
        title: "Hardening the app for a stable launch and supporting it afterwards",
        description:
          "Our team prepared the app for iOS App Store submission covering accessibility, quality assurance, and security. After approval and launch, QUORIXA moved into ongoing maintenance — bug fixes, platform updates, and continued accessibility follow-through.",
        deliverables: [
          "Accessibility improvements aligned with WCAG 2.1 AA",
          "Three-layer automated test suite running in CI",
          "Versioned API collections covering every backend module",
          "Security controls for auth, access, rate limiting, transport, and data hygiene",
          "Real-device testing and a leaner release cadence",
          "App Store submission support through approved production release",
          "Ongoing post-launch support on a flexible, as-needed basis",
        ],
        technologies:
          "Jest, Postman, Swagger/OpenAPI, GitHub Actions, Sentry, Firebase Cloud Messaging, JWT, NestJS guards, Helmet, CORS, Cloudflare, Let’s Encrypt, AWS (EBS, DLM)",
      },
    ],
    ctaTitle: "Ready to bring your product vision to life?",
    ctaDescription:
      "Our expertise covers full-stack mobile and web apps across 10+ industries — from VC startups to Fortune 500 brands. Turn your product vision into a secure, engaging application with QUORIXA.",
  },

  findme: {
    heroTitle: "FindMeBoard: cloud-native, AI-driven contractor marketplace",
    heroDescription:
      "FindMeBoard is a cloud-native, AI-driven contractor marketplace. QUORIXA built mobile and AI capabilities that connect buyers with skilled trades — matching, messaging, and workflow intelligence designed for how contracting actually gets done.",
    industries: "Marketplace, Construction, Home services",
    services: ["Mobile development", "AI engineering", "Backend development"],
    solutions: [
      "Contractor marketplace",
      "AI matching",
      "Mobile application",
      "Cloud-native platform",
    ],
    technologies: [
      "Mobile",
      "AI/ML",
      "Cloud services",
      "TypeScript",
      "Node.js",
    ],
    outcomes: [
      "Cloud-native contractor marketplace launched with AI-driven matching",
      "Mobile experiences for buyers and contractors",
      "Backend foundations ready for marketplace scale",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "AI-driven contractor marketplace on mobile",
        description:
          "QUORIXA designed and shipped FindMeBoard’s core product loops — discovery, matching, and engagement — with AI assisting how buyers find the right contractor and how jobs move from request to done.",
        deliverables: [
          "Mobile application for buyers and contractors",
          "AI-assisted matching and ranking",
          "Cloud-native backend services",
          "Marketplace workflows for jobs, messaging, and status",
        ],
        technologies: "Mobile, AI/ML, TypeScript, Node.js, cloud services",
      },
      {
        id: "ai-mobile",
        navLabel: "AI & mobile",
        title: "Intelligence in the contractor journey",
        description:
          "AI Studio and mobile specialists focused on practical intelligence — better matches, clearer recommendations, and a mobile UX that works for tradespeople between job sites.",
        deliverables: [
          "Matching model integration",
          "Mobile UX for field-friendly use",
          "Notification and engagement patterns",
        ],
        technologies: "AI/ML services, mobile clients, cloud APIs",
      },
    ],
    ...defaultCta,
  },

  sureify: {
    heroTitle: "Sureify: InsurTech SaaS trusted by Allstate and Nationwide",
    heroDescription:
      "Sureify needed InsurTech SaaS that carriers like Allstate and Nationwide can trust across the insurance lifecycle. QUORIXA partnered on full-stack product engineering — policy, engagement, and operator experiences built for regulated insurance workflows.",
    industries: "InsurTech, Insurance, SaaS",
    services: [
      "Full-stack development",
      "UI development",
      "Backend development",
    ],
    solutions: [
      "InsurTech SaaS",
      "Insurance lifecycle platforms",
      "Carrier engagement portals",
      "Policy and customer workflows",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "Cloud services",
      "PostgreSQL",
    ],
    outcomes: [
      "InsurTech SaaS surfaces trusted by major national carriers",
      "Insurance lifecycle workflows spanning quote through engagement",
      "Operator and customer experiences tuned for regulated insurance UX",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "InsurTech SaaS for the insurance lifecycle",
        description:
          "QUORIXA helped Sureify ship carrier-ready product surfaces — connecting policy, servicing, and engagement journeys so insurers modernize without fracturing compliance or customer trust.",
        deliverables: [
          "Full-stack feature delivery for InsurTech workflows",
          "Carrier and customer portal experiences",
          "Backend services for policy and engagement domains",
          "UI patterns suited to complex insurance operations",
        ],
        technologies: "TypeScript, React, Node.js, PostgreSQL, cloud services",
      },
      {
        id: "carrier-ux",
        navLabel: "Carrier UX",
        title: "Experiences built for Allstate- and Nationwide-scale carriers",
        description:
          "UI and product engineering focused on clarity under complexity — so carrier teams and end customers complete high-stakes insurance journeys with confidence.",
        deliverables: [
          "Operator UX refinements for underwriting-adjacent workflows",
          "Responsive customer engagement surfaces",
          "Accessibility and usability hardening for regulated audiences",
        ],
        technologies: "React, TypeScript, design systems",
      },
    ],
    ...defaultCta,
  },

  logi: {
    heroTitle: "Logitech: product engineering for a global hardware brand",
    heroDescription:
      "Logitech needed product engineering that keeps hardware-adjacent software and peripheral ecosystems shipping at global brand quality. QUORIXA contributed front-end, backend, and Quality Studio support across experiences that connect devices, apps, and users.",
    industries: "Consumer electronics, Hardware software, Tech & Software",
    services: [
      "Front-end development",
      "Backend development",
      "QA and software testing",
    ],
    solutions: [
      "Peripheral ecosystem software",
      "Device companion experiences",
      "Product quality automation",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "Test automation",
      "Cloud services",
    ],
    outcomes: [
      "Product engineering across hardware-software companion experiences",
      "Quality gates protecting global peripheral product releases",
      "Maintainable front-end and backend foundations for device ecosystems",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Software that elevates a global hardware brand",
        description:
          "QUORIXA partnered with Logitech product teams on the digital layer around peripherals — configuration, companion apps, and services that make hardware feel cohesive after unboxing.",
        deliverables: [
          "Front-end features for device and companion experiences",
          "Backend services supporting peripheral ecosystems",
          "Release-oriented engineering practices",
        ],
        technologies: "TypeScript, React, Node.js, cloud services",
      },
      {
        id: "quality",
        navLabel: "Quality",
        title: "AQA for hardware-adjacent software",
        description:
          "Quality Studio specialists automated critical journeys so firmware-adjacent and companion software releases stay trustworthy at consumer electronics cadence.",
        deliverables: [
          "Automated regression for high-risk product paths",
          "CI-friendly test packaging",
          "Defect triage aligned to hardware release trains",
        ],
        technologies: "Test automation, TypeScript, CI tooling",
      },
    ],
    ...defaultCta,
  },

  clearcurrent: {
    heroTitle:
      "Streamlining energy management with agentic AI — ClearCurrent",
    heroDescription:
      "ClearCurrent needed to streamline energy management with agentic AI. QUORIXA delivered AI Studio, data, and backend engineering so Energy & Resources operators get intelligent orchestration — agents that plan, act, and report within real operational constraints.",
    industries: "Energy & Resources, Cleantech, Industrial AI",
    services: ["AI engineering", "Data engineering", "Backend development"],
    solutions: [
      "Agentic AI",
      "Energy management platforms",
      "Operational intelligence",
      "Data pipelines",
    ],
    technologies: [
      "Python",
      "AI/ML",
      "LLM agents",
      "Cloud services",
      "Data platforms",
    ],
    callout: {
      title: "Agents that respect energy operations",
      body: "QUORIXA designed agentic workflows with guardrails — so automation accelerates energy management without bypassing the safety and audit needs of Energy & Resources teams.",
    },
    outcomes: [
      "Agentic AI workflows streamlining energy management operations",
      "Data foundations feeding real-time and batch operational decisions",
      "Backend services wiring agents into operator-facing energy platforms",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Agentic AI for energy management",
        description:
          "QUORIXA helped ClearCurrent move from static dashboards to agent-assisted operations — connecting telemetry, rules, and LLM-driven agents that propose and execute energy management actions.",
        deliverables: [
          "Agent architecture and tool-use patterns for energy workflows",
          "Backend orchestration for agent actions and approvals",
          "Data pipelines for meters, assets, and operational KPIs",
          "Operator surfaces for supervising agent recommendations",
        ],
        technologies: "Python, LLM agents, AI/ML, cloud services, data platforms",
      },
      {
        id: "data-ai",
        navLabel: "Data & AI",
        title: "Intelligence grounded in energy data",
        description:
          "Data Studio and AI Studio specialists made sure agents reason over trustworthy signals — clean pipelines, evaluated models, and measurable impact on energy operations.",
        deliverables: [
          "Feature and event pipelines for energy assets",
          "Evaluation harnesses for agent decisions",
          "Monitoring for drift, cost, and operational outcomes",
        ],
        technologies: "Python, data platforms, AI/ML observability",
      },
    ],
    ...defaultCta,
  },

  diem: {
    heroTitle:
      "AI-powered social search engine featured by TechCrunch and Business Insider",
    heroDescription:
      "Diem needed an AI-powered social search engine worthy of TechCrunch and Business Insider attention. QUORIXA engineered AI, front-end, and backend systems so discovery feels social-native — relevance, ranking, and product UX that make search feel like conversation with community context.",
    industries: "Social tech, Search, Consumer internet",
    services: ["AI engineering", "Front-end development", "Backend development"],
    solutions: [
      "AI search",
      "Social discovery",
      "Ranking and relevance",
      "Consumer web application",
    ],
    technologies: [
      "Python",
      "AI/ML",
      "TypeScript",
      "React",
      "Search infrastructure",
    ],
    outcomes: [
      "AI-powered social search featured by TechCrunch and Business Insider",
      "Relevance and ranking systems tuned for social discovery",
      "Consumer-grade web experience for search and exploration",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Social search powered by AI",
        description:
          "QUORIXA built the product core behind Diem’s social search — ingestion, ranking, and interfaces that help users find people, topics, and moments with AI-assisted relevance.",
        deliverables: [
          "AI ranking and retrieval pipelines",
          "Search APIs and backend services",
          "React front-end for discovery journeys",
          "Instrumentation for relevance and engagement KPIs",
        ],
        technologies:
          "Python, AI/ML, TypeScript, React, search infrastructure",
      },
      {
        id: "product",
        navLabel: "Product UX",
        title: "Discovery UX that earned press attention",
        description:
          "Front-end specialists focused on speed and clarity — so AI search results feel delightful enough for TechCrunch- and Business Insider-level product storytelling.",
        deliverables: [
          "Search and results UX refinements",
          "Performance budgets for query latency",
          "Social context presentation patterns",
        ],
        technologies: "React, TypeScript, front-end performance tooling",
      },
    ],
    ...defaultCta,
  },

  "verified-first": {
    heroTitle: "Verified First: background screening and compliance platform",
    heroDescription:
      "Verified First needed a background screening and compliance platform HR teams can trust. QUORIXA delivered backend, front-end, and Quality Studio work — verification workflows, compliance trails, and release discipline suited to Human Capital risk.",
    industries: "Human Capital, HR Tech, Compliance",
    services: [
      "Backend development",
      "Front-end development",
      "QA and software testing",
    ],
    solutions: [
      "Background screening",
      "Compliance workflows",
      "HR verification portals",
      "Audit-ready reporting",
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "React",
      "PostgreSQL",
      "Test automation",
    ],
    outcomes: [
      "Screening and compliance workflows ready for enterprise HR cadence",
      "Audit-friendly verification journeys for employers and candidates",
      "Automated quality gates protecting compliance-critical releases",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Background screening built for HR trust",
        description:
          "QUORIXA engineered Verified First’s core screening loops — order intake, status, results delivery, and compliance documentation — so HR teams move fast without losing control.",
        deliverables: [
          "Backend services for screening and status workflows",
          "Employer and candidate-facing portals",
          "Compliance reporting and audit trail support",
          "Integrations with HR and ATS-adjacent systems where needed",
        ],
        technologies: "TypeScript, Node.js, React, PostgreSQL",
      },
      {
        id: "quality",
        navLabel: "Quality & compliance",
        title: "Quality Studio for compliance-critical paths",
        description:
          "Quality specialists automated high-risk verification journeys so every release protects the accuracy and privacy expectations of background screening.",
        deliverables: [
          "Regression suites for screening happy paths and edge cases",
          "Data-handling test scenarios for PII-sensitive flows",
          "Release-gate recommendations for compliance changes",
        ],
        technologies: "Test automation, TypeScript, CI tooling",
      },
    ],
    ...defaultCta,
  },

  "pull-systems": {
    heroTitle: "Pull Systems: lean manufacturing and operations software",
    heroDescription:
      "Pull Systems needed lean manufacturing and operations software that digitizes pull workflows on the floor. QUORIXA delivered front-end, backend, and data capabilities so production teams see demand signals clearly and respond without spreadsheet chaos.",
    industries: "Manufacturing, Lean operations, Industrial software",
    services: [
      "Front-end development",
      "Backend development",
      "Data engineering",
    ],
    solutions: [
      "Lean manufacturing software",
      "Pull workflow digitization",
      "Operations dashboards",
      "Shop-floor data",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "SQL",
      "Data visualization",
    ],
    outcomes: [
      "Digital pull workflows replacing manual lean board friction",
      "Operations visibility for manufacturing planners and floor leads",
      "Data foundations supporting continuous improvement metrics",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Lean software for pull-based operations",
        description:
          "QUORIXA translated lean manufacturing principles into operable software — kanban-style signals, replenishment workflows, and operator UIs that match how pull systems actually run.",
        deliverables: [
          "Pull workflow application features",
          "Backend services for demand and replenishment signals",
          "Shop-floor and planner-facing interfaces",
          "Reporting for lean KPIs and cycle times",
        ],
        technologies: "TypeScript, React, Node.js, SQL",
      },
      {
        id: "ops-data",
        navLabel: "Ops data",
        title: "Data that keeps lean loops honest",
        description:
          "Data engineering connected production events to dashboards so continuous improvement is measured — not guessed — across manufacturing cells.",
        deliverables: [
          "Event and metrics pipelines for lean operations",
          "Visualization for throughput and wait-time signals",
          "Operational alerts for stalled pull loops",
        ],
        technologies: "SQL, data visualization, Node.js",
      },
    ],
    ...defaultCta,
  },

  "cancer-research": {
    heroTitle:
      "From an IndieGoGo MVP to a full-featured cancer research platform",
    heroDescription:
      "A cancer research product needed to grow from an IndieGoGo MVP into a full-featured HealthTech platform. QUORIXA partnered on design, front-end, and backend engineering — research workflows, data capture, and patient- or researcher-facing experiences worthy of clinical ambition.",
    industries: "HealthTech, Cancer research, Life sciences",
    services: [
      "Full-stack development",
      "UI/UX design",
      "Backend development",
    ],
    solutions: [
      "Research platform",
      "MVP-to-scale productization",
      "Clinical research workflows",
      "HealthTech web application",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "Cloud services",
    ],
    callout: {
      title: "From crowdfunding MVP to research-grade product",
      body: "QUORIXA helped the team graduate from IndieGoGo-era scope into a durable platform architecture — without losing the mission clarity that funded the first version.",
    },
    outcomes: [
      "IndieGoGo MVP evolved into a full-featured cancer research platform",
      "Research and participant workflows productized for ongoing use",
      "Design and engineering foundations ready for HealthTech iteration",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Productizing a cancer research MVP",
        description:
          "QUORIXA assessed the crowdfunded prototype, then rebuilt and expanded core research journeys — study setup, data collection, and insight surfaces — into a maintainable HealthTech application.",
        deliverables: [
          "Architecture and roadmap from MVP to platform",
          "Full-stack research workflow features",
          "UI/UX for researchers and participants",
          "Secure data storage and access patterns",
        ],
        technologies: "TypeScript, React, Node.js, PostgreSQL, cloud services",
      },
      {
        id: "design-build",
        navLabel: "Design & build",
        title: "Human-centered research experiences",
        description:
          "Design Studio and engineering collaborated so complex research tasks stay approachable — reducing cognitive load for people already navigating cancer research realities.",
        deliverables: [
          "Information architecture and interaction design",
          "Front-end implementation of research UIs",
          "Iterative usability improvements post-launch",
        ],
        technologies: "Figma, React, TypeScript",
      },
    ],
    ...defaultCta,
  },

  teamviewer: {
    heroTitle:
      "TeamViewer: remote connectivity and enterprise support solutions",
    heroDescription:
      "TeamViewer needed remote connectivity and enterprise support solutions that stay reliable for IT at global scale. QUORIXA contributed backend, front-end, and Quality Studio engineering across remote access and support product surfaces enterprises depend on daily.",
    industries: "Enterprise IT, Remote access, Tech & Software",
    services: [
      "Backend development",
      "Front-end development",
      "QA and software testing",
    ],
    solutions: [
      "Remote connectivity",
      "Enterprise support tooling",
      "IT service workflows",
      "Release quality automation",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Backend services",
      "Test automation",
      "Cloud infrastructure",
    ],
    outcomes: [
      "Enterprise remote support and connectivity product enhancements",
      "Hardened release quality for IT-critical remote access paths",
      "Front-end and backend improvements for global support teams",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Remote connectivity for enterprise IT",
        description:
          "QUORIXA worked with TeamViewer product teams on the experiences and services behind remote access and support — focusing on reliability, clarity, and scale for enterprise operators.",
        deliverables: [
          "Backend service improvements for connectivity workflows",
          "Front-end enhancements for support and admin journeys",
          "Reliability and observability contributions",
        ],
        technologies: "TypeScript, React, backend services, cloud infrastructure",
      },
      {
        id: "quality",
        navLabel: "Quality",
        title: "AQA for remote support critical paths",
        description:
          "Quality Studio automated the journeys that define remote support trust — session start, permissions, and recovery — so releases protect enterprise IT uptime expectations.",
        deliverables: [
          "Automated suites for remote session workflows",
          "Regression coverage for permission and access edge cases",
          "CI integration for release gates",
        ],
        technologies: "Test automation, CI tooling",
      },
    ],
    ...defaultCta,
  },

  drfirst: {
    heroTitle:
      "UI revamp for a leading medication management platform — DrFirst",
    heroDescription:
      "DrFirst needed a UI revamp for a leading medication management platform. QUORIXA’s UI Studio and Design Studio rebuilt clinical workflows — prescribing, medication history, and care-team surfaces that reduce friction where medication decisions matter most.",
    industries: "Healthcare & Pharma, HealthTech, Clinical software",
    services: ["UI development", "UI/UX design", "Front-end development"],
    solutions: [
      "Medication management UI",
      "Clinical workflow redesign",
      "Healthcare design system",
      "Prescriber experiences",
    ],
    technologies: ["React", "TypeScript", "Figma", "Design systems", "CSS"],
    outcomes: [
      "UI revamp improving clarity across medication management journeys",
      "Clinical workflow UX tuned for prescribing and care-team speed",
      "Design system foundations for consistent HealthTech surfaces",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Medication management UI reinvented",
        description:
          "QUORIXA audited legacy medication management screens and redesigned them around clinical task success — fewer clicks, clearer states, safer confirmations for high-stakes medication actions.",
        deliverables: [
          "UX audit and information architecture for medication workflows",
          "Figma redesign of priority clinical journeys",
          "React front-end implementation of revamped UI",
          "Accessibility and usability hardening for clinical users",
        ],
        technologies: "Figma, React, TypeScript, CSS, design systems",
      },
      {
        id: "clinical-ux",
        navLabel: "Clinical UX",
        title: "Design that respects clinical time",
        description:
          "Designers and UI engineers partnered with clinical stakeholders so the revamp reflects real prescribing and medication review patterns — not generic SaaS chrome.",
        deliverables: [
          "Component patterns for dense clinical data",
          "Error and confirmation patterns for medication safety",
          "Responsive layouts for workstation clinical use",
        ],
        technologies: "Figma, React, design systems",
      },
    ],
    ...defaultCta,
  },

  groupon: {
    heroTitle:
      "Groupon / LivingSocial: marketplace and deals platform engineering",
    heroDescription:
      "Groupon and LivingSocial needed marketplace and deals platform engineering that survives retail ecommerce traffic spikes. QUORIXA delivered front-end, backend, and mobile capabilities across deals discovery, purchase, and merchant-adjacent experiences.",
    industries: "Retail & Ecommerce, Marketplace, Local commerce",
    services: [
      "Front-end development",
      "Backend development",
      "Mobile development",
    ],
    solutions: [
      "Deals marketplace",
      "Ecommerce platform engineering",
      "Merchant and consumer journeys",
      "Mobile commerce",
    ],
    technologies: [
      "JavaScript",
      "React",
      "Backend services",
      "Mobile",
      "Cloud infrastructure",
    ],
    outcomes: [
      "Marketplace and deals features shipping at peak retail scale",
      "Consumer purchase and discovery journeys hardened for traffic spikes",
      "Mobile commerce experiences aligned to deals engagement",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Engineering deals marketplaces at scale",
        description:
          "QUORIXA contributed across Groupon and LivingSocial product surfaces — catalog, checkout-adjacent flows, and engagement features that define local deals commerce.",
        deliverables: [
          "Front-end features for deals discovery and purchase",
          "Backend services supporting marketplace transactions",
          "Mobile client contributions for on-the-go deals",
          "Performance work for campaign and peak traffic moments",
        ],
        technologies:
          "JavaScript, React, backend services, mobile, cloud infrastructure",
      },
      {
        id: "commerce",
        navLabel: "Commerce",
        title: "Retail ecommerce reliability",
        description:
          "Engineering prioritized the moments that make or break deals platforms — browse latency, inventory truth, and resilient checkout under surge.",
        deliverables: [
          "Checkout and cart resilience improvements",
          "Catalog and search performance tuning",
          "Release practices suited to continuous commerce shipping",
        ],
        technologies: "React, backend services, caching and CDN practices",
      },
    ],
    ...defaultCta,
  },

  transvoyant: {
    heroTitle: "Transvoyant: supply chain visibility and predictive logistics",
    heroDescription:
      "Transvoyant needed supply chain visibility and predictive logistics that help shippers act before disruption hits. QUORIXA delivered AI, data, and front-end engineering — tracking intelligence and operator dashboards for Logistics & Delivery at predictive speed.",
    industries: "Logistics & Delivery, Supply chain, Predictive analytics",
    services: ["AI engineering", "Data engineering", "Front-end development"],
    solutions: [
      "Supply chain visibility",
      "Predictive logistics",
      "Shipment tracking intelligence",
      "Operator dashboards",
    ],
    technologies: [
      "Python",
      "AI/ML",
      "Data pipelines",
      "React",
      "TypeScript",
      "Cloud services",
    ],
    outcomes: [
      "Predictive logistics insights for shippers and operators",
      "Visibility dashboards consolidating multi-modal shipment signals",
      "AI-assisted disruption and ETA intelligence wired into workflows",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Visibility that predicts, not just reports",
        description:
          "QUORIXA helped Transvoyant turn fragmented logistics signals into actionable visibility — predictive models and UIs that surface risk early enough to replan.",
        deliverables: [
          "Data pipelines for shipment and carrier events",
          "Predictive models for ETA and disruption risk",
          "React dashboards for logistics operators",
          "Alerting patterns for exception management",
        ],
        technologies:
          "Python, AI/ML, data pipelines, React, TypeScript, cloud services",
      },
      {
        id: "ai-vis",
        navLabel: "AI & visibility",
        title: "Intelligence in the logistics control tower",
        description:
          "AI Studio and front-end specialists focused on explainable predictions — so planners trust the signal enough to change routing, inventory, or customer communications in time.",
        deliverables: [
          "Model evaluation against logistics KPIs",
          "Insight presentation patterns for control-tower UIs",
          "Feedback loops from operator actions to model improvement",
        ],
        technologies: "Python, AI/ML, React, analytics tooling",
      },
    ],
    ...defaultCta,
  },

  "trovo-health": {
    heroTitle:
      "HIPAA-compliant AI platform modernizing clinical support — Trovo Health",
    heroDescription:
      "Trovo Health needed a HIPAA-compliant AI platform that modernizes clinical support. QUORIXA delivered AI, backend, and front-end engineering with privacy-by-design — ambient or assistive clinical workflows that help care teams without compromising protected health information.",
    industries: "Healthcare & Pharma, Clinical AI, HealthTech",
    services: ["AI engineering", "Backend development", "Front-end development"],
    solutions: [
      "HIPAA-compliant AI",
      "Clinical support workflows",
      "Care team assistants",
      "Secure HealthTech platform",
    ],
    technologies: [
      "Python",
      "AI/ML",
      "TypeScript",
      "React",
      "Secure cloud",
      "HIPAA controls",
    ],
    callout: {
      title: "Compliance is a product requirement",
      body: "QUORIXA treated HIPAA controls as architecture — encryption, access, audit, and BAA-ready cloud patterns — not a checklist bolted on after AI demos.",
    },
    outcomes: [
      "HIPAA-aligned AI platform supporting modern clinical workflows",
      "Care-team experiences that reduce documentation and coordination friction",
      "Secure backend and front-end foundations for HealthTech iteration",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Clinical support AI under HIPAA constraints",
        description:
          "QUORIXA built Trovo Health’s AI-assisted clinical support product with security and privacy first — model services, APIs, and UIs designed for real care-team environments.",
        deliverables: [
          "AI feature engineering for clinical support use cases",
          "Secure backend services and PHI-aware data handling",
          "Front-end workflows for clinicians and support staff",
          "Audit logging and access control patterns",
        ],
        technologies:
          "Python, AI/ML, TypeScript, React, secure cloud, HIPAA controls",
      },
      {
        id: "clinical-ai",
        navLabel: "Clinical AI",
        title: "Assistive intelligence care teams will actually use",
        description:
          "AI Studio focused on assistive — not autonomous — clinical support: summaries, prompts, and workflow aids that keep clinicians in control of decisions.",
        deliverables: [
          "Prompt and model evaluation for clinical language tasks",
          "Human-in-the-loop review patterns",
          "Latency and reliability targets for point-of-care use",
        ],
        technologies: "Python, AI/ML services, evaluation harnesses",
      },
    ],
    ...defaultCta,
  },

  frichti: {
    heroTitle: "Frichti: food delivery product and platform engineering",
    heroDescription:
      "Frichti needed food delivery product and platform engineering built for meal-delivery velocity. QUORIXA contributed front-end, backend, and mobile work across ordering, logistics, and ops experiences that keep Logistics & Delivery moving from kitchen to doorstep.",
    industries: "Logistics & Delivery, Food delivery, Marketplace",
    services: [
      "Front-end development",
      "Backend development",
      "Mobile development",
    ],
    solutions: [
      "Food delivery platform",
      "Ordering and logistics UX",
      "Ops tooling",
      "Mobile consumer apps",
    ],
    technologies: [
      "JavaScript",
      "React",
      "Node.js",
      "Mobile",
      "Docker",
    ],
    outcomes: [
      "Food delivery product enhancements at meal-rush scale",
      "Ordering and logistics journeys hardened for peak demand",
      "Mobile and ops experiences aligned to last-mile realities",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Platform engineering for food delivery",
        description:
          "QUORIXA embedded with Frichti teams to ship consumer and operator features — catalogs, checkout, status tracking, and the services underneath that make delivery promises keepable.",
        deliverables: [
          "Front-end features for ordering and tracking",
          "Backend services for delivery and inventory workflows",
          "Mobile client improvements for on-the-go ordering",
          "Ops tooling support for kitchen and courier coordination",
        ],
        technologies: "JavaScript, React, Node.js, mobile, Docker",
      },
      {
        id: "logistics",
        navLabel: "Logistics UX",
        title: "Experiences tuned to delivery velocity",
        description:
          "Workstreams prioritized real-time status, courier handoffs, and resilient checkouts — the moments that define food delivery trust.",
        deliverables: [
          "Real-time status and notification patterns",
          "Performance fixes for peak ordering windows",
          "Release practices for continuous marketplace shipping",
        ],
        technologies: "React, Node.js, mobile clients",
      },
    ],
    ...defaultCta,
  },

  picoast: {
    heroTitle: "Picoast: coastal and location-based digital product",
    heroDescription:
      "Picoast needed a coastal, location-based digital product grounded in place. QUORIXA delivered mobile, front-end, and backend engineering — maps, discovery, and experiences that help users explore coastal contexts with Tech & Software craftsmanship.",
    industries: "Tech & Software, Location-based services, Consumer apps",
    services: [
      "Mobile development",
      "Front-end development",
      "Backend development",
    ],
    solutions: [
      "Location-based product",
      "Maps and discovery",
      "Coastal experience app",
      "Geospatial features",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Mobile",
      "Maps APIs",
      "Node.js",
      "Cloud services",
    ],
    outcomes: [
      "Location-based coastal product shipped with map-first discovery",
      "Mobile and web experiences grounded in place and geospatial context",
      "Backend foundations for locations, content, and user journeys",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Building a place-first coastal product",
        description:
          "QUORIXA designed Picoast around coastal geography — discovery, content, and navigation patterns that make location the product’s organizing principle.",
        deliverables: [
          "Map and discovery feature delivery",
          "Mobile application experiences",
          "Backend services for places and user content",
          "Maps API integrations",
        ],
        technologies:
          "TypeScript, React, mobile, Maps APIs, Node.js, cloud services",
      },
      {
        id: "mobile-maps",
        navLabel: "Mobile & maps",
        title: "Geospatial UX that feels native",
        description:
          "Mobile specialists focused on fluid map interactions and offline-tolerant patterns where coastal connectivity varies — so exploration stays delightful on the go.",
        deliverables: [
          "Map performance and interaction polish",
          "Location permission and privacy-aware flows",
          "Push and engagement patterns for place-based content",
        ],
        technologies: "Mobile SDKs, Maps APIs, TypeScript",
      },
    ],
    ...defaultCta,
  },

  redwood: {
    heroTitle:
      "Scaling enterprise automation for an Airbus and Xerox vendor — Redwood",
    heroDescription:
      "Redwood — a vendor trusted by Airbus and Xerox — needed enterprise automation and RPA scaled for complex industrial and document-centric processes. QUORIXA delivered backend, AI-assisted automation, and Quality Studio support so process orchestration stays reliable under enterprise SLA pressure.",
    industries: "Manufacturing, Enterprise automation, RPA",
    services: [
      "Backend development",
      "AI engineering",
      "QA and software testing",
    ],
    solutions: [
      "Enterprise RPA",
      "Process orchestration",
      "Automation platforms",
      "Industrial workflow automation",
    ],
    technologies: [
      "Python",
      "RPA tooling",
      "Backend services",
      "AI/ML",
      "Test automation",
      "Cloud services",
    ],
    callout: {
      title: "Automation trusted where Airbus and Xerox standards apply",
      body: "QUORIXA engineered automation with the auditability and failure handling enterprise manufacturing and document vendors require — not brittle scripts that break in production.",
    },
    outcomes: [
      "Enterprise automation scaled for Airbus- and Xerox-caliber vendor workloads",
      "Process orchestration with stronger reliability and observability",
      "Quality gates protecting automation releases under SLA pressure",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Enterprise automation at industrial vendor scale",
        description:
          "QUORIXA partnered with Redwood to harden and expand automation platforms — bots, orchestration, and operator controls that keep Airbus- and Xerox-facing processes moving.",
        deliverables: [
          "Backend services for process orchestration",
          "RPA workflow design and hardening",
          "AI-assisted document or decision steps where applicable",
          "Operational monitoring for automation fleets",
        ],
        technologies:
          "Python, RPA tooling, backend services, AI/ML, cloud services",
      },
      {
        id: "quality",
        navLabel: "Quality",
        title: "Quality Studio for automation correctness",
        description:
          "Quality specialists treated automation as mission-critical software — regression suites, environment parity, and clear failure signals before bots touch production systems.",
        deliverables: [
          "Automated verification of critical process paths",
          "CI-oriented packaging for automation releases",
          "Defect triage for brittle integration points",
        ],
        technologies: "Test automation, CI tooling, Python",
      },
    ],
    ...defaultCta,
  },

  culligan: {
    heroTitle:
      "E-commerce solutions for a water filtration market veteran — Halls Culligan Water",
    heroDescription:
      "Halls Culligan Water needed ecommerce solutions worthy of a water filtration market veteran. QUORIXA delivered storefront, backend, and design work — Retail & Ecommerce experiences that convert homeowners while supporting service- and product-led revenue.",
    industries: "Retail & Ecommerce, Home services, Water filtration",
    services: [
      "Front-end development",
      "Backend development",
      "UI/UX design",
    ],
    solutions: [
      "Ecommerce storefront",
      "Product and service commerce",
      "Retail ops tooling",
      "Conversion-focused UX",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Ecommerce platforms",
      "CMS",
    ],
    outcomes: [
      "Ecommerce experiences tailored to water filtration retail and service",
      "Storefront UX improving product discovery and conversion",
      "Backend and ops foundations for orders and catalog management",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Ecommerce for a filtration market veteran",
        description:
          "QUORIXA modernized Halls Culligan Water’s digital commerce — catalogs, product education, and checkout paths that match how customers buy filtration products and services.",
        deliverables: [
          "Storefront feature delivery and redesign support",
          "Backend integrations for catalog and orders",
          "UI/UX for product education and conversion",
          "Retail ops tooling improvements",
        ],
        technologies: "React, TypeScript, Node.js, ecommerce platforms, CMS",
      },
      {
        id: "commerce-ux",
        navLabel: "Commerce UX",
        title: "Design that sells filtration with clarity",
        description:
          "Design Studio focused on trust and clarity — water quality claims, service options, and purchase paths that reduce hesitation for high-consideration home purchases.",
        deliverables: [
          "Information architecture for products and services",
          "Conversion-oriented landing and PDP patterns",
          "Responsive storefront implementation",
        ],
        technologies: "Figma, React, TypeScript",
      },
    ],
    ...defaultCta,
  },

  "dialpad-platform": {
    heroTitle:
      "Dialpad: AI communications product surfaces at enterprise scale",
    heroDescription:
      "Dialpad needed AI communications product surfaces that feel polished at enterprise telecom scale. QUORIXA focused on UI Studio and front-end engineering — operator and end-user experiences where AI features are discoverable, trustworthy, and fast inside everyday collaboration workflows.",
    industries: "Telecom, SaaS, Customer communications",
    services: ["UI development", "Front-end development", "AI product UX"],
    solutions: [
      "AI communications UX",
      "Enterprise product surfaces",
      "Operator and end-user interfaces",
      "Feature discoverability",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Design systems",
      "Front-end performance",
      "AI feature APIs",
    ],
    outcomes: [
      "Enterprise AI communications UX refined for operator and end-user clarity",
      "Product surfaces that make AI features discoverable without clutter",
      "Front-end performance and design-system consistency at telecom SaaS scale",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Product UX surfaces for AI communications",
        description:
          "Distinct from platform backend workstreams, this engagement centered on the product surfaces users touch — call, message, and AI-assist experiences that must feel instant and enterprise-ready.",
        deliverables: [
          "UI architecture for AI-assisted communications journeys",
          "React implementation of priority product surfaces",
          "Design system alignment across operator and end-user views",
          "Instrumentation for UX and engagement metrics",
        ],
        technologies:
          "React, TypeScript, design systems, AI feature APIs, front-end performance",
      },
      {
        id: "ai-ux",
        navLabel: "AI UX",
        title: "Making AI features feel native to telecom workflows",
        description:
          "UI specialists designed AI entry points, results, and controls so intelligence augments calling and messaging without interrupting the primary collaboration job.",
        deliverables: [
          "AI feature discoverability patterns",
          "Empty, loading, and error states for AI actions",
          "Accessibility for dense communications UIs",
        ],
        technologies: "React, TypeScript, design systems",
      },
    ],
    ...defaultCta,
  },

  "regtech-surveillance": {
    heroTitle:
      "AI-driven RegTech: market surveillance for Nasdaq and NYSE trading",
    heroDescription:
      "A RegTech overseeing exchange markets needed surveillance dashboards for Nasdaq and NYSE trading. QUORIXA delivered data, AI, and front-end engineering — operator-facing monitoring where alert fidelity, audit trails, and Financial Services rigor are non-negotiable.",
    industries: "FinTech, RegTech, Capital markets, Financial services",
    services: ["Data engineering", "AI engineering", "Front-end development"],
    solutions: [
      "Market surveillance dashboards",
      "AI-assisted alert triage",
      "Exchange trading oversight",
      "RegTech operator UX",
    ],
    technologies: [
      "Python",
      "AI/ML",
      "Data platforms",
      "React",
      "TypeScript",
      "Visualization",
    ],
    outcomes: [
      "Surveillance dashboards for Nasdaq and NYSE trading oversight",
      "AI-assisted alert triage reducing operator noise",
      "Audit-friendly monitoring UX for RegTech analysts",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Surveillance dashboards for exchange market oversight",
        description:
          "Complementing broader RegTech data programs, this workstream focused on the analyst cockpit — dashboards, alert queues, and investigation views that turn market signals into actionable surveillance.",
        deliverables: [
          "React surveillance and investigation UIs",
          "Data feeds and aggregates for market monitoring KPIs",
          "AI-assisted ranking and triage of alerts",
          "Audit trail presentation for regulatory review",
        ],
        technologies:
          "Python, AI/ML, data platforms, React, TypeScript, visualization",
      },
      {
        id: "surveillance-ux",
        navLabel: "Surveillance UX",
        title: "Operator experiences built for alert fidelity",
        description:
          "Front-end and data specialists optimized for the surveillance analyst’s day — dense data, fast filtering, and clear provenance so every alert can be explained.",
        deliverables: [
          "Alert queue and filter interaction design",
          "Case/investigation workflow UI",
          "Performance tuning for high-volume market event views",
        ],
        technologies: "React, TypeScript, visualization libraries",
      },
    ],
    ...defaultCta,
  },

  "banner-mobile": {
    heroTitle:
      "The Banner: mobile and data experiences driving subscription growth",
    heroDescription:
      "The Banner needed mobile and data experiences that turn journalism into subscription growth on the go. QUORIXA focused on mobile product engineering paired with AWS-backed audience intelligence — so readers engage, convert, and retain where media consumption actually happens.",
    industries: "Media, Digital journalism, Subscriptions",
    services: ["Mobile development", "Data engineering", "AI engineering"],
    solutions: [
      "Mobile subscription experiences",
      "Audience data on AWS",
      "Retention and engagement tooling",
      "Personalized media journeys",
    ],
    technologies: [
      "Mobile",
      "AWS",
      "Python",
      "AI/ML",
      "Analytics",
      "Push messaging",
    ],
    callout: {
      title: "Mobile-first growth for subscription media",
      body: "Where the broader Banner data program powers audience intelligence, this engagement zeroes in on mobile surfaces and the data loops that feed subscription experiments.",
    },
    outcomes: [
      "Mobile experiences aligned to subscription conversion and retention",
      "AWS data signals wired into on-device personalization and messaging",
      "Growth experiments supported by mobile analytics and AI insights",
    ],
    solutionAreas: [
      {
        id: "overview",
        navLabel: "Project overview",
        title: "Mobile + data for paid media growth",
        description:
          "QUORIXA connected The Banner’s mobile apps to AWS audience and subscription data — so paywall, personalization, and retention prompts reflect real reader behavior.",
        deliverables: [
          "Mobile feature delivery for engagement and subscription journeys",
          "AWS data integrations for audience segments and events",
          "Push and in-app messaging patterns for retention",
          "Analytics instrumentation for mobile growth funnels",
        ],
        technologies: "Mobile, AWS, Python, AI/ML, analytics, push messaging",
      },
      {
        id: "growth",
        navLabel: "Growth mobile",
        title: "Subscription journeys on the device",
        description:
          "Mobile and data specialists iterated on the paths that convert casual readers into subscribers — trial prompts, personalized content, and reliable performance under media traffic.",
        deliverables: [
          "Paywall and trial UX refinements",
          "Personalization hooks from AWS audience data",
          "Performance and crash monitoring for loyal-reader sessions",
        ],
        technologies: "Mobile clients, AWS, analytics stack",
      },
    ],
    ...defaultCta,
  },
};

export function fallbackDetail(industry?: string): StudyDetail {
  return {
    heroDescription:
      "QUORIXA assembled a dedicated team to design, build, and scale a production-grade digital product with measurable business outcomes.",
    industries: industry ?? "Technology",
    services: ["Dedicated teams", "Product engineering"],
    solutions: ["Discovery", "Build", "Scale"],
    technologies: ["TypeScript", "React", "Node.js", "AWS"],
    callout: {
      title: "Senior ownership throughout",
      body: "From discovery through launch, QUORIXA keeps specialists accountable for architecture, quality, and outcomes — not just ticket throughput.",
    },
    outcomes: [
      "3× delivery speed against the client’s prior baseline",
      "95% client retention across multi-year partnerships",
      "Senior team ownership from discovery to production",
    ],
    quote: {
      text: "QUORIXA felt like an extension of our product org — sharp, accountable, and focused on outcomes.",
      author: "Product Lead",
      role: "QUORIXA client",
    },
    solutionAreas: [
      {
        id: "discovery",
        navLabel: "Discovery",
        title: "Discovery and technical assessment",
        description:
          "We aligned on product goals, constraints, and an architecture that could ship iteratively without painting the team into a corner.",
        deliverables: [
          "Discovery and technical assessment",
          "Architecture and delivery plan",
          "Quality and accessibility gates",
        ],
        technologies: "TypeScript, React, Node.js, AWS",
      },
      {
        id: "build",
        navLabel: "Build & scale",
        title: "Iterative product development",
        description:
          "Dedicated specialists shipped in tight cycles with launch readiness, monitoring, and continuous improvement after go-live.",
        deliverables: [
          "Iterative product development",
          "Launch readiness and monitoring",
          "Continuous improvement partnership",
        ],
        technologies: "TypeScript, React, Node.js, AWS, CI/CD",
      },
    ],
    ctaTitle: "Ready for results like these?",
    ctaDescription:
      "Tell us about your product goals — we’ll assemble the right specialists.",
  };
}
