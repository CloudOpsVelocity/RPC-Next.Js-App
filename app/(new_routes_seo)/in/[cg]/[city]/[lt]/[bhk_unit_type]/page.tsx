import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
import ProjectSearchPage from "@/app/(dashboard)/search/Page/ProjectSearchPage";
import {
  getProjSearchData,
  getSearchData,
} from "@/app/(new_routes_seo)/in/utils/api";
import { getNestedSlug } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
    bhk_unit_type: string;
  };
};
// 50 , 16
export default async function Page({
  params: { bhk_unit_type, cg, city, lt },
}: Props) {
  const pathname = `/in/${cg}/${city}/${lt}/${bhk_unit_type}`;
  const values = await getNestedSlug(pathname, -1);
  const [buyorent, , locality, bhk, propType] = values.split("_");
  const severData = await getProjSearchData(
    `bhk=${bhk}&propType=${propType}&localities=${locality}&cg=${buyorent}`
  );
  return (
    <ProjectSearchPage
      serverData={severData}
      frontendFilters={{
        locality: [`${lt}+${locality}`],
        unitTypes: [parseInt(bhk)],
        propTypes: parseInt(propType),
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
    if (data.includes("/in/for-")) {
      const [emtypath, country, cg, city, lt, bhk_unit_type, slug] =
        data.split("/");
      return { cg, city, lt, bhk_unit_type };
    }
  });
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
