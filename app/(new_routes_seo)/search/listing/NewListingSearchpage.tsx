import React from "react";
import ProjSearchMainFilterSection from "../components/filters/ProjSearchMainFilterSection";
import ListingSearhLeftSection from "./components/listingSearchTabs/listingSearchleftSection";
import ListingSearchRightSection from "./components/listingSearchTabs/listingSearchRightSection";
import ProjectSearchBreadCrumbs from "../components/ProjSearchBreadCrums";

import { ListingSearchSchema } from "@/app/seo/search/listing-search.schema";

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
  return (
    <main className="pt-[70px] min-h-[calc(100vh)] relative">
      <link rel="canonical" href={`${pageUrl}`} />
      {serverData && <ListingSearchSchema properties={serverData} />}
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs pageUrl={pageUrl} />
        <ProjSearchMainFilterSection
          isListing={serverData === null ? true : false}
        />
      </div>
      <div className="sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[154px] xl:pt-[190px] ">
        <ListingSearhLeftSection
          serverData={serverData}
          frontendFilters={frontendFilters}
        />
        <div className="w-[100%] sm:w-[50%] -z-10" />
        <ListingSearchRightSection serverData={serverData} />
      </div>
    </main>
  );
}
