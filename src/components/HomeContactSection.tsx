import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { clients } from "../data/content";
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
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
                <span>How can we help?</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Leave us a message..."
                />
              </label>
              <label className={styles.check}>
                <input type="checkbox" required />
                <span>
                  You agree to our friendly{" "}
                  <Link to="/contact">privacy policy</Link>.
                </span>
              </label>
              <button type="submit" className={styles.submit}>
                Book a free consultation
                <ArrowRight size={18} strokeWidth={2.2} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
