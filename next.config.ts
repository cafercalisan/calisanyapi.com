import type { NextConfig } from "next";

const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === "production" ? "" : "'unsafe-eval'"} https://www.googletagmanager.com https://connect.facebook.net https://www.clarity.ms`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  `connect-src 'self' ${supabaseOrigin} https://www.google-analytics.com https://region1.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://www.facebook.com`,
  "img-src 'self' data: blob: https://*.supabase.co https://www.facebook.com https://www.google-analytics.com https://*.clarity.ms",
  "media-src 'self' blob:",
  process.env.NODE_ENV === "production" ? "upgrade-insecure-requests" : "",
].filter(Boolean).join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"], qualities: [60, 75, 85] },
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Content-Security-Policy", value: csp },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
    ] }];
  },
};

export default nextConfig;
