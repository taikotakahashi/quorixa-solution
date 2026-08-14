import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { Button } from "../components/Button";
import { GlobalTalentMap } from "../components/GlobalTalentMap";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { StatCard } from "../components/StatCard";
import { careerHeroPortraits } from "../data/careers";
import { jobs } from "../data/team";
import { submitContactMessage } from "../lib/submitContact";
import styles from "./Careers.module.css";

const faqs = [
  {
    q: "What does the hiring process look like, and how long does it take?",
    a: "The process usually takes 2–3 weeks from start to offer and typically includes an application review, skills assessment, video introduction, and a technical interview with the hiring manager. If everything aligns, you'll receive an offer.",
  },
  {
    q: "Is QUORIXA remote-first, and what are the working hours?",
    a: "Yes, we're a remote-first company. Opportunities are open in specific countries, and you'll always find those details in each listing. Schedules are flexible, with some overlap required with your client's time zone.",
  },
  {
    q: "What level of English is required?",
    a: "We look for Upper-Intermediate level or higher. Since you'll work with international teams and clients, English is part of daily communication.",
  },
  {
    q: "What growth and learning opportunities are available?",
    a: "We support growth through individual development plans, educational budgets, internal workshops and mentorship, and opportunities to move between projects or roles.",
  },
  {
    q: "What benefits and perks do you offer?",
    a: "Beyond competitive compensation, teammates highlight flexible remote work, growth support, collaborative culture, global client experience, and modern technology stacks.",
  },
];

const cultureStats = [
  { value: "97%", label: "recommend working here" },
  { value: "82%", label: "see clear opportunities for growth" },
  { value: "100%", label: "gender-equal compensation" },
  { value: "68%", label: "are in senior or lead roles" },
];

function jobBullets(job: (typeof jobs)[number]): string[] {
  const fromResponsibilities = job.responsibilities.slice(0, 3);
  if (fromResponsibilities.length >= 3) return fromResponsibilities;
  return [job.summary, ...job.responsibilities].slice(0, 3);
}

