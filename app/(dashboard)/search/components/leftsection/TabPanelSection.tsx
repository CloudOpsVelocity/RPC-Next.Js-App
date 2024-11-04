import { emptyFilesIcon, strikeIconIcon } from "@/app/images/commonSvgs";
import { Loader, Tabs } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import React, { useEffect, useRef } from "react";
import useSearchFilters from "@/app/hooks/search";
import ProjectCard from "@/app/test/newui/components/Card";
import { Console } from "console";
// import ProjectCard from "../Card";

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
        serverClientData?.map((eachOne: any, index: number) => {
          return (
            <ProjectCard
              key={eachOne.projIdEnc + eachOne.propType}
              refetch={refetch}
              data={{ ...eachOne, type: filters.listedBy ?? "proj" }}
              index={index}
              mutate={mutate}
            />
          );
        })
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
          className="w-full py-4 flex justify-center items-center text-gray-600"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>Loading more results...</span>
          </div>
        </div>
      )}
    </div>
  );
}
