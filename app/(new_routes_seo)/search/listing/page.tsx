import React from "react";
import ProjSearchMainFilterSection from "../components/filters/ProjSearchMainFilterSection";
import ListingSearhLeftSection from "./components/listingSearchTabs/listingSearchleftSection";
import ListingSearchRightSection from "./components/listingSearchTabs/listingSearchRightSection";
import ProjectSearchBreadCrumbs from "../components/ProjSearchBreadCrums";
import ListingMainSection from "./components/ListingMainSection";

type Props = {};

export default function Page({}: Props) {
  const isListing = true;
  return (
    <main className="pt-[70px] min-h-[calc(100vh)] relative">
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs
          key="newSearchPage4"
          pageUrl={"/search/listing"}
        />

        <ProjSearchMainFilterSection
          key="newSearchFilter4"
          isListing={isListing}
        />
      </div>
      <div className="sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[154px] xl:pt-[190px] ">
        <ListingMainSection frontendFilters={{}} serverData={null} />
      </div>
    </main>
  );
}
