"use client";

import React, { useEffect, useRef, useState } from "react";
import { ScrollArea, Tabs } from "@mantine/core";
import ProjectDetailsCard from "./projectCard";
import S from "@/app/styles/seach/Listing.module.css";
import ProjectCard from "../../components/Card";
import { RightSideBlock } from "../../components/rightSideBlock";
import {
  DropDownIcon,
  emptyFilesIcon,
  strikeIconIcon,
} from "@/app/images/commonSvgs";
import useSearchFilters from "@/app/hooks/search";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import NewTabCon from "../../components/leftsection/newtabCon";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
type Props = {
  mutate?: ({ index, type }: { type: string; index: number }) => void;
};
const LeftSideBlock = ({ mutate }: Props) => {
  const [opned, { close, source }] = useReqCallPopup();
  const { filters, setSingleType, handleReset, handleAppliedFilters, params } =
    useSearchFilters();
  const {
    searchProps: { isLoading, data, hasNextPage, fetchMoreData, refetch },
  } = useSearchFilters("owner");
  const containerRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.1,
  });
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchMoreData();
    }
  }, [entry?.isIntersecting, hasNextPage]);
  const onTabChange = (value: string) => {
    if (value === "All") {
      handleReset("listedBy");
      return null;
    } else {
      setSingleType("listedBy", value);
      handleAppliedFilters();
    }
  };
  return (
    <>
      <div className="md:w-[50%] sm:w-[100%]  md:bg-white  min-w-[400px] md:min-w-[500px] ">
        <NewTabCon
          onTabChange={onTabChange}
          Activities={params.cg}
          selectedProtype={params.listedBy ?? "All"}
          categoryType={SEARCH_FILTER_DATA.categoryDataListing}
        />
        <div
          className="p-[2%] max-h-[700px] max-w-full overflow-y-auto h-screen"
          ref={containerRef}
        >
          {isLoading ? (
            <Loading />
          ) : data != undefined &&
            data.length != undefined &&
            data.length > 0 ? (
            data.map((eachOne, index) => {
              return (
                <ProjectCard
                  key={index}
                  refetch={refetch}
                  data={{ ...eachOne, type: filters.listedBy ?? "All" }}
                  index={index}
                  mutate={mutate}
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
            <div ref={ref}>
              <SearchSkeleton />
            </div>
          )}
        </div>
      </div>

      <RequestCallBackModal />
      <LoginPopup />
      <SharePopup />
      <MapModal />
      {/* </div> */}
      <RightSideBlock categoryType={"listing"} />
    </>
  );
};

export { LeftSideBlock };
import { Menu } from "@mantine/core";
import MapModal from "./modals";
import Loading from "@/app/components/atoms/Loader";
import { Vast_Shadow } from "next/font/google";
import { useIntersection } from "@mantine/hooks";
import SearchSkeleton from "@/app/components/atoms/skeleton/search";
import SharePopup from "../../components/SharePopup";

const TabData = [
  {
    label: "ALL",
    value: "All",
  },
  {
    label: "Owner Listing",
    value: "I",
  },
  {
    label: "Agent Listing",
    value: "A",
  },
  {
    label: "Builder Listing",
    value: "B",
  },
];
