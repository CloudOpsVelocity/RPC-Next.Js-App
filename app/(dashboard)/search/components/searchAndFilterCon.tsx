"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Drawer, Pill, PillsInput, Popover } from "@mantine/core";
import { FilterPopup } from "./filterPopup";
import { FilterPopup as ListingPopup } from "../listing/components/filterPopup";
import classes from "@/app/styles/search.module.css";
import BhkFilter from "./bhk";
import PropTypeFilter from "./proptype";
import BugdetFilter from "./buget";
import useSearchFilters from "@/app/hooks/search";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import S from "@/app/styles/seach/Drawer.module.css";
import SearchDrawerHeader from "./filter";
import SearchDrawer from "./drawer";
import BuyRent from "./filter/BuyRent";
import { DynamicText } from "../utils/text";
import useQsearch from "@/app/hooks/search/useQsearch";

const SearchAndFilterCon = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 601px)");
  const { debounced } = useQsearch();
  return (
    <>
      <SearchHeader open={open} close={close} />
      <Drawer
        opened={opened}
        onClose={close}
        position="top"
        classNames={{
          overlay: S.overlay,
          content: S.content,
          header: S.header,
          body: classes.body,
        }}
        size={isMobile ? "100%" : debounced ? "70%" : "25%"}
      >
        <SearchDrawerHeader open={open} close={close} />
      </Drawer>
    </>
  );
};

export { SearchAndFilterCon };

const SearchHeader = ({ open }: any) => {
  const {
    countAppliedFilters,
    filters,
    remnoveSearchOptions,
    setFilters,
    handleAppliedFilters,
    params,
  } = useSearchFilters();
  const isTab = useMediaQuery("(max-width: 1600px)");
  return (
    <div className="m-[2%] w-full flex mt-[100px] pl-[1%] xl:pl-[2%] gap-1 xl:gap-2 sm:gap-[10px] flex-wrap sm:flex-wrap xl:flex-nowrap justify-start xl:justify-start items-start xl:items-center ">
      <p className="text-[14px] xl:text-[16px] text-[#737579] font-[500] mt-2 mb-2 sm:mb-0 sm:mt-0 w-full md:w-auto">
        <Link href={"/"}>Home</Link> {" > "}
        <span>
          <span className="text-[14px] md:text-[16px] text-[#4D6677] font-[600]">
            {DynamicText({
              cg: params.cg as string,
              listedBy: params.listedBy,
            })}
          </span>
        </span>{" "}
      </p>

      <div className=" border-[#A0D7FF] rounded-[40px] p-2 gap-2 xl:gap-[8px] pl-2 xl:pl-[8px] border-[1px] border-solid flex items-center justify-center ">
        <BuyRent />

        {filters.locality?.map(
          (each, index) =>
            index < (isTab ? 1 : 2) && (
              <Pill
                onRemove={() => {
                  remnoveSearchOptions(each, "locality");
                  handleAppliedFilters();
                }}
                key={index}
                withRemoveButton
                classNames={{
                  root: classes.MultiSelectionPill,
                  remove: classes.removeButton,
                }}
                removeButtonProps={{
                  style: {
                    color: "#03153",
                  },
                }}
              >
                {each.split("+")[0]}
              </Pill>
            )
        )}
        {filters.locality?.length > (isTab ? 1 : 2) && (
          <Pill
            className="capitalize"
            classNames={{ root: classes.MultiSelectionPill }}
            onClick={open}
          >
            {`+${filters.locality?.length - (isTab ? 1 : 2)} More`}
          </Pill>
        )}
        {filters.locality?.length > 0 ? (
          <p onClick={open}>Add more</p>
        ) : (
          <p onClick={open}>Enter City, Locality & Project</p>
        )}
      </div>
      <Popover
        width={"auto"}
        trapFocus
        position="bottom"
        withArrow
        shadow="lg"
        radius={10}
        offset={{ mainAxis: 10, crossAxis: 0 }}
      >
        <Popover.Target>
          <button className=" text-[#0073C6] sm:text-[14px] xl:text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] hidden justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md md:flex ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <circle cx="5" cy="5" r="5" fill="#148B16" />
            </svg>
            BHK
          </button>
        </Popover.Target>
        <Popover.Dropdown className="!z-50" p={0}>
          <BhkFilter />
        </Popover.Dropdown>
      </Popover>
      <Popover
        width={"auto"}
        trapFocus
        position="bottom"
        withArrow
        shadow="lg"
        radius={10}
        offset={{ mainAxis: 10, crossAxis: 0 }}
      >
        <Popover.Target>
          <button className=" text-[#0073C6] hidden text-[14px] xl:text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] lg:flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <circle cx="5" cy="5" r="5" fill="#148B16" />
            </svg>
            Property Type
          </button>
        </Popover.Target>
        <Popover.Dropdown className="!z-50" p={0}>
          <PropTypeFilter />
        </Popover.Dropdown>
      </Popover>
      <Popover
        width={"auto"}
        trapFocus
        position="bottom"
        withArrow
        shadow="lg"
        radius={10}
        offset={{ mainAxis: 10, crossAxis: 0 }}
      >
        <Popover.Target>
          <button className=" text-[#0073C6] text-[14px] xl:text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] hidden lg:flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md ">
            {" "}
            <span className="bg-[#148B16] rounded-full text-white text-sm block w-5 h-5">
              ₹
            </span>
            Budget
          </button>
        </Popover.Target>
        <Popover.Dropdown className="!z-50" p={0}>
          <BugdetFilter />
        </Popover.Dropdown>
      </Popover>

      <Popover
        width={"auto"}
        trapFocus
        position="bottom"
        withArrow
        shadow="lg"
        radius={10}
        offset={{ mainAxis: 10, crossAxis: -200 }}
      >
        <Popover.Target>
          <button className=" text-[#0073C6] mr-[5%] md:m-0 text-[14px] xl:text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] md:flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md hidden">
            <div className="text-[#FFF] bg-[#148B16] rounded-[50%] text-[16px] font-[700] w-[24px] h-[24px] flex justify-center items-center">
              {countAppliedFilters()}
            </div>
            Filters
          </button>
        </Popover.Target>
        <Popover.Dropdown className="!z-50" p={0}>
          {params.listedBy ? <ListingPopup /> : <FilterPopup />}
        </Popover.Dropdown>
      </Popover>
      <SearchDrawer />
    </div>
  );
};
