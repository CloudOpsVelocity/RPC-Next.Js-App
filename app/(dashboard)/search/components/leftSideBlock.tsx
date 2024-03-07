"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tabs } from "@mantine/core";
import ProjectDetailsCard from "./projectCard";
import S from "@/app/styles/seach/Index.module.css";
import {
  DropDownIcon,
  emptyFilesIcon,
  strikeIconIcon,
} from "@/app/images/commonSvgs";
import useSearchFilters from "@/app/hooks/search";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import { SEARCH_FILTER_DATA } from "@/app/data/search";

const LeftSideBlock = () => {
  const [opned, { close }] = useReqCallPopup();
  const {
    searchProps: { isLoading, data, hasNextPage, fetchMoreData },
    handleAppliedFilters,
    filters,
    params,
    setFilters,
  } = useSearchFilters("project");
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

  const onTabChange = (listedBy: "A" | "I" | "proj"): void => {
    if (!listedBy) {
      console.error(`Invalid value passed to onTabChange: ${listedBy}`);
      return;
    }
    const updatedFilters =
      listedBy === "proj"
        ? { ...filters, listedBy: null }
        : {
            ...filters,
            ...Object.fromEntries(
              (diffToProjFromListing[listedBy] ?? []).map((key: string) => [
                key,
                // @ts-ignore
                (initialState[key] ?? null) as any,
              ])
            ),
            listedBy,
          };
    setFilters(updatedFilters);
    handleAppliedFilters();
  };

  return (
    <div className="md:w-[50%] sm:w-[100%]  md:bg-white  min-w-[400px] md:min-w-[500px]">
      <Tabs
        value={params.listedBy ?? "proj"}
        onChange={(value) => onTabChange((value as "proj") || "proj")}
        defaultValue="proj"
      >
        <Tabs.List className={S.bg}>
          {SEARCH_FILTER_DATA.categoryData.map((eachItem, index) => {
            return (
              <Tabs.Tab
                key={index}
                value={eachItem.value}
                classNames={{
                  tab: S.tab,
                  tabLabel: S.tabLabel,
                }}
              >
                {eachItem.label}
              </Tabs.Tab>
            );
          })}
          <SortBy />
        </Tabs.List>

        <Tabs.Panel value="proj">
          <div
            className=" p-[2%] max-h-[700px] overflow-y-auto h-screen "
            ref={containerRef}
          >
            {isLoading ? (
              <SearchSkeleton />
            ) : data != undefined &&
              data.length != undefined &&
              data.length > 0 ? (
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
        <Tabs.Panel value="I">
          <div className=" p-[2%] max-h-[700px] overflow-y-auto  h-screen ">
            {data != undefined &&
            data.length != undefined &&
            data.length > 0 ? (
              data.map((eachOne, index) => {
                return (
                  <ProjectDetailsCard
                    key={index}
                    type={filters.listedBy}
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
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="A">
          <div className=" p-[2%] max-h-[700px] overflow-y-auto  h-screen ">
            {data != undefined &&
            data.length != undefined &&
            data.length > 0 ? (
              data.map((eachOne, index) => {
                return (
                  <ProjectDetailsCard
                    key={index}
                    type={filters.listedBy}
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
          </div>
        </Tabs.Panel>
      </Tabs>
      <RequestCallBackModal close={close} opened={opned} builderId={1112} />
      <LoginPopup />
    </div>
  );
};

export { LeftSideBlock };
import { Menu } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import SearchSkeleton from "@/app/components/atoms/skeleton/search";
import { diffToProjFromListing, initialState } from "@/app/store/search";

function SortBy() {
  const [selected, setSort] = useState("");
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <button className="flex h-7 justify-center items-center gap-2.5 p-3.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] border-[0.5px] border-solid border-[#CBD4E1] bg-white mr-auto md:mr-2 mt-1 mb-2 ml-4 md:ml-auto">
          <span className="text-[#0073C6] text-xs md:text-base not-italic   md:font-medium leading-[normal] ">
            {selected === "" ? "Sort By" : selected}
          </span>
          <DropDownIcon />
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        {[
          "Relevance",
          "Newest first",
          "Price Low to High",
          "Price High to Low",
          "Price / sq.ft. : Low to High",
          "Price / sq.ft. : High to Low",
        ].map((eachItem, index) => {
          return (
            <Menu.Item
              key={index}
              value={eachItem}
              onClick={() =>
                eachItem !== selected ? setSort(eachItem) : setSort("")
              }
            >
              {eachItem}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
