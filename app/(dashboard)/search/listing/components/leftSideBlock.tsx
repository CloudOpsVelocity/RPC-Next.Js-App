"use client";

import React, { useRef, useState } from "react";
import { ScrollArea, Tabs } from "@mantine/core";
import ProjectDetailsCard from "./projectCard";
import S from "@/app/styles/seach/Listing.module.css";
import {
  DropDownIcon,
  emptyFilesIcon,
  strikeIconIcon,
} from "@/app/images/commonSvgs";
import useSearchFilters from "@/app/hooks/search";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import LoginPopup from "@/app/components/project/modals/LoginPop";

const LeftSideBlock = () => {
  const [opned, { close }] = useReqCallPopup();
  const { filters, setSingleType, handleReset, handleAppliedFilters, params } =
    useSearchFilters();
  const {
    searchProps: { isLoading, data, hasNextPage, fetchMoreData },
  } = useSearchFilters("owner");
  const containerRef = useRef<HTMLDivElement>(null);

  // const { ref, entry } = useIntersection({
  //   root: containerRef.current,
  //   threshold: 0.1,
  // });
  // useEffect(() => {
  //   if (entry?.isIntersecting && hasNextPage) {
  //     fetchMoreData();
  //   }
  // }, [entry?.isIntersecting, hasNextPage]);
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
    <div className="md:w-[70%] sm:w-[100%]  md:bg-white  min-w-[400px] md:min-w-[500px] mt-9">
      <Tabs
        value={params.listedBy ?? "All"}
        onChange={(value) => onTabChange(value ?? "All")}
        defaultValue="All"
        classNames={S}
      >
        <Tabs.List>
          <h3 className="mt-1.5 text-black text-base md:text-xl   font-medium ml-3 w-full md:w-auto mb-2 md:mb-0">
            Select the listings Posted by:
          </h3>
          {TabData.map((eachItem, index) => {
            return (
              <Tabs.Tab
                key={index}
                value={eachItem.value}
                classNames={{
                  tab: eachItem.value === "All" ? S.hidden : S.tab,
                  tabLabel: S.tabLabel,
                }}
              >
                {eachItem.label}
              </Tabs.Tab>
            );
          })}
          <SortBy />
        </Tabs.List>

        <Tabs.Panel value="All">
          <ScrollArea
            className=" p-[2%]  overflow-y-auto  h-screen mt-2"
            h={700}
          >
            {isLoading ? (
              <Loading />
            ) : data != undefined &&
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
          </ScrollArea>
        </Tabs.Panel>
        <Tabs.Panel value="I">
          <ScrollArea
            className=" p-[2%]  overflow-y-auto  h-screen mt-2"
            h={700}
          >
            {isLoading ? (
              <Loading />
            ) : data != undefined &&
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
          </ScrollArea>
        </Tabs.Panel>
        <Tabs.Panel value="A">
          <ScrollArea
            className=" p-[2%]  overflow-y-auto  h-screen mt-2"
            h={700}
          >
            {isLoading ? (
              <Loading />
            ) : data != undefined &&
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
          </ScrollArea>
        </Tabs.Panel>
        <Tabs.Panel value="B">
          <ScrollArea
            className=" p-[2%]  overflow-y-auto  h-screen mt-2"
            h={700}
          >
            {isLoading ? (
              <Loading />
            ) : data != undefined &&
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
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>
      <RequestCallBackModal close={close} opened={opned} builderId={1112} />
      <LoginPopup />
      <MapModal />
    </div>
  );
};

export { LeftSideBlock };
import { Menu } from "@mantine/core";
import MapModal from "./modals";
import Loading from "@/app/components/atoms/Loader";
import { Vast_Shadow } from "next/font/google";

function SortBy() {
  const [selected, setSort] = useState("");
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <button className="flex h-7 justify-center items-center gap-2.5 p-3.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] border-[0.5px] border-solid border-[#CBD4E1] bg-white mr-auto md:mr-2 md:mt-1 mb-2 ml-4 md:ml-auto">
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
