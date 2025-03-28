import React from "react";
import ListingSearchleftSection from "./listingSearchTabs/listingSearchleftSection";
import dynamic from "next/dynamic";
const ListingSearchRightSection = dynamic(
  () => import("./listingSearchTabs/listingSearchRightSection")
);
type Props = {
  serverData: any;
  frontendFilters: any;
};

export default function ListingMainSection({
  frontendFilters,
  serverData,
}: Props) {
  return (
    <>
      <ListingSearchleftSection
        serverData={serverData}
        frontendFilters={frontendFilters}
      />
      <div className="w-[100%] sm:w-[50%] -z-10" />
      <ListingSearchRightSection
        serverData={serverData}
        key="projListingSearchRightSection2"
      />
    </>
  );
}
