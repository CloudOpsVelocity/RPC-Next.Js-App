"use client";

import React, { useState } from "react";
import { Select, Tabs } from "@mantine/core";
import ProjectDetailsCard from "./projectCard";
import S from "@/app/styles/seach/Index.module.css";
import {
  DropDownIcon,
  emptyFilesIcon,
  strikeIconIcon,
} from "@/app/images/commonSvgs";
import useSearchFilters from "@/app/hooks/search";
import Loading from "@/app/components/atoms/Loader";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import { SEARCH_FILTER_DATA } from "@/app/data/search";

const LeftSideBlock = () => {
  const [opned, { close, open }] = useReqCallPopup();
  const [activeTab, setActiveTab] = useState<string | null>("proj");
  const {
    searchProps: { data, isLoading },
  } = useSearchFilters();

  return (
    <div className="w-[50%] bg min-w-[500px]">
      <Tabs value={activeTab} onChange={setActiveTab} defaultValue="proj">
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
          {/* <Select
            rightSection={<DropDownIcon />}
            label=""
            placeholder="Sort By"
            data={[
              "Relevance",
              "Newest first",
              "Price Low to High",
              "Price High to Low",
              "Price / sq.ft. : Low to High",
              "Price / sq.ft. : High to Low",
            ]}
            className="placeholder:!text-[#0073C6] text-base not-italic font-medium leading-[normal] ml-auto"
          /> */}
        </Tabs.List>

        <Tabs.Panel value="proj">
          <div className=" p-[2%] max-h-[700px] overflow-y-auto h-screen ">
            {isLoading ? (
              <Loading />
            ) : data != undefined &&
              data.length != undefined &&
              data.length > 0 ? (
              data.map((eachOne, index: number) => {
                return (
                  <ProjectDetailsCard
                    key={index}
                    type={activeTab}
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
        <Tabs.Panel value="owner-props">
          <div className=" p-[2%] max-h-[700px] overflow-y-auto  h-screen ">
            {/* {projectsData != undefined &&
            projectsData.length != undefined &&
            projectsData.length > 0 ? (
              projectsData.map((eachOne, index) => {
                return <ProjectDetailsCard key={index} type={activeTab} />;
              })
            ) : (
              <div className="flex w-full h-full justify-center items-center flex-col ">
                {emptyFilesIcon}
                No Matching Results Found !
                <span className="relative left-[10%] ">{strikeIconIcon}</span>
              </div>
            )} */}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="agent-props">
          <div className=" p-[2%] max-h-[700px] overflow-y-auto  h-screen ">
            {/* {projectsData != undefined &&
            projectsData.length != undefined &&
            projectsData.length > 0 ? (
              projectsData.map((eachOne, index) => {
                return <ProjectDetailsCard key={index} type={activeTab} />;
              })
            ) : (
              <div className="flex w-full h-full justify-center items-center flex-col ">
                {emptyFilesIcon}
                No Matching Results Found !
                <span className="relative left-[10%] ">{strikeIconIcon}</span>
              </div>
            )} */}
          </div>
        </Tabs.Panel>
      </Tabs>
      <RequestCallBackModal close={close} opened={opned} builderId={1112} />
      <LoginPopup hidden card />
    </div>
  );
};

export { LeftSideBlock };
import { Menu, Button, Text, rem } from "@mantine/core";

function SortBy() {
  const [selected, setSort] = useState("");
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <button className="flex h-7 justify-center items-center gap-2.5 p-3.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] border-[0.5px] border-solid border-[#CBD4E1] bg-white ml-auto mt-1 mr-3">
          <span className="text-[#0073C6] text-base not-italic font-medium leading-[normal] ">
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
