import React from "react";
import path from "path";
import fs from "fs";
import { getAmenties, getProjectDetails } from "@/app/utils/api/project";
import { notFound } from "next/navigation";
import ProjectsDetailsPage from "@/app/(dashboard)/abc/[city]/[local]/[slug]/Page/ProjectDetailsPage";
import { getStringPartByIndex } from "@/app/utils/dyanamic/projects";
import { getPagesSlugs } from "@/app/seo/api";
import {
  extractProjectParamsValues,
  findPathForProjectDetails,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/project";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
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
    const matchingPath = Object.keys(builderJsonData).find((key) => {
      return key.split("/").slice(0, -3).join("/") === pathname;
    });
    return matchingPath ? builderJsonData[matchingPath] : null;
  } catch (error) {
    console.log(error);
  } finally {
    console.timeEnd("getProjectSlugs");
  }
  // Read the JSON file
}
export default async function Page({ params }: Props) {
  const { city, lt, slug: name } = params;
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}/${name}`;
  const value = await findPathForProjectDetails(pathname);
  if (!value) {
    notFound();
  }
  const { PJ: slug } = await extractProjectParamsValues(value);

  const [projResponse, amenitiesFromDB] = await Promise.all([
    getProjectDetails(slug as string),
    getAmenties(),
  ]);
  return (
    <ProjectsDetailsPage
      projResponse={projResponse}
      amenitiesFromDB={amenitiesFromDB}
      slug={slug as string}
    />
  );
}

export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("project-list");

  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "projectSlugs.json");

  // Ensure the 'static' directory exists
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir);
  }

  // Convert the data object into JSON
  const jsonContent = JSON.stringify(res, null, 2);

  // Write the JSON data to the file
  fs.writeFileSync(filePath, jsonContent);
  console.log("projectSlugs.json file created successfully");
  // Extract project names from the keys
  const projectRes = Object.keys(res);
  const slugs = projectRes.map((data) => {
    const [staticPath, staticPath2, city, lt, slug] = data.split("/");
    return { city, lt, slug };
  });
  return slugs;
}
export const dynamicParams = true;
export const dynamic = "force-dynamic";
