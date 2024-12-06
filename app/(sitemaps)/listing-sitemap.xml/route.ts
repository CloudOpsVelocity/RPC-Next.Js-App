
import logger from '@/app/utils/logger';
import { getServerSideSitemap } from 'next-sitemap'
import path from 'path'
import fs from 'fs'
export async function GET(request: Request) {
  const filePath =  path.join(process.cwd(), "static", `listingSlugs.json`);
  logger.info(`Listing Details Sitemap: Reading listingSlugs.json file`);
  const data = fs.readFileSync(filePath, "utf-8");
  const listingSlugs = JSON.parse(data);
 const slugs = Object.keys(listingSlugs)
const generatedSitemap = slugs.map((slug) => ({
  loc: `${process.env.NEXT_PUBLIC_URL}${slug}`,
  lastmod: new Date().toISOString(),
 }))
 logger.info(`Listing Details Sitemap: Generated Sitemap`);
  return getServerSideSitemap(generatedSitemap)
}