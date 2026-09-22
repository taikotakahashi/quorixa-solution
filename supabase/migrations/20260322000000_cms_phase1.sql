-- Phase 1 CMS schema: team, jobs, locations, insights, case studies, clients
-- Apply in Supabase SQL editor or via: supabase db push

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.talent_locations (
  id text primary key,
  name text not null,
  region text not null check (region in ('Americas', 'Europe', 'Asia')),
  flag text not null default '',
  utc_offset text not null default 'UTC',
  x numeric not null default 50,
  y numeric not null default 50,
  open_roles_override int,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  name text not null,
  role text not null default '',
  bio text,
  region text,
  quote text,
  photo_url text,
  kind text not null check (kind in ('team', 'leadership', 'testimonial')),
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.jobs (
  id text primary key,
  title text not null,
  department text not null default '',
  location_label text not null default '',
  type text not null check (type in ('Remote', 'Hybrid', 'On-site')),
  level text not null default '',
  technologies text[] not null default '{}',
  summary text not null default '',
  responsibilities text[] not null default '{}',
  requirements text[] not null default '{}',
  location_id text references public.talent_locations (id) on delete set null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jobs_location_id_idx on public.jobs (location_id);
create index if not exists jobs_published_idx on public.jobs (published);

create table if not exists public.insights (
  id text primary key,
  title text not null,
  excerpt text not null default '',
  category text not null default '',
  section text not null check (section in ('Insights', 'Articles', 'News')),
  tags text[] not null default '{}',
  published_at date,
  read_time text not null default '',
  image_url text,
  content text[] not null default '{}',
  featured boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.case_studies (
  id text primary key,
  title text not null,
  description text not null default '',
  image_url text,
  tags jsonb not null default '[]'::jsonb,
  href text,
  industry text,
  result text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.case_study_details (
  case_study_id text primary key references public.case_studies (id) on delete cascade,
  detail jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.clients (
  id text primary key,
  name text not null,
  logo_url text,
  url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists talent_locations_updated_at on public.talent_locations;
create trigger talent_locations_updated_at
  before update on public.talent_locations
  for each row execute function public.set_updated_at();

drop trigger if exists team_members_updated_at on public.team_members;
create trigger team_members_updated_at
  before update on public.team_members
  for each row execute function public.set_updated_at();

drop trigger if exists jobs_updated_at on public.jobs;
create trigger jobs_updated_at
  before update on public.jobs
  for each row execute function public.set_updated_at();

drop trigger if exists insights_updated_at on public.insights;
create trigger insights_updated_at
  before update on public.insights
  for each row execute function public.set_updated_at();

drop trigger if exists case_studies_updated_at on public.case_studies;
create trigger case_studies_updated_at
  before update on public.case_studies
  for each row execute function public.set_updated_at();

drop trigger if exists case_study_details_updated_at on public.case_study_details;
create trigger case_study_details_updated_at
  before update on public.case_study_details
  for each row execute function public.set_updated_at();

drop trigger if exists clients_updated_at on public.clients;
create trigger clients_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Helper: open role counts (override or linked jobs)
-- ---------------------------------------------------------------------------

create or replace function public.location_open_roles(loc public.talent_locations)
returns int
language sql
stable
as $$
  select coalesce(
    loc.open_roles_override,
    (
      select count(*)::int
      from public.jobs j
      where j.published = true
        and j.location_id = loc.id
    )
  );
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.talent_locations enable row level security;
alter table public.team_members enable row level security;
alter table public.jobs enable row level security;
alter table public.insights enable row level security;
alter table public.case_studies enable row level security;
alter table public.case_study_details enable row level security;
alter table public.clients enable row level security;

-- Public read of published content
create policy "Public read talent_locations"
  on public.talent_locations for select
  using (published = true);

create policy "Public read team_members"
  on public.team_members for select
  using (published = true);

create policy "Public read jobs"
  on public.jobs for select
  using (published = true);

create policy "Public read insights"
  on public.insights for select
  using (published = true);

create policy "Public read case_studies"
  on public.case_studies for select
  using (published = true);

create policy "Public read case_study_details"
  on public.case_study_details for select
  using (
    exists (
      select 1 from public.case_studies cs
      where cs.id = case_study_id and cs.published = true
    )
  );

create policy "Public read clients"
  on public.clients for select
  using (published = true);

-- Authenticated admins: full access (including unpublished)
create policy "Admin all talent_locations"
  on public.talent_locations for all
  to authenticated
  using (true) with check (true);

create policy "Admin all team_members"
  on public.team_members for all
  to authenticated
  using (true) with check (true);

create policy "Admin all jobs"
  on public.jobs for all
  to authenticated
  using (true) with check (true);

create policy "Admin all insights"
  on public.insights for all
  to authenticated
  using (true) with check (true);

create policy "Admin all case_studies"
  on public.case_studies for all
  to authenticated
  using (true) with check (true);

create policy "Admin all case_study_details"
  on public.case_study_details for all
  to authenticated
  using (true) with check (true);

create policy "Admin all clients"
  on public.clients for all
  to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Storage buckets (public read)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values
  ('team', 'team', true),
  ('case-studies', 'case-studies', true),
  ('clients', 'clients', true),
  ('insights', 'insights', true)
on conflict (id) do update set public = excluded.public;

create policy "Public read cms images"
  on storage.objects for select
  using (bucket_id in ('team', 'case-studies', 'clients', 'insights'));

create policy "Admin upload cms images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('team', 'case-studies', 'clients', 'insights'));

create policy "Admin update cms images"
  on storage.objects for update
  to authenticated
  using (bucket_id in ('team', 'case-studies', 'clients', 'insights'));

create policy "Admin delete cms images"
  on storage.objects for delete
  to authenticated
  using (bucket_id in ('team', 'case-studies', 'clients', 'insights'));
