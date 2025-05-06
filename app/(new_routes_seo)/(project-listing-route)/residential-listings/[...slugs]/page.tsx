import ListingDetailsPage from "@/app/(dashboard)/listing/[city]/[slug]/Page/ListingDetailsPage";
import {
  getProjSearchData,
  getSearchData,
} from "@/app/(new_routes_seo)/in/utils/api";
import { findPathForProjectListing } from "@/app/(new_routes_seo)/in/utils/getSlugs";
import NewListingSearchpage from "@/app/(new_routes_seo)/search/listing/NewListingSearchpage";
import parseProjectSearchQueryParams from "@/app/(new_routes_seo)/search/utils/parse-project-searchqueryParams";
import { parseApiFilterQueryParams } from "@/app/(new_routes_seo)/search/utils/project-search-queryhelpers";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_PROJECT_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { getAmenties, getAuthorityNames } from "@/app/utils/api/project";
import {
  getListingDetails,
  getProjectDetails,
  getReportConstData,
} from "@/app/utils/api/property";
import logger from "@/app/utils/logger";
import { Metadata, ResolvingMetadata } from "next";

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

  let isProjectListing = listing ? true : bhk_unit_type?.includes("listing");

  let serverData = null;
  let filtersValues: any = {};
  let frontendFilters = null;
  if (searchParams.sf) {
    const apiFilters = parseApiFilterQueryParams(searchParams.sf);
    const isProj = apiFilters?.includes("listedBy=proj") ? true : false;
    // eslint-disable-next-line no-unused-vars
    const apiResData = isProj
      ? await getProjSearchData(apiFilters ?? "")
      : await getSearchData(apiFilters ?? "");
    serverData = apiResData.results;
    frontendFilters = {
      ...parseProjectSearchQueryParams(searchParams.sf),
      currentPage: 1,
      totalCount: apiResData.totalCount,
    };
  } else {
    if (!isProjectListing) {
      const values = await findPathForProjectListing(pathname);
      if (!values) return notFound();
      filtersValues = extractListingParamsValues(values);
      const queryParams = [];

      if (filtersValues.BH) queryParams.push(`bhk=${filtersValues.BH}`);
      if (filtersValues.PT) queryParams.push(`propType=${filtersValues.PT}`);
      if (filtersValues.LT) queryParams.push(`localities=${filtersValues.LT}`);
      if (filtersValues.CG) queryParams.push(`cg=${filtersValues.CG}`);
      if (filtersValues.PJ) queryParams.push(`projIdEnc=${filtersValues.PJ}`);
      if (filtersValues.PH) queryParams.push(`phaseId=${filtersValues.PH}`);
      if (filtersValues.PG) queryParams.push(`page=${filtersValues.PG}`);

      const queryString = queryParams.join("&");
      const apiResData = await getSearchData(queryString);
      serverData = apiResData.results;
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
        currentPage: parseInt(filtersValues.PG),
        totalCount: apiResData.totalCount,
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

export async function generateStaticParams() {
  const slugs = await generateSlugs("listing-search-seo", "project-listing");
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: {
    slugs: string[];
  };
}): Promise<Metadata> {
  const [cg, city, lt, project, phase, bhk_unit_type, listing] = params.slugs;
  if (!bhk_unit_type.includes("listing")) {
    return {
      title: `${bhk_unit_type.replace(/-/g, " ")} in ${lt.replace(
        /-/g,
        " "
      )} for ${cg === "for-sale" ? "Sale" : "Rent"} in ${project.replace(
        /-/g,
        " "
      )}, ${city.replace(/-/g, " ")} `,
      description: `Looking for ${bhk_unit_type.replace(
        /-/g,
        " "
      )} properties for ${
        cg === "for-sale" ? "sale" : "rent"
      } in ${project.replace(/-/g, " ")}, ${lt.replace(
        /-/g,
        " "
      )}, ${city.replace(
        /-/g,
        " "
      )}? Find verified listings with detailed information about amenities, prices and more. Browse through our extensive collection of residential properties on Getrightproperty - Your trusted property search platform.`,
      openGraph: {
        title: `${bhk_unit_type.replace(/-/g, " ")} in ${lt.replace(
          /-/g,
          " "
        )} for ${cg === "S" ? "Sale" : "Rent"} in ${project.replace(
          /-/g,
          " "
        )}, ${city.replace(/-/g, " ")}`,
        description: `Looking for ${bhk_unit_type.replace(
          /-/g,
          " "
        )} properties for ${cg === "S" ? "sale" : "rent"} in ${project.replace(
          /-/g,
          " "
        )}, ${lt.replace(/-/g, " ")}, ${city.replace(
          /-/g,
          " "
        )}? Find verified listings with detailed information about amenities, prices and more. Browse through our extensive collection of residential properties on Getrightproperty - Your trusted property search platform.`,
      },
    };
  }

  const id = (listing || bhk_unit_type).split("-")[1];
  const { listing: data } = await getListingDetails(id as string);
  const keywords = `${data.bhkName ?? ""}, ${data.propTypeName}, ${
    data.ltName
  }, ${data.ctName}, ${data.cg === "S" ? "Sale" : "Rent"}`;
  return {
    title: `${data.bhkName ?? ""} ${data.propTypeName} ${data.propName} for ${
      data.cg === "S" ? " Sale" : " Rent"
    } in ${data.ltName}`,
    description: `Searching ${data.bhkName ?? ""} ${data.propTypeName} ${
      data.propName
    }, for ${data.cg === "S" ? " Sale" : " Rent"} in ${
      data.ltName
    }, Bangalore. Get a verified search on Get Right property. New Age Property Portal.`,
    applicationName: "Getrightproperty",
    keywords: keywords,
    openGraph: {
      title: `${data.bhkName ?? ""} ${data.propTypeName} for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${data.ltName} `,
      description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${
        data.ltName
      }, Bangalore. Get a verified search on Get Right property. New Age Property Portal.`,
      url: data.projMedia.coverImageUrl,
      type: "website",
      images: [
        {
          url: data.projMedia.coverImageUrl,
          width: 800,
          height: 600,
          alt: `${data.bhkName ?? ""} ${data.propTypeName} for ${
            data.cg === "S" ? " Sale" : " Rent"
          } in ${data.ltName} `,
        },
      ],
      locale: "en_US",
      siteName: "Getrightproperty",
      countryName: "India",
      emails: ["rahulrpclan@gamil.com"],
      phoneNumbers: ["+91-8884440963"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Getrightproperty",
      title: `${data.bhkName ?? ""} ${data.propTypeName} for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${data.ltName}`,
      description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${
        data.ltName
      }, Bangalore. Get a verified search without any charges on Getrightproperty.`,
      images: data.projMedia.coverImageUrl,
    },
  };
}
