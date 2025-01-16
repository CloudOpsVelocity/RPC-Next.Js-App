import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getServerSideSitemap } from "next-sitemap";

// Utility function to split the array into chunks
const chunkArray = (array: any[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug; // Get the 'slug' param, which is the index
  const sitemapIndex = parseInt(slug);

  if (isNaN(sitemapIndex) || sitemapIndex < 0) {
    return NextResponse.json({ message: "Invalid Sitemap Index" });
  }

  // Path to your JSON file (projectSlugs or case-seo.json)
  const filePath = path.join(process.cwd(), "static", "case-seo.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const projectSlugs = JSON.parse(data);

  // Set the chunk size (50,000 entries per sitemap)
  const chunkSize = 30000;

  // Split the project slugs into chunks of 50,000
  const sitemapChunks = chunkArray(projectSlugs, chunkSize);

  // Check if the requested index is within the valid range
  if (sitemapIndex >= sitemapChunks.length) {
    return NextResponse.json({ message: "Sitemap index out of range" });
  }

  // Get the requested sitemap chunk
  const requestedSitemap = sitemapChunks[sitemapIndex];

  // Generate the sitemap response for the requested chunk
  const sitemap = requestedSitemap.map((slug: any) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}/${slug}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(sitemap);
}
