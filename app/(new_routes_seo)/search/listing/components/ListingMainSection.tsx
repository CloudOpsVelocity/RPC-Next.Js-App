"use client";
import React, { useState } from "react";
import ListingSearchleftSection from "./listingSearchTabs/listingSearchleftSection";
import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";
import { useHydrateAtoms } from "jotai/utils";
import { projSearchStore } from "../../store/projSearchStore";
import ListingSearchMapSection from "./listingSearchTabs/ListingSearchMapSection";
import { initialState } from "@/app/store/search";
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
  console.log({ initialState, frontendFilters });
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
