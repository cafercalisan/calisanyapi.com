alter table public.service_requests
  alter column width type numeric(10,2) using (
    case when width ~ '^[0-9]+([.,][0-9]+)?$' then replace(width, ',', '.')::numeric else null end
  ),
  alter column height type numeric(10,2) using (
    case when height ~ '^[0-9]+([.,][0-9]+)?$' then replace(height, ',', '.')::numeric else null end
  ),
  alter column depth type numeric(10,2) using (
    case when depth ~ '^[0-9]+([.,][0-9]+)?$' then replace(depth, ',', '.')::numeric else null end
  );

alter table public.service_requests
  add column if not exists event_id uuid,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text,
  add column if not exists utm_term text,
  add column if not exists gclid text,
  add column if not exists fbclid text,
  add column if not exists landing_page text,
  add column if not exists referrer text;

update public.service_requests set event_id = gen_random_uuid() where event_id is null;
alter table public.service_requests alter column event_id set not null;

create unique index if not exists service_requests_event_id_idx on public.service_requests(event_id);
create index if not exists service_requests_attribution_idx on public.service_requests(utm_source, utm_medium, utm_campaign);

alter table public.service_requests
  add constraint service_requests_width_range check (width is null or width > 0 and width <= 100000),
  add constraint service_requests_height_range check (height is null or height > 0 and height <= 100000),
  add constraint service_requests_depth_range check (depth is null or depth > 0 and depth <= 100000);
