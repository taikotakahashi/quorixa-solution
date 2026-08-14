import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { clients } from "../data/content";
import { submitContactMessage } from "../lib/submitContact";
import styles from "./HomeContactSection.module.css";

const serviceOptions = [
  "AI service",
  "Design solutions",
  "Dedicated team",
  "Development solutions",
  "QA solutions",
  "Data solutions",
  "Cybersecurity solutions",
  "Staff augmentation",
];

export function HomeContactSection() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const message = String(data.get("message") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();

    if (!message) {
      setError("Please tell us how we can help.");
      return;
    }

    if (!service) {
      setError("Please select the service you're looking for.");
      return;
    }

    setSubmitting(true);
    const result = await submitContactMessage({
      source: "Home consultation form",
      firstName: String(data.get("firstName") ?? "").trim(),
      lastName: String(data.get("lastName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      service,
      message,
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    form.reset();
    setSent(true);
  };

  return (
    <section className={styles.section}>
      <div className={`container-wide ${styles.inner}`}>
        <div className={styles.logosCol}>
          <p className={styles.logosLabel}>Amazing clients who trust us</p>
          <div className={styles.logoList}>
            {clients.map((client) => (
              <img
                key={client.id}
                src={client.src}
                alt={client.name}
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className={styles.formCol}>
          <h2>
            Get in touch to discuss your software vision with industry experts
          </h2>

          {sent ? (
            <p className={styles.success}>
              Thanks — we&apos;ll follow up shortly to schedule your consultation.
            </p>
          ) : (
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.row}>
                <label>
                  <span>First name*</span>
                  <input name="firstName" required placeholder="First name" />
                </label>
                <label>
                  <span>Last name*</span>
                  <input name="lastName" required placeholder="Last name" />
                </label>
              </div>
              <div className={styles.row}>
                <label>
                  <span>Email*</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                  />
                </label>
                <label>
                  <span>Company name*</span>
                  <input name="company" required placeholder="Company name" />
                </label>
              </div>
              <label>
                <span>I&apos;m looking for*</span>
                <select name="service" required defaultValue="">
                  <option value="" disabled>
                    Select your service
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>How can we help?*</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Leave us a message..."
                  required
                />
              </label>
              <label className={styles.check}>
                <input type="checkbox" required />
                <span>
                  You agree to our friendly{" "}
                  <Link to="/contact">privacy policy</Link>.
                </span>
              </label>
              {error && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className={styles.submit}
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Book a free consultation"}
                <ArrowRight size={18} strokeWidth={2.2} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
