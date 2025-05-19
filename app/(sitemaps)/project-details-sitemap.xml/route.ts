import logger from "@/app/utils/logger";
import { getServerSideSitemap } from "next-sitemap";
import { BACKEND_BASE_URL } from "@/app/env";

export async function GET({ searchParams }: { searchParams: Promise<any> }) {
  const slug = await searchParams;
  console.log(slug ?? "N/A");

  const projectSlugs = await getProjectSlug();
  const slugs = Object.keys(projectSlugs);

  const generatedSitemap = slugs.map((slug) => ({
    loc: `${process.env.NEXT_PUBLIC_URL}${slug}`,
    lastmod: new Date().toISOString(),
  }));

  // Create a response with headers
  const response = getServerSideSitemap(generatedSitemap);

  return response;
}
const getProjectSlug = async () => {
  const result = fetch(`${BACKEND_BASE_URL}/common/project-list`, {
    method: "POST",
    cache: "no-store",
  }).then((res) => res.json());
  return result;
};
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const cache = "no-store";
