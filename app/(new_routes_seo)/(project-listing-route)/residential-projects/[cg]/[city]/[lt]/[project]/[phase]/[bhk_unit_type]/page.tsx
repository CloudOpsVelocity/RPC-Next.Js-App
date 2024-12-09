import ListingDetailsPage from "@/app/(dashboard)/listing/[city]/[slug]/Page/ListingDetailsPage";
import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import {
  findPathForProjectListing,
  getNestedSlug,
} from "@/app/(new_routes_seo)/in/utils/getSlugs";
import { extractListingParamsValues } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_PROJECT_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { getPagesSlugs } from "@/app/seo/api";
import { getAmenties, getAuthorityNames } from "@/app/utils/api/project";
import {
  getListingDetails,
  getProjectDetails,
  getReportConstData,
} from "@/app/utils/api/property";
import { notFound } from "next/navigation";
import React from "react";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
    bhk_unit_type: string;
    project: string;
    phase: string;
  };
};

export default async function Page({
  params,
}: Props) {
  const { bhk_unit_type, cg, city, lt, project, phase } = params
  const pathname = `${BASE_PATH_PROJECT_LISTING}/${cg}/${city}/${lt}/${project}${
    phase ? `/${phase}` : ""
  }/${bhk_unit_type}`;
  let serverData = null;
  const values = await findPathForProjectListing(pathname);
  if (!values) return notFound();
  const filtersValues = extractListingParamsValues(values);
  if (filtersValues.count === 8) {
    serverData = await getSearchData(
      `bhk=${filtersValues.BH}&propType=${filtersValues.PT}&localities=${filtersValues.LT}&cg=${filtersValues.CG}&projIdEnc=${filtersValues.PJ}`
    );
  } else {
    const {
      listing: data,
      nearByLocations,
      totalPrice,
    } = await getListingDetails((filtersValues.id as string) ?? "");

    const [projData, issueData, amenities] = await Promise.all([
      getProjectDetails(data.projIdEnc),
      getReportConstData(),
      getAmenties(),
    ]);
    if(projData?.projAuthorityId){
      const res = await getAuthorityNames(projData.projAuthorityId);
      data.projAuthorityNames = res;
    }
    const TITLE_OF_PROP = data.projIdEnc
      ? data.propName
      : `${data.bhkName ?? ""} ${data.propTypeName} For
    ${data.cg === "S" ? " Sell" : " Rent"} In ${data.ltName}`;
    serverData = {
      TITLE_OF_PROP,
      data,
      projData,
      issueData,
      amenitiesFromDB: amenities,
      nearByLocations,
      totalPrice,
    };
  }
const isProjectListing = filtersValues.PT == "32" ? 7 : filtersValues.count === 8 
  return filtersValues.count === isProjectListing ? (
    <ListingSearchPage
      serverData={serverData}
      frontendFilters={{
        locality: [`${lt}+${filtersValues.LT}`],
        unitTypes: [parseInt(filtersValues.BH as string)],
        propTypes: parseInt(filtersValues.PT as string),
        cg: filtersValues.CG,
        projName: project,
        projIdEnc: filtersValues.PJ,
      }}
    />
  ) : (
    <ListingDetailsPage params={params} {...serverData} />
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
//       return { cg, city, lt, project, bhk_unit_type };
//     }
//   });
//   return slugs;
// }
export const dynamic = "force-dynamic";
export const dynamicParams = true;
