"use client";
import { emptyFilesIcon, strikeIconIcon } from "@/app/images/commonSvgs";
import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import ProjectCard from "@/app/test/newui/components/Card";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteQuery, useQuery } from "react-query";
import RTK_CONFIG from "@/app/config/rtk";
import { getListingSearchData } from "../../../utils/project-search-queryhelpers";
import { useQueryState } from "nuqs";
import { useAtomValue } from "jotai";
/* import ListingSearchTabs from "../ListingSearchTabs"; */
import { projSearchStore } from "../../../store/projSearchStore";
import { usePathname } from "next/navigation";
import { useHydrateAtoms } from "jotai/utils";
import { getAllAuthorityNames } from "@/app/utils/api/project";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import FloatingArrowIcon from "../../../components/ProjectSearchTabs/FloatingArrowIcon";

type Props = {
  mutate?: ({ index, type }: { type: string; index: number }) => void;
  serverData?: any;
  frontendFilters?: any;
};

function LeftSection({ mutate, serverData, frontendFilters }: Props) {
  useHydrateAtoms([
    [
      projSearchStore,
      {
        type: "update",
        payload: {
          ...frontendFilters,
        },
      },
    ],
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [shouldFetchMore, setShouldFetchMore] = useState(true);
  const state = useAtomValue(projSearchStore);
  const [apiFilterQueryParams] = useQueryState("sf");
  const pathname = usePathname();
  let isTrue = pathname.includes("search")
    ? true
    : serverData !== null && apiFilterQueryParams !== null;

  const { data, isLoading, hasNextPage, fetchNextPage, refetch, status } =
    useInfiniteQuery({
      queryKey: [
        `searchQuery${apiFilterQueryParams ? `-${apiFilterQueryParams}` : ""}`,
      ],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await getListingSearchData(
          pageParam,
          apiFilterQueryParams ?? ""
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
      cacheTime: 300000,
      enabled: isTrue,
      // ...RTK_CONFIG,
    });
  const { data: approvedData } = useQuery({
    queryKey: ["projAuth"],
    enabled: true,
    queryFn: () => getAllAuthorityNames(),
    ...RTK_CONFIG,
  });
  const allItems = !isTrue ? serverData : data?.pages?.flat() || [];

  const rowVirtualizer = useVirtualizer({
    count: allItems.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 300,
    overscan: 1,
    enabled: true,
    measureElement: (element) => {
      return element?.getBoundingClientRect().height || 300;
    },
  });

    const loadMoreRef = useRef<HTMLDivElement>(null);
  
    // Enhanced infinite scroll logic
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
    }, [hasNextPage, shouldFetchMore, isLoading, fetchNextPage]);


  const renderProjectCard = useCallback(
    (virtualRow: any) => {
      const eachOne = allItems[virtualRow.index];

      return (
        <div
          key={virtualRow.key}
          data-index={virtualRow.index}
          ref={rowVirtualizer.measureElement}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${virtualRow.start ?? 0}px)`,
          }}
        >
          <ProjectCard
            key={eachOne.projIdEnc + eachOne.propType}
            refetch={refetch}
            data={{ ...eachOne, type: "A" ?? "B" }}
            index={virtualRow.index}
            mutate={mutate}
          />
        </div>
      );
    },
    [allItems, mutate, refetch, rowVirtualizer.measureElement, state.listedBy]
  );

  const EmptyState = memo(function EmptyState() {
    return (
      <div className="flex w-full h-full justify-center items-center flex-col">
        {emptyFilesIcon}
        No Matching Results Found!
        <span className="relative left-[10%]">{strikeIconIcon}</span>
      </div>
    );
  });

  const LoadingSpinner = memo(function LoadingSpinner() {
    return (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span>Loading more results...</span>
      </div>
    );
  });

  const LoadingBlock = () => (
    <div className="flex items-center justify-center h-full w-full ">
      <div className="text-center flex items-center justify-center flex-col ">
        <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] xl:w-[30px] xl:h-[30px] border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
        <h2 className="text-[16px] md:text-[18px] xl:text-[20px] font-semibold text-gray-700 mt-[14px] ">
          Loading...
        </h2>
      </div>
    </div>
  );

  return ( 
    <div
      className={`flex flex-col w-full md:max-w-[40%] xl:max-w-[50%] relative overflow-auto`}
      ref={containerRef}
    >
      <div>
        {isLoading ? (
          <LoadingBlock />
        ) : allItems.length > 0 ? (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map(renderProjectCard)}
          </div>
        ) : (
          <EmptyState />
        )}
        {hasNextPage && shouldFetchMore && (
          <div
            ref={loadMoreRef}
            className="w-full py-8 flex justify-center items-center text-gray-600"
          >
            <LoadingSpinner />
          </div>
        )}
        <LoginPopup />
        <RequestCallBackModal />
      </div>

      <FloatingArrowIcon />
    </div>
  );
}

export default memo(LeftSection);





