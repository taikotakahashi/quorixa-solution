import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Briefcase, Megaphone, Newspaper } from "lucide-react";
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
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const hasNotifications = items.length > 0;

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
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
  }, [open]);

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
              {items.map((item) => {
                const Icon = kindIcon[item.kind];
                return (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      className={styles.notifyRow}
                      onClick={() => setOpen(false)}
                    >
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
                          <span className={styles.notifyCta}>
                            {item.linkLabel}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
