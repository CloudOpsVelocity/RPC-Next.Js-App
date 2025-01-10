import React from "react";
import ListingSearchPage from "@/app/(dashboard)/searchOldPage/listing/Page/ListingSearchPage";
import { getPagesSlugs } from "@/app/seo/api";
import ProjectSearchPage from "@/app/(dashboard)/searchOldPage/Page/ProjectSearchPage";
import { getProjSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import {
  BASE_PATH_LISTING,
  BASE_PATH_PROJECT_LISTING,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import {
  findPathForProjectListing,
  getNestedSlug,
} from "@/app/(new_routes_seo)/in/utils/getSlugs";
import { notFound } from "next/navigation";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";

type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
  };
};
export default async function Page({ params: { cg, city } }: Props) {
  const pathname = `${BASE_PATH_PROJECT_LISTING}/${cg}/${city}`;
  const values = await findPathForProjectListing(pathname);
  if (!values) return notFound();
  const slugValues = extractListingParamsValues(values);
  const severData = await getProjSearchData(`cg=${slugValues.CG}`);
  return (
    <NewSearchPage
      serverData={severData}
      frontendFilters={{
        cg: slugValues.CG,
      }}
    />
  );
}
export async function generateStaticParams() {
  const slugs = generateSlugs("listing-search-seo", "project-listing");
  return slugs;
  // Get the data (mocked here, replace with your actual data fetching logic)
  // const res = await getPagesSlugs("listing-search-seo");
  // // Extract project names from the keys
  // const projectRes = Object.keys(res);
  // const slugs = projectRes.map((data) => {
  //   if (data.includes("/in/for-")) {
  //     const [emtypath, country, cg, city, lt, slug] = data.split("/");
  //     return { cg, city };
  //   }
  // });
  // return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
