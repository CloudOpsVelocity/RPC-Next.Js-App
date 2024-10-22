import React from "react";
import path from "path";
import fs from "fs";
import { getAmenties, getAuthorityNames, getProjectDetails } from "@/app/utils/api/project";
import { notFound } from "next/navigation";
import ProjectsDetailsPage from "@/app/(dashboard)/abc/[city]/[local]/[slug]/Page/ProjectDetailsPage";
import { getPagesSlugs } from "@/app/seo/api";
import {
  extractProjectParamsValues,
  findPathForProjectDetails,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/project";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
type Props = {
  params: { city: string; lt: string; slug: string };
};

export default async function Page({ params }: Props) {
  const { city, lt, slug: name } = params;
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}/${name}`;

  const value = await findPathForProjectDetails(pathname);
  if (!value) {
    notFound();
  }
  const { PJ: slug } = await extractProjectParamsValues(value);
  let [projResponse, amenitiesFromDB] = await Promise.all([
    getProjectDetails(slug as string),
    getAmenties(),
  ]);
if(projResponse.basicData.projAuthorityId){
  const res = await getAuthorityNames(projResponse.basicData.projAuthorityId);
  projResponse = {
    ...projResponse,
    basicData: {
      ...projResponse.basicData,
      projAuthorityNames: res,
    },
  }
}
  return (
    <ProjectsDetailsPage
      projResponse={projResponse}
      amenitiesFromDB={amenitiesFromDB}
      slug={slug as string}
      params={params}
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
    const [staticPath, staticPath2, sta3, city, lt, slug] = data.split("/");

    return { city, lt, slug };
  });
  return slugs;
}
export const dynamicParams = true;
// export const dynamic = "force-dynamic";
