import React from "react";
import { getNestedSlug } from "../../../utils/getSlugs";
import { getSearchData } from "../../../utils/api";
import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";

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
  const severData = await getSearchData(`localities=${locality}`);
  return (
    <ListingSearchPage
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
  // const res = await getPagesSlugs("listing-search-seo");
  const res = {
    "/in/for-sale/bangalore/varthur/2bhk-apartment/listing-1":
      "S_9_28_43_35_75d462b9587bde2103fcd01a6e87a424",
    "/in/for/sale/bangalore/varthur/sobha-dream-acres/2bhk-apartment/listing-2":
      "S_9_28_989b51e0bc9ef35ade73826a63c1576a_43_35_75d462b9587bde2103fcd01a6e87a424",
  };

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
