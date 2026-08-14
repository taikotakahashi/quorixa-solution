import tripleliftImg from "../assets/project-image/Triple-lift-1.webp";
import syncurityImg from "../assets/project-image/syncyrity-66429ca40ac8d-768x538.webp";
import starzImg from "../assets/project-image/starz-1-768x538.webp";
import funnyOrDieImg from "../assets/project-image/funnyordie-66429ca393255-768x538.webp";
import bleacherReportImg from "../assets/project-image/bleacher-report-66429ca889b8b-768x538.webp";
import vmwareImg from "../assets/project-image/vmware-66429ca15f4bd-768x538.webp";
import kantoxImg from "../assets/project-image/kantox-66429ca652b3d-768x538.webp";
import dialpadImg from "../assets/project-image/DialPad_Hero_1-768x537.webp";
import monarchImg from "../assets/project-image/Monarch-Master-Injectors-768x537.webp";
import medicalTeamImg from "../assets/project-image/The-Medical-Team-Inc-1-768x538.webp";
import techstyleImg from "../assets/project-image/techstyle-66429c9f74fed-768x538.webp";
import hotspotImg from "../assets/project-image/InsurTech-solutions-for-high-risk-travel-and-medical-tourism-Hotspot-1-768x539.webp";
import deliveryHeroImg from "../assets/project-image/delivery-hero-66429c9d44a4d-768x538.webp";
import farmersEdgeImg from "../assets/project-image/farmersedge-66429ca681de9-1-768x538.webp";
import indeedImg from "../assets/project-image/indeed_sep2024-768x538.webp";
import bannerImg from "../assets/project-image/AWS-based-data-and-AI-solutions-driving-subscription-growth-768x537.webp";
import regtechImg from "../assets/project-image/AI-driven-RegTech-monitoring-Nasdaq-and-the-NYSE-trading-768x537.webp";
import supplyChainImg from "../assets/project-image/AI-native-supply-chain-platform-rewiring-American-manufacturing-768x537.webp";
import geotapImg from "../assets/project-image/GeoTap.webp";
import findmeImg from "../assets/project-image/FindMe-768x538.webp";
import sureifyImg from "../assets/project-image/Sureify_-InsurTech-SaaS-trusted-by-Allstate-and-Nationwide-768x539.webp";
import logiImg from "../assets/project-image/logi-1-768x538.webp";
import clearcurrentImg from "../assets/project-image/Streamlining-energy-management-with-agentic-AI-ClearCurrent-768x539.webp";
import diemImg from "../assets/project-image/AI-powered-social-search-engine-featured-by-TechCrunch-and-Business-Insider-Diem-768x539.webp";
import verifiedFirstImg from "../assets/project-image/verified-first-66429ca8c611b-768x538.webp";
import pullSystemsImg from "../assets/project-image/Pull-Systems-768x483.webp";
import cancerResearchImg from "../assets/project-image/From-an-IndieGoGo-MVP-to-a-full-featured-cancer-research-platform-1-768x537.webp";
import teamviewerImg from "../assets/project-image/teamviewer-1-768x537.webp";
import drfirstImg from "../assets/project-image/UI-revamp-for-a-leading-medication-management-platform-.-DrFirst-768x539.webp";
import grouponImg from "../assets/project-image/groupon_living_social-768x538.webp";
import transvoyantImg from "../assets/project-image/Transvoyant-1-768x538.webp";
import trovoHealthImg from "../assets/project-image/HIPAA-compliant-AI-platform-modernizing-clinical-support-Trovo-Health-1-1-768x539.webp";
import frichtiImg from "../assets/project-image/frichti-66429caaa481f-768x538.webp";
import picoastImg from "../assets/project-image/Picoast-768x538.webp";
import redwoodImg from "../assets/project-image/Scaling-enterprise-automation-for-an-Airbus-and-Xerox-vendor-Redwood-768x539.webp";
import culliganImg from "../assets/project-image/E-commerce-solutions-for-a-water-filtration-market-veteran-Halls-Culligan-Water-768x539.webp";
import dialpadPlatformImg from "../assets/project-image/dialpad-66429c9aeae7c-1-768x538.webp";
import regtechSurveillanceImg from "../assets/project-image/AI-driven-RegTech-monitoring-Nasdaq-and-the-NYSE-trading-1-768x537.webp";
import bannerMobileImg from "../assets/project-image/AWS-based-data-and-AI-solutions-driving-subscription-growth-3-768x537.webp";

