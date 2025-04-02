import React from "react";
import dynamic from "next/dynamic";
const ListingSearhLeftSection = dynamic(() => import("./components/listingSearchTabs/listingSearchleftSection"));
// const ListingSearchRightSection = dynamic(() => import("./components/listingSearchTabs/listingSearchRightSection"));
const ProjectSearchBreadCrumbs = dynamic(() => import("../components/ProjSearchBreadCrums"));

import { ListingSearchSchema } from "@/app/seo/search/listing-search.schema";
import ListingSearchMapSection from "./components/listingSearchTabs/ListingSearchMapSection";

const ListingHeaderFilters = dynamic(() => import("./components/ListingSearchHeader"));

type Props = {
  serverData: any;
  frontendFilters: any;
  pageUrl: string;
};

export default function NewListingSearchpage({
  serverData,
  frontendFilters,
  pageUrl,
}: Props) {
  const isListing = true;

  // console.log(`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/default-search-page-map.webp`)

  return (
    <main className="pt-[70px] min-h-[calc(100vh)] relative">
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_URL}/${pageUrl}`}
      />
      {serverData && <ListingSearchSchema properties={serverData} />}
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs key="newSearchPage3" pageUrl={pageUrl} />


        <div className="flex flex-row items-start gap-2">
          <ListingHeaderFilters key="newSearchFilter3" isListing={isListing} />
        </div>
      </div>
      <div className="sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[184px] xl:pt-[220px] ">
        <ListingSearhLeftSection
          serverData={serverData}
          frontendFilters={frontendFilters}
        />
        <div className="w-[100%] sm:w-[50%] -z-10" />

        {/* <ListingSearchRightSection
          serverData={serverData}
          key="projListingSearchRightSection2"
        /> */}
        <ListingSearchMapSection serverData={serverData} />
      </div>
    </main>
  );
}
