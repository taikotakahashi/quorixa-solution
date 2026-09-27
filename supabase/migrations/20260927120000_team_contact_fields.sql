-- Public contact channels for team / leadership cards on the marketing site.

alter table public.team_members
  add column if not exists linkedin_url text,
  add column if not exists email text,
  add column if not exists phone text;

comment on column public.team_members.linkedin_url is 'Public LinkedIn profile URL';
comment on column public.team_members.email is 'Public contact email (optional)';
comment on column public.team_members.phone is 'Public contact phone (optional)';
