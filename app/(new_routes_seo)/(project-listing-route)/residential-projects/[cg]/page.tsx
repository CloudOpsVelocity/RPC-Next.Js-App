import ProjectSearchPage from "@/app/(dashboard)/search/Page/ProjectSearchPage";
import { getProjSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import { getNestedSlug } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import {
  BASE_PATH_LISTING,
  BASE_PATH_PROJECT_LISTING,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import React from "react";

type Props = {
  params: { cg: string };
};

export default async function Page({ params: { cg } }: Props) {
  const pathname = `${BASE_PATH_PROJECT_LISTING}/${cg}`;
  const values = await getNestedSlug(pathname, -5);

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
  const slugs = await generateSlugs("listing-search-seo", "project-listing");
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
