"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Drawer,
  MultiSelect,
  Pill,
  PillsInput,
  Popover,
  Select,
} from "@mantine/core";
import { FilterPopup } from "./filterPopup";
import classes from "@/app/styles/search.module.css";
import { useQueryState } from "nuqs";
import BhkFilter from "./bhk";
import PropTypeFilter from "./proptype";
import BugdetFilter from "./buget";
import useSearchFilters from "@/app/hooks/search";
import { useQuery } from "react-query";
import { getData } from "@/app/utils/api/search";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import S from "@/app/styles/seach/Drawer.module.css";
import SearchDrawerHeader from "./filter";

const SearchAndFilterCon = () => {
  const [opened, { open, close, toggle }] = useDisclosure(false);

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
      >
        <SearchDrawerHeader open={open} close={close} />
        {/* Drawer content */}
      </Drawer>
    </>
  );
};

export { SearchAndFilterCon };

const DropDownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
    >
      <path d="M0 0.5L7 7.5L14 0.5L0 0.5Z" fill="white" />
    </svg>
  );
};

const SearchHeader = ({ open, close }: any) => {
  const {
    countAppliedFilters,
    filters,
    remnoveSearchOptions,
    setFilters,
    handleAppliedFilters,
  } = useSearchFilters();
  const [name, setName] = useQueryState("q");

  const onSearchChange = (value: string) => {
    !value ? setName(null) : setName(value);
  };
  return (
    <div className="m-[2%] w-full flex mt-[100px] pl-[2%] gap-[20px] justify-start items-center ">
      <p className="text-[16px] text-[#737579] font-[500]">
        <span>Home</span> {" > "}
        <Link href={"/project/banglore"}>
          <span className="text-[16px] text-[#4D6677] font-[600]">
            Properties for Sell in Bengaluru
          </span>
        </Link>{" "}
      </p>

      <div className=" border-[#A0D7FF] rounded-[46px] gap-[8px] pl-[8px] border-[1px] border-solid flex items-center justify-center ">
        <Select
          label=""
          placeholder="Select"
          data={["Buy", "Rent", "Plot"]}
          classNames={{ input: classes.wrapperSelect }}
          defaultValue={"Buy"}
          rightSection={<DropDownIcon />}
        />

        <PillsInput classNames={{ input: classes.wrapperMultiSelection }}>
          <Pill.Group>
            {filters.city && (
              <Pill
                withRemoveButton
                classNames={{ root: classes.MultiSelectionPill }}
                onRemove={() => {
                  setFilters((prev) => ({ ...prev, city: null }));
                  handleAppliedFilters();
                }}
              >
                {filters.city.split("+")[0]}
              </Pill>
            )}
            {filters.locality?.map((each, index) => (
              <Pill
                onRemove={() => remnoveSearchOptions(each, "locality")}
                key={index}
                withRemoveButton
                classNames={{
                  root: classes.MultiSelectionPill,
                  remove: classes.removeButton,
                }}
              >
                {each.split("+")[0]}
              </Pill>
            ))}

            <PillsInput.Field
              placeholder={
                filters.locality.length > 0
                  ? "Add More"
                  : "Enter City,Locality & Project"
              }
              onClick={open}
            />
          </Pill.Group>
        </PillsInput>
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
          <button className=" text-[#0073C6] text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md ">
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
          <button
            // onClick={() => setOpened((o) => !o)}
            className=" text-[#0073C6] text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md "
          >
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
          <button
            // onClick={() => setOpened((o) => !o)}
            className=" text-[#0073C6] text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <circle cx="5" cy="5" r="5" fill="#148B16" />
            </svg>
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
          <button className=" text-[#0073C6] text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md ">
            <div className="text-[#FFF] bg-[#148B16] rounded-[50%] text-[16px] font-[700] w-[24px] h-[24px] flex justify-center items-center">
              {countAppliedFilters()}
            </div>
            Filters
          </button>
        </Popover.Target>
        <Popover.Dropdown className="!z-50" p={0}>
          <FilterPopup />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};
