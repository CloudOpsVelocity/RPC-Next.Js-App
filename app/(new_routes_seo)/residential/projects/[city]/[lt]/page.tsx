import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
import fs from "fs";
import path from "path";
import ProjectSearchPage from "@/app/(dashboard)/search/Page/ProjectSearchPage";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import {
  extractProjectParamsValues,
  findPathForProjectDetails,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/project";
import { notFound } from "next/navigation";
type Props = {
  params: { city: string; lt: string; slug: string };
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
      (key) => key.split("/").slice(0, -4).join("/") === pathname
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
export default async function Page({ params: { city, lt } }: Props) {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}`;
  const value = await findPathForProjectDetails(pathname);
  if (!value) notFound();
  const filterValues = extractProjectParamsValues(value);
  const serverData = await getSearchData(filterValues.LT as string);
  return (
    <ProjectSearchPage
      serverData={serverData}
      frontendFilters={{
        locality: [`${lt}+${filterValues.LT}`],
      }}
    />
  );
}
export async function generateStaticParams() {
  const res = await getPagesSlugs("project-list");
  const keys = Object.keys(res);
  const slugs = keys.map((data) => {
    const [staticPath, staticPath2, sta3, city, lt, slug] = data.split("/");
    return { city, lt };
  });
  return slugs;
}

export const dynamic = "force-dynamic";
const getSearchData = async (locality: string): Promise<any> => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/searchproj?page=0&city=9&localities=${locality}`;

    const url = `${baseUrl}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
