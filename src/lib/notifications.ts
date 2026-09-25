import {
  announcements as staticAnnouncements,
  type Announcement,
  type AnnouncementTone,
} from "../data/announcements";
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
};

const DAY_MS = 24 * 60 * 60 * 1000;

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

function sortNotifications(items: NotificationItem[]): NotificationItem[] {
  return items.sort((a, b) => {
    const byKind = KIND_RANK[a.kind] - KIND_RANK[b.kind];
    if (byKind !== 0) return byKind;
    return b.at.getTime() - a.at.getTime();
  });
}

/**
 * Build the header notification feed.
 * Announcements come from `public.announcements` (via CMS).
 * Jobs (≤2 days) and articles (≤1 day) come from their CMS tables.
 */
export function buildNotifications(input: {
  jobs: Job[];
  insights: Insight[];
  announcements?: Announcement[];
  now?: Date;
}): NotificationItem[] {
  const now = input.now ?? new Date();
  const items: NotificationItem[] = [];

  for (const ann of input.announcements ?? staticAnnouncements) {
    items.push({
      id: ann.id,
      kind: "announcement",
      title: ann.title,
      body: ann.body,
      href: ann.linkUrl || "/about",
      at: new Date(ann.publishedAt),
      tone: ann.tone,
      linkLabel: ann.linkLabel,
    });
  }

  const jobCutoff = now.getTime() - 2 * DAY_MS;
  for (const job of input.jobs) {
    if (!job.postedAt) continue;
    const at = new Date(job.postedAt);
    if (Number.isNaN(at.getTime()) || at.getTime() < jobCutoff) continue;
    items.push({
      id: `job-${job.id}`,
      kind: "job",
      title: `New role: ${job.title}`,
      body: `${job.department} · ${job.location}`,
      href: `/careers/${job.id}`,
      at,
    });
  }

  const articleCutoff = now.getTime() - 1 * DAY_MS;
  for (const article of input.insights) {
    const at = article.publishedAt
      ? new Date(article.publishedAt)
      : parseInsightDate(article.date);
    if (!at || Number.isNaN(at.getTime()) || at.getTime() < articleCutoff) {
      continue;
    }
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
