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
import MobileFilterDrawer from "./drawer";
import BuyRent from "../../components/filter/BuyRent";
import { DynamicText } from "../../utils/text";
import useQsearch from "@/app/hooks/search/useQsearch";
import { SearchIcon } from "@/app/images/HomePageIcons";
import { toFormattedString } from "../../components/buget/budget";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import { SEARCH_FILTER_DATA } from "@/app/data/search";

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
  const isMobile = useMediaQuery("(max-width: 601px)");
  const [projName, clearProjName] = useQueryState("projName");
  const isTab = useMediaQuery("(max-width: 1600px)");
  const maxDisplay = 3;

  const values = filters.unitTypes.map((itemId, i) => {
    const selectedItem = SEARCH_FILTER_DATA.bhkDetails.find(
      (item) => item.value === itemId
    );
    if (selectedItem) {
      return (
        <React.Fragment key={itemId}>
          {i < maxDisplay ? selectedItem.title : ""}
          {i < maxDisplay - 1 && ", "}
          {i === maxDisplay - 1 && filters.unitTypes.length > maxDisplay
            ? " ..."
            : ""}
        </React.Fragment>
      );
    }
    return null;
  });
  const [opened, { open: openMobileFilter, close }] = useDisclosure(false);
  const showpopUp = () => {
    setShowAllLocalities(true);
    open();
  };
  const shouldShowBudget = !(
    (filters.bugdetValue[0] === 500000 &&
      filters.bugdetValue[1] === 600000000) ||
    (filters.bugdetValue[0] === 0 && filters.bugdetValue[1] === 100000)
  );
  const allFiltersMap = [...filters.locality, ...filters.builderIds];
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
      {isMobile && (
        <div
          className={` border-[#A0D7FF] max-w-full flex-wrap rounded-[20px] sm:rounded-[40px] p-2 gap-2 xl:gap-[8px] pl-2 xl:pl-[8px] border-[1px] border-solid flex items-center justify-center sm:min-w-[300px]  `}
        >
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
            {allFiltersMap?.map(
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
            {allFiltersMap?.length > (isTab ? 1 : 2) && (
              <Pill
                className="capitalize"
                classNames={{ root: classes.MultiSelectionPill }}
              >
                {`+${allFiltersMap?.length - (isTab ? 1 : 2)} More`}
              </Pill>
            )}
          </div>
          <div className="inline-flex gap-2" onClick={openMobileFilter}>
            {" "}
            {allFiltersMap?.length > 0 ? (
              <p onClick={open}>Add more</p>
            ) : (
              <p onClick={open}>Search By City, Locality, Projects</p>
            )}
            <SearchIcon />
          </div>
        </div>
      )}
      <div className="mt-2 w-full flex  gap-1 xl:gap-2 sm:gap-[10px] flex-wrap sm:flex-wrap xl:flex-nowrap justify-start xl:justify-start items-center xl:items-center ">
        {!isMobile && (
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
              <div
                className={` border-[#A0D7FF] max-w-full flex-wrap rounded-[20px] sm:rounded-[40px] p-2 gap-2 xl:gap-[8px] pl-2 xl:pl-[8px] border-[1px] border-solid flex items-center justify-center sm:min-w-[300px]  `}
              >
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

                  {allFiltersMap?.length > (isTab ? 1 : 2) && (
                    <Pill
                      className="capitalize"
                      classNames={{ root: classes.MultiSelectionPill }}
                      onClick={() => showpopUp()}
                    >
                      {`+${allFiltersMap?.length - (isTab ? 1 : 2)} More`}
                    </Pill>
                  )}
                </div>
                <div className="inline-flex gap-2">
                  {" "}
                  {allFiltersMap?.length > 0 ? (
                    <p onClick={open}>Add more</p>
                  ) : (
                    <p onClick={open}>Search By City, Locality, Projects</p>
                  )}
                  <SearchIcon />
                </div>
              </div>
            </Popover.Target>
            <Popover.Dropdown className="!z-50" p={0}>
              <FilterPopup />
            </Popover.Dropdown>
          </Popover>
        )}

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
              {filters.unitTypes.length > 0 ? values : "Select BHK Type"}
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
              {filters.propTypes
                ? propertyDetailsTypes.get(filters.propTypes)?.name
                : "Select Property Type"}
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
              {shouldShowBudget
                ? `${toFormattedString(filters.bugdetValue[0])}  ${
                    "- " + toFormattedString(filters.bugdetValue[1])
                  }`
                : " Add Budget"}
            </button>
          </Popover.Target>
          <Popover.Dropdown className="!z-50" p={0}>
            <BugdetFilter />
          </Popover.Dropdown>
        </Popover>

        <MobileFilterDrawer close={close} open={open} opened={opened} />
      </div>
    </div>
  );
};
