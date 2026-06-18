-- =========================================================
-- YUUMIRU - SUPABASE DATABASE SCHEMA
-- Jalankan seluruh script ini di Supabase SQL Editor
-- Project: https://kzpslekblpyhqjdvlgtx.supabase.co
-- =========================================================

-- ============ EXTENSIONS ============
create extension if not exists "uuid-ossp";

-- ============ PROFILES (extends auth.users) ============
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  email text not null,
  avatar_url text default 'https://api.dicebear.com/7.x/shapes/svg?seed=yuumiru',
  language text default 'id' check (language in ('id','en','ja')),
  is_admin boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto create profile when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============ GENRES ============
create table if not exists public.genres (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  slug text unique not null
);

insert into public.genres (name, slug) values
('Action','action'),('Adventure','adventure'),('Comedy','comedy'),('Drama','drama'),
('Fantasy','fantasy'),('Sci-Fi','sci-fi'),('Romance','romance'),('Slice of Life','slice-of-life'),
('Horror','horror'),('Mystery','mystery'),('Psychological','psychological'),('Thriller','thriller'),
('Supernatural','supernatural'),('Sports','sports'),('Mecha','mecha'),('Cyberpunk','cyberpunk'),
('Historical','historical'),('Military','military'),('Music','music'),('Gourmet','gourmet'),
('Shounen','shounen'),('Shoujo','shoujo'),('Seinen','seinen'),('Josei','josei'),('Isekai','isekai')
on conflict (name) do nothing;

alter table public.genres enable row level security;
create policy "Genres are viewable by everyone" on public.genres for select using (true);

-- ============ ANIME (series) ============
create table if not exists public.anime (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  cover_url text,
  banner_url text,
  status text default 'ongoing' check (status in ('ongoing','completed')),
  release_year int,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.anime enable row level security;
create policy "Anime are viewable by everyone" on public.anime for select using (true);
create policy "Admins can insert anime" on public.anime for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "Admins can update anime" on public.anime for update using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "Admins can delete anime" on public.anime for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- ============ ANIME <-> GENRES (many to many) ============
create table if not exists public.anime_genres (
  anime_id uuid references public.anime(id) on delete cascade,
  genre_id uuid references public.genres(id) on delete cascade,
  primary key (anime_id, genre_id)
);

alter table public.anime_genres enable row level security;
create policy "Anime genres viewable by everyone" on public.anime_genres for select using (true);
create policy "Admins manage anime genres" on public.anime_genres for all using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- ============ EPISODES ============
create table if not exists public.episodes (
  id uuid primary key default uuid_generate_v4(),
  anime_id uuid references public.anime(id) on delete cascade,
  episode_number int not null,
  title text,
  video_url text not null,
  video_type text default 'iframe' check (video_type in ('iframe','direct')),
  thumbnail_url text,
  duration_seconds int default 1440,
  next_episode_at timestamptz,
  created_at timestamptz default now()
);

alter table public.episodes enable row level security;
create policy "Episodes viewable by everyone" on public.episodes for select using (true);
create policy "Admins can insert episodes" on public.episodes for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "Admins can update episodes" on public.episodes for update using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "Admins can delete episodes" on public.episodes for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- ============ COMMENTS ============
create table if not exists public.comments (
  id uuid primary key default uuid_generate_v4(),
  episode_id uuid references public.episodes(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

alter table public.comments enable row level security;
create policy "Comments viewable by everyone" on public.comments for select using (true);
create policy "Logged in users can comment" on public.comments for insert with check (auth.uid() = user_id);
create policy "Users can delete own comments" on public.comments for delete using (
  auth.uid() = user_id or exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- ============ LIKES / DISLIKES ============
create table if not exists public.reactions (
  id uuid primary key default uuid_generate_v4(),
  episode_id uuid references public.episodes(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  type text not null check (type in ('like','dislike')),
  created_at timestamptz default now(),
  unique(episode_id, user_id)
);

alter table public.reactions enable row level security;
create policy "Reactions viewable by everyone" on public.reactions for select using (true);
create policy "Logged in users can react" on public.reactions for insert with check (auth.uid() = user_id);
create policy "Users can update own reaction" on public.reactions for update using (auth.uid() = user_id);
create policy "Users can delete own reaction" on public.reactions for delete using (auth.uid() = user_id);

-- ============ WATCH HISTORY ============
create table if not exists public.watch_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  episode_id uuid references public.episodes(id) on delete cascade,
  anime_id uuid references public.anime(id) on delete cascade,
  watched_at timestamptz default now(),
  progress_seconds int default 0,
  unique(user_id, episode_id)
);

alter table public.watch_history enable row level security;
create policy "Users can view own history" on public.watch_history for select using (auth.uid() = user_id);
create policy "Users can insert own history" on public.watch_history for insert with check (auth.uid() = user_id);
create policy "Users can update own history" on public.watch_history for update using (auth.uid() = user_id);
create policy "Users can delete own history" on public.watch_history for delete using (auth.uid() = user_id);

-- ============ REALTIME ============
alter publication supabase_realtime add table public.reactions;
alter publication supabase_realtime add table public.comments;

-- ============ HELPER VIEW: episode with like/dislike counts ============
create or replace view public.episode_stats as
select
  e.id as episode_id,
  count(*) filter (where r.type = 'like') as like_count,
  count(*) filter (where r.type = 'dislike') as dislike_count
from public.episodes e
left join public.reactions r on r.episode_id = e.id
group by e.id;

-- =========================================================
-- SETELAH SCRIPT INI DIJALANKAN:
-- 1) Daftar akun baru lewat halaman register di website dengan email
--    yang ingin dijadikan admin, misal: adminyuumiru50@yuumiru.local
-- 2) Jalankan query di bawah ini untuk menjadikannya admin:
--
--    update public.profiles set is_admin = true, username = 'adminyuumiru50'
--    where email = 'EMAIL_YANG_DIDAFTARKAN';
--
-- =========================================================
