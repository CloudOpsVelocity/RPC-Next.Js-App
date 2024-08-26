import React from "react";
import path from "path";
import fs from "fs";
import { getPagesSlugs } from "@/app/seo/api";
import { getAmenties, getProjectDetails } from "@/app/utils/api/project";
import { notFound } from "next/navigation";
import ProjectsDetailsPage from "@/app/(dashboard)/abc/[city]/[local]/[slug]/Page/ProjectDetailsPage";
import { getStringPartByIndex } from "@/app/utils/dyanamic/projects";
type Props = {
  params: { city: string; lt: string; slug: string };
};
async function getProjectSlug(pathname: string) {
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "projectSlugs.json");

  // Read the JSON file
  const jsonData = fs.readFileSync(filePath, "utf8");
  const builderJsonData = JSON.parse(jsonData);

  // Return the ID for the given pathname
  return builderJsonData[pathname] || null;
}
export default async function Page({ params }: Props) {
  const { city, lt, slug: name } = params;
  const pathname = `/projects/${city}/${lt}/${name}`;
  const value = await getProjectSlug(pathname);
  const slug = getStringPartByIndex(value, 2);
  if (!slug) {
    notFound();
  }
  const [projResponse, amenitiesFromDB] = await Promise.all([
    getProjectDetails(slug as string),
    getAmenties(),
  ]);
  return (
    <ProjectsDetailsPage
      projResponse={projResponse}
      amenitiesFromDB={amenitiesFromDB}
      slug={slug}
    />
  );
}
export const dynamic = "force-static";
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

  // Extract project names from the keys
  const projectRes = Object.keys(res);
  const slugs = projectRes.map((data) => {
    const [staticPath, staticPath2, city, lt, slug] = data.split("/");
    return { city, lt, slug };
  });
  return slugs;
}
