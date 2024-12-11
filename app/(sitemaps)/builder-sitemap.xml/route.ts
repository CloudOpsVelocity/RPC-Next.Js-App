import logger from "@/app/utils/logger";
import { getServerSideSitemap } from "next-sitemap";
import path from "path";
import fs from "fs";
export async function GET(request: Request) {
  const filePath = path.join(process.cwd(), "static", `builderSlugs.json`);
  logger.info(`Builder Details Sitemap: Reading builderSlugs.json file`);
  const data = fs.readFileSync(filePath, "utf-8");
  const builderSlugs = JSON.parse(data);
  const slugs = Object.keys(builderSlugs);
  const generatedSitemap = slugs.map((slug) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}${slug}`,
    lastmod: new Date().toISOString(),
  }));
  logger.info(`Builder Details Sitemap: Generated Sitemap`);
  return getServerSideSitemap(generatedSitemap);
}
