import logger from "@/app/utils/logger";
import { getServerSideSitemap } from "next-sitemap";
import path from "path";
import fs from "fs";
export async function GET(request: Request) {
  const filePath = path.join(process.cwd(), "static", `projectSlugs.json`);
  logger.info(`Listing Details Sitemap: Reading projectSlugs.json file`);
  const data = fs.readFileSync(filePath, "utf-8");
  const listingSlugs = JSON.parse(data);
  const slugs = Object.keys(listingSlugs);
  const uniquePathsSet = new Set(
    slugs.map((path) => path.split("/").slice(0, 6).join("/"))
  );
  const uniquePaths = Array.from(uniquePathsSet);
  const generatedSitemap = [...slugs, ...uniquePaths].map((slug) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}${slug}`,
    lastmod: new Date().toISOString(),
  }));
  logger.info(`Project Details Sitemap: Generated Sitemap`);
  return getServerSideSitemap(generatedSitemap);
}
