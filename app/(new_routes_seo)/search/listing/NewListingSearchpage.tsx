import React from "react";
import ProjSearchMainFilterSection from "../components/filters/ProjSearchMainFilterSection";
import ListingSearhLeftSection from "./components/listingSearchTabs/listingSearchleftSection";
import RightSection from "../components/ProjectSearchRightSection";
import ListingSearchRightSection from "./components/listingSearchTabs/listingSearchRightSection";
import ProjectSearchBreadCrumbs from "../components/ProjSearchBreadCrums";
import FloatingArrowIcon from "../components/ProjectSearchTabs/FloatingArrowIcon";

type Props = {
  serverData: any;
  frontendFilters: any;
};

export default function NewListingSearchpage({
  serverData,
  frontendFilters,
}: Props) {

  return (
    <main className="pt-[70px] min-h-[calc(100vh)] relative">
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs />
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

      <FloatingArrowIcon />
    </main>
  );
}
