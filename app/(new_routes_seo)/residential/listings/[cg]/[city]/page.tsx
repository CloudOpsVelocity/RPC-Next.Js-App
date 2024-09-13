import React from "react";
import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
import { getPagesSlugs } from "@/app/seo/api";
import ProjectSearchPage from "@/app/(dashboard)/search/Page/ProjectSearchPage";
import { getProjSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import { generateSlugs } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";

type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
  };
};

export default async function Page({ params: { cg, city } }: Props) {
  const severData = await getProjSearchData(``);
  return <ProjectSearchPage serverData={severData} frontendFilters={{}} />;
}
export async function generateStaticParams() {
  const slugs = generateSlugs("listing-search-seo");
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
