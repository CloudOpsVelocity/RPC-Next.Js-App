import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import { getNestedSlug } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import { getPagesSlugs } from "@/app/seo/api";
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
  const pathname = `/in/for/${cg}/${city}/${lt}/${project}`;
  const values = await getNestedSlug(pathname, -2);
  const [buyorent, , locality, projectId] = values?.split("_") ?? [
    "1",
    "2",
    "3",
  ];
  const severData = await getSearchData(
    `localities=${locality}&cg=${buyorent}&projIdEnc=${projectId}`
  );
  return (
    <ListingSearchPage
      serverData={severData}
      frontendFilters={{
        locality: [`${lt}+${locality}`],
        cg: buyorent,
        projName: project,
        projIdEnc: projectId,
      }}
    />
  );
}

// export async function generateStaticParams() {
//   // Get the data (mocked here, replace with your actual data fetching logic)
//   const res = await getPagesSlugs("listing-search-seo");

//   // Extract project names from the keys
//   const projectRes = Object.keys(res);
//   const slugs = projectRes.map((data) => {
//     if (data.includes("/in/for/")) {
//       const [
//         emtypath,
//         country,
//         staticPath,
//         cg,
//         city,
//         lt,
//         project,
//         bhk_unit_type,
//         slug,
//       ] = data.split("/");
//       return { cg, city, lt, project };
//     }
//   });
//   return slugs;
// }
export const dynamic = "force-dynamic";
export const dynamicParams = true;
