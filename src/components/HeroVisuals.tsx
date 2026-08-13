import styles from "./HeroVisuals.module.css";
import {
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  Video,
} from "lucide-react";

const people = [
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&q=80",
    name: "Amelia C.",
  },
  {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&q=80",
    name: "Marcus R.",
  },
  {
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&q=80",
    name: "Sofia A.",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80",
    name: "James O.",
  },
];

export function VideoCallVisual() {
  return (
    <div className={styles.stage}>
      <div className={styles.glow} />
      <div className={styles.frame}>
        <div className={styles.frameTop}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.meetingTitle}>QUORIXA Standup</span>
        </div>
        <div className={styles.grid2x2}>
          {people.map((person) => (
            <div key={person.name} className={styles.tile}>
              <img src={person.src} alt={person.name} />
              <span className={styles.tileName}>{person.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.controls}>
          <button type="button" aria-label="Mute">
            <MicOff size={16} />
          </button>
          <button type="button" aria-label="Video">
            <Video size={16} />
          </button>
          <button type="button" aria-label="Share">
            <MonitorUp size={16} />
          </button>
          <button type="button" aria-label="Mic">
            <Mic size={16} />
          </button>
          <button type="button" className={styles.end} aria-label="End call">
            <PhoneOff size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function MobileVisual() {
  return (
    <div className={styles.stage}>
      <div className={`${styles.glow} ${styles.glowBlue}`} />
      <div className={styles.phones}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${styles.phone} ${styles[`phone${i}`]}`}>
            <div className={styles.phoneNotch} />
            <div className={styles.phoneScreen}>
              <div className={styles.appHeader} />
              <div className={styles.appCard} />
              <div className={styles.appCard} />
              <div className={styles.appChart}>
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardVisual({ accent = "purple" }: { accent?: string }) {
  return (
    <div className={styles.stage}>
      <div className={`${styles.glow} ${accent === "orange" ? styles.glowOrange : styles.glowPurple}`} />
      <div className={styles.dash}>
        <div className={styles.dashSidebar}>
          <div className={styles.dashLogo} />
          <div className={styles.dashNav} />
          <div className={styles.dashNav} />
          <div className={styles.dashNav} />
        </div>
        <div className={styles.dashMain}>
          <div className={styles.dashTop}>
            <div className={styles.dashTitle} />
            <div className={styles.dashBtn} />
          </div>
          <div className={styles.dashStats}>
            <div className={styles.dashStat} />
            <div className={styles.dashStat} />
            <div className={styles.dashStat} />
          </div>
          <div className={styles.dashChart}>
            <svg viewBox="0 0 200 80" preserveAspectRatio="none">
              <path
                d="M0,60 C30,55 40,20 70,30 S110,70 140,40 S180,10 200,25"
                fill="none"
                stroke="#5B35F5"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DesignCollageVisual() {
  return (
    <div className={styles.stage}>
      <div className={`${styles.glow} ${styles.glowOrange}`} />
      <div className={styles.collage}>
        <img
          className={styles.colMain}
          src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80"
          alt="Product design interface"
        />
        <img
          className={styles.colSmall}
          src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&q=80"
          alt="UI mockup"
        />
        <div className={styles.colCard}>
          <strong>Design System</strong>
          <span>Components · Tokens · Flows</span>
        </div>
      </div>
    </div>
  );
}

export function QAVisual() {
  return (
    <div className={styles.stage}>
      <div className={`${styles.glow} ${styles.glowGreen}`} />
      <div className={styles.qa}>
        <div className={styles.qaHeader}>
          <span>Test Suite · Release 2.4</span>
          <span className={styles.qaPass}>98% pass</span>
        </div>
        <div className={styles.qaRows}>
          {["API regression", "E2E checkout", "Accessibility audit", "Performance budget"].map(
            (name, i) => (
              <div key={name} className={styles.qaRow}>
                <span className={styles.qaCheck}>✓</span>
                <span>{name}</span>
                <span className={styles.qaTime}>{12 + i * 3}s</span>
              </div>
            )
          )}
        </div>
        <div className={styles.qaBars}>
          <div style={{ width: "92%" }} />
          <div style={{ width: "78%" }} />
          <div style={{ width: "96%" }} />
        </div>
      </div>
    </div>
  );
}
