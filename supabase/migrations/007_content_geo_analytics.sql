-- SEO/GEO içerik yönetimi ve slug performans raporlaması.
-- Tüm yazmalar server-side service role üzerinden yapılır.

create table if not exists public.districts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 2 and 80),
  summary text not null default '',
  indexable boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.neighborhoods (
  id uuid primary key default gen_random_uuid(),
  district_id uuid not null references public.districts(id) on delete cascade,
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 2 and 80),
  summary text not null default '',
  body jsonb not null default '{}'::jsonb check (jsonb_typeof(body) = 'object'),
  indexable boolean not null default false,
  active boolean not null default true,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (district_id, slug)
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 10 and 180),
  description text not null check (char_length(description) between 30 and 320),
  eyebrow text not null default '',
  service_slug text,
  intro text not null default '',
  sections jsonb not null default '[]'::jsonb check (jsonb_typeof(sections) = 'array'),
  status text not null default 'draft' check (status in ('draft','published','archived')),
  indexable boolean not null default false,
  read_time_minutes smallint not null default 1 check (read_time_minutes between 1 and 120),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_posts_service_slug_allowed check (
    service_slug is null or service_slug in ('pvc-kapi-pencere','cam-balkon','kupeste','korkuluk','asma-tavan','sineklik','kis-bahcesi','pergola','giyotin-cam')
  )
);

create table if not exists public.content_metrics_daily (
  metric_date date not null,
  page_path text not null check (page_path like '/%'),
  page_type text not null check (page_type in ('blog','district','neighborhood','service','campaign','other')),
  district_slug text,
  neighborhood_slug text,
  views integer not null default 0 check (views >= 0),
  users integer not null default 0 check (users >= 0),
  engaged_sessions integer not null default 0 check (engaged_sessions >= 0),
  leads integer not null default 0 check (leads >= 0),
  source text not null default 'ga4',
  imported_at timestamptz not null default now(),
  primary key (metric_date, page_path, source)
);

create index if not exists neighborhoods_district_idx on public.neighborhoods(district_id, active, indexable);
create index if not exists blog_posts_publication_idx on public.blog_posts(status, indexable, published_at desc);
create index if not exists content_metrics_page_date_idx on public.content_metrics_daily(page_path, metric_date desc);
create index if not exists content_metrics_geo_idx on public.content_metrics_daily(district_slug, neighborhood_slug, metric_date desc);
create index if not exists service_requests_landing_page_idx on public.service_requests(landing_page);
create index if not exists service_requests_district_status_idx on public.service_requests(district, status, created_at desc);

alter table public.districts enable row level security;
alter table public.neighborhoods enable row level security;
alter table public.blog_posts enable row level security;
alter table public.content_metrics_daily enable row level security;
alter table public.districts force row level security;
alter table public.neighborhoods force row level security;
alter table public.blog_posts force row level security;
alter table public.content_metrics_daily force row level security;

revoke all on public.districts, public.neighborhoods, public.blog_posts, public.content_metrics_daily from anon, authenticated;

drop trigger if exists districts_set_updated_at on public.districts;
create trigger districts_set_updated_at before update on public.districts for each row execute function public.set_updated_at();
drop trigger if exists neighborhoods_set_updated_at on public.neighborhoods;
create trigger neighborhoods_set_updated_at before update on public.neighborhoods for each row execute function public.set_updated_at();
drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();

create or replace view public.content_lead_performance
with (security_invoker = true)
as
select
  split_part(sr.landing_page, '?', 1) as page_path,
  count(*)::integer as total_leads,
  count(*) filter (where sr.status = 'won')::integer as won_leads,
  count(*) filter (where sr.status = 'lost')::integer as lost_leads,
  count(*) filter (where sr.created_at >= now() - interval '30 days')::integer as leads_last_30_days,
  max(sr.created_at) as last_lead_at
