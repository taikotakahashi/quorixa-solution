import type { CaseStudy } from "../data/caseStudies";
import type { Insight } from "../data/insights";
import type { Job, LeadershipMember } from "../data/team";

export type SearchKind =
  | "job"
  | "article"
  | "team"
  | "leadership"
  | "case-study";

export type SearchHit = {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  href: string;
  haystack: string;
};

export type SearchIndex = SearchHit[];

export type SearchResult = Omit<SearchHit, "haystack">;

type TeamMember = { name: string; role: string; image: string };

const KIND_LABEL: Record<SearchKind, string> = {
  job: "Job",
  article: "Article",
  team: "Team",
  leadership: "Leadership",
  "case-study": "Case study",
};

export function searchKindLabel(kind: SearchKind): string {
  return KIND_LABEL[kind];
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function pack(...parts: Array<string | undefined | null>): string {
  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function buildSearchIndex(input: {
  jobs: Job[];
  insights: Insight[];
  team: TeamMember[];
  leadership: LeadershipMember[];
  caseStudies: CaseStudy[];
}): SearchIndex {
  const hits: SearchHit[] = [];

  for (const job of input.jobs) {
    hits.push({
      id: `job-${job.id}`,
      kind: "job",
      title: job.title,
      subtitle: `${job.department} · ${job.location}`,
      href: `/careers/${job.id}`,
      haystack: pack(
        job.title,
        job.department,
        job.location,
        job.level,
        job.type,
        job.summary,
        ...job.technologies,
      ),
    });
  }

  for (const article of input.insights) {
    hits.push({
      id: `article-${article.id}`,
      kind: "article",
      title: article.title,
      subtitle: `${article.category} · ${article.date}`,
      href: `/insights/${article.id}`,
      haystack: pack(
        article.title,
        article.excerpt,
        article.category,
        article.section,
        ...article.tags,
        ...article.content,
      ),
    });
  }

  for (const member of input.team) {
    hits.push({
      id: `team-${slug(member.name)}`,
      kind: "team",
      title: member.name,
      subtitle: member.role,
      href: "/about",
      haystack: pack(member.name, member.role, "developer", "team"),
    });
  }

  for (const leader of input.leadership) {
    hits.push({
      id: `leadership-${slug(leader.name)}`,
      kind: "leadership",
      title: leader.name,
      subtitle: `${leader.role} · ${leader.region}`,
      href: "/leadership",
      haystack: pack(leader.name, leader.role, leader.region, "leadership"),
    });
  }

  for (const study of input.caseStudies) {
    hits.push({
      id: `case-${study.id}`,
      kind: "case-study",
      title: study.title,
      subtitle: study.industry || study.tags.map((t) => t.label).join(" · "),
      href: study.href || `/our-work/${study.id}`,
      haystack: pack(
        study.title,
        study.description,
        study.industry,
        study.result,
        ...study.tags.map((t) => t.label),
      ),
    });
  }

  return hits;
}

export function searchSite(
  query: string,
  index: SearchIndex,
  limit = 8,
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const tokens = q.split(/\s+/).filter(Boolean);
  const scored: Array<SearchResult & { score: number }> = [];

  for (const hit of index) {
    let score = 0;
    const title = hit.title.toLowerCase();
    if (title.includes(q)) score += 12;
    if (title.startsWith(q)) score += 6;
    for (const token of tokens) {
      if (hit.haystack.includes(token)) score += 3;
      else {
        score = 0;
        break;
      }
    }
    if (score > 0) {
      scored.push({
        id: hit.id,
        kind: hit.kind,
        title: hit.title,
        subtitle: hit.subtitle,
        href: hit.href,
        score,
      });
    }
  }

  return scored
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit)
    .map(({ score: _score, ...rest }) => rest);
}
