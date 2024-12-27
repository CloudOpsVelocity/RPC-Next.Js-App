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
import { projSearchStore } from "../store/projSearchStore";

type Props = {
  mutate?: ({ index, type }: { type: string; index: number }) => void;
  serverData?: any;
};

function LeftSection({ mutate, serverData }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [shouldFetchMore, setShouldFetchMore] = useState(true);
  const state = useAtomValue(projSearchStore);
  const [apiFilterQueryParams] = useQueryState("sf");
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
      // ...RTK_CONFIG,
    });
  const allItems = data?.pages?.flat() || [];
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
    </div>
  );
}
export default memo(LeftSection);
