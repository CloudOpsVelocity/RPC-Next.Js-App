import { emptyFilesIcon, strikeIconIcon } from "@/app/images/commonSvgs";
import { Loader } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import React, { useEffect, useRef, useState } from "react";
import useSearchFilters from "@/app/hooks/search";
import ProjectCard from "@/app/test/newui/components/Card";
import { useVirtualizer } from '@tanstack/react-virtual';

type Props = {
  mutate?: ({ index, type }: { type: string; index: number }) => void;
  serverData?: any;
};

export default function TabPanelSection({ mutate, serverData }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    searchProps: { isLoading, data, hasNextPage, fetchMoreData, refetch },
    filters,
    countAppliedFiltersFromQuery,
    path,
  } = useSearchFilters("project");

  const appliedFiltersCount = countAppliedFiltersFromQuery();
  const serverClientData =
    appliedFiltersCount > 0
      ? data
      : path.includes("/projects") ||
        path.includes("/listings") ||
        path.includes("/residential")
      ? serverData
      : data;

  const rowVirtualizer = useVirtualizer({
    count: serverClientData?.length || 0,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 300,
    overscan: 1,
    enabled: true,
    measureElement: (element) => element?.getBoundingClientRect().height || 300,
  });

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchMoreData();
    }
  }, [entry?.isIntersecting, hasNextPage, fetchMoreData]);

  return (
    <div
      className="p-[0%] h-full sm:max-h-[560px] w-full xl:max-h-[700px] max-w-full overflow-y-auto"
      ref={containerRef}
    >
      {isLoading ? (
        <Loader />
      ) : serverClientData != undefined &&
        serverClientData.length != undefined &&
        serverClientData.length > 0 ? (
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow, index) => {
            const eachOne = serverClientData[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start ?? 0}px)`,
                }}
              >
                <ProjectCard
                  key={eachOne.projIdEnc + eachOne.propType}
                  refetch={refetch}
                  data={{ ...eachOne, type: filters.listedBy ?? "proj" }}
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
      {hasNextPage && (
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
