# CMS setup (Supabase + Admin)

## 1. Create a Supabase project

1. Create a project at https://supabase.com
2. Open **SQL Editor** and run [`supabase/migrations/20260322000000_cms_phase1.sql`](../supabase/migrations/20260322000000_cms_phase1.sql)
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

Uploads member / case-study / client images and upserts jobs, locations, insights, case studies, clients.

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

## Phase 2 (later)

Awards, certifications, nav/footer, About timeline, Careers FAQs, service-page copy remain in code until migrated.
