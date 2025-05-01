import React from "react";
// import ListingSearchPage from "@/app/(dashboard)/searchOldPage/listing/Page/ListingSearchPage";
// import { getPagesSlugs } from "@/app/seo/api";
// import ProjectSearchPage from "@/app/(dashboard)/searchOldPage/Page/ProjectSearchPage";
import {
  findPathForProjectListing,
  // getNestedSlug,
} from "@/app/(new_routes_seo)/in/utils/getSlugs";
import { getProjSearchData, getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import {
  extractListingParamsValues,
  generateSlugs,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing";
import {
  // BASE_PATH_LISTING,
  BASE_PATH_PROJECT_LISTING,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import { notFound } from "next/navigation";
import NewSearchPage from "@/app/(new_routes_seo)/search/NewSearchPage";
import NewListingSearchpage from "@/app/(new_routes_seo)/search/listing/NewListingSearchpage";
import { Metadata, ResolvingMetadata } from "next";
import { parseApiFilterQueryParams } from "@/app/(new_routes_seo)/search/utils/project-search-queryhelpers";
import parseProjectSearchQueryParams from "@/app/(new_routes_seo)/search/utils/parse-project-searchqueryParams";
type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
  };
  searchParams: {
    sf: string;
  };
};

export default async function Page({ params: { cg, city, lt }, searchParams }: Props) {
  const pathname = `${BASE_PATH_PROJECT_LISTING}/${cg}/${city}/${lt}`;
  const values = await findPathForProjectListing(pathname);
  if (!values) return notFound();
  if(searchParams.sf){
      const apiFilters = searchParams.sf
        ? parseApiFilterQueryParams(searchParams.sf)
        : null;
      const frontendFilters = parseProjectSearchQueryParams(searchParams.sf);
      const isProj = apiFilters?.includes("listedBy=proj") ? true : false;
      const data = isProj
        ? await getProjSearchData(apiFilters ?? "")
        : await getSearchData(apiFilters ?? "");
  }
  else{
    
  }
  const slugValues = extractListingParamsValues(values);
  const severData = await getSearchData(`localities=${slugValues.LT}`);
  return (
    <NewListingSearchpage
      serverData={severData}
      frontendFilters={{
        localities: [`${lt}+${slugValues.LT}`],
        cg: slugValues.CG,
        listedBy: "All",
      }}
      pageUrl={pathname}
      showProjectTab
    />
  );
}
export async function generateStaticParams() {
  const slugs = generateSlugs("listing-search-seo", "project-listing");
  return slugs;
  // // Get the data (mocked here, replace with your actual data fetching logic)
  // const res = await getPagesSlugs("listing-search-seo");
  // // Extract project names from the keys
  // const projectRes = Object.keys(res);
  // const slugs = projectRes.map((data) => {
  //   if (data.includes("/in/for-")) {
  //     const [emtypath, country, cg, city, lt, slug] = data.split("/");
  //     return { cg, city, lt };
  //   }
  // });
  // return slugs;
}
export async function generateMetadata(
  { params }: { params: { cg: string; city: string; lt: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { cg, city, lt } = params;
  const categoryFormatted = cg
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const cityFormatted = city.charAt(0).toUpperCase() + city.slice(1);
  const localityFormatted = lt
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const title = `Residential Properties ${categoryFormatted} in ${localityFormatted}, ${cityFormatted} - GRP`;
  const description = `Find the best residential properties ${categoryFormatted} in ${localityFormatted}, ${cityFormatted}. Explore apartments, flats, villas, villaments, plots and builder floors. Get verified details and connect with top real estate agents.`;
  const url = `https://www.getrightproperty.com/residential-listings/${cg}/${city}/${lt}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Get Right Property",
      type: "website",
      locale: "en_US",
    },
  };
}
export const dynamic = "force-dynamic";
export const dynamicParams = true;
