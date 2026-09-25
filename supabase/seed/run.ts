/**
 * Seed Supabase from current src/data + local assets.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx supabase/seed/run.ts
 *
 * Or put VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env
 */
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { basename, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { detailsById } from "../../src/data/caseStudyDetails.ts";
import { insights } from "../../src/data/insights.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "../..");

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing SUPABASE_URL (or VITE_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY",
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const MEMBER_FILES = [
  "cg.webp",
  "sc.webp",
  "hg.webp",
  "sj.webp",
  "dh.webp",
  "jb.webp",
  "hc.webp",
  "dy.webp",
  "gs.webp",
  "jr.webp",
  "cj.webp",
  "uc.webp",
  "ch.webp",
  "tg.webp",
];

const CLIENT_LOGOS: { id: string; name: string; file: string }[] = [
  { id: "shutterstock", name: "Shutterstock", file: "sh-logo.webp" },
  { id: "asana", name: "Asana", file: "as-logo.webp" },
  { id: "vmware", name: "VMware", file: "vm-logo.webp" },
  { id: "groupon", name: "Groupon", file: "gr-logo.webp" },
  { id: "delivery-hero", name: "Delivery Hero", file: "dh-logo.webp" },
  { id: "netapp", name: "NetApp", file: "na-logo.webp" },
];

const LOCATIONS = [
  { id: "usa", name: "USA", region: "Americas", flag: "🇺🇸", utc_offset: "UTC-5", open_roles_override: 13, x: 22, y: 38 },
  { id: "mexico", name: "Mexico", region: "Americas", flag: "🇲🇽", utc_offset: "UTC-6", open_roles_override: 4, x: 21, y: 49 },
  { id: "argentina", name: "Argentina", region: "Americas", flag: "🇦🇷", utc_offset: "UTC-3", open_roles_override: 3, x: 34, y: 82 },
  { id: "colombia", name: "Colombia", region: "Americas", flag: "🇨🇴", utc_offset: "UTC-5", open_roles_override: 5, x: 26, y: 58 },
  { id: "brazil", name: "Brazil", region: "Americas", flag: "🇧🇷", utc_offset: "UTC-3", open_roles_override: 6, x: 36, y: 72 },
  { id: "guatemala", name: "Guatemala", region: "Americas", flag: "🇬🇹", utc_offset: "UTC-6", open_roles_override: 2, x: 23, y: 54 },
  { id: "poland", name: "Poland", region: "Europe", flag: "🇵🇱", utc_offset: "UTC+1", open_roles_override: 8, x: 52, y: 32 },
  { id: "spain", name: "Spain", region: "Europe", flag: "🇪🇸", utc_offset: "UTC+1", open_roles_override: 5, x: 46, y: 40 },
  { id: "portugal", name: "Portugal", region: "Europe", flag: "🇵🇹", utc_offset: "UTC+0", open_roles_override: 4, x: 44, y: 42 },
  { id: "ukraine", name: "Ukraine", region: "Europe", flag: "🇺🇦", utc_offset: "UTC+2", open_roles_override: 7, x: 56, y: 34 },
  { id: "romania", name: "Romania", region: "Europe", flag: "🇷🇴", utc_offset: "UTC+2", open_roles_override: 3, x: 55, y: 38 },
  { id: "bulgaria", name: "Bulgaria", region: "Europe", flag: "🇧🇬", utc_offset: "UTC+2", open_roles_override: 2, x: 54, y: 40 },
  { id: "slovenia", name: "Slovenia", region: "Europe", flag: "🇸🇮", utc_offset: "UTC+1", open_roles_override: 2, x: 51, y: 38 },
  { id: "slovakia", name: "Slovakia", region: "Europe", flag: "🇸🇰", utc_offset: "UTC+1", open_roles_override: 2, x: 52, y: 36 },
  { id: "india", name: "India", region: "Asia", flag: "🇮🇳", utc_offset: "UTC+5:30", open_roles_override: 9, x: 68, y: 50 },
];

type JobSeed = {
  id: string;
  title: string;
  department: string;
  location_label: string;
  type: "Remote" | "Hybrid" | "On-site";
  level: string;
  technologies: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
  location_id: string | null;
};

async function uploadFile(
  bucket: string,
  objectPath: string,
  absPath: string,
  contentType = "image/webp",
): Promise<string | null> {
  if (!existsSync(absPath)) {
    console.warn(`  skip missing file: ${absPath}`);
    return null;
  }
  const body = readFileSync(absPath);
  const { error } = await supabase.storage.from(bucket).upload(objectPath, body, {
    contentType,
    upsert: true,
  });
  if (error) {
    console.warn(`  upload failed ${bucket}/${objectPath}:`, error.message);
    return null;
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
  return data.publicUrl;
}

function parseCaseStudiesSource(): {
  studies: Array<{
    id: string;
    title: string;
    description: string;
    imageFile: string;
    tags: { label: string; color: string; textColor: string }[];
    href: string;
    industry?: string;
    result?: string;
  }>;
} {
  const src = readFileSync(join(root, "src/data/caseStudies.ts"), "utf8");

  const importMap = new Map<string, string>();
  for (const m of src.matchAll(
    /import\s+(\w+)\s+from\s+"[^"]*project-image\/([^"]+)"/g,
  )) {
    importMap.set(m[1], m[2]);
  }

  const tagDefs: Record<string, { label: string; color: string; textColor: string }> = {};
  const tagBlock = src.match(/const tag = \{([\s\S]*?)\} as const/);
  if (tagBlock) {
    for (const m of tagBlock[1].matchAll(
      /(\w+):\s*\{\s*label:\s*"([^"]+)",\s*color:\s*"([^"]+)",\s*textColor:\s*"([^"]+)"/g,
    )) {
      tagDefs[m[1]] = { label: m[2], color: m[3], textColor: m[4] };
    }
  }

  const studies: ReturnType<typeof parseCaseStudiesSource>["studies"] = [];
  const blocks = [...src.matchAll(/\{\s*id:\s*"([^"]+)",([\s\S]*?)\n\s*\},?/g)];
  for (const block of blocks) {
    const id = block[1];
    if (id.length > 40) continue;
    const body = block[2];
    const title = body.match(/title:\s*"((?:\\.|[^"\\])*)"/)?.[1];
    const description = body.match(/description:\s*"((?:\\.|[^"\\])*)"/)?.[1];
    const imageVar = body.match(/image:\s*(\w+)/)?.[1];
    const href = body.match(/href:\s*"([^"]+)"/)?.[1];
    const industry = body.match(/industry:\s*"([^"]+)"/)?.[1];
    const result = body.match(/result:\s*"([^"]+)"/)?.[1];
    const tagMatch = body.match(/tags:\s*\[([^\]]+)\]/);
    const tags: { label: string; color: string; textColor: string }[] = [];
    if (tagMatch) {
      for (const t of tagMatch[1].matchAll(/tag\.(\w+)/g)) {
        if (tagDefs[t[1]]) tags.push(tagDefs[t[1]]);
      }
    }
    const imageFile = imageVar ? importMap.get(imageVar) : undefined;
    if (!title || !description || !imageFile || !href) continue;
    studies.push({
      id,
      title: title.replace(/\\"/g, '"'),
      description: description.replace(/\\"/g, '"'),
      imageFile,
      tags,
      href,
      industry,
      result,
    });
  }
  return { studies };
}

