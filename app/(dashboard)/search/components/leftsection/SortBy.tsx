import useSearchFilters from "@/app/hooks/search";
import { DarkDropDownIcon, DropDownIcon } from "@/app/images/commonSvgs";
import { Menu } from "@mantine/core";
import clsx from "clsx";
import React, { useState } from "react";

type Props = {};

export default function SortBy({}: Props) {
  const { filters, setFilters, handleAppliedFilters, params } =
    useSearchFilters();

  const handleSetFilter = (sortByfield: string, sortType: number) => {
    if(sortByfield  === "Newest First"){
      setFilters((prev) => ({
        ...prev,
        sortByfield: null,
        sortType: null,
      }));
    }
    else if(!(filters.sortByfield === sortByfield && filters.sortType === sortType)) {
   /*    setFilters((prev) => ({
        ...prev,
        sortByfield: null,
        sortType: null,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        sortByfield: sortByfield,
        sortType: sortType,
      })); */
      setFilters((prev) => ({
        ...prev,
        sortByfield: sortByfield,
        sortType: sortType,
      }));
      
    }
    handleAppliedFilters();
  };
  const seletedValue = config.find(
    (eachItem) =>
      eachItem.value === params.sortType && eachItem.type === params.sortByfield
  )?.label ?? "Newest First"
  console.log(seletedValue)
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <button className="flex h-7 justify-center items-center gap-2.5 p-3.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] border-[0.5px] border-solid border-[#CBD4E1] bg-white  xl:mr-4 xl:mt-1 xl:mb-2 ml-4 md:ml-auto xl:ml-auto ">
          <span className="text-[#0073C6] text-xs md:text-base not-italic   font-semibold leading-[normal] ">
            {seletedValue || "Sort By"}
          </span>
          <DarkDropDownIcon />
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
              classNames={{
                item: clsx(
                  " text-xs text-[#242424] md:text-base font-[500] leading-[normal]",
                  "Newest First" === seletedValue && "!bg-[#1C7ED6] !text-white"
                ),
              }}
              value={seletedValue}
              onClick={() => handleSetFilter("Newest First", 0)}
        
        >Newest First</Menu.Item>
        {config.map((eachItem, index) => {
          return (
            <Menu.Item
              classNames={{
                item: clsx(
                  " text-xs text-[#242424] md:text-base font-[500] leading-[normal]",
                  eachItem.label === seletedValue && "!bg-[#1C7ED6] !text-white"
                ),
              }}
              key={index}
              value={seletedValue}
              onClick={() => handleSetFilter(eachItem.type, eachItem.value)}
            >
              {eachItem.label}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}

const config = [
/*   {
    label:"Newest First",
    value:null,
    type:"price"
  },
 */
  {
    label: "Price Low to High",
    value: 2,
    type: "minPrice",
  },
  {
    label: "Price High to Low",
    value: 1,
    type: "maxPrice",
  },
  {
    label: "Price / sq.ft. : Low to High",
    value: 2,
    type: "projectBasePrice",
  },
  {
    label: "Price / sq.ft. : High to Low",
    value: 1,
    type: "projectBasePrice",
  },
];