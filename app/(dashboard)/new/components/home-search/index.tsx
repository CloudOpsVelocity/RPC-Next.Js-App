"use client";
import Image from "next/image";
import { useState } from "react";
import Searchbar from "./searchbar";
import Button from "@/app/components/atoms/buttons/variansts";
import Tabs from "./tabs";
import Box from "./recentSearch/Box";
const propertyTypes = ["Buy", "Rent"];
const HomeSearch = () => {
  const [selectedType, setSelectedType] = useState(propertyTypes[0]);
  return (
    <div className="w-full pl-5 md:pl-0 border-2 grid grid-cols-[1.1fr_2fr] gap-2 sm:px-20 bg-white py-28">
      <div className=" items-center justify-center hidden md:flex">
        <Image
          src={"/home/home-search.svg"}
          alt="home-search"
          height={300}
          width={500}
        />
      </div>
      <div className="">
        <div className="flex flex-col items-start gap-3 self-stretch pl-[11px] pr-2.5 pt-0 pb-[13px] rounded-lg border-[0.5px] border-solid border-[#A6BDDF] bg-[#f2f7ff] h-[200px]">
          <Tabs />
          <div className="flex items-center gap-2.5 rounded shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] px-1.5 py-1 border-[0.5px] border-solid border-[#819CA9] bg-white">
            <div className="flex items-center gap-[5px] rounded p-2 border-r-[0.5px] border-r-gray-400 border-solid text-[#242424] text-lg not-italic font-medium">
              {config.homeIcon} All Residential
            </div>
            <div className="flex justify-center items-center gap-[191px]">
              <div className="flex gap-2">
                {config.searchIcon}{" "}
                <input
                  type="text"
                  className="text focus:outline-none min-w-[280px]"
                  placeholder="Search “ Whitefield, Bangalore”"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 rounded p-1 bg-[#f0ffdc] text-[#148B16]  not-italic font-medium cursor-pointer">
                  {config.nearMe} Near Me
                </button>
                <Button variant="blue" className="!p-2 !text-base !px-4">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[#242424] text-xl not-italic font-medium leading-[normal]">
            Recent Search:
          </p>
          <div className="space-x-2 mt-1">
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
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12.459 1.66059C12.3259 1.55684 12.162 1.50049 11.9932 1.50049C11.8245 1.50049 11.6606 1.55684 11.5275 1.66059L0.75 10.0643L1.68225 11.2433L3 10.2158V19.5001C3.00079 19.8977 3.15908 20.2787 3.44022 20.5599C3.72135 20.841 4.10242 20.9993 4.5 21.0001H19.5C19.8976 20.9993 20.2787 20.841 20.5598 20.5599C20.8409 20.2787 20.9992 19.8977 21 19.5001V10.2226L22.3177 11.2501L23.25 10.0711L12.459 1.66059ZM13.5 19.5001H10.5V13.5001H13.5V19.5001ZM15 19.5001V13.5001C15 13.1023 14.842 12.7207 14.5607 12.4394C14.2794 12.1581 13.8978 12.0001 13.5 12.0001H10.5C10.1022 12.0001 9.72064 12.1581 9.43934 12.4394C9.15804 12.7207 9 13.1023 9 13.5001V19.5001H4.5V9.04659L12 3.20409L19.5 9.05409V19.5001H15Z"
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
