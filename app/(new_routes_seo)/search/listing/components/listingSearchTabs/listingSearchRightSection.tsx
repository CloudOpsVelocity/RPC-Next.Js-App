"use client";
import dynamic from "next/dynamic";

// import useSearchFilters from "@/app/hooks/search";
import React, { useMemo } from "react";
import MapSkeleton from "@/app/components/maps/Skeleton";
import useSearchFilters from "@/app/hooks/search";
import { useInfiniteQuery } from "react-query";
import { getSearchData } from "../../../utils/project-search-queryhelpers";
import { useQueryState } from "nuqs";
import RTK_CONFIG from "@/app/config/rtk";

const ListingSearchRightSection = ({ serverData }: any) => {
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

  const [apiFilterQueryParams] = useQueryState("sf");
  let isTrue = serverData !== null || apiFilterQueryParams !== null;
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [
        `searchQuery${apiFilterQueryParams ? `-${apiFilterQueryParams}` : ""}`,
      ],
      queryFn: async ({ pageParam = 0 }) => {
        if (serverData && !isTrue) {
          return serverData;
        }
        const response = await getSearchData(
          pageParam,
          apiFilterQueryParams ? apiFilterQueryParams : ""
        );

        return response;
      },
      getNextPageParam: (lastPage: any, allPages: any) => {
        const nextPage = allPages.length;
        if (lastPage.length < 20) {
          return;
        }
        return nextPage;
      },
      ...RTK_CONFIG,
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
        type={"prop"}
      />
    </div>
  );
};

export default ListingSearchRightSection;
