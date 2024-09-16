import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
import fs from "fs";
import path from "path";
import ProjectSearchPage from "@/app/(dashboard)/search/Page/ProjectSearchPage";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
type Props = {
  params: { city: string; lt: string; slug: string; phase: string };
};
async function getProjectSlug(pathname: string) {
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "projectSlugs.json");
  console.time("getProjectSlugs");

  try {
    const jsonData = fs.readFileSync(filePath, "utf8");
    const builderJsonData = JSON.parse(jsonData);

    // Find the exact matching path based on the truncated path
    const matchingPath = Object.keys(builderJsonData).find(
      (key) => key.split("/").slice(0, -2).join("/") === pathname
    );

    // Return the ID for the exact match found
    return matchingPath ? builderJsonData[matchingPath] : null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    console.timeEnd("getProjectSlugs");
  }
}
export default async function Page({
  params: { city, lt, slug, phase },
}: Props) {
  const pathname = `/projects/${city}/${lt}/${slug}/${phase}`;
  const value = await getProjectSlug(pathname);
  const [, , projId, phaseId, , ,] = value.split("_");
  const serverData = await getSearchData(`projIdEnc=${projId}`);
  return (
    <ListingSearchPage
      serverData={serverData}
      frontendFilters={{
        locality: [`${lt}+${value.split("_")[1]}`],
        projName: slug,
        projIdEnc: projId,
      }}
    />
  );
}
export async function generateStaticParams() {
  const res = await getPagesSlugs("project-list");
  const keys = Object.keys(res);
  const slugs = keys.map((data) => {
    const [staticPath, staticPath2, city, lt, slug, phase] = data.split("/");
    return { city, lt, slug, phase };
  });
  return slugs;
}

export const dynamic = "force-dynamic";
