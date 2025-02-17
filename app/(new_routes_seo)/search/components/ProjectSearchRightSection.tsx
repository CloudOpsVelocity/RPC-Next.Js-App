"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import MapSkeleton from "@/app/components/maps/Skeleton";

import { useInfiniteQuery } from "react-query";
import { getSearchData } from "../utils/project-search-queryhelpers";
import { useQueryState } from "nuqs";
import RTK_CONFIG from "@/app/config/rtk";
import { usePathname } from "next/navigation";

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
  const [apiFilterQueryParams] = useQueryState("sf");
  const pathname = usePathname();
  let isTrue = pathname.includes("search")
    ? true
    : serverData !== null && apiFilterQueryParams !== null;

  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [
        `searchQuery${apiFilterQueryParams ? `-${apiFilterQueryParams}` : ""}`,
      ],
      queryFn: async ({ pageParam = 0 }) => {
        if (!isTrue) {
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
  const apidata = !isTrue ? serverData : data?.pages?.flat() || [];

  return (
    <div
      className=" w-full max-h-[70vh] sm:fixed right-0 flex justify-start items-start md:w-[60%] xl:w-[50%] scroll-mt-[150px] z-0 "
      id="mobileMap"
    >
      <Map
        projName={"Searched Location"}
        lat={(apidata && apidata[0]?.lat) ?? 47.46489}
        lang={(apidata && apidata[0]?.lang) ?? 15.34043}
        data={apidata}
        type={"proj"}
        styles="h-[calc(100vh-65vh)] sm:h-[calc(78vh)] md:h-[calc(100vh-220px)] xl:h-[calc(100vh-262px)] w-full  max-w-full"
      />
    </div>
  );
};

export default RightSection;
