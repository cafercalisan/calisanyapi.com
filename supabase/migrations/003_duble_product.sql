insert into public.products (
  slug, name, short_name, description, base_price, price_per_m2,
  min_width, max_width, min_height, max_height, sort_order
) values (
  'duble', 'Duble Sineklik', 'Duble',
  'Geniş kapı ve cam balkonlarda iki kanatlı çözüm.',
  1750, 1500, 100, 400, 100, 280, 8
) on conflict (slug) do nothing;
