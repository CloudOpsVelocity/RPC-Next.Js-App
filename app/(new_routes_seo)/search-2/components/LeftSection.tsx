"use client";
import { emptyFilesIcon, strikeIconIcon } from "@/app/images/commonSvgs";
import { Loader } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import React, { useEffect, useRef, useState } from "react";
import useSearchFilters from "@/app/hooks/search";
import ProjectCard from "@/app/test/newui/components/Card";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useAtom } from "jotai";
import { searachFilterAtom } from "@/app/store/search";
import { useInfiniteQuery, useQuery } from "react-query";
import { getAllAuthorityNames } from "@/app/utils/api/project";
import RTK_CONFIG from "@/app/config/rtk";
import { getSearchData } from "../getSearchData";

type Props = {
  mutate?: ({ index, type }: { type: string; index: number }) => void;
  serverData?: any;
};

interface SearchResponse {
  pages: Array<any[]>;
  pageParams: number[];
}

export default function LeftSection({ mutate, serverData }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [shouldFetchMore, setShouldFetchMore] = useState(true);

  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["searchQuery"],
      queryFn: async ({ pageParam = 0 }) => {
        const response = await getSearchData(pageParam);

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
    });
  const rowVirtualizer = useVirtualizer({
    count:
      data?.pages?.reduce((acc, page) => acc + (page?.length ?? 0), 0) ?? 0,
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

  const allItems = data?.pages?.flat() || [];

  return (
    <div
      className="p-[0%]  sm:max-h-[500px] w-full  xl:max-h-[700px] xl:min-h-[65%]  overflow-y-auto max-w-[50%]"
      ref={containerRef}
    >
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
          {rowVirtualizer.getVirtualItems().map((virtualRow, index) => {
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
                  data={{ ...eachOne, type: "proj" }}
                  index={virtualRow.index}
                  mutate={mutate}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex w-full h-full justify-center items-center flex-col">
          {emptyFilesIcon}
          No Matching Results Found!
          <span className="relative left-[10%]">{strikeIconIcon}</span>
        </div>
      )}
      {hasNextPage && shouldFetchMore && (
        <div
          ref={ref}
          className="w-full py-8 flex justify-center items-center text-gray-600"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading more results...</span>
          </div>
        </div>
      )}
    </div>
  );
}
