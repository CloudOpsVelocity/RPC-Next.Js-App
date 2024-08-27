import React from "react";
import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
import { getSearchData } from "../../../utils/api";

type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
  };
};

export default async function Page({ params: { cg, city } }: Props) {
  const severData = await getSearchData(``);
  return <ListingSearchPage serverData={severData} frontendFilters={{}} />;
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
    if (data.includes("/in/for/")) {
      const [emtypath, country, cg, city, lt, slug] = data.split("/");
      return { cg, city };
    }
  });
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
