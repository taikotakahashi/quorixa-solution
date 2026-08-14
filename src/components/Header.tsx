import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ASSETS } from "../assets";

import {
  Accessibility,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  Heart,
  HelpCircle,
  Lightbulb,
  Menu,
  Monitor,
  PenTool,
  Search,
  Server,
  Smartphone,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  aboutNav,
  careersNav,
  mainNav,
  servicesLeft,
  servicesRight,
} from "../data/navigation";
import { Button } from "./Button";
import styles from "./Header.module.css";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Cpu,
  Database,
  PenTool,
  BadgeCheck,
  Smartphone,
  Server,
  Monitor,
  Lightbulb,
  Accessibility,
  Building2,
  BookOpen,
  Users,
  Award,
  Briefcase,
  Search,
  Heart,
  HelpCircle,
};

type DropdownKey = "services" | "about" | "careers" | null;

export function Header() {
  const [open, setOpen] = useState<DropdownKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<DropdownKey>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const menuId = useId();

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeTimer = useRef<number | null>(null);

  const openMenu = (key: DropdownKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };

  const isCareers =
    location.pathname === "/careers" ||
    location.pathname.startsWith("/careers/");

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={`container-wide ${styles.bar}`}>
        <Link to="/" className={styles.logo} aria-label="QUORIXA home">
          <img
            src={ASSETS.logo}
            alt="QUORIXA"
            className={styles.logoImg}
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {mainNav.map((item) => {
            const isOpen = open === item.hasDropdown;
            const routeActive =
              (item.hasDropdown === "careers" && isCareers) ||
              (item.hasDropdown === "about" &&
                (location.pathname === "/about" ||
                  location.pathname === "/insights" ||
                  location.pathname.startsWith("/insights/"))) ||
              (item.hasDropdown === "services" &&
                [
                  "/mobile-development",
                  "/dedicated-teams",
                  "/ai-ml",
                  "/data-studio",
                  "/design-studio",
                  "/quality-assurance",
                  "/backend-development",
                  "/frontend-development",
                  "/accessibility",
                  "/solutions",
                ].includes(location.pathname));

            if (!item.hasDropdown) {
              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              );
            }
            return (
              <div
                key={item.label}
                className={styles.navItem}
                onMouseEnter={() => openMenu(item.hasDropdown)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={`${styles.link} ${
                    isOpen || routeActive ? styles.active : ""
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={`${menuId}-${item.hasDropdown}`}
                  onClick={() =>
                    setOpen(isOpen ? null : item.hasDropdown)
                  }
                >
                  {item.label}
                  <ChevronDown size={14} strokeWidth={2.2} />
                </button>
              </div>
            );
          })}
        </nav>

        <div className={styles.actions}>
          {isCareers ? (
            <Button
              href="/careers#positions"
              arrow
              className={`${styles.cta} ${styles.ctaOrange}`}
            >
              Open positions
            </Button>
          ) : (
            <Button
              href="/contact"
              variant="secondary"
              arrow
              className={styles.cta}
            >
              Get in touch
            </Button>
          )}
          <button
            type="button"
            className={styles.burger}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Desktop mega menus */}
      {open === "services" && (
        <div
          id={`${menuId}-services`}
          className={styles.mega}
          onMouseEnter={() => openMenu("services")}
          onMouseLeave={scheduleClose}
        >
          <div className={styles.megaInner}>
            <div className={styles.megaCol}>
              {servicesLeft.map((item) => {
                const Icon = iconMap[item.icon] || Code2;
                return (
                  <Link key={item.title} to={item.href} className={styles.megaItem}>
                    <span
                      className={styles.megaIcon}
                      style={{ background: `${item.color}18`, color: item.color }}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className={styles.megaDivider} />
            <div className={styles.megaCol}>
              {servicesRight.map((item) => {
                const Icon = iconMap[item.icon] || Code2;
                return (
                  <Link key={item.title} to={item.href} className={styles.megaItem}>
                    <span
                      className={styles.megaIcon}
                      style={{ background: `${item.color}18`, color: item.color }}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {open === "about" && (
        <div
          id={`${menuId}-about`}
          className={styles.mega}
          onMouseEnter={() => openMenu("about")}
          onMouseLeave={scheduleClose}
        >
          <div className={`${styles.megaInner} ${styles.aboutMega}`}>
            <div className={styles.megaCol}>
              {aboutNav.map((item) => {
                const Icon = iconMap[item.icon] || Building2;
                return (
                  <Link key={item.title} to={item.href} className={styles.megaItem}>
                    <span className={`${styles.megaIcon} ${styles.orangeOutline}`}>
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                  </Link>
                );
              })}
            </div>
            <Link to="/our-work/geotap" className={styles.featured}>
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80"
                alt="Featured case study"
              />
              <div>
                <span className={styles.featuredLabel}>Featured story</span>
                <h4>
                  Building GeoTap: from founder prototype to App Store launch
                </h4>
                <span className={styles.readMore}>Read full story →</span>
              </div>
            </Link>
          </div>
        </div>
      )}

      {open === "careers" && (
        <div
          id={`${menuId}-careers`}
          className={styles.mega}
          onMouseEnter={() => openMenu("careers")}
          onMouseLeave={scheduleClose}
        >
          <div className={`${styles.megaInner} ${styles.careersMega}`}>
            {careersNav.map((item) => {
              const Icon = iconMap[item.icon] || Briefcase;
              return (
                <Link key={item.title} to={item.href} className={styles.megaItem}>
                  <span className={`${styles.megaIcon} ${styles.orangeOutline}`}>
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobile} role="dialog" aria-label="Mobile navigation">
          <div className={styles.mobileInner}>
            {mainNav.map((item) => {
              if (!item.hasDropdown) {
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={styles.mobileLink}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }
              const expanded = mobileSection === item.hasDropdown;
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    className={styles.mobileLink}
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileSection(expanded ? null : item.hasDropdown)
                    }
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={expanded ? styles.chevOpen : ""}
                    />
                  </button>
                  {expanded && (
                    <div className={styles.mobileSub}>
                      {(item.hasDropdown === "services"
                        ? [...servicesLeft, ...servicesRight]
                        : item.hasDropdown === "about"
                          ? aboutNav
                          : careersNav
                      ).map((sub) => (
                        <Link
                          key={sub.title}
                          to={sub.href}
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Button href="/contact" arrow className={styles.mobileCta}>
              Get in touch
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
