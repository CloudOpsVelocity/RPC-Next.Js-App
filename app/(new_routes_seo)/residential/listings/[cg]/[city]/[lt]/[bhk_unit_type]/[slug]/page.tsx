import ListingDetailsPage from "@/app/(dashboard)/listing/[city]/[slug]/Page/ListingDetailsPage";

import { getPagesSlugs } from "@/app/seo/api";
import { getAmenties } from "@/app/utils/api/project";
import {
  getListingDetails,
  getProjectDetails,
  getReportConstData,
} from "@/app/utils/api/property";
import { getStringPartByIndex } from "@/app/utils/dyanamic/projects";
import { notFound } from "next/navigation";
import path from "path";
import React from "react";
import fs from "fs";
import getListingSLugs, {
  findPathForProjectListing,
  getNestedSlug,
} from "@/app/(new_routes_seo)/in/utils/getSlugs";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
    bhk_unit_type: string;
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const pathname = `${BASE_PATH_LISTING}/${params.cg}/${params.city}/${params.lt}/${params.bhk_unit_type}/${params.slug}`;
  const value = await findPathForProjectListing(pathname);
  if (!value) return notFound();
  const { id } = extractListingParamsValues(value);
  console.log("hello form listing details page during builder");
  if (!id) {
    notFound();
  }
  const {
    listing: data,
    nearByLocations,
    totalPrice,
  } = await getListingDetails(id as string);
  const [projData, issueData, amenities] = await Promise.all([
    getProjectDetails(data.projIdEnc),
    getReportConstData(),
    getAmenties(),
  ]);
  const TITLE_OF_PROP = data.projIdEnc
    ? data.propName
    : `${data.bhkName ?? ""} ${data.propTypeName} For
  ${data.cg === "S" ? " Sell" : " Rent"} In ${data.ltName}`;
  if (!data.propIdEnc) {
    console.log("slug found data not coming for this listing" + pathname);
    notFound();
  }
  return (
    <ListingDetailsPage
      TITLE_OF_PROP={TITLE_OF_PROP}
      amenitiesFromDB={amenities}
      data={data}
      projData={projData}
      issueData={issueData}
      nearByLocations={nearByLocations}
      totalPrice={totalPrice}
      params={params}
    />
  );
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = generateSlugs("listing-search-seo", "solo-listing");
  return slugs;
  // Get the data (mocked here, replace with your actual data fetching logic)
  // const res = await getPagesSlugs("listing-search-seo");
  // const staticDir = path.join(process.cwd(), "static");
  // const filePath = path.join(staticDir, "listingSlugs.json");
  // // Ensure the 'static' directory exists
  // if (!fs.existsSync(staticDir)) {
  //   fs.mkdirSync(staticDir);
  // }
  // // Convert the data object into JSON
  // const jsonContent = JSON.stringify(res, null, 2);
  // // Write the JSON data to the file
  // fs.writeFileSync(filePath, jsonContent);
  // // Extract project names from the keys
  // const projectRes = Object.keys(res);
  // const slugs = projectRes.map((data) => {
  //   if (data.includes("/in/for-")) {
  //     const [emtypath, country, cg, city, lt, bhk_unit_type, slug] =
  //       data.split("/");
  //     return { cg, city, lt, bhk_unit_type, slug };
  //   }
  // });
  // return slugs;
}
