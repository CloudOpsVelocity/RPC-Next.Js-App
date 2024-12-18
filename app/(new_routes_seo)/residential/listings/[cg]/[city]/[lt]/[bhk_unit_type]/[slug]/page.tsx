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
  ${data.cg === "S" ? " Sale" : " Rent"} In ${data.ltName}`;
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
}
