import ProjectSearchPage from "@/app/(dashboard)/searchOldPage/Page/ProjectSearchPage";
import { getProjSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import {
  findPathForProjectListing,
  getNestedSlug,
} from "@/app/(new_routes_seo)/in/utils/getSlugs";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { cg: string };
};

export default async function Page({ params: { cg } }: Props) {
  const pathname = `${BASE_PATH_LISTING}/${cg}`;
  const values = await findPathForProjectListing(pathname);
  if (!values) return notFound();
  const slugValues = extractListingParamsValues(values);
  const severData = await getProjSearchData(`cg=${slugValues.CG}`);
  return (
    <ProjectSearchPage
      serverData={severData}
      frontendFilters={{
        cg: slugValues.CG,
      }}
    />
  );
}
export async function generateStaticParams() {
  const slugs = await generateSlugs("listing-search-seo", "solo-listing");
  console.log(slugs, "it is from cg route.tsx");
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
