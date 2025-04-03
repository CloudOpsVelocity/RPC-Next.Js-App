import { findPathForProjectListing } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_PROJECT_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { cg: string };
};

export default async function Page({ params: { cg } }: Props) {
  const pathname = `${BASE_PATH_PROJECT_LISTING}/${cg}`;
  const values = await findPathForProjectListing(pathname);
  if (!values) return notFound();
  const slugValues = extractListingParamsValues(values);
  const severData = await getSearchData(`cg=${slugValues.CG}`);
  const pageUrl = `/${pathname}`;
  return (
    <NewSearchPage
      serverData={severData}
      frontendFilters={{
        cg: slugValues.CG,
        listedBy: "All",
      }}
      pageUrl={pageUrl}
    />
  );
}
export async function generateStaticParams() {
  const slugs = await generateSlugs("listing-search-seo", "project-listing");
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
