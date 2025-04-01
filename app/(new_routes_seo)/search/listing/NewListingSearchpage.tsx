import React from "react";
import dynamic from "next/dynamic";
const ListingSearhLeftSection = dynamic(() => import("./components/listingSearchTabs/listingSearchleftSection"));
const ListingSearchRightSection = dynamic(() => import("./components/listingSearchTabs/listingSearchRightSection"));
// import ProjectSearchBreadCrumbs from "../components/ProjSearchBreadCrums";
const ProjectSearchBreadCrumbs = dynamic(() => import("../components/ProjSearchBreadCrums"));

import { ListingSearchSchema } from "@/app/seo/search/listing-search.schema";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { searchPageMapToggle } from "../store/projSearchStore";
// import ListingHeaderFilters from "./components/ListingSearchHeader";

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
  const isMapLoaded = useAtomValue(searchPageMapToggle);
  const isListing = true;

  console.log(`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/default-search-page-map.webp`)

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

        {isMapLoaded ? 
        <ListingSearchRightSection
          serverData={serverData}
          key="projListingSearchRightSection2"
        />
        :
        <div
          className={` w-full max-h-[70vh] sm:fixed right-0 flex justify-start items-start md:w-[60%] xl:w-[50%] scroll-mt-[150px] z-0 border-[2px] border-black-500 border-solid 
                    h-[calc(100vh-65vh)] md:h-[calc(100vh-255px)] w-full max-w-full`}
          id="mobileMap" 
        >
          <Image
              width={500}
              height={500}
              src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/default-search-page-map.webp`}
              alt=""
              className="h-full w-full"
            />
        </div> 
        }

      </div>
    </main>
  );
}
