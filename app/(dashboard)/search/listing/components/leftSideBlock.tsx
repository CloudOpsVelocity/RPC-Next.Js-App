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
import { SEARCH_FILTER_DATA } from "@/app/data/search";

const LeftSideBlock = () => {
  const [opned, { close }] = useReqCallPopup();
  const [activeTab, setActiveTab] = useState<string | null>("owner-props");

  const {
    searchProps: { isLoading, data, hasNextPage, fetchMoreData },
  } = useSearchFilters();
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

  return (
    <div className="md:w-[70%] sm:w-[100%]  md:bg-white  min-w-[400px] md:min-w-[500px] mt-9">
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        defaultValue="proj"
        classNames={S}
      >
        <Tabs.List>
          <h3 className="mt-1.5 text-black text-base md:text-xl   font-medium ml-3 w-full md:w-auto mb-2 md:mb-0">
            Select the listings Posted by:
          </h3>
          {SEARCH_FILTER_DATA.categoryData
            .slice(1, 3)
            .map((eachItem, index) => {
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

        <Tabs.Panel value="owner-props">
          <ScrollArea
            className=" p-[2%]  overflow-y-auto  h-screen mt-2"
            h={700}
          >
            {projectsData != undefined &&
            projectsData.length != undefined &&
            projectsData.length > 0 ? (
              projectsData.map((eachOne, index) => {
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
          </ScrollArea>
        </Tabs.Panel>
        <Tabs.Panel value="agent-props">
          <ScrollArea
            className=" p-[2%]  overflow-y-auto  h-screen mt-2"
            h={700}
          >
            {projectsData != undefined &&
            projectsData.length != undefined &&
            projectsData.length > 0 ? (
              projectsData.map((eachOne, index) => {
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

const projectsData = [
  {
    projIdEnc: "9b75485eac0620a4c9599d1267e804f0",
    builderId: 1079,
    projName: "ds max sky shubham",
    minPrice: "2500000",
    maxPrice: "5000000",
    launchDate: "Mon Mar 01 00:00:00 IST 2027",
    possassionDate: "Mon Mar 01 00:00:00 IST 2027",
    postedDate: "Fri Feb 02 18:28:20 IST 2024",
    city: "Banglore",
    locality: "nagawara",
    propTypes: ["Apartment"],
    agentListing: 0,
    ownerListing: 0,
    lat: 13.037998,
    lang: 77.70229,
    coverUrl:
      "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/351/cover/cover.jpg",
  },
  {
    projIdEnc: "7de56e0b01d0296f1b63ae3b8299336d",
    builderId: 1321,
    projName: "abc",
    minPrice: "0",
    maxPrice: "0",
    launchDate: "Thu Mar 20 00:00:00 IST 2025",
    possassionDate: "Thu Mar 20 00:00:00 IST 2025",
    postedDate: "Sat Feb 03 11:17:13 IST 2024",
    city: "Banglore",
    locality: "whitefield",
    agentListing: 0,
    ownerListing: 0,
    lat: 12.869115,
    lang: 77.70434,
    coverUrl:
      "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/353/cover/cover.jpg",
  },
  {
    projIdEnc: "2f68ddd8033756154f4d6abb50c4417e",
    builderId: 1358,
    projName: "Sumadhura Sushantham                                       ",
    minPrice: "0",
    maxPrice: "0",
    launchDate: "Thu Feb 29 00:00:00 IST 2024",
    possassionDate: "Thu Feb 29 00:00:00 IST 2024",
    postedDate: "Mon Feb 05 17:02:29 IST 2024",
    city: "Hyderabad",
    locality: "H locality 1",
    agentListing: 0,
    ownerListing: 0,
    lat: 12.953523,
    lang: 77.73285,
    coverUrl:
      "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/363/cover/cover.jpg",
  },
  {
    projIdEnc: "b60b5780ac136cd81d2201cf758c16e8",
    builderId: 2018,
    projName: "TTRE",
    minPrice: "0",
    maxPrice: "0",
    launchDate: "Tue Feb 27 00:00:00 IST 2024",
    possassionDate: "Tue Feb 27 00:00:00 IST 2024",
    postedDate: "Thu Feb 01 15:50:36 IST 2024",
    city: "Hyderabad",
    locality: "H locality 1",
    propTypes: ["Apartment"],
    agentListing: 0,
    ownerListing: 0,
    lat: 12.973173,
    lang: 77.61661,
    coverUrl:
      "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/330/cover/cover.jpg",
  },
  {
    projIdEnc: "e46e430b696d499ccda9a81e2b7a3f23",
    builderId: 1358,
    projName: "Project data",
    minPrice: "12",
    maxPrice: "8902151",
    launchDate: "Wed Feb 28 00:00:00 IST 2024",
    possassionDate: "Wed Feb 28 00:00:00 IST 2024",
    postedDate: "Wed Feb 07 12:05:48 IST 2024",
    city: "Hyderabad",
    locality: "H locality 1",
    propTypes: ["Plot", "Row House", "Villament ", "Apartment", "Villa"],
    agentListing: 0,
    ownerListing: 0,
    lat: 12.976664,
    lang: 77.57126,
    coverUrl:
      "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/389/cover/cover.jpg",
  },
  {
    projIdEnc: "c71992d3ec0f0fd65b17c198c5ce9350",
    builderId: 1203,
    projName: "sigma tech park",
    minPrice: "100000",
    maxPrice: "11100000",
    launchDate: "Thu Jan 02 00:00:00 IST 2025",
    possassionDate: "Thu Jan 02 00:00:00 IST 2025",
    postedDate: "Fri Dec 22 11:27:49 IST 2023",
    city: "Hyderabad",
    locality: "H locality 1",
    propTypes: ["Plot", "Apartment", "Villa"],
    agentListing: 0,
    ownerListing: 0,
    lat: 11.2,
    lang: 11.9,
    coverUrl:
      "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/117/cover/cover.jpg",
  },
  {
    projIdEnc: "593657e37d6e1370ebf9a6253ac49468",
    builderId: 1358,
    projName: "        dsdss     ",
    minPrice: "450",
    maxPrice: "58002",
    launchDate: "Thu Mar 07 00:00:00 IST 2024",
    possassionDate: "Thu Mar 07 00:00:00 IST 2024",
    postedDate: "Fri Feb 09 12:54:14 IST 2024",
    city: "Hyderabad",
    locality: "H locality 1",
    propTypes: ["Row House", "Villament "],
    agentListing: 0,
    ownerListing: 0,
    lat: 12.945158,
    lang: 77.72392,
    coverUrl:
      "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/399/cover/cover.jpg",
  },
  {
    projIdEnc: "6f80de849ca759b5d9f75282f19e67e9",
    builderId: 1655,
    projName: "erfg",
    minPrice: "500000",
    maxPrice: "1500000",
    launchDate: "Wed Feb 28 00:00:00 IST 2024",
    possassionDate: "Wed Feb 28 00:00:00 IST 2024",
    postedDate: "Mon Feb 05 16:08:06 IST 2024",
    city: "Hyderabad",
    locality: "H locality 1",
    propTypes: ["Villament "],
    agentListing: 0,
    ownerListing: 0,
    lat: 12.949173,
    lang: 77.72701,
    coverUrl:
      "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/362/cover/cover.jpg",
  },
  {
    projIdEnc: "08795083153f1cc4da3cc3e76624116e",
    builderId: 1112,
    projName: "AAAAAA",
    minPrice: "0",
    maxPrice: "0",
    postedDate: "Wed Feb 07 20:10:11 IST 2024",
    city: "Banglore",
    locality: "whitefield",
    agentListing: 0,
    ownerListing: 0,
    lat: 12.982391,
    lang: 77.637505,
    coverUrl:
      "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/396/cover/cover.jpg",
  },
  {
    projIdEnc: "dc7abc08ec73dab38452f6eb5aa4ec7e",
    builderId: 1358,
    projName: "post listing testing",
    minPrice: "250",
    maxPrice: "15000000",
    launchDate: "Wed Jan 30 00:00:00 IST 2030",
    possassionDate: "Wed Jan 30 00:00:00 IST 2030",
    postedDate: "Thu Feb 08 15:34:43 IST 2024",
    city: "Banglore",
    locality: "whitefield",
    propTypes: ["Plot", "Row House", "Villament ", "Apartment", "Villa"],
    agentListing: 0,
    ownerListing: 0,
    lat: 12.957021,
    lang: 77.518814,
    coverUrl:
      "https://d1l03fubsuphsh.cloudfront.net/images/varify/project/397/cover/cover.jpg",
  },
];
