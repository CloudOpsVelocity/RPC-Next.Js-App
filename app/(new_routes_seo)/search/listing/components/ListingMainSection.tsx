"use client";
import React, { useState } from "react";
import ListingSearchleftSection from "./listingSearchTabs/listingSearchleftSection";
import { useQueryState } from "nuqs";
import ListingSearchMapSection from "./listingSearchTabs/ListingSearchMapSection";
import { useHydrateAtoms } from "jotai/utils";
import { projSearchStore } from "../../store/projSearchStore";

// import ListingSearchRightSection from "./listingSearchTabs/listingSearchRightSection";
// const ListingSearchRightSection = dynamic(
//   () => import("./listingSearchTabs/listingSearchRightSection")
// );
type Props = {
  serverData: any;
  frontendFilters: any;
  preDefinedFilters: string | null;
};

export default function ListingMainSection({
  frontendFilters,
  serverData,
  preDefinedFilters,
}: Props) {
  useHydrateAtoms(
    [
      [
        projSearchStore,
        {
          type: "update",
          payload: {
            ...frontendFilters,
          },
        },
      ],
    ]
    // {
    //   dangerouslyForceHydrate: true,
    // }
  );
  const [apiFilterQueryParams] = useQueryState("sf");
  const [isTrue, setIsTrue] = useState(
    apiFilterQueryParams !== preDefinedFilters
  );

  return (
    <>
      <ListingSearchleftSection
        serverData={serverData}
        frontendFilters={frontendFilters}
        isTrue={isTrue}
        apiFilterQueryParams={apiFilterQueryParams}
        setIsTrue={setIsTrue}
        preDefinedFilters={preDefinedFilters}
      />
      <div className="w-[100%] sm:w-[50%] -z-10" />

      <ListingSearchMapSection serverData={serverData} />
    </>
  );
}
