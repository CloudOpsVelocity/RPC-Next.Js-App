import ListingDetailsPage from "@/app/(dashboard)/listing/[city]/[slug]/Page/ListingDetailsPage";
import {
  getProjSearchData,
  getSearchData,
} from "@/app/(new_routes_seo)/in/utils/api";
import { findPathForProjectListing } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import NewListingSearchpage from "@/app/(new_routes_seo)/search/listing/NewListingSearchpage";
import parseProjectSearchQueryParams from "@/app/(new_routes_seo)/search/utils/parse-project-searchqueryParams";
import { parseApiFilterQueryParams } from "@/app/(new_routes_seo)/search/utils/project-search-queryhelpers";
import { extractListingParamsValues } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_PROJECT_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { getAmenties, getAuthorityNames } from "@/app/utils/api/project";
import {
  getListingDetails,
  getProjectDetails,
  getReportConstData,
} from "@/app/utils/api/property";

import { notFound } from "next/navigation";
type Props = {
  params: {
    slugs: string[];
  };
  searchParams: {
    sf: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const [cg, city, lt, project, phase, bhk_unit_type, listing] = params.slugs;
  const pathname = [
    BASE_PATH_PROJECT_LISTING,
    cg,
    city,
    lt,
    project,
    phase,
    bhk_unit_type,
    listing,
  ]
    .filter(Boolean)
    .join("/");

  // console.log(params);
  let isProjectListing = listing ? true : bhk_unit_type?.includes("listing");

  let serverData = null;
  let filtersValues: any = {};
  let frontendFilters = null;
  if (searchParams.sf) {
    const apiFilters = parseApiFilterQueryParams(searchParams.sf);
    const isProj = apiFilters?.includes("listedBy=proj") ? true : false;
    // eslint-disable-next-line no-unused-vars
    serverData = isProj
      ? await getProjSearchData(apiFilters ?? "")
      : await getSearchData(apiFilters ?? "");

    frontendFilters = parseProjectSearchQueryParams(searchParams.sf);
  } else {
    if (!isProjectListing) {
      const values = await findPathForProjectListing(pathname);
      if (!values) return notFound();
      filtersValues = extractListingParamsValues(values);
      serverData = await getSearchData(
        `${filtersValues.BH ? `bhk=${filtersValues.BH}&` : ""}propType=${
          filtersValues.PT
        }&localities=${filtersValues.LT}&cg=${filtersValues.CG}&projIdEnc=${
          filtersValues.PJ
        }${filtersValues.PH ? `&phaseId=${filtersValues.PH}` : ""}`
      );
      frontendFilters = {
        ...(lt && { localities: [`${lt}+${filtersValues.LT}`] }),
        ...((bhk_unit_type || phase) && {
          bhk: [parseInt(filtersValues.BH as string)],
        }),
        ...((bhk_unit_type || phase) && {
          propType: parseInt(filtersValues.PT as string),
        }),
        cg: filtersValues.CG,
        projName: project,
        projIdEnc: filtersValues.PH,
        ...(filtersValues.PH && {
          phaseId: [`${params.slugs[5]}+${filtersValues.PH}`],
        }),
        listedBy: null,
      };
    } else {
      const {
        listing: data,
        nearByLocations,
        totalPrice,
      } = await getListingDetails(
        (listing
          ? listing.split("-")[1]
          : (bhk_unit_type.split("-").at(-1) as string)) ?? "",
        pathname
      );

      const [projData, issueData, amenities] = await Promise.all([
        getProjectDetails(data.projIdEnc),
        getReportConstData(),
        getAmenties(),
      ]);
      if (projData?.projAuthorityId) {
        const res = await getAuthorityNames(projData.projAuthorityId);
        data.projAuthorityNames = res;
      }
      const TITLE_OF_PROP = data.projIdEnc
        ? data.propName
        : `${data.bhkName ?? ""} ${data.propTypeName} For
      ${data.cg === "S" ? " Sale" : " Rent"} In ${data.ltName}`;

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
  }
  console.log({ cg, city, lt, project, phase, bhk_unit_type, listing });
  return !isProjectListing ? (
    <NewListingSearchpage
      pageUrl={pathname}
      serverData={serverData}
      frontendFilters={frontendFilters}
      preDefinedFilters={searchParams.sf}
    />
  ) : (
    <ListingDetailsPage
      params={{
        cg,
        city,
        lt,
        project,
        phase,
        bhk_unit_type,
        ...(listing && { slug: listing }),
      }}
      {...serverData}
      pathname={pathname}
    />
  );
}
