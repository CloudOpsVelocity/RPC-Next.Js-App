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
import { Metadata, ResolvingMetadata } from "next";
type Props = {
  params: { city: string; lt: string; slug: string };
};
// let metadataCache: {title?: string, description?: string} = {};
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

  // Cache just the metadata
  // const data = projResponse.basicData;
  // metadataCache = {
  //   title: `${data?.projectName} ${data.availableProperties?.join(" ")} for sale in ${data.localityName} ${data.cityName}`,
  //   description: `${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`
  // };

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

type SeoProps = {
  params: { city: string; lt: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: SeoProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const pathname = `${BASE_PATH_PROJECT_DETAILS}/${params.city}/${params.lt}/${params.slug}`;//`${BASE_PATH_PROJECT_DETAILS}/${city}/${lt}/${name}`;
  const value = await findPathForProjectDetails(pathname);
  const { PJ: slug } = await extractProjectParamsValues(value);
  const { basicData: data } = await getProjectDetails(slug as string);
  return {
    title: `${data?.projectName} ${data.availableProperties?.join(" ")} for sale in ${data.localityName} ${data.cityName}`,
    description: `${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`,
  }
}

export const dynamicParams = true;
export const dynamic = "force-static";
