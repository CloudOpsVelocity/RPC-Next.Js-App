"use client";
import { emptyFilesIcon, strikeIconIcon } from "@/app/images/commonSvgs";
import { Loader } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import ProjectCard from "@/app/test/newui/components/Card";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteQuery, useQuery } from "react-query";
import RTK_CONFIG from "@/app/config/rtk";
import { getSearchData } from "../utils/project-search-queryhelpers";
import { useQueryState } from "nuqs";
import ProjectSearchTabs from "./ProjectSearchTabs/ProjectSearchTabs";
import { useAtom, useAtomValue } from "jotai";
import { initialState, projSearchStore } from "../store/projSearchStore";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import { useHydrateAtoms } from "jotai/utils";
import { getAllAuthorityNames } from "@/app/utils/api/project";
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
  let isTrue = (serverData && serverData.length && serverData.length > 0) || apiFilterQueryParams !== null;

  const { data, isLoading, hasNextPage, fetchNextPage, refetch, status } =
    useInfiniteQuery({
      queryKey: [
        `searchQuery${apiFilterQueryParams ? `-${apiFilterQueryParams}` : ""}`,
      ],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await getSearchData(
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
      // enabled: isTrue,
      enabled: true,

      // ...RTK_CONFIG,
    });

  const allItems = serverData && !isTrue ? serverData : data?.pages?.flat() || [];
  console.log(allItems)

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

  const { data: approvedData } = useQuery({
    queryKey: ["projAuth"],
    enabled: true,
    queryFn: () => getAllAuthorityNames(),
    ...RTK_CONFIG,
  });

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && shouldFetchMore) {
      fetchNextPage();
      setPage((prev) => prev + 1);
    }
  }, [entry?.isIntersecting, hasNextPage, fetchNextPage, shouldFetchMore]);

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
            data={{ ...eachOne, type: state.listedBy ?? "proj" }}
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

  return (
    <div
      className="p-[0%]  sm:max-h-[500px] w-full  xl:max-h-[700px] xl:min-h-[65%]  overflow-y-auto max-w-[99%]  sm:max-w-[50%]"
      ref={containerRef}
    >
      <ProjectSearchTabs />
      {isLoading ? (
        <Loader />
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
          ref={ref}
          className="w-full py-8 flex justify-center items-center text-gray-600"
        >
          <LoadingSpinner />
        </div>
      )}
      <LoginPopup />
      <RequestCallBackModal />
    </div>
  );
}
export default memo(LeftSection);
