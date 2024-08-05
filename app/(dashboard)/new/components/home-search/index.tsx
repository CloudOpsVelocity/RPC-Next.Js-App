"use client";
import Image from "next/image";
import { useState } from "react";
import Searchbar from "./searchbar";
import Button from "@/app/components/atoms/buttons/variansts";
import Tabs from "./tabs";
import Box from "./recentSearch/Box";
import Alert from "./Alert";
import QuickFilters from "./filters/QuickFilters";
import Nearme from "./Nearme";
import SearchSec from "./SearchSec";
import { useMediaQuery } from "@mantine/hooks";
import Target from "./filters/mobile/Target";
import { useAtomValue } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";
const HomeSearch = () => {
  const f = useAtomValue(homeSearchFiltersAtom);
  const handleSearch = () => {
    alert(JSON.stringify(f));
  };
  const isMobile = useMediaQuery("(max-width: 601px)");
  return (
    <div
      className="px-5 w-full  md:pl-0 border-2 sm:grid sm:grid-cols-[1.1fr_2fr] gap-2 sm:px-20 bg-white pt-28 pb-4 sm:py-28 relative mt-[90px] "
      style={{
        backgroundImage: "url(/home/clouds.svg)",
      }}
    >
      <Alert />
      <div className=" items-center justify-center hidden md:flex">
        <Image
          src={"/home/home-search.svg"}
          alt="home-search"
          height={300}
          width={500}
        />
      </div>
      <div className="w-full">
        <div className="flex flex-col items-start sm:gap-3 self-stretch pl-[11px] pr-2.5 pt-0 pb-[13px] rounded-lg border-[0.5px] border-solid border-[#A6BDDF] bg-[#f2f7ff] sm:h-[200px] w-full">
          <Tabs />
          <p className="inline-flex sm:hidden justify-center items-center text-[#242424] text-[14px] not-italic font-medium gap-1">
            {config.homeIcon} All Residential
          </p>
          <div className="flex items-center gap-2.5 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] px-1.5 py-1 border-[0.5px] border-solid border-[#819CA9] bg-white w-full sm:w-auto">
            <div className="hidden sm:flex items-center gap-[5px] rounded p-2 border-r-[0.5px] border-r-gray-400 border-solid text-[#242424] sm:text-[14px] not-italic font-medium text-[12px]">
              {config.homeIcon}{" "}
              <div className="text-nowrap">All Residential</div>
            </div>
            <div className="flex justify-center items-center sm:gap-[191px] w-full">
              {isMobile ? (
                <Target />
              ) : (
                <div className="hidden sm:flex items-center w-full">
                  {config.searchIcon} <SearchSec />
                </div>
              )}
              {!isMobile && (
                <div className="hidden sm:flex gap-2">
                  <Nearme />
                  <div
                    onClick={handleSearch}
                    // href={`/search?${handleSearch()}`}
                    // target="_blank"
                    className={`inline-flex justify-center items-center rounded sm:p-[6px] sm:pl-[16px] sm:pr-[16px] text-white text-[16px]  2xl:text-xl font-bold bg-[#0073c6]`}
                  >
                    Search
                  </div>
                </div>
              )}
            </div>
          </div>
          {!isMobile && <QuickFilters />}
        </div>
        <div className="mt-4">
          <p className="text-[#242424] sm:text-xl not-italic font-medium leading-[normal] ">
            Browse:
          </p>
          <div className="space-x-2 mt-1 flex sm:block overflow-x-scroll max-w-[100%] scrollbar-hide">
            <Box />
            <Box />
            <Box />
            <Box />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;

const config = {
  homeIcon: (
    <svg
      className="min-h-[16px] min-w-[16px]"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8.306 1.10722C8.21728 1.03805 8.108 1.00049 7.9955 1.00049C7.883 1.00049 7.77372 1.03805 7.685 1.10722L0.5 6.70972L1.1215 7.49572L2 6.81072V13.0002C2.00053 13.2653 2.10606 13.5193 2.29348 13.7067C2.4809 13.8942 2.73495 13.9997 3 14.0002H13C13.2651 13.9997 13.5191 13.8942 13.7065 13.7067C13.8939 13.5193 13.9995 13.2653 14 13.0002V6.81522L14.8785 7.50022L15.5 6.71422L8.306 1.10722ZM9 13.0002H7V9.00022H9V13.0002ZM10 13.0002V9.00022C10 8.73501 9.89464 8.48065 9.70711 8.29312C9.51957 8.10558 9.26522 8.00022 9 8.00022H7C6.73478 8.00022 6.48043 8.10558 6.29289 8.29312C6.10536 8.48065 6 8.73501 6 9.00022V13.0002H3V6.03122L8 2.13622L13 6.03622V13.0002H10Z"
        fill="#242424"
      />
    </svg>
  ),
  searchIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20.0313 20.7901C20.4913 21.2501 21.2013 20.5401 20.7413 20.0901L16.9913 16.3301C18.3071 14.8748 19.0343 12.982 19.0313 11.0201C19.0313 6.63006 15.4613 3.06006 11.0713 3.06006C6.68133 3.06006 3.11133 6.63006 3.11133 11.0201C3.11133 15.4101 6.68133 18.9801 11.0713 18.9801C13.0513 18.9801 14.8813 18.2501 16.2813 17.0401L20.0313 20.7901ZM4.11033 11.0201C4.11033 7.18006 7.24033 4.06006 11.0703 4.06006C14.9103 4.06006 18.0303 7.18006 18.0303 11.0201C18.0303 14.8601 14.9103 17.9801 11.0703 17.9801C7.24033 17.9801 4.11033 14.8601 4.11033 11.0201Z"
        fill="#565D70"
      />
    </svg>
  ),
  nearMe: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M19 11C19 13.1217 18.1571 15.1566 16.6569 16.6569C15.1566 18.1571 13.1217 19 11 19C8.87827 19 6.84344 18.1571 5.34315 16.6569C3.84285 15.1566 3 13.1217 3 11C3 8.87827 3.84285 6.84344 5.34315 5.34315C6.84344 3.84285 8.87827 3 11 3C13.1217 3 15.1566 3.84285 16.6569 5.34315C18.1571 6.84344 19 8.87827 19 11Z"
        stroke="#148B16"
        stroke-width="1.5"
      />
      <path
        opacity="0.5"
        d="M14 11C14 11.7956 13.6839 12.5587 13.1213 13.1213C12.5587 13.6839 11.7956 14 11 14C10.2044 14 9.44129 13.6839 8.87868 13.1213C8.31607 12.5587 8 11.7956 8 11C8 10.2044 8.31607 9.44129 8.87868 8.87868C9.44129 8.31607 10.2044 8 11 8C11.7956 8 12.5587 8.31607 13.1213 8.87868C13.6839 9.44129 14 10.2044 14 11Z"
        stroke="#148B16"
        stroke-width="1.5"
      />
      <path
        opacity="0.5"
        d="M1 11H3M19 11H21M11 3V1M11 21V19"
        stroke="#148B16"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  ),
};
