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
  InsightRow,
  JobRow,
  TalentLocationRow,
  TeamMemberRow,
} from "../../../shared/cms-types";

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
  const sb = getSupabase();
  if (!sb || !isCmsConfigured) return staticTeam;
  const { data, error } = await sb
    .from("team_members")
    .select("*")
    .eq("kind", "team")
    .eq("published", true)
    .order("sort_order");
  if (error || !data?.length) return staticTeam;
  return (data as TeamMemberRow[]).map((m) => ({
    name: m.name,
    role: m.role,
    image: m.photo_url ?? "",
  }));
}

export async function getLeadershipTeam(): Promise<LeadershipMember[]> {
  const sb = getSupabase();
  if (!sb || !isCmsConfigured) return staticLeadership;
  const { data, error } = await sb
    .from("team_members")
    .select("*")
    .eq("kind", "leadership")
    .eq("published", true)
    .order("sort_order");
  if (error || !data?.length) return staticLeadership;
  return (data as TeamMemberRow[]).map((m) => ({
    name: m.name,
    role: m.role,
    region: m.region ?? "",
    image: m.photo_url ?? undefined,
  }));
}

export async function getEmployeeTestimonials() {
  const sb = getSupabase();
  if (!sb || !isCmsConfigured) return staticTestimonials;
  const { data, error } = await sb
    .from("team_members")
    .select("*")
    .eq("kind", "testimonial")
    .eq("published", true)
    .order("sort_order");
  if (error || !data?.length) return staticTestimonials;
  return (data as TeamMemberRow[]).map((m) => ({
    quote: m.quote ?? "",
    name: m.name,
    role: m.role,
    location: m.region ?? "",
    image: m.photo_url ?? "",
  }));
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
