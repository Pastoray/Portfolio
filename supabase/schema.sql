-- Raw SQL equivalent of prisma/schema.prisma for the Supabase SQL editor.
-- Use EITHER this file OR `prisma db push`, not both.

create extension if not exists pgcrypto;

do $$ begin
  create type experience_type as enum ('WORK', 'EDUCATION');
exception when duplicate_object then null; end $$;

create or replace function set_updated_at() returns trigger as $$
begin new."updatedAt" = now(); return new; end; $$ language plpgsql;

create table if not exists profile_info (
  id             text primary key default gen_random_uuid()::text,
  "fullName"     text not null,
  headline       text not null,
  intro          jsonb not null default '{}',
  bio            text not null,
  "heroWords"    text[] not null default '{}',
  location       text,
  timezone       text not null default 'UTC',
  "avatarUrl"    text,
  availability   text,
  languages      text[] not null default '{}',
  email          text,
  "resumeUrl"    text,
  socials        jsonb not null default '[]',
  "updatedAt"    timestamptz not null default now()
);

create table if not exists experiences (
  id             text primary key default gen_random_uuid()::text,
  "seedKey"      text unique,
  type           experience_type not null,
  title          text not null,
  organization   text not null,
  location       text,
  description    text,
  highlights     text[] not null default '{}',
  technologies   text[] not null default '{}',
  "startDate"    date not null,
  "endDate"      date,                      -- null = present
  "createdAt"    timestamptz not null default now(),
  "updatedAt"    timestamptz not null default now()
);
create index if not exists experiences_type_start_idx on experiences (type, "startDate" desc);

create table if not exists projects (
  id             text primary key default gen_random_uuid()::text,
  slug           text not null unique,
  title          text not null,
  summary        text not null,
  description    text,
  "imageUrl"     text,
  "liveUrl"      text,
  "repoUrl"      text,
  technologies   text[] not null default '{}',
  featured       boolean not null default false,
  visible        boolean not null default true,
  "publishedAt"  date not null default current_date,
  "createdAt"    timestamptz not null default now(),
  "updatedAt"    timestamptz not null default now()
);
create index if not exists projects_visible_published_idx on projects (visible, "publishedAt" desc);
create index if not exists projects_featured_published_idx on projects (featured, "publishedAt" desc);

create table if not exists skills (
  id             text primary key default gen_random_uuid()::text,
  name           text not null unique,
  category       text not null default 'General',
  "iconSlug"     text,
  level          int check (level between 1 and 100),
  "sortOrder"    int not null default 0,
  visible        boolean not null default true
);
create index if not exists skills_visible_sort_idx on skills (visible, "sortOrder");
create index if not exists skills_category_sort_idx on skills (category, "sortOrder");

create table if not exists messages (
  id             text primary key default gen_random_uuid()::text,
  name           text not null,
  email          text not null,
  subject        text,
  body           text not null,
  read           boolean not null default false,
  "createdAt"    timestamptz not null default now()
);
create index if not exists messages_read_created_idx on messages (read, "createdAt" desc);

create trigger trg_profile_updated before update on profile_info for each row execute function set_updated_at();
create trigger trg_experiences_updated before update on experiences for each row execute function set_updated_at();
create trigger trg_projects_updated before update on projects for each row execute function set_updated_at();

-- Row Level Security: only needed if you expose tables through Supabase's
-- REST API. The Next.js server connects with the service/DB role and bypasses RLS.
alter table profile_info enable row level security;
alter table experiences  enable row level security;
alter table projects     enable row level security;
alter table skills       enable row level security;
alter table messages     enable row level security;

create policy "public read profile"     on profile_info for select using (true);
create policy "public read experiences" on experiences  for select using (true);
create policy "public read projects"    on projects     for select using (visible);
create policy "public read skills"      on skills       for select using (visible);
create policy "public send message"     on messages     for insert with check (true);
-- messages: no select policy => unreadable by anonymous clients.

-- ---------------------------------------------------------------------------
-- Blog posts + gallery
-- ---------------------------------------------------------------------------
create table if not exists posts (
  id             text primary key default gen_random_uuid()::text,
  slug           text not null unique,
  title          text not null,
  excerpt        text not null,
  content        text not null default '',
  "coverUrl"     text,
  tags           text[] not null default '{}',
  visible        boolean not null default true,
  "publishedAt"  date not null default current_date,
  "createdAt"    timestamptz not null default now(),
  "updatedAt"    timestamptz not null default now()
);
create index if not exists posts_visible_published_idx on posts (visible, "publishedAt" desc);

create table if not exists gallery_items (
  id             text primary key default gen_random_uuid()::text,
  "seedKey"      text unique,
  title          text,
  caption        text,
  "imageUrl"     text not null,
  visible        boolean not null default true,
  "takenAt"      date not null default current_date,
  "createdAt"    timestamptz not null default now()
);
create index if not exists gallery_visible_taken_idx on gallery_items (visible, "takenAt" desc);

create trigger trg_posts_updated before update on posts for each row execute function set_updated_at();

alter table posts         enable row level security;
alter table gallery_items enable row level security;
create policy "public read posts"   on posts         for select using (visible);
create policy "public read gallery" on gallery_items for select using (visible);