export type CaseStudyTag = {
  label: string;
  color: string;
  textColor: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: CaseStudyTag[];
  href: string;
  industry?: string;
  result?: string;
};

const tag = {
  ai: { label: "AI Studio", color: "#f5e6ff", textColor: "#9a01fd" },
  data: { label: "Data Studio", color: "#e6e7f9", textColor: "#444ce7" },
  quality: { label: "Quality Studio", color: "#bce1c9", textColor: "#1b6c36" },
  design: { label: "Design Studio", color: "#ffe6e6", textColor: "#bc1016" },
  ui: { label: "UI Studio", color: "#fce7f3", textColor: "#be185d" },
  backend: { label: "Backend", color: "#d1f1ee", textColor: "#2e6b63" },
  frontend: { label: "Front-end", color: "#d1f1ee", textColor: "#2e6b63" },
  mobile: { label: "Mobile", color: "#dbeafe", textColor: "#1d4ed8" },
} as const satisfies Record<string, CaseStudyTag>;

export const caseStudies: CaseStudy[] = [
  {
    id: "triplelift",
    title: "AI-powered AdTech trusted by AdAge 100 brands.",
    description:
      "QUORIXA partnered with TripleLift to modernize AdTech platforms with microservices, AI, and data pipelines trusted by AdAge 100 brands...",
    image: tripleliftImg,
    tags: [tag.ai, tag.data, tag.backend, tag.frontend, tag.design],
    href: "/our-work/triplelift",
    industry: "Marketing",
    result: "Creatives from 2 days to 1 hour",
  },
  {
    id: "syncurity",
    title: "QA for a cybersecurity platform featured by NBC and CRN",
    description:
      "QUORIXA built BDD and full QA coverage from scratch for a cybersecurity B2B SaaS platform featured by NBC and CRN...",
    image: syncurityImg,
    tags: [tag.quality],
    href: "/our-work/syncurity",
    industry: "Tech & Software",
    result: "Full QA coverage from scratch",
  },
  {
    id: "starz",
    title: "Starz: ML and data solutions for a premium TV network",
    description:
      "QUORIXA delivered data pipeline modernization and churn-prediction ML models for a premium subscription TV network...",
    image: starzImg,
    tags: [tag.data, tag.ai, tag.backend],
    href: "/our-work/starz",
    industry: "Media",
    result: "95% projected churn accuracy",
  },
  {
    id: "funny-or-die",
    title: "Funny or Die: mobile app revamp for an Emmy-winning brand",
    description:
      "QUORIXA rebuilt the Funny or Die mobile experience so Emmy-winning comedy content reaches fans on modern Android and iOS...",
    image: funnyOrDieImg,
    tags: [tag.mobile, tag.frontend, tag.backend],
    href: "/our-work/funny-or-die",
    industry: "Media",
    result: "Mobile app revamp shipped",
  },
  {
    id: "bleacher-report",
    title: "Digital media solutions for a Webby's winner",
    description:
      "QUORIXA delivered full-stack digital media solutions — web apps, admin tools, and data aggregation — for a Webby's-winning sports brand...",
    image: bleacherReportImg,
    tags: [tag.frontend, tag.backend, tag.design],
    href: "/our-work/bleacher-report",
    industry: "Media",
    result: "Webby's-scale sports media",
  },
  {
    id: "vmware",
    title: "VMware: product and AQA solutions for a leader in cloud computing",
    description:
      "QUORIXA provided product engineering and automated QA for VMware, strengthening release confidence across cloud computing products...",
    image: vmwareImg,
    tags: [tag.quality, tag.backend],
    href: "/our-work/vmware",
    industry: "Tech & Software",
    result: "AQA for cloud product releases",
  },
  {
    id: "kantox",
    title: "Kantox: web app bringing new clients to a BNP Paribas subsidiary",
    description:
      "QUORIXA migrated Kantox to a modern SPA, elevating FX and payments UX for a BNP Paribas subsidiary and unlocking new client acquisition...",
    image: kantoxImg,
    tags: [tag.ui, tag.frontend],
    href: "/our-work/kantox",
    industry: "Financial Services",
    result: "Modern SPA driving new clients",
  },
  {
    id: "dialpad",
    title:
      "AI-powered customer communications platform leveraged by Uber and Motorola",
    description:
      "QUORIXA helped scale an AI-powered customer communications platform used by Uber, Motorola, and other enterprise brands...",
    image: dialpadImg,
    tags: [tag.ai, tag.mobile, tag.backend],
    href: "/our-work/dialpad",
    industry: "Telecom",
    result: "Enterprise AI communications at scale",
  },
  {
    id: "monarch",
    title: "AI/ML-powered predictive maintenance for tens of thousands of EVs",
    description:
      "QUORIXA brought AI/ML predictive maintenance to EV manufacturing, helping save up to 35% on component replacement across tens of thousands of vehicles...",
    image: monarchImg,
    tags: [tag.ai, tag.data, tag.backend, tag.frontend],
    href: "/our-work/monarch",
    industry: "Automotive",
    result: "Up to 35% less component spend",
  },
  {
    id: "medical-team",
    title: "Top-ranking healthcare agency: web and mobile for home care",
    description:
      "QUORIXA built web and mobile systems for a top-ranking home care agency — platforms still in active use nearly a decade later...",
    image: medicalTeamImg,
    tags: [tag.frontend, tag.backend, tag.mobile],
    href: "/our-work/medical-team",
    industry: "Healthcare & Pharma",
    result: "Systems in use nearly a decade",
  },
  {
    id: "techstyle",
    title: "TechStyle: UI architecture, DevOps, and custom e-commerce tools",
    description:
      "QUORIXA delivered UI architecture, DevOps, and custom commerce tooling for TechStyle’s 360-degree fashion e-commerce experience...",
    image: techstyleImg,
    tags: [tag.ui, tag.frontend, tag.backend],
    href: "/our-work/techstyle",
    industry: "Retail & Ecommerce",
    result: "360° digital commerce platform",
  },
  {
    id: "hotspot",
    title: "Hotspot Cover: InsurTech solutions for high-risk travel",
    description:
      "QUORIXA optimized architecture, automation, and admin tools for Hotspot Cover’s InsurTech platform serving high-risk travel and medical tourism...",
    image: hotspotImg,
    tags: [tag.backend, tag.frontend, tag.design],
    href: "/our-work/hotspot",
    industry: "Insurance",
    result: "Architecture & admin automation",
  },
  {
    id: "delivery-hero",
    title: "Enhancing the flagship product of a food delivery unicorn",
    description:
      "QUORIXA enhanced Delivery Hero’s flagship product with Node, React, and Docker engineering built for massive food-delivery scale...",
    image: deliveryHeroImg,
    tags: [tag.backend, tag.frontend],
    href: "/our-work/delivery-hero",
    industry: "Logistics & Delivery",
    result: "Flagship product at unicorn scale",
  },
  {
    id: "farmers-edge",
    title: "AgriTech platform featured by the World Economic Forum",
    description:
      "QUORIXA delivered mobile, UI, and QA for Farmers Edge — an AgriTech platform featured by the World Economic Forum for sustainable agriculture...",
    image: farmersEdgeImg,
    tags: [tag.mobile, tag.ui, tag.quality],
    href: "/our-work/farmers-edge",
    industry: "Agriculture",
    result: "WEF-featured AgriTech platform",
  },
  {
    id: "indeed",
    title:
      "AI, data systems, and custom applications for the #1 job search website globally",
    description:
      "Over 10+ years, QUORIXA built AI, data systems, and custom applications for Indeed — user-facing and enterprise products for the #1 job search site...",
    image: indeedImg,
    tags: [tag.ai, tag.frontend, tag.backend, tag.mobile],
    href: "/our-work/indeed",
    industry: "Human Capital",
    result: "10+ years of product partnership",
  },
  {
    id: "banner",
    title: "The Banner: AI, data, and mobile solutions driving subscription growth",
    description:
      "QUORIXA delivered AWS-based data, AI, and mobile solutions that power subscription growth for a major digital news platform...",
    image: bannerImg,
    tags: [tag.data, tag.ai, tag.mobile],
    href: "/our-work/banner",
    industry: "Media",
    result: "Subscription growth via data & AI",
  },
  {
    id: "regtech",
    title: "AI-driven RegTech monitoring Nasdaq and the NYSE trading",
    description:
      "A Washington, D.C.-based RegTech overseeing brokerage firms and exchange markets partnered with QUORIXA on AI-driven market oversight...",
    image: regtechImg,
    tags: [tag.data, tag.quality],
    href: "/our-work/regtech",
    industry: "Financial Services",
    result: "Live Nasdaq & NYSE oversight",
  },
  {
    id: "supply-chain",
    title: "AI-native supply chain platform rewiring American manufacturing",
    description:
      "QUORIXA drives the development of an AI-native supply chain platform serving 50,000+ manufacturers with backend, front-end, data, and AI...",
    image: supplyChainImg,
    tags: [tag.backend, tag.frontend, tag.data, tag.ai],
    href: "/our-work/supply-chain",
    industry: "Manufacturing",
    result: "AI-native supply chain at 50k+ scale",
  },
  {
    id: "geotap",
    title: "Bringing a live social map application from vision to App Store launch",
    description:
      "QUORIXA took GeoTap from an early-stage prototype to an App Store-approved live social map with privacy-first location and nearby discovery...",
    image: geotapImg,
    tags: [tag.backend, tag.mobile, tag.quality, tag.frontend],
    href: "/our-work/geotap",
    industry: "Tech & Software",
    result: "App Store launch in under six months",
  },
  {
    id: "findme",
    title: "FindMeBoard: cloud-native, AI-driven contractor marketplace",
    description:
      "QUORIXA built FindMeBoard as a cloud-native, AI-driven contractor marketplace connecting buyers and skilled trades on mobile...",
    image: findmeImg,
    tags: [tag.mobile, tag.ai, tag.backend],
    href: "/our-work/findme",
    industry: "Tech & Software",
    result: "AI-driven contractor marketplace",
  },
  {
    id: "sureify",
    title: "Sureify: InsurTech SaaS trusted by Allstate and Nationwide",
    description:
      "QUORIXA partnered on InsurTech SaaS for the insurance lifecycle — platforms trusted by carriers like Allstate and Nationwide...",
    image: sureifyImg,
    tags: [tag.backend, tag.frontend, tag.ui],
    href: "/our-work/sureify",
    industry: "Insurance",
    result: "Carrier-trusted InsurTech SaaS",
  },
  {
    id: "logi",
    title: "Logitech: product engineering for a global hardware brand",
    description:
      "QUORIXA delivered product engineering across hardware-adjacent software and peripheral ecosystems for a global Logitech brand...",
    image: logiImg,
    tags: [tag.frontend, tag.backend, tag.quality],
    href: "/our-work/logi",
    industry: "Tech & Software",
    result: "Product engineering at hardware scale",
  },
  {
    id: "clearcurrent",
    title: "Streamlining energy management with agentic AI — ClearCurrent",
    description:
      "QUORIXA helped ClearCurrent streamline energy management with agentic AI — intelligent orchestration for Energy & Resources operators...",
    image: clearcurrentImg,
    tags: [tag.ai, tag.data, tag.backend],
    href: "/our-work/clearcurrent",
    industry: "Energy & Resources",
    result: "Agentic AI for energy operations",
  },
  {
    id: "diem",
    title:
      "AI-powered social search engine featured by TechCrunch and Business Insider",
    description:
      "QUORIXA engineered an AI-powered social search experience featured by TechCrunch and Business Insider — discovery that feels social-native...",
    image: diemImg,
    tags: [tag.ai, tag.frontend, tag.backend],
    href: "/our-work/diem",
    industry: "Tech & Software",
    result: "TechCrunch & BI-featured AI search",
  },
  {
    id: "verified-first",
    title: "Verified First: background screening and compliance platform",
    description:
      "QUORIXA built screening and compliance workflows for Verified First — background checks and HR-ready verification at enterprise cadence...",
    image: verifiedFirstImg,
    tags: [tag.backend, tag.frontend, tag.quality],
    href: "/our-work/verified-first",
    industry: "Human Capital",
    result: "Screening & compliance at HR scale",
  },
  {
    id: "pull-systems",
    title: "Pull Systems: lean manufacturing and operations software",
    description:
      "QUORIXA delivered lean manufacturing and operations software for Pull Systems — digital pull workflows that keep production flowing...",
    image: pullSystemsImg,
    tags: [tag.frontend, tag.backend, tag.data],
    href: "/our-work/pull-systems",
    industry: "Manufacturing",
    result: "Lean ops software for the floor",
  },
  {
    id: "cancer-research",
    title: "From an IndieGoGo MVP to a full-featured cancer research platform",
    description:
      "QUORIXA took a cancer research product from an IndieGoGo MVP to a full-featured HealthTech platform for researchers and patients...",
    image: cancerResearchImg,
    tags: [tag.frontend, tag.backend, tag.design],
    href: "/our-work/cancer-research",
    industry: "Healthcare & Pharma",
    result: "MVP to full research platform",
  },
  {
    id: "teamviewer",
    title: "TeamViewer: remote connectivity and enterprise support solutions",
    description:
      "QUORIXA contributed to remote connectivity and enterprise support solutions for TeamViewer — reliable access for IT at global scale...",
    image: teamviewerImg,
    tags: [tag.backend, tag.quality, tag.frontend],
    href: "/our-work/teamviewer",
    industry: "Tech & Software",
    result: "Enterprise remote support engineering",
  },
  {
    id: "drfirst",
    title: "UI revamp for a leading medication management platform — DrFirst",
    description:
      "QUORIXA led a UI revamp for DrFirst’s medication management platform — clearer clinical workflows for prescribing and care teams...",
    image: drfirstImg,
    tags: [tag.ui, tag.design, tag.frontend],
    href: "/our-work/drfirst",
    industry: "Healthcare & Pharma",
    result: "Medication management UI revamp",
  },
  {
    id: "groupon",
    title: "Groupon / LivingSocial: marketplace and deals platform engineering",
    description:
      "QUORIXA engineered marketplace and deals platform capabilities for Groupon and LivingSocial — retail ecommerce at deal-scale traffic...",
    image: grouponImg,
    tags: [tag.frontend, tag.backend, tag.mobile],
    href: "/our-work/groupon",
    industry: "Retail & Ecommerce",
    result: "Deals marketplace at peak scale",
  },
  {
    id: "transvoyant",
    title: "Transvoyant: supply chain visibility and predictive logistics",
    description:
      "QUORIXA delivered supply chain visibility and predictive logistics for Transvoyant — AI-informed tracking for shippers and operators...",
    image: transvoyantImg,
    tags: [tag.ai, tag.data, tag.frontend],
    href: "/our-work/transvoyant",
    industry: "Logistics & Delivery",
    result: "Predictive supply chain visibility",
  },
  {
    id: "trovo-health",
    title:
      "HIPAA-compliant AI platform modernizing clinical support — Trovo Health",
    description:
      "QUORIXA built HIPAA-compliant AI for Trovo Health — clinical support workflows that modernize care teams without compromising privacy...",
    image: trovoHealthImg,
    tags: [tag.ai, tag.backend, tag.frontend],
    href: "/our-work/trovo-health",
    industry: "Healthcare & Pharma",
    result: "HIPAA-ready AI clinical support",
  },
  {
    id: "frichti",
    title: "Frichti: food delivery product and platform engineering",
    description:
      "QUORIXA enhanced Frichti’s food delivery product and platform — ordering, logistics, and ops experiences built for meal-delivery velocity...",
    image: frichtiImg,
    tags: [tag.frontend, tag.backend, tag.mobile],
    href: "/our-work/frichti",
    industry: "Logistics & Delivery",
    result: "Food delivery platform engineering",
  },
  {
    id: "picoast",
    title: "Picoast: coastal and location-based digital product",
    description:
      "QUORIXA built Picoast as a coastal, location-based digital product — maps, discovery, and experiences grounded in place...",
    image: picoastImg,
    tags: [tag.mobile, tag.frontend, tag.backend],
    href: "/our-work/picoast",
    industry: "Tech & Software",
    result: "Location-based coastal product",
  },
  {
    id: "redwood",
    title:
      "Scaling enterprise automation for an Airbus and Xerox vendor — Redwood",
    description:
      "QUORIXA scaled enterprise automation and RPA for Redwood — a vendor trusted by Airbus and Xerox needing reliable process orchestration...",
    image: redwoodImg,
    tags: [tag.backend, tag.ai, tag.quality],
    href: "/our-work/redwood",
    industry: "Manufacturing",
    result: "Enterprise RPA at Airbus/Xerox scale",
  },
  {
    id: "culligan",
    title:
      "E-commerce solutions for a water filtration market veteran — Halls Culligan Water",
    description:
      "QUORIXA delivered ecommerce solutions for Halls Culligan Water — storefront and ops tooling for a water filtration market veteran...",
    image: culliganImg,
    tags: [tag.frontend, tag.backend, tag.design],
    href: "/our-work/culligan",
    industry: "Retail & Ecommerce",
    result: "Ecommerce for water filtration retail",
  },
  {
    id: "dialpad-platform",
    title: "Dialpad: AI communications product surfaces at enterprise scale",
    description:
      "QUORIXA refined Dialpad product UX surfaces for AI communications — operator and end-user experiences at enterprise telecom scale...",
    image: dialpadPlatformImg,
    tags: [tag.ui, tag.frontend, tag.ai],
    href: "/our-work/dialpad-platform",
    industry: "Telecom",
    result: "Enterprise AI communications UX",
  },
  {
    id: "regtech-surveillance",
    title:
      "AI-driven RegTech: market surveillance for Nasdaq and NYSE trading",
    description:
      "QUORIXA delivered RegTech surveillance dashboards for Nasdaq and NYSE trading oversight — AI-assisted monitoring operators can trust...",
    image: regtechSurveillanceImg,
    tags: [tag.data, tag.ai, tag.frontend],
    href: "/our-work/regtech-surveillance",
    industry: "Financial Services",
    result: "Market surveillance dashboards",
  },
  {
    id: "banner-mobile",
    title:
      "The Banner: mobile and data experiences driving subscription growth",
    description:
      "QUORIXA focused The Banner’s mobile and data experiences on subscription growth — AWS-backed intelligence meeting readers on the go...",
    image: bannerMobileImg,
    tags: [tag.mobile, tag.data, tag.ai],
    href: "/our-work/banner-mobile",
    industry: "Media",
    result: "Mobile + data for subscriptions",
  },
];
