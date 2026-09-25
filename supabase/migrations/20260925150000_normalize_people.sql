-- Normalize team_members: one row per person (optional roles instead of kind copies).
-- Safe to re-run. Apply in Supabase SQL editor if not applied via CLI.

alter table public.team_members
  add column if not exists team_role text,
  add column if not exists leadership_role text;

comment on column public.team_members.team_role is 'Role on Meet the team / expert cards';
comment on column public.team_members.leadership_role is 'Role on Leadership directory';
comment on column public.team_members.quote is 'Employee feedback quote (optional)';
comment on column public.team_members.photo_url is 'Single canonical portrait for this person';

-- Backfill from legacy multi-kind rows (best-effort). Prefer team photo, then leadership.
with ranked as (
  select
    name,
    region,
    photo_url,
    role,
    kind,
    quote,
    sort_order,
    published,
    row_number() over (
      partition by lower(name)
      order by
        case kind
          when 'team' then 0
          when 'leadership' then 1
          else 2
        end,
        sort_order
    ) as rn
  from public.team_members
),
agg as (
  select
    lower(name) as name_key,
    max(name) as name,
    max(region) filter (where region is not null and region <> '') as region,
    max(photo_url) filter (where kind = 'team' and photo_url is not null) as team_photo,
    max(photo_url) filter (where kind = 'leadership' and photo_url is not null) as lead_photo,
    max(photo_url) filter (where photo_url is not null) as any_photo,
    max(role) filter (where kind = 'team') as team_role,
    max(role) filter (where kind = 'leadership') as leadership_role,
    max(quote) filter (where quote is not null and quote <> '') as quote,
    min(sort_order) as sort_order,
    bool_or(published) as published
  from public.team_members
  group by lower(name)
)
insert into public.team_members (
  slug, name, role, region, quote, photo_url, kind, team_role, leadership_role, sort_order, published
)
select
  'person-' || row_number() over (order by sort_order, name),
  name,
  coalesce(team_role, leadership_role, ''),
  region,
  quote,
  coalesce(team_photo, lead_photo, any_photo),
  case when team_role is not null then 'team' else 'leadership' end,
  team_role,
  leadership_role,
  sort_order,
  published
from agg
on conflict do nothing;

-- Remove legacy duplicate kind rows (keep rows that already have team_role/leadership_role filled,
-- or the single canonical row we just inserted). Safer cleanup: delete rows with null team_role
-- AND null leadership_role only after backfill — instead delete by old slug prefixes.
delete from public.team_members
where slug ~ '^(team|lead|testimonial)-[0-9]+$';
