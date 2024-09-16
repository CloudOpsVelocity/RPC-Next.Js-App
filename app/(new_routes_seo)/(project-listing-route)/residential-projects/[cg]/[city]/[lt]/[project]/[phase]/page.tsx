import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import {
  findPathForProjectListing,
  getNestedSlug,
} from "@/app/(new_routes_seo)/in/utils/getSlugs";
import { extractListingParamsValues } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_PROJECT_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
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

export default async function Page({ params }: Props) {
  const { bhk_unit_type, cg, city, lt, project } = params;
  const pathname = `${BASE_PATH_PROJECT_LISTING}/${cg}/${city}/${lt}/${project}`;
  const values = await findPathForProjectListing(pathname);
  const filtersValues = extractListingParamsValues(values);
  const severData = await getSearchData(
    `localities=${filtersValues.LT}&cg=${filtersValues.CG}&projIdEnc=${filtersValues.PJ}`
  );
  return (
    <ListingSearchPage
      serverData={severData}
      frontendFilters={{
        locality: [`${lt}+${filtersValues.LT}`],
        cg: filtersValues.CG,
        projName: project,
        projIdEnc: filtersValues.PJ,
        ...(filtersValues.count === 7
          ? {
              unitTypes: [parseInt(filtersValues.BH as string)],
              propTypes: parseInt(filtersValues.PT as string),
            }
          : {}),
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
