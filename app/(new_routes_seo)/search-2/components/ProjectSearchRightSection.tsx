"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import MapSkeleton from "@/app/components/maps/Skeleton";
import useSearchFilters from "@/app/hooks/search";
import { useInfiniteQuery } from "react-query";
import { getSearchData } from "../utils/project-search-queryhelpers";

const RightSection = ({ serverData }: any) => {
  const Map = useMemo(
    () =>
      dynamic(
        () => import("@/app/components/maps/search/ProjectSearchPageMap"),
        {
          loading: () => <MapSkeleton />,
          ssr: false,
        }
      ),
    []
  );
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["searchQuery"],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await getSearchData(pageParam,'');

        return response;
      },
      getNextPageParam: (lastPage: any, allPages: any) => {
        const nextPage = allPages.length;
        if (lastPage.length < 20) {
          return;
        }
        return nextPage;
      },
      enabled: false,
    });
  return (
    <div
      className="w-[100%] sm:w-[50%]  flex justify-start items-start z-[1] md:w-[50%] scroll-mt-[150px]"
      id="mobileMap"
    >
      <Map
        projName={"Searched Location"}
        lat={(data && data?.pages.flat()[0]?.lat) ?? 47.46489}
        lang={(data && data?.pages.flat()[0]?.lang) ?? 15.34043}
        data={data?.pages.flat()}
        type={"proj"}
      />
    </div>
  );
};

export default RightSection;
