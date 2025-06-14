"use client";
import React, { useEffect, useState } from "react";
import ListingSearchleftSection from "./listingSearchTabs/listingSearchleftSection";
import { useQueryState } from "nuqs";
import ListingSearchMapSection from "./listingSearchTabs/ListingSearchMapSection";
import { useHydrateAtoms } from "jotai/utils";
import { initialState, projSearchStore } from "../../store/routeListingSore";
import { useAtom, useSetAtom } from "jotai";
type Props = {
  serverData: any;
  frontendFilters: any;
  preDefinedFilters: string | null;
  serverFiltersString: string;
};

export default function ListingMainSection({
  frontendFilters,
  serverData,
  preDefinedFilters,
  serverFiltersString,
}: Props) {
  // const setStore = useSetAtom(projSearchStore);
  const [apiFilterQueryParams] = useQueryState("sf");
  const [store, setStore] = useAtom(projSearchStore);

  // const shouldHydrate = apiFilterQueryParams !== preDefinedFilters;
  // useHydrateAtoms(hydrationValues as any);
  // useEffect(() => {
  //   // if (shouldHydrate) {
  //   setStore({
  //     type: "update",
  //     payload: {
  //       ...frontendFilters,
  //     },
  //   });
  //   // }
  // }, [shouldHydrate]);

  // const hydrationValues = shouldHydrate
  //   ? [
  //       [
  //         projSearchStore,
  //         {
  //           type: "update",
  //           payload: {
  //             ...frontendFilters,
  //           },
  //         },
  //       ],
  //     ]
  //   : [];

  // useHydrateAtoms(hydrationValues as any);
  useEffect(() => {
    setStore({
      type: "update",
      payload: {
        ...initialState,
        ...frontendFilters,
      },
    });
  }, []);
  const [isTrue, setIsTrue] = useState(
    apiFilterQueryParams !== preDefinedFilters
  );

  return (
    <>
      <ListingSearchleftSection
        serverData={serverData}
        frontendFilters={frontendFilters}
        isTrue={isTrue}
        setIsTrue={setIsTrue}
        apiFilterQueryParams={apiFilterQueryParams}
        preDefinedFilters={preDefinedFilters}
        serverFiltersString={serverFiltersString}
      />
      <div className="w-[100%] sm:w-[50%] -z-10" />

      <ListingSearchMapSection serverData={serverData} />
    </>
  );
}
