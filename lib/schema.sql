-- Supabase SQL for user-wise call history
create table if not exists public.calls (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  phone_number text not null,
  product_name text,
  call_id text unique,
  room_name text,
  status text,
  customer_preference boolean,
  transcript jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_calls_user_id_created_at on public.calls (user_id, created_at desc);
create index if not exists idx_calls_call_id on public.calls (call_id);

-- Row Level Security (optional; configure policies to your auth model)
alter table public.calls enable row level security;
-- Example permissive policies for anon key usage; tighten for production
do $$ begin
  create policy "Allow read own calls" on public.calls
    for select
    using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Allow insert calls" on public.calls
    for insert
    with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "Allow update calls" on public.calls
    for update using (true);
exception when duplicate_object then null; end $$;




