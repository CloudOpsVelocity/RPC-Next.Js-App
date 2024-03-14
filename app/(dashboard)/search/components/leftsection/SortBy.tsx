import useSearchFilters from "@/app/hooks/search";
import { DropDownIcon } from "@/app/images/commonSvgs";
import { Menu } from "@mantine/core";
import React, { useState } from "react";

type Props = {};

export default function SortBy({}: Props) {
  const { filters, setFilters, handleAppliedFilters } = useSearchFilters();

  const [selected, setSort] = useState("");
  const handleSetFilter = (sortByfield: string, sortType: number) => {
    if (filters.sortByfield === sortByfield && filters.sortType === sortType) {
      setFilters((prev) => ({
        ...prev,
        sortByfield: null,
        sortType: null,
      }));
    } else {
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
      eachItem.value === filters.sortType &&
      eachItem.type === filters.sortByfield
  )?.label;
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <button className="flex h-7 justify-center items-center gap-2.5 p-3.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] border-[0.5px] border-solid border-[#CBD4E1] bg-white mr-auto md:mr-2 mt-1 mb-2 ml-4 md:ml-auto ">
          <span className="text-[#0073C6] text-xs md:text-base not-italic   md:font-medium leading-[normal] ">
            {seletedValue || "Sort By"}
          </span>
          <DropDownIcon />
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        {config.map((eachItem, index) => {
          return (
            <Menu.Item
              key={index}
              value={seletedValue}
              onClick={() => handleSetFilter(eachItem.type, eachItem.value)}
              className="hover:text-btnPrimary"
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
  {
    label: "Price Low to High",
    value: 1,
    type: "price",
  },
  {
    label: "Price High to Low",
    value: 2,
    type: "price",
  },
  {
    label: "Price / sq.ft. : Low to High",
    value: 1,
    type: "sqftPrice",
  },
  {
    label: "Price / sq.ft. : High to Low",
    value: 2,
    type: "sqftPrice",
  },
];
