import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getServerSideSitemap } from "next-sitemap";

// Utility function to split the array into chunks
const chunkArray = (array: any[], sizes: number[]) => {
  let start = 0;
  const chunks = [];
  for (let size of sizes) {
    chunks.push(array.slice(start, start + size));
    start += size;
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

  // Calculate how many chunks we need (we want exactly 5 sitemaps)
  const totalEntries = projectSlugs.length;
  const baseSize = Math.floor(totalEntries / 5); // Minimum entries per sitemap
  const extraEntries = totalEntries % 5; // Remaining entries to distribute

  // Create an array of chunk sizes: 4 chunks with 'baseSize', and 1 with 'baseSize + 1'
  const sizes = Array(5).fill(baseSize);
  for (let i = 0; i < extraEntries; i++) {
    sizes[i] += 1; // Distribute the remaining 1 entry
  }

  // Split the project slugs into chunks with the calculated sizes
  const sitemapChunks = chunkArray(projectSlugs, sizes);

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
