# Supabase veritabanı kurulumu

Migration dosyalarını dosya numarası sırasıyla Supabase SQL Editor'da çalıştırın:

1. `supabase/migrations/001_initial.sql`
2. `supabase/migrations/002_opening_type.sql`
3. `supabase/migrations/003_duble_product.sql`
4. `supabase/migrations/004_service_requests.sql`
5. `supabase/migrations/005_lead_attribution.sql`
6. `supabase/migrations/006_security_hardening.sql`
7. `supabase/migrations/007_content_geo_analytics.sql`

Üretim ortamında aşağıdaki değişkenler Vercel secret olarak tanımlanmalıdır:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET=quote-photos`
- `DEMO_ADMIN_ENABLED=false`

`SUPABASE_SERVICE_ROLE_KEY` hiçbir zaman `NEXT_PUBLIC_` önekiyle tanımlanmamalı veya Git'e eklenmemelidir.

## Slug performans sorgusu

```sql
select *
from public.content_lead_performance
order by leads_last_30_days desc, total_leads desc;
```

## İlçe ve semt talep özeti

```sql
select
  district,
  split_part(landing_page, '?', 1) as origin_page,
  count(*) as total_leads,
  count(*) filter (where status = 'won') as won_leads
from public.service_requests
group by district, split_part(landing_page, '?', 1)
order by total_leads desc;
```
