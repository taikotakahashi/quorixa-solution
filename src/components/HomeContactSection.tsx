import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { clients } from "../data/content";
import { Button } from "./Button";
import styles from "./HomeContactSection.module.css";

export function HomeContactSection() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.logosCol}>
          <p className={styles.logosLabel}>Amazing clients who trust us</p>
          <ul className={styles.logoList}>
            {clients.map((client) => (
              <li key={client.id}>
                <img src={client.src} alt={client.name} />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.formCol}>
          <h2>Get in touch to discuss your software vision with industry experts</h2>

          {sent ? (
            <p className={styles.success}>
              Thanks — we&apos;ll follow up shortly to schedule your consultation.
            </p>
          ) : (
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.row}>
                <label>
                  First name*
                  <input name="firstName" required placeholder="First name" />
                </label>
                <label>
                  Last name*
                  <input name="lastName" required placeholder="Last name" />
                </label>
              </div>
              <div className={styles.row}>
                <label>
                  Email*
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                  />
                </label>
                <label>
                  Company name*
                  <input name="company" required placeholder="Company" />
                </label>
              </div>
              <label>
                I&apos;m looking for*
                <select name="service" required defaultValue="">
                  <option value="" disabled>
                    Select your service
                  </option>
                  <option>Dedicated teams</option>
                  <option>AI &amp; Machine Learning</option>
                  <option>Mobile development</option>
                  <option>Data Studio</option>
                  <option>Design Studio</option>
                  <option>Quality Assurance</option>
                </select>
              </label>
              <label>
                How can we help?
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
              <Button type="submit" arrow className={styles.submit}>
                Book a free consultation
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
