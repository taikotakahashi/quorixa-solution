import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Bell, Briefcase, Megaphone, Newspaper, X } from "lucide-react";
import {
  formatNotificationTime,
  type NotificationItem,
  type NotificationKind,
} from "../lib/notifications";
import styles from "./HeaderTools.module.css";

type Props = {
  items: NotificationItem[];
  onOpenChange?: (open: boolean) => void;
};

const kindIcon: Record<NotificationKind, typeof Bell> = {
  announcement: Megaphone,
  job: Briefcase,
  article: Newspaper,
};

const kindLabel: Record<NotificationKind, string> = {
  announcement: "Announcement",
  job: "Job",
  article: "Article",
};

export function HeaderNotifications({ items, onOpenChange }: Props) {
  const [open, setOpen] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] =
    useState<NotificationItem | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const modalTitleId = useId();
  const hasNotifications = items.length > 0;

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open || activeAnnouncement) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, activeAnnouncement]);

  useEffect(() => {
    if (!activeAnnouncement) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveAnnouncement(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [activeAnnouncement]);

  const openAnnouncement = (item: NotificationItem) => {
    setOpen(false);
    setActiveAnnouncement(item);
  };

  const closeAnnouncement = () => setActiveAnnouncement(null);

  const rowContent = (item: NotificationItem) => {
    const Icon = kindIcon[item.kind];
    return (
      <>
        <span
          className={`${styles.notifyIcon} ${
            item.kind === "announcement" && item.tone
              ? styles[`tone_${item.tone}`]
              : styles[`kind_${item.kind}`]
          }`}
        >
          <Icon size={16} strokeWidth={2} />
        </span>
        <span className={styles.notifyText}>
          <span className={styles.notifyMeta}>
            <em>{kindLabel[item.kind]}</em>
            <time dateTime={item.at.toISOString()}>
              {formatNotificationTime(item.at)}
            </time>
          </span>
          <strong>{item.title}</strong>
          <small>{item.body}</small>
          {item.linkLabel ? (
            <span className={styles.notifyCta}>{item.linkLabel}</span>
          ) : null}
        </span>
      </>
    );
  };

  return (
    <div ref={rootRef} className={styles.notifyRoot}>
      <button
        type="button"
        className={styles.iconBtn}
        aria-label={
          hasNotifications
            ? `Notifications, ${items.length} updates`
            : "Notifications"
        }
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <Bell size={18} strokeWidth={2.2} />
        {hasNotifications ? (
          <span className={styles.badge} aria-hidden />
        ) : null}
      </button>

      {open && (
        <div
          id={panelId}
          className={styles.notifyPanel}
          role="dialog"
          aria-label="Updates"
        >
          <div className={styles.notifyHead}>
            <strong>Updates</strong>
            <span>{items.length} items</span>
          </div>
          {items.length === 0 ? (
            <p className={styles.empty}>No new updates right now.</p>
          ) : (
            <ul className={styles.notifyList}>
              {items.map((item) => (
                <li key={item.id}>
                  {item.kind === "announcement" ? (
                    <button
                      type="button"
                      className={styles.notifyRow}
                      onClick={() => openAnnouncement(item)}
                    >
                      {rowContent(item)}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={styles.notifyRow}
                      onClick={() => setOpen(false)}
                    >
                      {rowContent(item)}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeAnnouncement &&
        createPortal(
          <div
            className={styles.announcementOverlay}
            role="presentation"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeAnnouncement();
            }}
          >
            <div
              className={styles.announcementModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby={modalTitleId}
            >
              <div className={styles.announcementModalHead}>
                <div className={styles.announcementModalMeta}>
                  <em
                    className={
                      activeAnnouncement.tone
                        ? styles[`toneLabel_${activeAnnouncement.tone}`]
                        : undefined
                    }
                  >
                    {kindLabel.announcement}
                  </em>
                  <time dateTime={activeAnnouncement.at.toISOString()}>
                    {formatNotificationTime(activeAnnouncement.at)}
                  </time>
                </div>
                <button
                  type="button"
                  className={styles.announcementClose}
                  aria-label="Close announcement"
                  onClick={closeAnnouncement}
                >
                  <X size={18} strokeWidth={2.2} />
                </button>
              </div>
              <h2 id={modalTitleId} className={styles.announcementTitle}>
                {activeAnnouncement.title}
              </h2>
              <p className={styles.announcementBody}>
                {activeAnnouncement.body}
              </p>
              {activeAnnouncement.linkUrl ? (
                <div className={styles.announcementFooter}>
                  <Link
                    to={activeAnnouncement.linkUrl}
                    className={styles.announcementLink}
                    onClick={closeAnnouncement}
                  >
                    {activeAnnouncement.linkLabel || "Learn more"}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
