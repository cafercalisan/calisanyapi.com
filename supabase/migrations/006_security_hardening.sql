-- Çalışan Yapı production hardening
-- Uygulama tüm yazmaları yalnız server-side service role üzerinden yapar.

revoke create on schema public from public;
revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
revoke all on all functions in schema public from anon, authenticated;

alter table public.products force row level security;
alter table public.product_colors force row level security;
alter table public.product_features force row level security;
alter table public.pricing_settings force row level security;
alter table public.quotes force row level security;
alter table public.quote_items force row level security;
alter table public.service_requests force row level security;

update storage.buckets
set public = false,
    file_size_limit = 5242880,
    allowed_mime_types = array['image/webp']
where id = 'quote-photos';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;

drop trigger if exists service_requests_set_updated_at on public.service_requests;
create trigger service_requests_set_updated_at
before update on public.service_requests
for each row execute function public.set_updated_at();

drop trigger if exists quotes_set_updated_at on public.quotes;
create trigger quotes_set_updated_at
before update on public.quotes
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists pricing_settings_set_updated_at on public.pricing_settings;
create trigger pricing_settings_set_updated_at
before update on public.pricing_settings
for each row execute function public.set_updated_at();

alter table public.service_requests
  add constraint service_requests_service_slug_allowed check (
    service_slug in ('pvc-kapi-pencere','cam-balkon','kupeste','korkuluk','asma-tavan','sineklik','kis-bahcesi','pergola','giyotin-cam')
  ) not valid,
  add constraint service_requests_district_length check (char_length(district) between 2 and 80) not valid,
  add constraint service_requests_description_length check (char_length(description) between 10 and 1000) not valid,
  add constraint service_requests_name_length check (char_length(customer_name) between 2 and 100) not valid,
  add constraint service_requests_phone_length check (char_length(customer_phone) between 10 and 20) not valid,
  add constraint service_requests_email_length check (customer_email is null or char_length(customer_email) <= 254) not valid,
  add constraint service_requests_photo_count check (coalesce(cardinality(photo_paths), 0) <= 4) not valid;

alter table public.quotes
  add constraint quotes_customer_name_length check (char_length(customer_name) between 2 and 100) not valid,
  add constraint quotes_phone_length check (char_length(customer_phone) between 10 and 20) not valid,
  add constraint quotes_email_length check (customer_email is null or char_length(customer_email) <= 254) not valid,
  add constraint quotes_address_length check (char_length(address) between 8 and 500) not valid,
  add constraint quotes_amounts_nonnegative check (
    products_subtotal >= 0 and service_fee >= 0 and subtotal >= 0 and vat >= 0 and total >= 0
  ) not valid;

comment on table public.service_requests is 'Private service leads. No anon/authenticated table privileges or RLS policies.';
comment on table public.quotes is 'Private quote records. No anon/authenticated table privileges or RLS policies.';
