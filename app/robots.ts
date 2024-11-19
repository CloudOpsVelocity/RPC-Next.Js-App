import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/", // Allows all pages
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_PROJECT_URL}/sitemap.xml`, // Dynamically generates the sitemap URL
  };
}
