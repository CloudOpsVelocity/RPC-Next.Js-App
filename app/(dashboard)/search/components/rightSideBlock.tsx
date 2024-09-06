"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import MapSkeleton from "@/app/components/maps/Skeleton";
import useSearchFilters from "@/app/hooks/search";

const RightSideBlock = ({ serverData }: any) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/maps/search"), {
        loading: () => <MapSkeleton />,
        ssr: false,
      }),
    []
  );
  const { searchProps, countAppliedFiltersFromQuery, path } =
    useSearchFilters();
  const { data } = searchProps as any;
  const appliedFiltersCount = countAppliedFiltersFromQuery();
  const serverClientData =
    appliedFiltersCount > 0
      ? data
      : path.includes("/projects") || path.includes("/in")
      ? serverData
      : data;
  return (
    <div
      className="w-[100%] sm:w-[50%]  flex justify-start items-start z-[1] md:w-[50%] scroll-mt-[150px]"
      id="mobileMap"
    >
      <Map
        projName={"Searched Location"}
        lat={(serverClientData && serverClientData[0]?.lat) ?? 47.46489}
        lang={(serverClientData && serverClientData[0]?.lang) ?? 15.34043}
        data={serverClientData}
      />
    </div>
  );
};

export { RightSideBlock };
