create table if not exists public.wallet_backups (
 user_id uuid primary key references auth.users(id) on delete cascade,
 payload jsonb not null,
 updated_at timestamptz not null default now()
);
alter table public.wallet_backups enable row level security;
revoke all on public.wallet_backups from anon;
grant select, insert, update on public.wallet_backups to authenticated;
create policy "wallet read own" on public.wallet_backups for select to authenticated using ((select auth.uid()) = user_id);
create policy "wallet insert own" on public.wallet_backups for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "wallet update own" on public.wallet_backups for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
