import { useMemo, useState } from "react";
import {
  ChevronDown,
  Globe2,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "../components/Button";
import { CTASection } from "../components/CTASection";
import { GlobalTalentMap } from "../components/GlobalTalentMap";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { StatCard } from "../components/StatCard";
import { Testimonial } from "../components/Testimonial";
import { careerHeroPortraits } from "../data/careers";
import { employeeTestimonials, jobs } from "../data/team";
import styles from "./Careers.module.css";

const departments = [
  "All",
  ...Array.from(new Set(jobs.map((job) => job.department))),
];

const cultureCards = [
  {
    icon: Sparkles,
    title: "Craft over ceremony",
    description:
      "We keep process light and standards high — so engineers spend time solving real problems.",
    iconBg: "#F3E8FF",
    iconColor: "#5B35F5",
  },
  {
    icon: Users,
    title: "Teams that trust",
    description:
      "Autonomy with accountability. Mentorship without micromanagement across every studio.",
    iconBg: "#E8F1FF",
    iconColor: "#1677FF",
  },
  {
    icon: Globe2,
    title: "Global, not distant",
    description:
      "Collaborate with peers across continents while staying aligned to client timezones.",
    iconBg: "#E6F7EF",
    iconColor: "#35B968",
  },
  {
    icon: Heart,
    title: "People first careers",
    description:
      "Growth paths, learning budgets, and roles designed for long-term impact — not churn.",
    iconBg: "#FFF0E6",
    iconColor: "#FF6500",
  },
];

const faqs = [
  {
    q: "What does the interview process look like?",
    a: "Typically a recruiter screen, a technical deep-dive, a collaboration exercise, and a final conversation with leadership. We aim to complete most processes within two weeks.",
  },
  {
    q: "Do you hire remotely?",
    a: "Yes. Many roles are fully remote within region, with hybrid options in select hubs. Timezone overlap with client teams is important for delivery roles.",
  },
  {
    q: "What technologies do you work with?",
    a: "Modern product stacks across React, TypeScript, Node, Python, Go, cloud platforms, and AI tooling — matched to the engagement, not a single mandated stack.",
  },
  {
    q: "How do dedicated teams work day to day?",
    a: "You join a client squad with clear ownership, QUORIXA delivery support, and seniors available for architecture and mentoring. You ship as part of their product org.",
  },
  {
    q: "Is relocation required?",
    a: "Only for specific on-site or hybrid roles. Most openings are remote or hybrid — details are listed on each position.",
  },
];

export function Careers() {
  const [keyword, setKeyword] = useState("");
  const [department, setDepartment] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredJobs = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return jobs.filter((job) => {
      const deptOk = department === "All" || job.department === department;
      if (!deptOk) return false;
      if (!q) return true;
      const haystack = [
        job.title,
        job.department,
        job.location,
        job.level,
        ...job.technologies,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [keyword, department]);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <div className={styles.portraitBand} aria-hidden>
              {careerHeroPortraits.map((src, i) => (
                <div
                  key={src}
                  className={styles.portrait}
                  style={{ ["--offset" as string]: `${(i % 5) - 2}` }}
                >
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>
                Where <strong>top talent</strong> meets{" "}
                <strong>global opportunity</strong>
              </h1>
              <p className={styles.heroDesc}>
                Join our remote-first team and build impactful solutions for
                global brands from the comfort of your own space.
              </p>
              <Button href="#positions" arrow>
                View open positions
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="positions" className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Open roles"
              title="Find your next challenge"
              description="Search by keyword or department. Every role is designed for impact with senior peers."
            />
          </Reveal>

          <div className={styles.searchBar}>
            <label className={styles.searchField}>
              <Search size={18} strokeWidth={2} aria-hidden />
              <span className="sr-only">Search jobs</span>
              <input
                type="search"
                placeholder="Search title, tech, location…"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </label>
            <label className={styles.selectField}>
              <span className="sr-only">Department</span>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "All" ? "All departments" : dept}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filteredJobs.length === 0 ? (
            <p className={styles.empty}>
              No roles match your filters. Try a different keyword or
              department.
            </p>
          ) : (
            <div className={styles.jobGrid}>
              {filteredJobs.map((job) => (
                <Reveal key={job.id}>
                  <article className={styles.jobCard}>
                    <div className={styles.jobMeta}>
                      <span className={styles.jobDept}>{job.department}</span>
                      <span className={styles.jobType}>{job.type}</span>
                    </div>
                    <h3>{job.title}</h3>
                    <p className={styles.jobLocation}>
                      <MapPin size={14} strokeWidth={2} aria-hidden />
                      {job.location} · {job.level}
                    </p>
                    <p className={styles.jobSummary}>{job.summary}</p>
                    <div className={styles.techTags}>
                      {job.technologies.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <Button href={`/careers/${job.id}`} variant="ghost" arrow>
                      View position
                    </Button>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section--dark">
        <div className={`container ${styles.statsSplit}`}>
          <Reveal>
            <div className={styles.statsPhoto}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009fce77f987?w=900&q=80"
                alt="QUORIXA team collaborating"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="label">Life at QUORIXA</span>
              <h2 className={styles.darkHeading}>
                Built by people who love shipping
              </h2>
            </Reveal>
            <div className={styles.statsGrid}>
              <StatCard value="850+" label="Teammates" />
              <StatCard value="25+" label="Countries" />
              <StatCard value="4.8" label="Glassdoor score" />
              <StatCard value="92%" label="Would recommend" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Global talent"
              title="Talent from around the world, working as one team"
              description="Explore hubs across the Americas, Europe, and Asia — select a country to see open roles."
              align="center"
            />
          </Reveal>
          <Reveal>
            <GlobalTalentMap />
          </Reveal>
        </div>
      </section>

      <section id="culture" className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Culture"
              title="Why engineers stay"
              description="The working principles that make QUORIXA a place to do the best work of your career."
              align="center"
            />
          </Reveal>
          <div className={styles.cultureGrid}>
            {cultureCards.map((card) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title}>
                  <article className={styles.cultureCard}>
                    <div
                      className={styles.cultureIcon}
                      style={{
                        background: card.iconBg,
                        color: card.iconColor,
                      }}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader title="Voices from the team" align="center" />
          </Reveal>
          <div className={styles.testimonialGrid}>
            {employeeTestimonials.map((t) => (
              <Reveal key={t.name}>
                <Testimonial
                  quote={t.quote}
                  author={t.name}
                  role={t.role}
                  company={t.location}
                  image={t.image}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="FAQ"
              title="Answers before you apply"
              description="Common questions about interviewing, remote work, and life at QUORIXA."
              align="center"
            />
          </Reveal>
          <div className={styles.faqList}>
            {faqs.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.q} className={styles.faqItem}>
                  <button
                    type="button"
                    className={styles.faqButton}
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : index)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`${styles.faqChevron} ${open ? styles.faqChevronOpen : ""}`}
                    />
                  </button>
                  {open && <p className={styles.faqAnswer}>{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to build what's next?"
        description="Browse open roles or reach out — we'd love to meet you."
        ctaLabel="See open positions"
        ctaHref="#positions"
        secondaryLabel="Contact recruiting"
        secondaryHref="/contact"
      />
    </>
  );
}
