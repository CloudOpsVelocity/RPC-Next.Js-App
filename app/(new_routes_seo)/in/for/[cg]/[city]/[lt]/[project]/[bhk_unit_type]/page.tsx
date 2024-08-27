import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import { getNestedSlug } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import React from "react";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
    bhk_unit_type: string;
    project: string;
  };
};

export default async function Page({
  params: { bhk_unit_type, cg, city, lt, project },
}: Props) {
  const pathname = `/in/for/${cg}/${city}/${lt}/${project}/${bhk_unit_type}`;
  const values = await getNestedSlug(pathname, -1);
  const [buyorent, , locality, projectId, bhk, propType] = values?.split("_");
  const severData = await getSearchData(
    `bhk=${bhk}&propType=${propType}&localities=${locality}&cg=${buyorent}&projIdEnc=${projectId}`
  );
  return (
    <ListingSearchPage
      serverData={severData}
      frontendFilters={{
        locality: [`${lt}+${locality}`],
        unitTypes: [parseInt(bhk)],
        propTypes: parseInt(propType),
        cg: buyorent,
        projName: project,
        projIdEnc: projectId,
      }}
    />
  );
}

export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  // const res = await getPagesSlugs("listing-search-seo");
  const res = {
    "/in/for-sale/bangalore/varthur/2bhk-apartment/listing-1":
      "R_9_28_43_35_75d462b9587bde2103fcd01a6e87a424",
    "/in/for/sale/bangalore/varthur/sobha-dream-acres/2bhk-apartment/listing-2":
      "S_9_28_989b51e0bc9ef35ade73826a63c1576a_43_35_75d462b9587bde2103fcd01a6e87a424",
  };

  // Extract project names from the keys
  const projectRes = Object.keys(res);
  const slugs = projectRes.map((data) => {
    if (data.includes("/in/for/")) {
      const [emtypath, country, cg, city, lt, project, bhk_unit_type, slug] =
        data.split("/");
      return { cg, city, lt, project, bhk_unit_type };
    }
  });
  return slugs;
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
