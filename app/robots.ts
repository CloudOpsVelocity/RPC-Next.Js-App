import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: "/test/",
      },
      {
        userAgent: ["Applebot", "Bingbot"],
        disallow: ["/test/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_PROJECT_URL}/sitemap.xml`,
  };
}
