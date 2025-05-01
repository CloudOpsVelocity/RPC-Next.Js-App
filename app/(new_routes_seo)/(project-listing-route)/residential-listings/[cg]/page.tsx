/* eslint-disable no-unused-vars */
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
import NewListingSearchpage from "@/app/(new_routes_seo)/search/listing/NewListingSearchpage";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { cg: string };
};

export default async function Page({ params: { cg } }: Props) {
  const pathname = `${BASE_PATH_PROJECT_LISTING}/${cg}`;
  const values = await findPathForProjectListing(pathname);
  if (!values) return notFound();
  const slugValues = extractListingParamsValues(values);
  const severData = await getSearchData(`cg=${slugValues.CG}`);
  const pageUrl = `${pathname}`;
  return (
    <NewListingSearchpage
      serverData={severData}
      frontendFilters={{
        cg: slugValues.CG,
        // listedBy: "All",
      }}
      showProjectTab
      pageUrl={pageUrl}
    />
  );
}

export async function generateMetadata(
  { params }: { params: { cg: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { cg } = params;
  const categoryFormatted = cg
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const title = `Residential Properties ${categoryFormatted} in India - GRP`;
  const description = `Find the best residential properties ${cg} in India. Explore apartments, flats, villas, villaments, plots and builder floors. Get verified details and connect with top real estate agents.`;
  const url = `https://www.getrightproperty.com/residential-listings/${cg}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Get Right Property",
      type: "website",
      locale: "en_US",
    },
  };
}
export async function generateStaticParams() {
  const slugs = await generateSlugs("listing-search-seo", "project-listing");
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
