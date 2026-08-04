create extension if not exists pgcrypto;

create table public.products (
  id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, short_name text not null,
  description text not null default '', base_price integer not null check (base_price >= 0), price_per_m2 integer not null check (price_per_m2 >= 0),
  min_width integer not null, max_width integer not null, min_height integer not null, max_height integer not null,
  active boolean not null default true, sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.product_colors (id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, hex text not null, price integer not null default 0, active boolean not null default true, sort_order integer not null default 0);
create table public.product_features (id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null, price integer not null default 0, active boolean not null default true, sort_order integer not null default 0);
create table public.pricing_settings (id boolean primary key default true check (id), vat_rate numeric(5,4) not null default .20, shipping_fee integer not null default 250, free_shipping_threshold integer not null default 7500, installation_fee integer not null default 600, updated_at timestamptz not null default now());
create type quote_status as enum ('new','contacted','verified','approved','rejected','cancelled');
create table public.quotes (
  id uuid primary key default gen_random_uuid(), reference text unique not null, status quote_status not null default 'new',
  customer_name text not null, customer_phone text not null, customer_email text, customer_notes text,
  fulfilment_type text not null check (fulfilment_type in ('shipping','installation')), city text not null, district text not null, address text not null,
  products_subtotal integer not null, service_fee integer not null, subtotal integer not null, vat integer not null, total integer not null,
  pricing_snapshot jsonb not null, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.quote_items (
  id uuid primary key default gen_random_uuid(), quote_id uuid not null references public.quotes(id) on delete cascade, label text not null,
  product_slug text not null, product_name text not null, width integer not null, height integer not null, quantity integer not null,
  color_slug text not null, color_name text not null, feature_slugs text[] not null default '{}', feature_names text[] not null default '{}',
  unit_price integer not null, line_total integer not null, photo_path text, created_at timestamptz not null default now()
);
create index quotes_created_at_idx on public.quotes(created_at desc);
create index quotes_status_idx on public.quotes(status);
create index quote_items_quote_id_idx on public.quote_items(quote_id);

alter table public.products enable row level security;
alter table public.product_colors enable row level security;
alter table public.product_features enable row level security;
alter table public.pricing_settings enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;

insert into public.products (slug,name,short_name,description,base_price,price_per_m2,min_width,max_width,min_height,max_height,sort_order) values
('pliseli-pencere','Pliseli Pencere','Pliseli Pencere','Pencerede zarif ve kompakt.',850,1200,30,160,30,220,1),
('pliseli-kapi','Pliseli Kapı','Pliseli Kapı','Balkon ve teras geçişleri için.',1450,1400,60,200,140,260,2),
('akordiyon','Akordiyon','Akordiyon','Geniş açıklıklar için.',1200,1300,30,180,30,220,3),
('menteseli','Menteşeli','Menteşeli','Sık kullanılan açıklıklar için.',950,1100,40,130,40,220,4),
('surme','Sürme','Sürme','Ray üzerinde kayan sistem.',1100,1200,60,250,60,200,5),
('roller','Roller (Storlu)','Roller','Üst kasada toplanan sistem.',1050,1250,40,160,40,220,7);
insert into public.product_colors (slug,name,hex,price,sort_order) values ('beyaz','Kırık Beyaz','#ece9df',0,1),('antrasit','Antrasit','#30363a',0,2),('siyah','Mat Siyah','#171a1b',80,3),('kahve','Toprak Kahve','#665044',0,4),('ahsap','Altın Meşe','#a17848',120,5);
insert into public.product_features (slug,name,price,sort_order) values ('polen','Polen filtreli tül',180,1),('pet','Güçlendirilmiş pet tülü',220,2),('kilit','Güvenlik kilidi',150,3),('miknatis','Mıknatıslı kapanma',120,4);
insert into public.pricing_settings (id) values (true);

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types) values ('quote-photos','quote-photos',false,5242880,array['image/jpeg','image/png','image/webp']) on conflict (id) do nothing;
