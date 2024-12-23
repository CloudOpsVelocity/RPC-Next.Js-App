import logger from "@/app/utils/logger";
import { getServerSideSitemap } from "next-sitemap";
import path from "path";
import fs from "fs";
export async function GET(request: Request) {
  const filePath = path.join(process.cwd(), "static", `projectSlugs.json`);
  logger.info(`Project Details Sitemap: Reading projectSlugs.json file`);
  const data = fs.readFileSync(filePath, "utf-8");
  const projectSlugs = JSON.parse(data);
  const slugs = Object.keys(projectSlugs);
  const uniqueSlugs = Array.from(new Set(slugs)); // Ensure slugs are unique
  const splitSlugs = uniqueSlugs.flatMap((slug) => {
    const segments = slug.split("/").filter(Boolean);
    const pathsToCheck = [];
    for (let i = segments.length; i > 0; i--) {
      pathsToCheck.push(`/${segments.slice(0, i).join("/")}`);
    }
    return pathsToCheck;
  });
  const uniqueSplitSlugs = Array.from(new Set(splitSlugs));
  const generatedSitemap = uniqueSplitSlugs.map((slug) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}${slug}`,
    lastmod: new Date().toISOString(),
  }));

  logger.info(`Project Details Sitemap: Generated Sitemap`);
  return getServerSideSitemap(generatedSitemap);
}
