import React from "react";
import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
import { getPagesSlugs } from "@/app/seo/api";
import ProjectSearchPage from "@/app/(dashboard)/search/Page/ProjectSearchPage";
import { getNestedSlug } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import { getProjSearchData } from "@/app/(new_routes_seo)/in/utils/api";
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
  };
};

export default async function Page({ params: { cg, city, lt } }: Props) {
  const pathname = `${BASE_PATH_LISTING}/${cg}/${city}/${lt}`;
  const values = await getNestedSlug(pathname, -2);
  const slugValues = extractListingParamsValues(values);
  const severData = await getProjSearchData(`localities=${slugValues.LT}`);
  return (
    <ProjectSearchPage
      serverData={severData}
      frontendFilters={{
        locality: [`${lt}+${slugValues.LT}`],
        cg: slugValues.CG,
      }}
    />
  );
}
export async function generateStaticParams() {
  const slugs = generateSlugs("listing-search-seo");
  return slugs;
  // // Get the data (mocked here, replace with your actual data fetching logic)
  // const res = await getPagesSlugs("listing-search-seo");
  // // Extract project names from the keys
  // const projectRes = Object.keys(res);
  // const slugs = projectRes.map((data) => {
  //   if (data.includes("/in/for-")) {
  //     const [emtypath, country, cg, city, lt, slug] = data.split("/");
  //     return { cg, city, lt };
  //   }
  // });
  // return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
