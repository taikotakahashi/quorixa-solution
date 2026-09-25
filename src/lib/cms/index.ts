import { getSupabase, isCmsConfigured } from "../supabase";
import {
  jobs as staticJobs,
  teamMembers as staticTeam,
  leadershipTeam as staticLeadership,
  employeeTestimonials as staticTestimonials,
  type Job,
  type LeadershipMember,
} from "../../data/team";
import {
  talentLocations as staticLocations,
  type TalentLocation,
} from "../../data/careers";
import { insights as staticInsights, type Insight } from "../../data/insights";
import { caseStudies as staticCaseStudies, type CaseStudy } from "../../data/caseStudies";
import {
  detailsById as staticDetails,
  fallbackDetail,
  type StudyDetail,
} from "../../data/caseStudyDetails";
import { clients as staticClients, type ClientLogo } from "../../data/content";
import type {
  CaseStudyRow,
  ClientRow,
  FeedbackRow,
  InsightRow,
  JobRow,
  TalentLocationRow,
  TeamMemberRow,
} from "../../../shared/cms-types";
import { parsePersonMeta } from "../../../shared/personMeta";

type PersonRecord = {
  name: string;
  region: string;
  photo: string;
  teamRole?: string;
  leadershipRole?: string;
  quote?: string;
  sort_order: number;
};

function personFromRow(row: TeamMemberRow): PersonRecord {
  const meta = parsePersonMeta(row.bio);
  const teamRole =
    (row as TeamMemberRow & { team_role?: string | null }).team_role ||
    (row.kind === "team" ? row.role : undefined) ||
    undefined;
  const leadershipRole =
    (row as TeamMemberRow & { leadership_role?: string | null })
      .leadership_role ||
    meta.leadershipRole ||
    (row.kind === "leadership" ? row.role : undefined) ||
    undefined;

  return {
    name: row.name,
    region: row.region ?? meta.bioText ?? "",
    photo: row.photo_url ?? "",
    teamRole: teamRole || undefined,
    leadershipRole: leadershipRole || undefined,
    quote: row.quote || undefined,
    sort_order: row.sort_order ?? 0,
  };
}

/** Merge legacy multi-kind rows so each person appears once. */
function mergePeople(rows: TeamMemberRow[]): PersonRecord[] {
  const byName = new Map<string, PersonRecord>();
  for (const row of rows) {
    const next = personFromRow(row);
    const key = next.name.trim().toLowerCase();
    const prev = byName.get(key);
    if (!prev) {
      byName.set(key, next);
      continue;
    }
    byName.set(key, {
      name: prev.name || next.name,
      region: prev.region || next.region,
      // Prefer a photo already on file; do not let a later kind overwrite with a different face
      photo: prev.photo || next.photo,
      teamRole: prev.teamRole || next.teamRole,
      leadershipRole: prev.leadershipRole || next.leadershipRole,
      quote: prev.quote || next.quote,
      sort_order: Math.min(prev.sort_order, next.sort_order),
    });
  }
  return [...byName.values()].sort((a, b) => a.sort_order - b.sort_order);
}

async function loadPeople(): Promise<PersonRecord[] | null> {
  const sb = getSupabase();
  if (!sb || !isCmsConfigured) return null;
  const { data, error } = await sb
    .from("team_members")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error || !data?.length) return null;
  return mergePeople(data as TeamMemberRow[]);
}

function mapJob(row: JobRow): Job {
  return {
    id: row.id,
    title: row.title,
    department: row.department,
    location: row.location_label,
    type: row.type,
    level: row.level,
    technologies: row.technologies ?? [],
    summary: row.summary,
    responsibilities: row.responsibilities ?? [],
    requirements: row.requirements ?? [],
  };
}

function mapLocation(
  row: TalentLocationRow & { open_roles?: number },
): TalentLocation {
  return {
    id: row.id,
    name: row.name,
    region: row.region,
    flag: row.flag,
    utcOffset: row.utc_offset,
    openRoles: row.open_roles_override ?? row.open_roles ?? 0,
    x: Number(row.x),
    y: Number(row.y),
  };
}

function mapInsight(row: InsightRow): Insight {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    section: row.section,
    tags: row.tags ?? [],
    date: row.published_at
      ? new Date(row.published_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "",
    readTime: row.read_time,
    image: row.image_url ?? "",
    content: row.content ?? [],
    featured: row.featured,
  };
}

function mapCaseStudy(row: CaseStudyRow): CaseStudy {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image_url ?? "",
    tags: (row.tags ?? []) as CaseStudy["tags"],
    href: row.href ?? `/our-work/${row.id}`,
    industry: row.industry ?? undefined,
    result: row.result ?? undefined,
  };
}

export async function getJobs(): Promise<Job[]> {
  const sb = getSupabase();
  if (!sb || !isCmsConfigured) return staticJobs;
  const { data, error } = await sb
    .from("jobs")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error || !data?.length) return staticJobs;
  return (data as JobRow[]).map(mapJob);
}

