-- Supabase schema for Daily Life language apps.
-- Run this once in the Supabase SQL editor.
--
-- Both the German and Korean apps can use the same project. Each app writes
-- one row per signed-in user, identified by app_id.

create table if not exists public.app_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  app_id text not null,
  state jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, app_id)
);

alter table public.app_progress enable row level security;

drop policy if exists "Users manage their own app progress" on public.app_progress;

create policy "Users manage their own app progress"
on public.app_progress
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

revoke all on public.app_progress from anon;
grant select, insert, update, delete on public.app_progress to authenticated;