export function Careers() {
  const [keyword, setKeyword] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showAllJobs, setShowAllJobs] = useState(false);

  const filteredJobs = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter((job) => {
      const haystack = [
        job.title,
        job.department,
        job.location,
        job.level,
        job.type,
        ...job.technologies,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [keyword]);

  const visibleJobs = showAllJobs ? filteredJobs : filteredJobs.slice(0, 4);
  const topRow = careerHeroPortraits.slice(0, 6);
  const bottomRow = careerHeroPortraits.slice(6, 11);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmitting(true);
    const result = await submitContactMessage({
      source: "Careers FAQ form",
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      question: String(data.get("question") ?? "").trim(),
    });
    setSubmitting(false);

    if (!result.ok) {
      setFormError(result.message);
      return;
    }

    form.reset();
    setSubmitted(true);
  }

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <div className={styles.collage} aria-hidden>
              <div className={`${styles.collageRow} ${styles.collageRowTop}`}>
                {topRow.map((src, i) => (
                  <div
                    key={src}
                    className={styles.portrait}
                    style={{ ["--i" as string]: String(i) }}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className={`${styles.collageRow} ${styles.collageRowBottom}`}>
                {bottomRow.map((src, i) => (
                  <div
                    key={src}
                    className={styles.portrait}
                    style={{ ["--i" as string]: String(i) }}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>
                Where top talent meets global opportunity
              </h1>
              <p className={styles.heroDesc}>
                Join our remote-first team and build impactful solutions for
                global brands from the comfort of your own space.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="positions" className={`section ${styles.jobsSection}`}>
        <div className="container">
          <Reveal>
            <form
              className={styles.searchBar}
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className={styles.searchField}>
                <Search size={18} strokeWidth={2} aria-hidden />
                <span className="sr-only">Search jobs</span>
                <input
                  type="search"
                  placeholder="Search by title, tech, or location…"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setShowAllJobs(false);
                  }}
                />
              </label>
              <Button type="submit" arrow>
                Search
              </Button>
            </form>
          </Reveal>

          {filteredJobs.length === 0 ? (
            <p className={styles.empty}>
              No roles match your search. Try a different keyword.
            </p>
          ) : (
            <div className={styles.jobGrid}>
              {visibleJobs.map((job) => (
                <Reveal key={job.id}>
                  <article className={styles.jobCard}>
                    <div className={styles.jobHeader}>
                      <h3>{job.title}</h3>
                      <span className={styles.jobBadge}>
                        {job.location} · {job.type}
                      </span>
                    </div>
                    <ul className={styles.jobBullets}>
                      {jobBullets(job).map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <div className={styles.jobActions}>
                      <Button href={`/careers/${job.id}/apply`} arrow>
                        Apply
                      </Button>
                      <Link
                        to={`/careers/${job.id}`}
                        className={styles.detailsLink}
                      >
                        See details
                        <ArrowRight size={14} strokeWidth={2.2} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          {filteredJobs.length > 4 && !showAllJobs && (
            <div className={styles.discoverMore}>
              <button
                type="button"
                className={styles.discoverLink}
                onClick={() => setShowAllJobs(true)}
              >
                Discover more positions
                <ArrowRight size={16} strokeWidth={2.2} />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className={`section section--dark ${styles.statsSection}`}>
        <div className={`container ${styles.statsSplit}`}>
          <div>
            <Reveal>
              <h2 className={styles.statsTitle}>More than empty claims</h2>
              <p className={styles.statsDesc}>
                Real feedback from our people, backed by internal data.
              </p>
            </Reveal>
            <div className={styles.statsGrid}>
              {cultureStats.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  variant="bordered"
                />
              ))}
            </div>
          </div>
          <Reveal>
            <div className={styles.statsPhoto}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009fce77f987?w=1000&q=80"
                alt="QUORIXA team collaborating"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              title="Talent from around the world, working as one team"
              description="We're a remote-first company. Each role is open to specific countries — you'll find those details in every listing."
              align="center"
            />
          </Reveal>
          <Reveal>
            <GlobalTalentMap />
          </Reveal>
        </div>
      </section>

      <section className={styles.opportunityBar}>
        <div className={`container ${styles.opportunityInner}`}>
          <Reveal>
            <h2 className={styles.opportunityTitle}>
              Don't miss new{" "}
              <span>opportunities</span> that match your skills and interests.
            </h2>
          </Reveal>
          <Reveal>
            <Button href="#positions" variant="outline" arrow>
              Browse open roles
            </Button>
          </Reveal>
        </div>
      </section>

      <section id="faq" className={`section ${styles.faqSection}`}>
        <div className={`container ${styles.faqLayout}`}>
          <Reveal>
            <div className={styles.faqCopy}>
              <span className="label">FAQ</span>
              <h2 className={styles.faqTitle}>Have any questions?</h2>
              <p className={styles.faqIntro}>
                We've answered some of the most common questions about
                collaborating with QUORIXA. If you don't see what you're looking
                for, drop us a message.
              </p>

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
                          className={`${styles.faqChevron} ${
                            open ? styles.faqChevronOpen : ""
                          }`}
                        />
                      </button>
                      {open && <p className={styles.faqAnswer}>{item.a}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.thanks}>
                  <h3>Thank you</h3>
                  <p>
                    We've received your question. A QUORIXA teammate will be in
                    touch shortly.
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setSubmitted(false)}
                  >
                    Ask another question
                  </Button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <h3 className={styles.formTitle}>Send us a message</h3>
                  <label className={styles.field}>
                    <span>Name</span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Your question</span>
                    <textarea
                      name="question"
                      rows={5}
                      placeholder="What would you like to know about careers at QUORIXA?"
                      required
                    />
                  </label>
                  {formError && (
                    <p className={styles.error} role="alert">
                      {formError}
                    </p>
                  )}
                  <Button type="submit" arrow disabled={submitting}>
                    {submitting ? "Sending…" : "Send message"}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
