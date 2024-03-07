import SearchSkeleton from "@/app/components/atoms/skeleton/search";
import { emptyFilesIcon, strikeIconIcon } from "@/app/images/commonSvgs";
import { Tabs } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import React, { useEffect, useRef } from "react";
import ProjectDetailsCard from "../projectCard";
import useSearchFilters from "@/app/hooks/search";

type Props = {};

export default function TabPanelSection({}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    searchProps: { isLoading, data, hasNextPage, fetchMoreData },
    filters,
  } = useSearchFilters("project");
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.1,
  });
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchMoreData();
    }
  }, [entry?.isIntersecting, hasNextPage]);
  return TabSectionData.map((item) => (
    <Tabs.Panel value={item} key={item}>
      <div
        className=" p-[2%] max-h-[700px] overflow-y-auto h-screen "
        ref={containerRef}
      >
        {isLoading ? (
          <SearchSkeleton />
        ) : data != undefined && data.length != undefined && data.length > 0 ? (
          data?.map((eachOne, index: number) => {
            return (
              <ProjectDetailsCard
                key={index}
                type={filters.listedBy ?? "proj"}
                {...eachOne}
              />
            );
          })
        ) : (
          <div className="flex w-full h-full justify-center items-center flex-col ">
            {emptyFilesIcon}
            No Matching Results Found !
            <span className="relative left-[10%] ">{strikeIconIcon}</span>
          </div>
        )}
        {hasNextPage && (
          <div ref={ref} onClick={() => fetchMoreData()}>
            Loading More Data
          </div>
        )}
      </div>
    </Tabs.Panel>
  ));
}

const TabSectionData = ["proj", "I", "A"];
