import { getPagesSlugs } from "@/app/seo/api";
import path from "path";
import React from "react";
import fs from "fs";
import { getBuilderDetailsPageData } from "@/app/utils/api/builder";
import { notFound } from "next/navigation";
import BuilderPage from "@/app/builder/[slug]/Page/BuilderPage";
type Props = {
  params: {
    city: string;
    slug: string;
  };
};
async function getBuilderSlug(pathname: string) {
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "builderSlugs.json");
  console.time("getBuilderSlugs");
  try {
    // Read the JSON file asynchronously
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const builderJsonData = JSON.parse(jsonData);
    const decodeUrl = decodeURIComponent(pathname);
    return builderJsonData[decodeUrl];
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return null;
  } finally {
    console.timeEnd("getBuilderSlugs");
  }
}
export default async function Page({ params: { city, slug } }: Props) {
  // new cahnge
  const pathname = `/builders/${city}/${slug}`;
  const id = await getBuilderSlug(pathname);
  if (!id) {
    notFound();
  }

  const data = await getBuilderDetailsPageData(id.split("_")[1], pathname);

  return <BuilderPage data={data} id={id.split("_")[1]} />;
}

export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("builder-list");

  // Prepare the slugs for static generation
  const builderRess = Object.keys(res);
  const slugs = builderRess.map((data) => {
    const [staticPath, staticPath2, city, slug] = data.split("/");
    return { city, slug };
  });
  return slugs;
}

export const dynamicParams = true;
