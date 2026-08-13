import { Link } from "react-router-dom";
import {
  BarChart3,
  Cpu,
  PenTool,
  ShieldCheck,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "../components/Hero";
import { ClientLogoMarquee } from "../components/ClientLogoMarquee";
import { SectionHeader } from "../components/SectionHeader";
import { ServiceCard } from "../components/ServiceCard";
import { StatCard } from "../components/StatCard";
import { Testimonial } from "../components/Testimonial";
import { AwardCards } from "../components/AwardCards";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { Button } from "../components/Button";
import { CaseStudyCarousel } from "../components/CaseStudyCarousel";
import { CurvedDivider } from "../components/CurvedDivider";
import { TeamMembers } from "../components/TeamMembers";
import { CheckList } from "../components/CheckList";
import { caseStudies } from "../data/caseStudies";
import { homeServices, industries, technologies } from "../data/content";
import { teamMembers } from "../data/team";
import styles from "./Home.module.css";

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Users,
  Cpu,
  BarChart3,
  PenTool,
  ShieldCheck,
};

export function Home() {
  return (
    <>
      {/* 1. Hero — centered, matching original "AI-driven approach to building products that people love" */}
      <Hero
        layout="centered"
        withVideo
        title={
          <>
            <span className="highlight-orange">AI-driven</span> approach to{" "}
            <span className={styles.heroHighlight}>building</span>
            {" "}products that people love
          </>
        }
        description="We match you with vetted senior engineers and cross-functional teams to build, scale, and modernize your digital products."
        ctaLabel="Tell us about your project"
        ctaHref="/contact"
      />

      {/* 2. Client logos marquee */}
      <ClientLogoMarquee />

      {/* 3. Content showcase — "Every year we're privileged to guide..." */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className={styles.showcaseIntro}>
              <SectionHeader
                title="Every year we're privileged to guide the tech strategies of some of the world's most innovative companies"
                align="center"
              />
            </div>
          </Reveal>

          <div className={styles.showcaseRow}>
            <div className={styles.showcaseText}>
              <Reveal>
                <div className={styles.showcaseBlock}>
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80"
                    alt="Team strategy session"
                    className={styles.showcaseImg}
                  />
                  <h3>We pair strong technical minds with product-thinking</h3>
                  <p>
                    Our engineers don't just code — they contribute ideas, question assumptions,
                    and help you ship the right features faster.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className={styles.showcaseText}>
              <Reveal>
                <div className={styles.showcaseBlock}>
                  <img
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80"
                    alt="Software development"
                    className={styles.showcaseImg}
                  />
                  <h3>End-to-end capabilities, one delivery team</h3>
                  <p>
                    Product, design, engineering, data, and QA working together —
                    no silos, no handoff friction.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. App uninstall stats / dark section */}
      <CurvedDivider from="white" to="black" />

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <div className={styles.statIntro}>
              <p className={styles.statLead}>
                <span className={styles.statBig}>62%</span> of mobile apps are uninstalled in the first month
              </p>
              <p className={styles.statSub}>
                We help you build products people keep, recommend, and rely on —
                combining engineering excellence with deep product understanding.
              </p>
            </div>
          </Reveal>
          <div className={styles.statsGrid}>
            <StatCard
              value="3×"
              label="Faster delivery"
              description="Accelerate roadmaps with senior, ready-to-contribute teams."
            />
            <StatCard
              value="850+"
              label="Engineers"
              description="Specialists across product, data, AI, design, and QA."
            />
            <StatCard
              value="25+"
              label="Countries"
              description="Distributed talent collaborating as one delivery team."
            />
            <StatCard
              value="95%"
              label="Retention"
              description="Long-term partnerships built on trust and outcomes."
            />
          </div>
        </div>
      </section>

      <CurvedDivider from="black" to="white" invert />

      {/* 5. How we work — process with dashboard visual */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="How we work"
              title="From kickoff to production, we move with you"
              description="A lean, high-trust engagement model designed for speed and quality."
              align="center"
            />
          </Reveal>
          <div className={styles.processRow}>
            <div className={styles.processSteps}>
              {[
                { num: "01", title: "Discovery & scoping", desc: "We map technical requirements, constraints, and goals with your team." },
                { num: "02", title: "Team assembly", desc: "Handpick senior engineers aligned to your stack, domain, and timezone." },
                { num: "03", title: "Embedded delivery", desc: "Engineers join your workflow — same tools, ceremonies, and standards." },
                { num: "04", title: "Continuous improvement", desc: "Regular check-ins, velocity tracking, and proactive optimization." },
              ].map((step) => (
                <Reveal key={step.num}>
                  <div className={styles.stepCard}>
                    <span className={styles.stepNum}>{step.num}</span>
                    <div>
                      <h4 className={styles.stepTitle}>{step.title}</h4>
                      <p className={styles.stepDesc}>{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className={styles.processVisual}>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80"
                alt="Dashboard interface"
                className={styles.processImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Services */}
      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Our expertise"
              title="What we bring"
              description="Technical expertise across the full product lifecycle."
            />
          </Reveal>
          <div className={styles.serviceGrid}>
            {homeServices.map((s) => {
              const Icon = iconMap[s.icon] || Users;
              return (
                <Reveal key={s.title}>
                  <Link to={s.href} className={styles.serviceLink}>
                    <ServiceCard
                      icon={Icon}
                      title={s.title}
                      description={s.description}
                      iconBg={s.color}
                      iconColor={s.iconColor}
                    />
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className={styles.helpBlock}>
            <Reveal>
              <SectionHeader
                title="How we help your company"
                description="Practical ways QUORIXA embeds with your product organization."
              />
              <CheckList
                items={[
                  "Stand up senior dedicated teams aligned to your timezone",
                  "Modernize platforms without freezing feature delivery",
                  "Ship GenAI features with evaluation and guardrails",
                  "Raise release quality with automation and QA strategy",
                  "Build design systems engineers actually adopt",
                  "Turn fragmented data into trusted decision pipelines",
                ]}
              />
              <div className={styles.inlineLinks}>
                <Button href="/solutions" variant="ghost" arrow>
                  Explore solutions
                </Button>
                <Button href="/industries" variant="ghost" arrow>
                  Industries
                </Button>
                <Button href="/technologies" variant="ghost" arrow>
                  Technologies
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. Case studies */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Our work"
              title="Our client results"
              description="Selected engagements across industries — from consumer mobile to enterprise platforms."
              align="center"
            />
          </Reveal>
          <CaseStudyCarousel studies={caseStudies} />
          <div className={styles.centerCta}>
            <Button href="/our-work" variant="ghost" arrow>
              View all case studies
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Testimonial */}
      <section className="section section--light">
        <div className="container">
          <Reveal>
            <Testimonial
              quote="QUORIXA became an extension of our product org. The team shipped reliably, communicated clearly, and elevated our engineering standards."
              author="Jordan Hale"
              role="CTO"
              company="enterprise SaaS company"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80"
            />
          </Reveal>
        </div>
      </section>

      {/* 9. Team section — "People and expertise" */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              title="People and expertise"
              description="Leaders and practitioners across engineering, design, AI, and delivery."
              align="center"
            />
          </Reveal>
          <TeamMembers members={teamMembers} />
        </div>
      </section>

      {/* 10. Awards */}
      <section className="section section--light">
        <div className="container">
          <Reveal>
            <div className={styles.awardsIntro}>
              <span className={styles.proofPill}>Our proof of success</span>
              <SectionHeader
                title="Our work wins awards"
                description="We build products that win awards, land top spots on industry rankings, and get our clients noticed."
                align="center"
              />
            </div>
          </Reveal>
          <AwardCards />
        </div>
      </section>

      {/* 11. Tech stack */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              label="Stack"
              title="Depth across modern engineering stacks"
              align="center"
            />
          </Reveal>
          <div className={styles.techGroups}>
            {Object.entries(technologies).map(([group, items]) => (
              <div key={group} className={styles.techGroup}>
                <h4>{group}</h4>
                <div className={styles.techTags}>
                  {items.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Industries */}
      <section className="section section--light">
        <div className="container">
          <Reveal>
            <SectionHeader
              title="Industries we serve"
              description="Domain-aware teams that understand regulated environments, high-growth products, and complex operations."
              align="center"
            />
          </Reveal>
          <div className={styles.industryCloud}>
            {industries.map((ind) => (
              <span key={ind}>{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Global talent map section */}
      <CurvedDivider from="light" to="black" />

      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <SectionHeader
              title="Global talent, local expertise, your timezone"
              description="Our distributed teams span 25+ countries, working in your hours and speaking your language."
              align="center"
              dark
            />
          </Reveal>
          <div className={styles.mapWrap}>
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1000&q=80"
              alt="World map with QUORIXA offices"
              className={styles.mapImg}
            />
            <div className={styles.mapDots}>
              {[
                { x: 23, y: 35 },
                { x: 48, y: 30 },
                { x: 52, y: 28 },
                { x: 55, y: 45 },
                { x: 72, y: 38 },
                { x: 78, y: 50 },
                { x: 30, y: 55 },
              ].map((dot, i) => (
                <span
                  key={i}
                  className={styles.mapDot}
                  style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CurvedDivider from="black" to="light" invert />

      {/* 14. Final CTA */}
      <CTASection
        title="Let's build something you're proud of"
        description="Tell us about your product goals — we'll assemble the right specialists."
        ctaLabel="Book a consultation"
      />
    </>
  );
}
