import React from "react";
import { getNestedSlug } from "../../../utils/getSlugs";
import { getProjSearchData, getSearchData } from "../../../utils/api";
import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
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
  const pathname = `/in/${cg}/${city}/${lt}`;
  const values = await getNestedSlug(pathname, -2);
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
    if (data.includes("/in/for-")) {
      const [emtypath, country, cg, city, lt, slug] = data.split("/");
      return { cg, city, lt };
    }
  });
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
