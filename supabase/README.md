# CMS setup (Supabase + Admin)

## 1. Create a Supabase project

1. Create a project at https://supabase.com
2. Open **SQL Editor** and run migrations in order:
   - [`supabase/migrations/20260322000000_cms_phase1.sql`](../supabase/migrations/20260322000000_cms_phase1.sql)
   - [`supabase/migrations/20260925150000_normalize_people.sql`](../supabase/migrations/20260925150000_normalize_people.sql)
   - [`supabase/migrations/20260925200000_announcements.sql`](../supabase/migrations/20260925200000_announcements.sql) (skip if already applied)
   - [`supabase/migrations/20260927120000_team_contact_fields.sql`](../supabase/migrations/20260927120000_team_contact_fields.sql)
3. **Authentication → Users**: create an admin user (email + password). Disable public signups if enabled.
4. Copy **Project URL** and **anon public** key from **Project Settings → API**
5. Copy **service_role** key for seeding only (never put in the browser)

## 2. Environment variables

Root (public marketing site) — add to `.env` / Vercel:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Admin app — `admin/.env`:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Seed (local only):

```
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 3. Seed existing content

```bash
npm run cms:seed
```

Uploads member / case-study / client images and upserts jobs, locations, insights, case studies, clients, and **announcements**.

## 4. Run locally

```bash
# Marketing site (port 5173)
npm run dev

# Admin (port 5174)
npm run admin:dev
```

Without Supabase env vars, the public site **falls back** to hardcoded `src/data/*`.

## 5. Deploy

| App | Vercel root directory | Notes |
|-----|----------------------|--------|
| Public site | `/` (repo root) | Existing project; add `VITE_SUPABASE_*` env vars and redeploy |
| Admin | `admin` | New Vercel project; SPA rewrite via `admin/vercel.json`; same `VITE_SUPABASE_*` |

Recommended: `admin.yourdomain.com` for the admin project.

## 6. Rollout checklist

- [ ] Migration applied
- [ ] Admin user created
- [ ] Env vars set on both Vercel projects
- [ ] `npm run cms:seed` succeeded
- [ ] Admin login works; create/edit/delete a job
- [ ] Public site shows updated content when env vars are set
- [ ] Confirm unpublished rows are hidden on the public site

## Troubleshooting: Admin shows “No people found”

Usually one of:

1. **Missing columns** — `team_role` / `leadership_role` were never created. In **Supabase → SQL Editor**, run:

```sql
alter table public.team_members
  add column if not exists team_role text,
  add column if not exists leadership_role text;
```

   (Full file: [`20260925150000_normalize_people.sql`](./migrations/20260925150000_normalize_people.sql).)

2. **Empty table** — seed failed earlier because of (1). After adding columns:

```bash
npm run cms:seed
```

3. **Wrong project env** — admin `.env` / Vercel must use the same `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` as the public site.

Without Supabase env vars, the public site **falls back** to hardcoded `src/data/*`. Admin has no fallback and will show empty.

## Phase 2 (later)

Awards, certifications, nav/footer, About timeline, Careers FAQs, service-page copy remain in code until migrated.
