create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  status text not null default 'new' check (status in ('new','contacted','quoted','won','lost')),
  service_slug text not null,
  district text not null,
  width text,
  height text,
  depth text,
  unit text not null default 'cm',
  description text not null,
  photo_paths text[] not null default '{}',
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists service_requests_created_at_idx on public.service_requests(created_at desc);
create index if not exists service_requests_status_idx on public.service_requests(status);
alter table public.service_requests enable row level security;
