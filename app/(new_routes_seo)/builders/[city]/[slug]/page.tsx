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
  // const res = await getPagesSlugs("builder-list");
  let res = {
    "/builders/bengaluru/aaa": "9_146",
    "/builders/bengaluru/builder-tesing": "9_160",
    "/builders/bengaluru/next-builder": "9_3",
    "/builders/bengaluru/sattva-resi-private-limited": "9_145",
    "/builders/bengaluru/sowparnika": "9_52",
    "/builders/bengaluru/sdffds": "9_156",
    "/builders/bengaluru/sivaprasad": "9_4",
    "/builders/bengaluru/ashed-properties-and-investments-private-limited":
      "9_165",
    "/builders/bengaluru/sdf": "9_111",
    "/builders/bengaluru/sdrgtfh": "9_9",
    "/builders/bengaluru/total-india-environment-building-systems-pvt-ltd":
      "9_164",
    "/builders/bengaluru/nenfewn": "9_89",
    "/builders/bengaluru/testing-for-managing-director": "9_83",
    "/builders/bengaluru/trifecta-projects-private-limited": "9_104",
    "/builders/bengaluru/manish": "9_2",
    "/builders/bengaluru/prestige-group": "9_12",
    "/builders/bengaluru/provident-housing-limited-new": "9_148",
    "/builders/bengaluru/radiance-realty-developers-india-limited": "9_8",
    "/builders/bengaluru/hariyana-co.builder": "9_77",
    "/builders/bengaluru/vajram-group-(builders-&-developers-in-bangalore)":
      "9_127",
    "/builders/bengaluru/ds-max-properties-private-limited": "9_1",
    "/builders/bengaluru/ramya": "9_5",
    "/builders/bengaluru/builder-one": "9_158",
    "/builders/bengaluru/mayfair-builders": "9_103",
    "/builders/bengaluru/mansh": "9_147",
    "/builders/bengaluru/puravankara-builders-&-devlopers": "9_188",
    "/builders/bengaluru/testerofdata": "9_14",
    "/builders/bengaluru/myhnaproperties": "9_157",
  };
  // Prepare the slugs for static generation
  const builderRess = Object.keys(res);
  const slugs = builderRess.map((data) => {
    const [staticPath, staticPath2, city, slug] = data.split("/");
    return { city, slug };
  });
  return slugs;
}

export const dynamicParams = true;
