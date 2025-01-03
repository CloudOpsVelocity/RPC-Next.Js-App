import ListingSearchPage from "@/app/(dashboard)/search/listing/Page/ListingSearchPage";
import ProjectSearchPage from "@/app/(dashboard)/search/Page/ProjectSearchPage";
import {
  getProjSearchData,
  getSearchData,
} from "@/app/(new_routes_seo)/in/utils/api";
import {
  findPathForProjectListing,
  getNestedSlug,
} from "@/app/(new_routes_seo)/in/utils/getSlugs";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import { BASE_PATH_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { getListingDetails } from "@/app/utils/api/property";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
    bhk_unit_type: string;
  };
};
// 50 , 16
export default async function Page({
  params: { bhk_unit_type, cg, city, lt },
}: Props) {
  const pathname = `${BASE_PATH_LISTING}/${cg}/${city}/${lt}/${bhk_unit_type}`;
  const values = await findPathForProjectListing(pathname);
  if (!values) return notFound();
  const { CG, BH, PT, LT } = extractListingParamsValues(values);
  let severData;
  if (PT === "36") {
    severData = await getSearchData(
      `bhk=${BH}&propType=${PT}&localities=${LT}&cg=${CG}`
    );
  } else {
    severData = await getProjSearchData(
      `bhk=${BH}&propType=${PT}&localities=${LT}&cg=${CG}`
    );
  }
  return PT === "36" ? (
    <ListingSearchPage
      serverData={severData}
      frontendFilters={{
        locality: [`${lt}+${LT}`],
        unitTypes: [parseInt(BH as string)],
        propTypes: parseInt(PT as string),
        cg: CG,
      }}
    />
  ) : (
    <ProjectSearchPage
      serverData={severData}
      frontendFilters={{
        locality: [`${lt}+${LT}`],
        unitTypes: [parseInt(BH as string)],
        propTypes: parseInt(PT as string),
        cg: CG,
      }}
    />
  );
}

export async function generateStaticParams() {
  const slugs = generateSlugs("listing-search-seo", "solo-listing");
  return slugs;
  // Get the data (mocked here, replace with your actual data fetching logic)
  // const res = await getPagesSlugs("listing-search-seo");
  // // Extract project names from the keys
  // const projectRes = Object.keys(res);
  // const slugs = projectRes.map((data) => {
  //   if (data.includes("/in/for-")) {
  //     const [emtypath, country, cg, city, lt, bhk_unit_type, slug] =
  //       data.split("/");
  //     return { cg, city, lt, bhk_unit_type };
  //   }
  // });
  // return slugs;
}
export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!params.bhk_unit_type.includes("listing")) {
    return {
      title: "Listing Search Page",
      description: "Listing Search Page",
    };
  }
  const id = params.slug.split("-")[1];
  const {
    listing: data,
    nearByLocations,
    totalPrice,
  } = await getListingDetails(id as string);
  return {
    title: `${data.bhkName ?? ""} ${data.propTypeName}, for ${
      data.cg === "S" ? " Sale" : " Rent"
    } in ${data.ltName} - Getrightproperty`,
    description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
      data.cg === "S" ? " Sale" : " Rent"
    } in ${
      data.ltName
    }, Bangalore. Get a verified search without any charges on Getrightproperty. Property Search Application`,
    openGraph: {
      title: `${data.bhkName ?? ""} ${data.propTypeName}, for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${data.ltName} - Getrightproperty`,
      description: `Searching ${data.bhkName ?? ""} ${data.propTypeName}, for ${
        data.cg === "S" ? " Sale" : " Rent"
      } in ${
        data.ltName
      }, Bangalore. Get a verified search without any charges on Getrightproperty. Property Search Application`,
    },
  };
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