export async function getJob(id: string): Promise<Job | undefined> {
  const all = await getJobs();
  return all.find((j) => j.id === id);
}

export async function getTalentLocations(): Promise<TalentLocation[]> {
  const sb = getSupabase();
  if (!sb || !isCmsConfigured) return staticLocations;
  const { data, error } = await sb
    .from("talent_locations")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error || !data?.length) return staticLocations;

  const { data: jobs } = await sb
    .from("jobs")
    .select("location_id")
    .eq("published", true);

  const counts = new Map<string, number>();
  for (const j of jobs ?? []) {
    if (!j.location_id) continue;
    counts.set(j.location_id, (counts.get(j.location_id) ?? 0) + 1);
  }

  return (data as TalentLocationRow[]).map((row) =>
    mapLocation({
      ...row,
      open_roles: row.open_roles_override ?? counts.get(row.id) ?? 0,
    }),
  );
}

export async function getTeamMembers(): Promise<
  { name: string; role: string; image: string }[]
> {
  const people = await loadPeople();
  if (!people) return staticTeam;
  const team = people
    .filter((p) => p.teamRole)
    .map((p) => ({
      name: p.name,
      role: p.teamRole!,
      image: p.photo,
    }));
  return team.length ? team : staticTeam;
}

export async function getLeadershipTeam(): Promise<LeadershipMember[]> {
  const people = await loadPeople();
  if (!people) return staticLeadership;
  const leaders = people
    .filter((p) => p.leadershipRole)
    .map((p) => ({
      name: p.name,
      role: p.leadershipRole!,
      region: p.region,
      image: p.photo || undefined,
    }));
  return leaders.length ? leaders : staticLeadership;
}

export async function getEmployeeTestimonials() {
  const sb = getSupabase();
  if (!sb || !isCmsConfigured) return staticTestimonials;

  const { data: feedback, error: feedbackError } = await sb
    .from("feedback")
    .select("*")
    .eq("status", "approved")
    .eq("published", true)
    .order("sort_order");

  if (!feedbackError && feedback?.length) {
    // Dedupe by author name; prefer first approved row
    const seen = new Set<string>();
    const items = [];
    for (const row of feedback as FeedbackRow[]) {
      const key = row.author_name.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({
        quote: row.quote,
        name: row.author_name,
        role: row.author_role,
        location: row.location ?? "",
        image: row.photo_url ?? "",
      });
    }
    if (items.length) return items;
  }

  const people = await loadPeople();
  if (!people) return staticTestimonials;
  const fromPeople = people
    .filter((p) => p.quote && p.teamRole)
    .map((p) => ({
      quote: p.quote!,
      name: p.name,
      role: p.teamRole!,
      location: p.region,
      image: p.photo,
    }));
  return fromPeople.length ? fromPeople : staticTestimonials;
}

export async function getMemberPhotos(): Promise<string[]> {
  const members = await getTeamMembers();
  const photos = members.map((m) => m.image).filter(Boolean);
  if (photos.length) return photos;
  return staticTeam.map((m) => m.image);
}

export async function getInsights(): Promise<Insight[]> {
  const sb = getSupabase();
  if (!sb || !isCmsConfigured) return staticInsights;
  const { data, error } = await sb
    .from("insights")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error || !data?.length) return staticInsights;
  return (data as InsightRow[]).map(mapInsight);
}

export async function getInsight(id: string): Promise<Insight | undefined> {
  const all = await getInsights();
  return all.find((i) => i.id === id);
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const sb = getSupabase();
  if (!sb || !isCmsConfigured) return staticCaseStudies;
  const { data, error } = await sb
    .from("case_studies")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error || !data?.length) return staticCaseStudies;
  return (data as CaseStudyRow[]).map(mapCaseStudy);
}

export async function getCaseStudy(id: string): Promise<CaseStudy | undefined> {
  const all = await getCaseStudies();
  return all.find((c) => c.id === id);
}

export async function getCaseStudyDetail(id: string): Promise<StudyDetail> {
  const sb = getSupabase();
  if (sb && isCmsConfigured) {
    const { data } = await sb
      .from("case_study_details")
      .select("detail")
      .eq("case_study_id", id)
      .maybeSingle();
    if (data?.detail) return data.detail as StudyDetail;
  }
  return staticDetails[id] ?? fallbackDetail();
}

export async function getClients(): Promise<ClientLogo[]> {
  const sb = getSupabase();
  if (!sb || !isCmsConfigured) return staticClients;
  const { data, error } = await sb
    .from("clients")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error || !data?.length) return staticClients;
  return (data as ClientRow[]).map((c) => ({
    id: c.id,
    name: c.name,
    src: c.logo_url ?? "",
  }));
}
