# Uma Yapı — Yayın Öncesi Kontrol Listesi

## 1. Supabase

- Supabase Dashboard içinde SQL Editor ile `supabase/migrations` klasöründeki dosyaları numara sırasıyla çalıştırın.
- Storage içindeki `quote-photos` bucket'ının **private** olduğunu doğrulayın.
- `SUPABASE_SERVICE_ROLE_KEY` değerini yalnız sunucu ortamına ekleyin. Adında `NEXT_PUBLIC_` olmamalı ve tarayıcıya gönderilmemelidir.
- Yönetici hesabını Supabase Authentication içinde oluşturun; parola yöneticisiyle üretilmiş benzersiz bir parola ve mümkünse MFA kullanın.
- Database parolasını kaynak koda, Git'e veya istemci ortam değişkenlerine koymayın.

## 2. Üretim ortam değişkenleri

- `NEXT_PUBLIC_SITE_URL`: HTTPS kullanan gerçek alan adı
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: publishable key
- `SUPABASE_SERVICE_ROLE_KEY`: yalnız sunucu secret'ı
- `SUPABASE_STORAGE_BUCKET=quote-photos`
- `NEXT_PUBLIC_LEGAL_NAME`: resmî ticari unvan
- `NEXT_PUBLIC_LEGAL_ADDRESS`: KVKK tebligat/adres bilgisi
- `NEXT_PUBLIC_CONTACT_EMAIL`: aktif kurumsal e-posta
- GA4, Meta Pixel ve Clarity kimlikleri ancak hesaplar hazır olduğunda

## 3. Hukuk ve içerik

- Gizlilik ve KVKK metnindeki resmî unvan, açık adres ve iletişim kanalını gerçek bilgilerle doğrulayın.
- Formda yalnız teklif için gerekli verileri isteyin; gelen fotoğrafları iş sonuçlandıktan sonra belirlenen saklama süresine göre silin.
- Gerçek proje görselleri için müşteriden yayın izni alın.

## 4. Alan adı ve ölçüm

- DNS, SSL, `www` yönlendirmesi ve canonical alan adını doğrulayın.
- Google Search Console ve Bing Webmaster Tools mülklerini doğrulayın.
- `/sitemap.xml` gönderin, `/robots.txt` ve önemli hizmet/ilçe URL'lerini test edin.
- Çerezleri reddetme, kabul etme ve sonradan değiştirme akışlarını ayrı ayrı test edin.

## 5. Son teknik kontrol

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit --omit=dev
```

Teklif gönderme, görsel yükleme, yönetici girişi, durum güncelleme, telefon ve WhatsApp dönüşüm olaylarını üretim ortamında birer kez uçtan uca doğrulayın.
