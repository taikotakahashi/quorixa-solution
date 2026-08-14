import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "../components/Button";
import { CTASection } from "../components/CTASection";
import { Reveal } from "../components/Reveal";
import { submitContactMessage } from "../lib/submitContact";
import styles from "./Contact.module.css";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmitting(true);
    const result = await submitContactMessage({
      source: "Contact page",
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    form.reset();
    setSubmitted(true);
  }

  return (
    <>
      <section className={`${styles.section} grid-bg`}>
        <div className={`container ${styles.layout}`}>
          <Reveal>
            <div className={styles.copy}>
              <span className="label">Contact</span>
              <h1 className={styles.title}>
                Let's talk about what you're{" "}
                <span className="highlight-orange">building</span>
              </h1>
              <p className={styles.desc}>
                Share a bit about your product goals. We'll respond within one
                business day with next steps and the right specialists.
              </p>

              <ul className={styles.infoList}>
                <li>
                  <span className={styles.infoIcon}>
                    <Mail size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:hello@quorixa.com">hello@quorixa.com</a>
                  </div>
                </li>
                <li>
                  <span className={styles.infoIcon}>
                    <Phone size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <strong>Phone</strong>
                    <a href="tel:+15551234567">+1 (555) 123-4567</a>
                  </div>
                </li>
                <li>
                  <span className={styles.infoIcon}>
                    <MapPin size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <strong>Headquarters</strong>
                    <span>Remote-first · Global delivery hubs</span>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.thanks}>
                  <h2>Thank you</h2>
                  <p>
                    We've received your message. A QUORIXA teammate will be in
                    touch shortly.
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <h2 className={styles.formTitle}>Book a consultation</h2>
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
                      placeholder="you@company.com"
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Company</span>
                    <input
                      type="text"
                      name="company"
                      placeholder="Company name"
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Message</span>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us about your product, timeline, and goals…"
                      required
                    />
                  </label>
                  {error && (
                    <p className={styles.error} role="alert">
                      {error}
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

      <CTASection
        title="Prefer to browse first?"
        description="Explore case studies or open roles while you plan your next conversation."
        ctaLabel="View our work"
        ctaHref="/our-work"
        secondaryLabel="Careers"
        secondaryHref="/careers"
      />
    </>
  );
}
