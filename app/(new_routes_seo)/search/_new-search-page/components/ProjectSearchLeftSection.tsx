/* eslint-disable no-unused-vars */
"use client";
import { emptyFilesIcon, strikeIconIcon } from "@/app/images/commonSvgs";
import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
// import RTK_CONFIG from "@/app/config/rtk";
import { getSearchData } from "../../utils/project-search-queryhelpers";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  projSearchStore,
  searchPageMapToggle,
} from "../../store/newSearchProjectStore";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import LoginPopup from "@/app/components/project/modals/LoginPop";
// import { getAllAuthorityNames } from "@/app/utils/api/project";
import { usePathname } from "next/navigation";
import FloatingArrowIcon from "./ProjectSearchTabs/FloatingArrowIcon";
import selectedSearchAtom, { selectedNearByAtom } from "@/app/store/search/map";
import { useMediaQuery } from "@mantine/hooks";
import { overlayAtom } from "@/app/test/newui/store/overlay";
import ServerDataSection from "./ServerDataSection";
import ListingSearchPagination from "../../listing/_new-listing-search-page/components/ListingSearchPagination";

// import ProjectSearchPagination from "./ProjectSearchPagination";

type Props = {
  mutate?: ({}: { type?: string; index?: number }) => void;
  serverData?: any;
  frontendFilters?: any;
  isTrue: boolean;
  setIsTrue: any;
  preAppliedFilters: any;
  apiFilterQueryParams: string | null;
};

function LeftSection({
  mutate,
  serverData,
  // frontendFilters,
  isTrue: it,
  setIsTrue,
  preAppliedFilters,
  apiFilterQueryParams,
  frontendFilters,
}: Props) {
  const isMobile = useMediaQuery("(max-width: 601px)");
  const [page, setPage] = useState(0);
  const [shouldFetchMore, setShouldFetchMore] = useState(true);
  const [mainData, setMainData] = useState<any>(serverData || []);
  const state = useAtomValue(projSearchStore);
  const [{ allMarkerRefs }, setNearby] = useAtom(selectedNearByAtom);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const isTrue = it || apiFilterQueryParams !== preAppliedFilters;

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      `searchQuery${apiFilterQueryParams ? `-${apiFilterQueryParams}` : ""}`,
    ],

    queryFn: async ({ pageParam = 0 }) => {
      const response = await getSearchData(
        pageParam,
        apiFilterQueryParams ?? ""
      );
      return response?.results;
    },
    getNextPageParam: (lastPage: any, allPages: any) => {
      return lastPage?.length === 20 ? allPages.length : undefined;
    },
    ...(serverData && apiFilterQueryParams === preAppliedFilters
      ? {
          initialData: {
            pages: [serverData],
            pageParams: [0],
          },
          // initialPageParam: 0,
        }
      : {}),
    cacheTime: 300000,
    enabled: isTrue,
    staleTime: 0,
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      if (apiFilterQueryParams === preAppliedFilters) {
        const newData = data.pages[data.pageParams.length - 1];
        setMainData((prev: any) => [...prev, ...newData]);
      }
    },
  });

  // const { data: approvedData } = useQuery({
  //   queryKey: ["projAuth"],
  //   enabled: true,
  //   queryFn: () => getAllAuthorityNames(),
  //   ...RTK_CONFIG,
  // });

  const setSelected = useSetAtom(selectedSearchAtom);
  const [, dispatch] = useAtom(overlayAtom);
  const setIsMapLoaded = useSetAtom(searchPageMapToggle);

  const handleScroll = useCallback(() => {
    if (isMobile) return;
    setIsMapLoaded(true);
    if (allMarkerRefs) {
      const keys = [...allMarkerRefs.current.keys()];
      keys.forEach((refKey: string) => {
        const marker = allMarkerRefs.current.get(refKey);
        if (marker) marker.closePopup();
      });
    }
    setSelected(null);
    setNearby((prev: any) => ({
      ...prev,
      category: "",
      data: {},
      selectedNearbyItem: {},
      id: "",
      isOpen: false,
    }));
    dispatch({ type: "CLOSE" });
  }, [
    isMobile,
    allMarkerRefs,
    setIsMapLoaded,
    setSelected,
    setNearby,
    dispatch,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          hasNextPage &&
          shouldFetchMore &&
          !isLoading
        ) {
          setIsTrue(true);
          fetchNextPage();
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, shouldFetchMore, isLoading, fetchNextPage, setIsTrue]);
  const dataToUse =
    apiFilterQueryParams === preAppliedFilters || typeof window === "undefined"
      ? mainData
      : data && data?.pageParams?.length > 0
      ? data?.pages.flat()
      : mainData;
  const EmptyState = memo(function EmptyState() {
    return (
      <div className="flex w-full h-full justify-center items-center flex-col">
        {emptyFilesIcon}
        No Matching Results Found!
        <span className="relative left-[10%]">{strikeIconIcon}</span>
      </div>
    );
  });

  const LoadingBlock = () => (
    <div className="flex items-center justify-center h-full w-full pt-[15%]">
      <div className="text-center flex items-center justify-center flex-col">
        <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] xl:w-[30px] xl:h-[30px] border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
        <h2 className="text-[16px] md:text-[18px] xl:text-[20px] font-semibold text-gray-700 mt-[14px]">
          Loading...
        </h2>
      </div>
    </div>
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col w-full md:max-w-[50%] relative overflow-auto">
      {isFetching && isFetchingNextPage === false ? (
        <LoadingBlock />
      ) : dataToUse?.length > 0 ? (
        <>
          {/* Image use below */}
          {dataToUse[0].coverUrl && (
            <>
              <link
                rel="preconnect"
                href="https://media.getrightproperty.com"
                crossOrigin="anonymous"
              />

              {/* Preload image with srcSet and sizes */}
              {dataToUse?.[0]?.coverUrl?.includes(",") && (
                <link
                  rel="preload"
                  as="image"
                  href={
                    dataToUse[0].coverUrl.includes("+")
                      ? dataToUse[0].coverUrl
                          .replace(/\+/g, "%2B")
                          .split(",")[1]
                      : dataToUse[0].coverUrl.split(",")[1]
                  }
                />
              )}
            </>
          )}

          {/* Image Use above*/}
          <ServerDataSection
            data={dataToUse}
            refetch={refetch}
            mutate={mutate}
            state={state}
            frontendFilters={frontendFilters}
          />

          {hasNextPage && shouldFetchMore && (
            <div
              ref={loadMoreRef}
              className="text-center font-bold text-3xl py-3"
            >
              Loading...
            </div>
          )}
        </>
      ) : (
        <EmptyState />
      )}

      <section
        className={!isClient ? "py-8 sm:py-14 container mx-auto px-4" : "hidden"}
        aria-hidden={isClient ? "true" : undefined}
      >
        <ListingSearchPagination
          searchQueryParmeter
          currentPage={
            frontendFilters.currentPage ? frontendFilters.currentPage : 1
          }
          totalCount={frontendFilters.totalCount ?? 0}
        />
      </section>

      <LoginPopup />
      <RequestCallBackModal />
      <FloatingArrowIcon />
    </div>
  );
}

export default memo(LeftSection);