function loadJobsFromSource(): JobSeed[] {
  // Import jobs without pulling image assets — parse team.ts jobs array
  const src = readFileSync(join(root, "src/data/team.ts"), "utf8");
  const jobsStart = src.indexOf("export const jobs");
  const jobsEnd = src.indexOf("export const teamMembers");
  const chunk = src.slice(jobsStart, jobsEnd);
  const jobs: JobSeed[] = [];
  const blocks = [...chunk.matchAll(/\{\s*id:\s*"([^"]+)",([\s\S]*?)\n\s*\},?/g)];

  const locationGuess: Record<string, string | null> = {
    "sre-1": "poland",
    "fe-1": "portugal",
    "ml-1": "usa",
    "qa-1": "argentina",
    "ux-1": "poland",
    "be-1": null,
  };

  for (const block of blocks) {
    const id = block[1];
    const body = block[2];
    const get = (k: string) => body.match(new RegExp(`${k}:\\s*"((?:\\\\.|[^"\\\\])*)"`))?.[1]?.replace(/\\"/g, '"');
    const getArr = (k: string) => {
      const m = body.match(new RegExp(`${k}:\\s*\\[([\\s\\S]*?)\\]`));
      if (!m) return [] as string[];
      return [...m[1].matchAll(/"((?:\\.|[^"\\])*)"/g)].map((x) => x[1].replace(/\\"/g, '"'));
    };
    const type = get("type") as JobSeed["type"] | undefined;
    if (!type) continue;
    jobs.push({
      id,
      title: get("title") ?? id,
      department: get("department") ?? "",
      location_label: get("location") ?? "",
      type,
      level: get("level") ?? "",
      technologies: getArr("technologies"),
      summary: get("summary") ?? "",
      responsibilities: getArr("responsibilities"),
      requirements: getArr("requirements"),
      location_id: locationGuess[id] ?? null,
    });
  }
  return jobs;
}

