alter table public.quote_items
  add column if not exists opening_type text not null default 'other'
  check (opening_type in ('window', 'door', 'glass-balcony', 'other'));
