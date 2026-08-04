# Çalışan Yapı Teklif Platformu

Ölçüye özel, çok kalemli sineklik teklifi oluşturan Next.js uygulaması. İlk ziyaret açılış sahnesi, canlı sunucu fiyatlandırması, özel fotoğraf yükleme ve tek hesaplı yönetim paneli içerir.

## Yerel geliştirme

```bash
npm install
cp .env.example .env.local
npm run dev
```

Supabase olmadan arayüz varsayılan katalog ve geçici referanslarla çalışır. Kalıcı kayıt için:

1. Supabase projesinde `supabase/migrations/001_initial.sql` dosyasını çalıştırın.
2. Authentication bölümünde `ADMIN_EMAIL` için tek bir e-posta/şifre kullanıcısı oluşturun.
3. `.env.local` değerlerini Supabase, Resend ve WhatsApp bilgileriyle doldurun.
4. Vercel projesine aynı environment variable değerlerini ekleyin.

Yönetim paneli: `/yonetim`.

## Kontroller

```bash
npm test
npm run typecheck
npm run lint
npm run build
```
