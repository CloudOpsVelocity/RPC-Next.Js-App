"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Drawer,
  MultiSelect,
  Pill,
  PillsInput,
  Popover,
  ScrollArea,
  Select,
  em,
} from "@mantine/core";
import { FilterPopup } from "./filterPopup";
import classes from "@/app/styles/search.module.css";
import { useQueryState } from "nuqs";
import BhkFilter from "./bhk";
import PropTypeFilter from "./proptype";
import BugdetFilter from "./buget";
import useSearchFilters from "@/app/hooks/search";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import S from "@/app/styles/seach/Drawer.module.css";
import SearchDrawerHeader from "./filter";
import SearchDrawer from "./drawer";
import BuyRent from "../../components/filter/BuyRent";
import { DynamicText } from "../../utils/text";
import useQsearch from "@/app/hooks/search/useQsearch";
import { SearchIcon } from "@/app/images/HomePageIcons";

const SearchAndFilterCon = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { debounced } = useQsearch();
  const [showAllLocalities, setShowAllLocalities] = useState(false);

  return (
    <>
      <SearchHeader
        showAllLocalities={showAllLocalities}
        setShowAllLocalities={setShowAllLocalities}
        open={open}
        close={close}
      />
      {/* <Drawer
        opened={opened}
        onClose={close}
        position="top"
        classNames={{
          overlay: S.overlay,
          content: S.content,
          header: S.header,
          body: classes.body,
        }}
        size={isMobile ? "100%" : debounced ? "70%" : "20%"}
      >
        <SearchDrawerHeader
          showAllLocalities={showAllLocalities}
          setShowAllLocalities={setShowAllLocalities}
          open={open}
          close={close}
        />
      </Drawer> */}
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

const SearchHeader = ({ open, setShowAllLocalities }: any) => {
  const {
    countAppliedFilters,
    filters,
    remnoveSearchOptions,
    setFilters,
    handleAppliedFilters,
    params,
    searchProps,
  } = useSearchFilters();

  const [projName, clearProjName] = useQueryState("projName");
  const isTab = useMediaQuery("(max-width: 1600px)");
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    open();
  };
  const showpopUp = () => {
    setShowAllLocalities(true);
    open();
  };
  return (
    <div className="mb-4 w-full  mt-[60px] sm:mt-[80px] pl-[1%]   ">
      <p className="text-[12px]  text-[#737579] font-[500] mt-2 mb-2 sm:mb-0  w-full md:w-auto">
        <span className=" text-[#737579] font-[500] mt-3">
          {" "}
          <a href={"/"}>Home</a> {" > "}
        </span>
        <span>
          <span className="  text-[#4D6677] font-[600] cursor-pointer">
            {DynamicText({
              cg: params.cg as string,
              listedBy: params.listedBy,
            })}
          </span>
        </span>{" "}
      </p>
      <div className="mt-2 w-full flex  gap-1 xl:gap-2 sm:gap-[10px] flex-wrap sm:flex-wrap xl:flex-nowrap justify-start xl:justify-start items-center xl:items-center ">
        <div className=" border-[#A0D7FF] max-w-full flex-wrap rounded-[20px] sm:rounded-[40px] p-2 gap-2 xl:gap-[8px] pl-2 xl:pl-[8px] border-[1px] border-solid flex items-center justify-center  ">
          <BuyRent />
          <div className="my-2">
            {filters.projIdEnc && (
              <Pill
                withRemoveButton
                classNames={{ root: classes.MultiSelectionPill }}
                onRemove={() => {
                  setFilters((prev) => ({ ...prev, projIdEnc: null }));
                  clearProjName(null);
                  handleAppliedFilters();
                }}
                removeButtonProps={{
                  style: {
                    color: "#03153",
                  },
                }}
              >
                {projName}
              </Pill>
            )}

            {/* {filters.city && (
              <Pill
                withRemoveButton
                classNames={{ root: classes.MultiSelectionPill }}
                onRemove={() => {
                  setFilters((prev) => ({ ...prev, city: null }));
                  handleAppliedFilters();
                }}
                removeButtonProps={{
                  style: {
                    color: "#03153",
                  },
                }}
              >
                {filters.city.split("+")[0]}
              </Pill>
            )} */}
            {filters.locality?.length > (isTab ? 1 : 2) && (
              <Pill
                className="capitalize"
                classNames={{ root: classes.MultiSelectionPill }}
                onClick={() => showpopUp()}
              >
                {`+${filters.locality?.length - (isTab ? 1 : 2)} More`}
              </Pill>
            )}
          </div>
          <div>
            {" "}
            {filters.locality?.length > 0 ? (
              <p onClick={open}>Add more</p>
            ) : (
              <p onClick={open}>Search By City, Locality, Projects</p>
            )}
            <SearchIcon />
          </div>

          {/*   <PillsInput
          classNames={{ input: classes.wrapperMultiSelection }}
          onClick={handleClick}
        >
          <Pill.Group>
            {filters.projIdEnc && (
              <Pill
                withRemoveButton
                classNames={{ root: classes.MultiSelectionPill }}
                onRemove={() => {
                  setFilters((prev) => ({ ...prev, projIdEnc: null }));
                  clearProjName(null);
                  handleAppliedFilters();
                }}
                removeButtonProps={{
                  style: {
                    color: "red",
                  },
                }}
              >
                {projName}
              </Pill>
            )}

            {filters.city && (
              <Pill
                withRemoveButton
                classNames={{ root: classes.MultiSelectionPill }}
                onRemove={() => {
                  setFilters((prev) => ({ ...prev, city: null }));
                  handleAppliedFilters();
                }}
                removeButtonProps={{
                  style: {
                    color: "red",
                  },
                }}
              >
                {filters.city.split("+")[0]}
              </Pill>
            )}
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
                        color: "red",
                      },
                    }}
                  >
                    {each.split("+")[0]}
                  </Pill>
                )
            )}
            <PillsInput.Field
              miw={225}
              placeholder={
                filters.locality.length > 0
                  ? "Add More"
                  : "Enter City,Locality & Project"
              }
              readOnly
            />
          </Pill.Group>
        </PillsInput> */}
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
            <button className=" text-[#0073C6] text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] hidden justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md md:flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <circle cx="5" cy="5" r="5" fill="#148B16" />
              </svg>
              Select BHK Type
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
              className=" text-[#0073C6] hidden text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] lg:flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md "
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
              Add Property Type
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
              className=" text-[#0073C6] text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] hidden lg:flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md "
            >
              <span className="bg-[#148B16] rounded-full text-white text-sm block w-5 h-5">
                ₹
              </span>
              Add Budget
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
            <button className=" text-[#0073C6] mr-[5%] md:m-0 text-[20px] font-[500] gap-[6px] p-[7px] pl-[12px] pr-[12px] md:flex justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md hidden">
              <div className="text-[#FFF] bg-[#148B16] rounded-[50%] text-[16px] font-[700] w-[24px] h-[24px] flex justify-center items-center">
                {countAppliedFilters()}
              </div>
              Add More Filters
            </button>
          </Popover.Target>
          <Popover.Dropdown className="!z-50" p={0}>
            <FilterPopup />
          </Popover.Dropdown>
        </Popover>
        <SearchDrawer />
      </div>
    </div>
  );
};
