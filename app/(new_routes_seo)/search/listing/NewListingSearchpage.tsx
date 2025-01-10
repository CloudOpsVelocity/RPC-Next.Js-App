import React from "react";
import ProjSearchMainFilterSection from "../components/filters/ProjSearchMainFilterSection";
import ListingSearhLeftSection from "./components/listingSearchTabs/listingSearchleftSection";
import RightSection from "../components/ProjectSearchRightSection";
import ListingSearchRightSection from "./components/listingSearchTabs/listingSearchRightSection";

type Props = {
  serverData: any;
  frontendFilters: any;
};

export default function NewListingSearchpage({
  serverData,
  frontendFilters,
}: Props) {
  console.log(serverData === null ? true : false)
  return (
    <main className="pt-[6%] mt-[10%] sm:mt-0">
      <ProjSearchMainFilterSection
        isListing={serverData === null ? true : false}
      />
      <div className="max-w-[98%] sm:w-[99%] mx-2  xl:m-0 flex justify-center flex-wrap-reverse sm:flex-nowrap ">
        <ListingSearhLeftSection
          serverData={serverData}
          frontendFilters={frontendFilters}
        />
        <ListingSearchRightSection serverData={serverData} />
      </div>
    </main>
  );
}
