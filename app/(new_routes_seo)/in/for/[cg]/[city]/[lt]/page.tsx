import React from "react";
import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
import { getNestedSlug } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import {
  getProjSearchData,
  getSearchData,
} from "@/app/(new_routes_seo)/in/utils/api";
import { getPagesSlugs } from "@/app/seo/api";
import ProjectSearchPage from "@/app/(dashboard)/search/Page/ProjectSearchPage";

type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
  };
};

export default async function Page({ params: { cg, city, lt } }: Props) {
  const pathname = `/in/for/${cg}/${city}/${lt}`;
  const values = await getNestedSlug(pathname, -3);
  const [buyorent, , locality] = values.split("_");
  const severData = await getProjSearchData(`localities=${locality}`);
  return (
    <ProjectSearchPage
      serverData={severData}
      frontendFilters={{
        locality: [`${lt}+${locality}`],
        cg: buyorent,
      }}
    />
  );
}
export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("listing-search-seo");

  // Extract project names from the keys
  const projectRes = Object.keys(res);
  const slugs = projectRes.map((data) => {
    if (data.includes("/in/for/")) {
      const [emtypath, country, staticPath, cg, city, lt, slug] =
        data.split("/");
      return { cg, city, lt };
    }
  });
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
