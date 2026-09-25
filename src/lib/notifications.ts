import type { Announcement, AnnouncementTone } from "../data/announcements";
import type { Insight } from "../data/insights";
import type { Job } from "../data/team";

export type NotificationKind = "announcement" | "job" | "article";

export type NotificationItem = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  href: string;
  at: Date;
  tone?: AnnouncementTone;
  linkLabel?: string;
  /** Present when admin set an optional CTA URL on the announcement */
  linkUrl?: string;
};

export const DAY_MS = 24 * 60 * 60 * 1000;

/** Windows for the header notification feed. */
export const NOTIFICATION_WINDOWS = {
  announcement: 1 * DAY_MS,
  job: 2 * DAY_MS,
  article: 1 * DAY_MS,
} as const;

const KIND_RANK: Record<NotificationKind, number> = {
  announcement: 0,
  job: 1,
  article: 2,
};

function parseInsightDate(date: string): Date | null {
  const parsed = Date.parse(date);
  if (!Number.isNaN(parsed)) return new Date(parsed);
  return null;
}

export function sortNotifications(items: NotificationItem[]): NotificationItem[] {
  return [...items].sort((a, b) => {
    const byKind = KIND_RANK[a.kind] - KIND_RANK[b.kind];
    if (byKind !== 0) return byKind;
    return b.at.getTime() - a.at.getTime();
  });
}

function withinWindow(at: Date, windowMs: number, now: Date): boolean {
  if (Number.isNaN(at.getTime())) return false;
  return at.getTime() >= now.getTime() - windowMs;
}

/**
 * Build the header notification feed from database-backed records only.
 * Callers must pass CMS/DB rows — never static marketing fallbacks.
 *
 * Rules:
 * - Admin announcements: submitted within last 1 day (and published in DB)
 * - Jobs: posted within last 2 days
 * - Articles: published within last 1 day
 */
export function buildNotifications(input: {
  jobs: Job[];
  insights: Insight[];
  announcements: Announcement[];
  now?: Date;
}): NotificationItem[] {
  const now = input.now ?? new Date();
  const items: NotificationItem[] = [];

  for (const ann of input.announcements) {
    const at = new Date(ann.publishedAt);
    if (!withinWindow(at, NOTIFICATION_WINDOWS.announcement, now)) continue;
    items.push({
      id: ann.id,
      kind: "announcement",
      title: ann.title,
      body: ann.body,
      href: ann.linkUrl || "/about",
      at,
      tone: ann.tone,
      linkLabel: ann.linkLabel,
      linkUrl: ann.linkUrl,
    });
  }

  for (const job of input.jobs) {
    if (!job.postedAt) continue;
    const at = new Date(job.postedAt);
    if (!withinWindow(at, NOTIFICATION_WINDOWS.job, now)) continue;
    items.push({
      id: `job-${job.id}`,
      kind: "job",
      title: `New role: ${job.title}`,
      body: `${job.department} · ${job.location}`,
      href: `/careers/${job.id}`,
      at,
    });
  }

  for (const article of input.insights) {
    const at = article.publishedAt
      ? new Date(article.publishedAt)
      : parseInsightDate(article.date);
    if (!at || !withinWindow(at, NOTIFICATION_WINDOWS.article, now)) continue;
    items.push({
      id: `article-${article.id}`,
      kind: "article",
      title: article.title,
      body: article.excerpt,
      href: `/insights/${article.id}`,
      at,
    });
  }

  return sortNotifications(items);
}

export function formatNotificationTime(at: Date, now = new Date()): string {
  const diff = now.getTime() - at.getTime();
  const hours = Math.floor(diff / (60 * 60 * 1000));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}