async function main() {
  console.log("Seeding Supabase CMS…");

  // --- Locations ---
  const locRows = LOCATIONS.map((l, i) => ({
    ...l,
    sort_order: i,
    published: true,
  }));
  {
    const { error } = await supabase.from("talent_locations").upsert(locRows);
    if (error) throw error;
    console.log(`talent_locations: ${locRows.length}`);
  }

  // --- Member photos ---
  const photoUrls: string[] = [];
  for (let i = 0; i < MEMBER_FILES.length; i++) {
    const file = MEMBER_FILES[i];
    const url = await uploadFile(
      "team",
      file,
      join(root, "src/assets/members", file),
    );
    photoUrls.push(url ?? "");
  }

  // One DB row per person. Roles are fields (team / leadership / quote), not duplicate kinds.
  const people: {
    slug: string;
    name: string;
    region: string;
    photo: number | null;
    teamRole?: string;
    leadershipRole?: string;
    quote?: string;
  }[] = [
    {
      slug: "amelia-chen",
      name: "Amelia Chen",
      region: "Singapore",
      photo: 0,
      teamRole: "Engineering Director",
      leadershipRole: "CEO",
      quote:
        "I joined QUORIXA for the engineering culture. The best part is autonomy to solve hard problems with peers across multiple countries.",
    },
    {
      slug: "marcus-reid",
      name: "Marcus Reid",
      region: "Austin",
      photo: 1,
      teamRole: "Principal Architect",
      leadershipRole: "CTO",
      quote:
        "Ownership is real here. You ship, you learn, and you get mentorship without bureaucracy slowing the work.",
    },
    {
      slug: "sofia-alvarez",
      name: "Sofia Alvarez",
      region: "Madrid",
      photo: 2,
      teamRole: "Head of Design",
      leadershipRole: "Chief Growth Officer",
      quote:
        "Design and engineering collaborate as one team. That partnership is rare — and it shows in the products we deliver.",
    },
    {
      slug: "james-okonkwo",
      name: "James Okonkwo",
      region: "Lagos",
      photo: 3,
      teamRole: "AI Practice Lead",
      leadershipRole: "EVP of Solutions",
      quote:
        "Working on AI programs here means real evaluation discipline — not demos. Clients trust the results because we measure them.",
    },
    {
      slug: "elena-petrova",
      name: "Elena Petrova",
      region: "Warsaw",
      photo: 4,
      teamRole: "QA Lead",
      quote:
        "We treat quality as a product feature, not a gate. That mindset lets us move fast without surprising clients in production.",
    },
    {
      slug: "david-kim",
      name: "David Kim",
      region: "Seoul",
      photo: 5,
      teamRole: "Delivery Manager",
      quote:
        "Having been with QUORIXA for over 10 years, I continue to discover endless opportunities for growth and development. Over this time, QUORIXA has become more than just a workplace — it's a place where I can find help, support others, and become better from day to day!",
    },
    {
      slug: "priya-sharma",
      name: "Priya Sharma",
      region: "Bangalore",
      photo: 6,
      teamRole: "Data Engineering Lead",
    },
    {
      slug: "noah-fischer",
      name: "Noah Fischer",
      region: "Berlin",
      photo: 7,
      teamRole: "Mobile Lead",
    },
    {
      slug: "lina-kowalski",
      name: "Lina Kowalski",
      region: "Europe",
      photo: 8,
      leadershipRole: "CDO & VP of IT",
    },
    {
      slug: "maya-brooks",
      name: "Maya Brooks",
      region: "Americas",
      photo: 9,
      leadershipRole: "VP of Global Delivery",
    },
    {
      slug: "andrei-volkov",
      name: "Andrei Volkov",
      region: "Europe",
      photo: 10,
      leadershipRole: "VP of Engineering",
    },
    {
      slug: "thiago-mendes",
      name: "Thiago Mendes",
      region: "Americas",
      photo: 11,
      leadershipRole: "VP of Engineering",
    },
    {
      slug: "yulia-moroz",
      name: "Yulia Moroz",
      region: "Europe",
      photo: 12,
      leadershipRole: "Head of Engineering Operations",
    },
    {
      slug: "vanessa-ortiz",
      name: "Vanessa Ortiz",
      region: "Americas",
      photo: 13,
      leadershipRole: "Director of People",
    },
    { slug: "helena-sorensen", name: "Helena Sorensen", region: "Europe", photo: null, leadershipRole: "CFO" },
    { slug: "olivia-grant", name: "Olivia Grant", region: "Americas", photo: null, leadershipRole: "VP of Recruiting" },
    { slug: "daniel-ortiz", name: "Daniel Ortiz", region: "Americas", photo: null, leadershipRole: "Head of Partnerships" },
    { slug: "dania-kravets", name: "Dania Kravets", region: "Europe", photo: null, leadershipRole: "Director of Product Development" },
    { slug: "francisco-lima", name: "Francisco Lima", region: "Americas", photo: null, leadershipRole: "Director of Recruiting" },
    { slug: "stepan-bondar", name: "Stepan Bondar", region: "Europe", photo: null, leadershipRole: "Director of Engineering" },
    { slug: "yulia-moise", name: "Yulia Moise", region: "Europe", photo: null, leadershipRole: "Director of Marketing Operations" },
    { slug: "kapil-nair", name: "Kapil Nair", region: "Asia", photo: null, leadershipRole: "Director of Engineering" },
    { slug: "carlos-diaz", name: "Carlos Diaz", region: "Americas", photo: null, leadershipRole: "Legal Counsel" },
  ];

  const { serializePersonMeta } = await import("../../shared/personMeta.ts");

  // Clear & reinsert people (one row each)
  await supabase.from("team_members").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  const memberRows = people.map((p, i) => {
    const teamRole = p.teamRole ?? null;
    const leadershipRole = p.leadershipRole ?? null;
    return {
      slug: p.slug,
      name: p.name,
      role: teamRole || leadershipRole || "",
      region: p.region,
      quote: p.quote ?? null,
      photo_url: p.photo != null ? photoUrls[p.photo] || null : null,
      // Legacy kind for older admin filters: prefer team when both exist
      kind: (teamRole ? "team" : "leadership") as "team" | "leadership",
      bio: serializePersonMeta({
        leadershipRole: leadershipRole || undefined,
        bioText: "",
      }),
      sort_order: i,
      published: true,
    };
  });
  {
    const { error } = await supabase.from("team_members").insert(memberRows);
    if (error) throw error;
    console.log(`team_members: ${memberRows.length} people (1 row each)`);
  }

  // --- Feedback (quotes only; photo/name must match the person row) ---
  {
    await supabase.from("feedback").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    const rows = people
      .filter((p) => p.quote && p.teamRole)
      .map((p, i) => ({
        author_name: p.name,
        author_role: p.teamRole!,
        author_type: "team" as const,
        quote: p.quote!,
        location: p.region,
        photo_url: p.photo != null ? photoUrls[p.photo] || null : null,
        status: "approved" as const,
        sort_order: i,
        published: true,
      }));
    const { error } = await supabase.from("feedback").insert(rows);
    if (error) {
      console.warn(`feedback skipped: ${error.message}`);
    } else {
      console.log(`feedback: ${rows.length}`);
    }
  }

  // --- Jobs ---
  const jobs = loadJobsFromSource();
  {
    const rows = jobs.map((j, i) => ({
      id: j.id,
      title: j.title,
      department: j.department,
      location_label: j.location_label,
      type: j.type,
      level: j.level,
      technologies: j.technologies,
      summary: j.summary,
      responsibilities: j.responsibilities,
      requirements: j.requirements,
      location_id: j.location_id,
      sort_order: i,
      published: true,
    }));
    const { error } = await supabase.from("jobs").upsert(rows);
    if (error) throw error;
    console.log(`jobs: ${rows.length}`);
  }

  // --- Insights ---
  {
    const rows = insights.map((ins, i) => {
      const parsed = Date.parse(ins.date);
      return {
        id: ins.id,
        title: ins.title,
        excerpt: ins.excerpt,
        category: ins.category,
        section: ins.section,
        tags: ins.tags,
        published_at: Number.isNaN(parsed)
          ? null
          : new Date(parsed).toISOString().slice(0, 10),
        read_time: ins.readTime,
        image_url: ins.image,
        content: ins.content,
        featured: !!ins.featured,
        sort_order: i,
        published: true,
      };
    });
    const { error } = await supabase.from("insights").upsert(rows);
    if (error) throw error;
    console.log(`insights: ${rows.length}`);
  }

  // --- Case studies ---
  const { studies } = parseCaseStudiesSource();
  for (let i = 0; i < studies.length; i++) {
    const s = studies[i];
    const imageUrl = await uploadFile(
      "case-studies",
      `${s.id}${s.imageFile.endsWith(".webp") ? ".webp" : basename(s.imageFile)}`,
      join(root, "src/assets/project-image", s.imageFile),
    );
    const { error } = await supabase.from("case_studies").upsert({
      id: s.id,
      title: s.title,
      description: s.description,
      image_url: imageUrl,
      tags: s.tags,
      href: s.href,
      industry: s.industry ?? null,
      result: s.result ?? null,
      sort_order: i,
      published: true,
    });
    if (error) throw error;
  }
  console.log(`case_studies: ${studies.length}`);

  // --- Case study details ---
  {
    const rows = Object.entries(detailsById).map(([id, detail]) => ({
      case_study_id: id,
      detail,
    }));
    const { error } = await supabase.from("case_study_details").upsert(rows);
    if (error) throw error;
    console.log(`case_study_details: ${rows.length}`);
  }

  // --- Clients ---
  for (let i = 0; i < CLIENT_LOGOS.length; i++) {
    const c = CLIENT_LOGOS[i];
    const logoUrl = await uploadFile(
      "clients",
      c.file,
      join(root, "src/assets/logo-slider", c.file),
    );
    const { error } = await supabase.from("clients").upsert({
      id: c.id,
      name: c.name,
      logo_url: logoUrl,
      sort_order: i,
      published: true,
    });
    if (error) throw error;
  }
  console.log(`clients: ${CLIENT_LOGOS.length}`);

  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
