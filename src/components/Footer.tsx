import { Link } from "react-router-dom";
import { ASSETS } from "../assets";
import styles from "./Footer.module.css";

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V23h-4v-6.6c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.53 1.71-2.53 3.48V23h-4V8.5z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.57l-5.14-6.71L5.2 22H1.94l8.03-9.17L1.5 2h6.73l4.64 6.15L18.244 2zm-1.15 18h1.8L7.02 3.94H5.1L17.094 20z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.84c0-2.37 1.4-3.68 3.55-3.68 1.03 0 2.1.18 2.1.18v2.32h-1.18c-1.16 0-1.52.73-1.52 1.47v1.77h2.59l-.41 2.9h-2.18V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.9A3.1 3.1 0 1 1 15.1 12 3.1 3.1 0 0 1 12 15.1zm6.15-8.95a1.15 1.15 0 1 0 1.15 1.15 1.15 1.15 0 0 0-1.15-1.15z" />
    </svg>
  );
}

const services = [
  { label: "Design Studio", href: "/design-studio" },
  { label: "Data Studio", href: "/data-studio" },
  { label: "AI Studio", href: "/ai-ml" },
  { label: "Quality Studio", href: "/quality-assurance" },
  { label: "Dedicated teams", href: "/dedicated-teams" },
  { label: "Mobile", href: "/mobile-development" },
  { label: "Front-end", href: "/frontend-development" },
  { label: "Backend", href: "/backend-development" },
  { label: "Accessibility", href: "/accessibility" },
];

const company = [
  { label: "About QUORIXA", href: "/about" },
  { label: "Our work", href: "/our-work" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Technologies", href: "/technologies" },
  { label: "Careers", href: "/careers" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo} aria-label="QUORIXA home">
              <img src={ASSETS.logo} alt="QUORIXA" className={styles.logoImg} />
            </Link>
            <p className={styles.tagline}>
              Premium software engineering for products that matter — dedicated
              teams, AI, data, design, and quality.
            </p>
            <div className={styles.social}>
              <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <IconLinkedIn />
              </a>
              <a href="https://twitter.com" aria-label="X" target="_blank" rel="noreferrer">
                <IconX />
              </a>
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
                <IconFacebook />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
                <IconInstagram />
              </a>
            </div>
          </div>

          <div className={styles.cols}>
            <div>
              <h4 className={styles.colTitle}>Services</h4>
              <ul>
                {services.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={styles.colTitle}>Company</h4>
              <ul>
                {company.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} QUORIXA. All rights reserved.</p>
          <div className={styles.legal}>
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className={styles.watermark} aria-hidden="true">
        QUORIXA
      </div>
    </footer>
  );
}
