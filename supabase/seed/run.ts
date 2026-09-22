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
  "su.webp",
  "dh.webp",
  "jb.webp",
  "hc.webp",
  "dy.webp",
  "gs.webp",
  "jr.webp",
  "cj.webp",
  "uc.webp",
  "sj.webp",
  "ch.webp",
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

  const teamMembers = [
    { name: "Amelia Chen", role: "Engineering Director", kind: "team", photo: 0 },
    { name: "Marcus Reid", role: "Principal Architect", kind: "team", photo: 1 },
    { name: "Sofia Alvarez", role: "Head of Design", kind: "team", photo: 2 },
    { name: "James Okonkwo", role: "AI Practice Lead", kind: "team", photo: 3 },
    { name: "Elena Petrova", role: "QA Lead", kind: "team", photo: 4 },
    { name: "David Kim", role: "Delivery Manager", kind: "team", photo: 5 },
    { name: "Priya Sharma", role: "Data Engineering Lead", kind: "team", photo: 6 },
    { name: "Noah Fischer", role: "Mobile Lead", kind: "team", photo: 7 },
  ];

  const leadership = [
    { name: "Amelia Chen", role: "CEO", region: "USA", photo: 0 },
    { name: "Marcus Reid", role: "CTO", region: "USA", photo: 10 },
    { name: "Sofia Alvarez", role: "Chief Growth Officer", region: "Americas", photo: 2 },
    { name: "Elena Petrova", role: "CFO", region: "Europe", photo: 3 },
    { name: "James Okonkwo", role: "EVP of Solutions", region: "Americas", photo: 4 },
    { name: "Priya Sharma", role: "VP of Recruiting", region: "Americas", photo: 5 },
    { name: "David Kim", role: "VP of Engineering", region: "USA", photo: 6 },
    { name: "Noah Fischer", role: "Head of Partnerships", region: "Americas", photo: 7 },
    { name: "Lina Kowalski", role: "CDO & VP of IT", region: "Europe", photo: 8 },
    { name: "Maya Brooks", role: "VP of Global Delivery", region: "Americas", photo: 9 },
    { name: "Andrei Volkov", role: "VP of Engineering", region: "Europe", photo: 1 },
    { name: "Thiago Mendes", role: "VP of Engineering", region: "Americas", photo: 11 },
    { name: "Yulia Moroz", role: "Head of Engineering Operations", region: "Europe", photo: 12 },
    { name: "Vanessa Ortiz", role: "Director of People", region: "Americas", photo: 13 },
    { name: "Dania Kravets", role: "Director of Product Development", region: "Europe", photo: null },
    { name: "Francisco Lima", role: "Director of Recruiting", region: "Americas", photo: null },
    { name: "Stepan Bondar", role: "Director of Engineering", region: "Europe", photo: null },
    { name: "Yulia Moise", role: "Director of Marketing Operations", region: "Europe", photo: null },
    { name: "Kapil Nair", role: "Director of Engineering", region: "Asia", photo: null },
    { name: "Carlos Diaz", role: "Legal Counsel", region: "Americas", photo: null },
  ];

  const testimonials = [
    {
      name: "Amelia Chen",
      role: "Engineering Director",
      region: "Singapore",
      quote:
        "I joined QUORIXA for the engineering culture. The best part is autonomy to solve hard problems with peers across multiple countries.",
      photo: 0,
    },
    {
      name: "Marcus Reid",
      role: "Principal Architect",
      region: "Austin",
      quote:
        "Ownership is real here. You ship, you learn, and you get mentorship without bureaucracy slowing the work.",
      photo: 1,
    },
    {
      name: "Sofia Alvarez",
      role: "Head of Design",
      region: "Madrid",
      quote:
        "Design and engineering collaborate as one team. That partnership is rare — and it shows in the products we deliver.",
      photo: 2,
    },
  ];

  // Clear & reinsert team (stable slugs)
  await supabase.from("team_members").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  const memberRows = [
    ...teamMembers.map((m, i) => ({
      slug: `team-${i + 1}`,
      name: m.name,
      role: m.role,
      kind: "team" as const,
      photo_url: photoUrls[m.photo] || null,
      sort_order: i,
      published: true,
    })),
    ...leadership.map((m, i) => ({
      slug: `lead-${i + 1}`,
      name: m.name,
      role: m.role,
      region: m.region,
      kind: "leadership" as const,
      photo_url: m.photo != null ? photoUrls[m.photo] || null : null,
      sort_order: i,
      published: true,
    })),
    ...testimonials.map((m, i) => ({
      slug: `testimonial-${i + 1}`,
      name: m.name,
      role: m.role,
      region: m.region,
      quote: m.quote,
      kind: "testimonial" as const,
      photo_url: photoUrls[m.photo] || null,
      sort_order: i,
      published: true,
    })),
  ];
  {
    const { error } = await supabase.from("team_members").insert(memberRows);
    if (error) throw error;
    console.log(`team_members: ${memberRows.length}`);
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
