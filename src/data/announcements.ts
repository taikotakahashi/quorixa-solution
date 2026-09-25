export type AnnouncementTone = "info" | "highlight" | "urgent";

export type Announcement = {
  id: string;
  title: string;
  body: string;
  linkLabel?: string;
  linkUrl?: string;
  tone: AnnouncementTone;
  startsAt?: string;
  endsAt?: string;
  /** Best timestamp for “when this went live” in the notification panel */
  publishedAt: string;
  sortOrder: number;
};

/**
 * Offline fallback when CMS is not configured.
 * Production announcements live in `public.announcements` (admin-managed).
 */
export const announcements: Announcement[] = [
  {
    id: "a0000000-0000-4000-8000-000000000001",
    title: "Expanded engineering office hours",
    body: "Starting this week, senior architects host open office hours every Tuesday for client squads.",
    linkLabel: "About us",
    linkUrl: "/about",
    tone: "highlight",
    publishedAt: "2026-09-25T09:00:00.000Z",
    sortOrder: 0,
  },
  {
    id: "a0000000-0000-4000-8000-000000000002",
    title: "New AI delivery playbook released",
    body: "Our AI practice published an internal playbook for evaluation harnesses and go/no-go criteria.",
    linkLabel: "AI & ML",
    linkUrl: "/ai-ml",
    tone: "info",
    publishedAt: "2026-09-24T15:30:00.000Z",
    sortOrder: 1,
  },
];
