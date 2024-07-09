import SearchSkeleton from "@/app/components/atoms/skeleton/search";
import { emptyFilesIcon, strikeIconIcon } from "@/app/images/commonSvgs";
import { Loader, Tabs } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import React, { useEffect, useRef } from "react";
import useSearchFilters from "@/app/hooks/search";
import ProjectCard from "../Card";
type Props = {};

export default function TabPanelSection({}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    searchProps: { isLoading, data, hasNextPage, fetchMoreData, refetch },
    filters,
  } = useSearchFilters("project");
  console.log(data);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.1,
  });
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchMoreData();
    }
  }, [entry?.isIntersecting, hasNextPage, fetchMoreData]);
  return TabSectionData.map((item) => (
    <Tabs.Panel value={item} key={item}>
      <div
        className=" p-[2%] max-h-[700px] overflow-y-auto h-screen "
        ref={containerRef}
      >
        {isLoading ? (
          <Loader />
        ) : data != undefined && data.length != undefined && data.length > 0 ? (
          data?.map((eachOne, index: number) => {
            return (
              <ProjectCard
                key={index}
                refetch={refetch}
                data={{ ...eachOne, type: filters.listedBy ?? "proj" }}
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
