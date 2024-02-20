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
          

          <Select
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
          />
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
