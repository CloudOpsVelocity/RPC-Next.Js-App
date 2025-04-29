"use client";
import React, { useState } from "react";
import ListingSearchleftSection from "./listingSearchTabs/listingSearchleftSection";
import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";
import { useHydrateAtoms } from "jotai/utils";
import { initialState, projSearchStore } from "../../../store/newListingStore";
import ListingSearchMapSection from "./listingSearchTabs/ListingSearchMapSection";

// import ListingSearchRightSection from "./listingSearchTabs/listingSearchRightSection";
// const ListingSearchRightSection = dynamic(
//   () => import("./listingSearchTabs/listingSearchRightSection")
// );
type Props = {
  serverData: any;
  frontendFilters: any;
};

export default function ListingMainSection({
  frontendFilters,
  serverData,
}: Props) {
  useHydrateAtoms(
    [
      [
        projSearchStore,
        {
          type: "update",
          payload: {
            // ...initialState,
            ...frontendFilters,
          },
        },
      ],
    ],
    {
      dangerouslyForceHydrate: true,
    }
  );
  const pathname = usePathname();
  const [apiFilterQueryParams] = useQueryState("sf");
  const [isTrue, setIsTrue] = useState(
    pathname.includes("search")
      ? true
      : serverData !== null && apiFilterQueryParams !== null
  );

  return (
    <>
      <ListingSearchleftSection
        serverData={serverData}
        frontendFilters={frontendFilters}
        isTrue={isTrue}
        apiFilterQueryParams={apiFilterQueryParams}
        setIsTrue={setIsTrue}
      />
      <div className="w-[100%] sm:w-[50%] -z-10" />

      <ListingSearchMapSection serverData={serverData} />
    </>
  );
}
