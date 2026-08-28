"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function ContentTracker({ type, slug, district, neighborhood }: { type: "blog" | "district" | "neighborhood"; slug: string; district?: string; neighborhood?: string }) {
  useEffect(() => {
    track(type === "blog" ? "view_blog_post" : "view_geo_page", {
      page_type: type,
      content_slug: slug,
      district,
      neighborhood,
      path: location.pathname,
    });
  }, [type, slug, district, neighborhood]);
  return null;
}
