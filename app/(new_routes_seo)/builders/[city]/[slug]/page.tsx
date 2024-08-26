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

  try {
    // Read the JSON file asynchronously
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const builderJsonData = JSON.parse(jsonData);
    return builderJsonData[pathname];
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return null;
  }
}
export default async function Page({ params: { city, slug } }: Props) {
  const pathname = `/builders/${city}/${slug}`;
  const id = await getBuilderSlug(pathname);
  console.log(id);
  if (!id) {
    notFound();
  }
  const data = await getBuilderDetailsPageData(id);
  return <BuilderPage data={data} />;
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