from public.service_requests sr
where sr.landing_page is not null and sr.landing_page like '/%'
group by split_part(sr.landing_page, '?', 1);

revoke all on public.content_lead_performance from anon, authenticated;

comment on table public.districts is 'SEO/GEO district content registry. Private; server-side access only.';
comment on table public.neighborhoods is 'SEO/GEO neighborhood content registry. Private; server-side access only.';
comment on table public.blog_posts is 'Editorial content registry. Private; server-side access only.';
comment on table public.content_metrics_daily is 'Daily GA4/content performance rollups. Private; server-side access only.';
comment on view public.content_lead_performance is 'Lead totals grouped by originating page path.';

insert into public.districts (slug, name, sort_order)
values
  ('adalar','Adalar',1),('arnavutkoy','Arnavutköy',2),('atasehir','Ataşehir',3),('avcilar','Avcılar',4),
  ('bagcilar','Bağcılar',5),('bahcelievler','Bahçelievler',6),('bakirkoy','Bakırköy',7),('basaksehir','Başakşehir',8),
  ('bayrampasa','Bayrampaşa',9),('besiktas','Beşiktaş',10),('beykoz','Beykoz',11),('beylikduzu','Beylikdüzü',12),
  ('beyoglu','Beyoğlu',13),('buyukcekmece','Büyükçekmece',14),('catalca','Çatalca',15),('cekmekoy','Çekmeköy',16),
  ('esenler','Esenler',17),('esenyurt','Esenyurt',18),('eyupsultan','Eyüpsultan',19),('fatih','Fatih',20),
  ('gaziosmanpasa','Gaziosmanpaşa',21),('gungoren','Güngören',22),('kadikoy','Kadıköy',23),('kagithane','Kağıthane',24),
  ('kartal','Kartal',25),('kucukcekmece','Küçükçekmece',26),('maltepe','Maltepe',27),('pendik','Pendik',28),
  ('sancaktepe','Sancaktepe',29),('sariyer','Sarıyer',30),('silivri','Silivri',31),('sultanbeyli','Sultanbeyli',32),
  ('sultangazi','Sultangazi',33),('sile','Şile',34),('sisli','Şişli',35),('tuzla','Tuzla',36),
  ('umraniye','Ümraniye',37),('uskudar','Üsküdar',38),('zeytinburnu','Zeytinburnu',39)
on conflict (slug) do update set name = excluded.name, sort_order = excluded.sort_order;

insert into public.neighborhoods (district_id, slug, name, summary, indexable, active, published_at)
select d.id, seed.slug, seed.name, seed.summary, true, true, now()
from (values
  ('atasehir','barbaros','Barbaros','Konut ve ticari yapılarda doğrama yenileme, cam balkon ve tamamlayıcı yapı sistemleri için yerinde keşif.'),
  ('atasehir','icerenkoy','İçerenköy','Apartman ve konutlarda PVC pencere, balkon kapısı, sineklik ve cam balkon ihtiyaçları için ölçüye dayalı planlama.'),
  ('atasehir','kayisdagi','Kayışdağı','Konutlarda doğrama, balkon ve dış mekân sistemleri için saha koşullarına göre keşif ve uygulama desteği.'),
  ('kadikoy','kozyatagi','Kozyatağı','Konut ve iş yerlerinde PVC doğrama, cam sistemleri ve ölçüye özel tamamlayıcı uygulamalar.'),
  ('kadikoy','bostanci','Bostancı','Sahil etkisi ve yoğun kullanıma uygun doğrama, cam balkon, korkuluk ve sineklik çözümleri için keşif.'),
  ('kadikoy','goztepe','Göztepe','Mevcut konutlarda pencere yenileme, balkon sistemleri ve iç-dış mekân uygulamaları için planlı çalışma.')
) as seed(district_slug, slug, name, summary)
join public.districts d on d.slug = seed.district_slug
on conflict (district_id, slug) do update set name = excluded.name, summary = excluded.summary;
