import ListingSearchPage from "@/app/(dashboard)/searchOldPage/listing/Page/ListingSearchPage";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import {
  findPathForProjectListing,
  getNestedSlug,
} from "@/app/(new_routes_seo)/in/utils/getSlugs";
import NewListingSearchpage from "@/app/(new_routes_seo)/search/listing/NewListingSearchpage";
import { extractListingParamsValues } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_PROJECT_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { notFound } from "next/navigation";
import React from "react";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
    phase: string;
    bhk_unit_type: string;
    project: string;
  };
};

export default async function Page({ params }: Props) {
  const { cg, city, lt, project } = params;
  const pathname = `${BASE_PATH_PROJECT_LISTING}/${cg}/${city}/${lt}/${project}`;
  const values = await findPathForProjectListing(pathname);
  console.log(values);
  if (!values) return notFound();
  const filtersValues = extractListingParamsValues(values);
  const severData = await getSearchData(
    `localities=${filtersValues.LT}&cg=${filtersValues.CG}&projIdEnc=${
      filtersValues.PJ
    }${filtersValues.PH ? `&phaseId=${filtersValues.PH}` : ""}`
  );
  console.log(filtersValues);
  return (
    <NewListingSearchpage
      serverData={severData}
      frontendFilters={{
        localities: [`${lt}+${filtersValues.LT}`],
        cg: filtersValues.CG,
        projName: project,
        projIdEnc: filtersValues.PJ,
        ...(filtersValues.count === 7
          ? {
              bhk: [parseInt(filtersValues.BH as string)],
              propType: parseInt(filtersValues.PT as string),
            }
          : {}),
        ...(filtersValues.PH && {
          phaseId: [`${params.phase}+${filtersValues.PH}`],
        }),
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
