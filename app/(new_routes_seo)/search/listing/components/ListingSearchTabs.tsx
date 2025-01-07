"use client";

import { useAtom } from "jotai";
import React, { useEffect } from "react";
import {
  diffToProjFromListing,
  initialState,
  projSearchStore,
} from "../../store/projSearchStore";
import useProjSearchAppliedFilters from "../../hooks/useProjSearchAppliedFilters";
import { update } from "lodash";
import { SearchFilter } from "@/app/types/search";

const tabs = [
  /*  { id: null, label: "Projects" }, */
  { id: "I", label: "Owner Listings" },
  { id: "A", label: "Agent Listings" },
  { id: "B", label: "Builder Listings" },
  { id: null, label: "All Listings" },
];

export default function ListingSearchTabs() {
  const [state, dispath] = useAtom(projSearchStore);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { handleApplyFilters } = useProjSearchAppliedFilters();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  const sortOptions = [
    { id: null, type: null, value: "newest", label: "Newest First" },
    {
      id: 2,
      type: "price",
      value: "price-low-high",
      label: "Price: Low to High",
    },
    {
      id: 1,
      type: "price",
      value: "price-high-low",
      label: "Price: High to Low",
    },
    {
      id: 2,
      type: "sqftPrice",
      value: "sqft-low-high",
      label: "Price/sqft: Low to High",
    },
    {
      id: 1,
      type: "sqftPrice",
      value: "sqft-high-low",
      label: "Price/sqft: High to Low",
    },
  ];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  const handleTabsChange = (value: string | null) => {
    const updatedFilters =
      value === null
        ? {
            ...state,
            listedBy: null,
            sortByfield: null,
            sortType: null,
            facings: null,
          }
        : {
            ...state,
            ...Object.fromEntries(
              (
                diffToProjFromListing[
                  value as keyof typeof diffToProjFromListing
                ] ?? []
              ).map((key: any) => [
                key,
                initialState[key as keyof SearchFilter] ?? null,
              ])
            ),
            listedBy: value,
          };
    dispath({
      type: "update",
      payload: updatedFilters,
    });
    handleApplyFilters();
  };

  const handleSortBy = (option: any) => {
    dispath({
      payload: {
        sortByfield: option.type,
        sortType: option.id,
      },
      type: "update",
    });
    handleApplyFilters();
  };

  const getSortyByValue = (state: any): string => {
    if (
      (state.sortType == 2 && state.sortByfield === "minPrice") ||
      (state.sortByfield === "price" && state.sortType == 2)
    ) {
      return "Price: Low to High";
    } else if (
      (state.sortType == 1 && state.sortByfield === "maxPrice") ||
      (state.sortByfield === "price" && state.sortType == 1)
    ) {
      return "Price: High to Low";
    } else if (
      (state.sortByfield === "sqftPrice" && state.sortType == 1) ||
      (state.sortType == 1 && state.sortByfield === "basePrice")
    ) {
      return "Price/sqft: High to Low";
    } else if (
      (state.sortType == 2 && state.sortByfield === "sqftPrice") ||
      (state.sortType == 2 && state.sortByfield === "basePrice")
    ) {
      return "Price/sqft: Low to High";
    }

    return "Newest First";
  };

  return (
    <div className="sticky top-0 z-10">
      <div className="w-full bg-slate-50 shadow-md max-w-7xl mx-auto px-4 py-2">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div
            ref={scrollContainerRef}
            onWheel={handleWheel}
            className="md:overflow-x-auto no-scrollbar max-w-full flex flex-wrap"
          >
            <div className="flex items-center gap-1 xl:gap-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabsChange(tab.id)}
                  className={`
                    whitespace-nowrap rounded-full md:px-2 xl:px-4 md:py-1 xl:py-2 text-sm md:text-base font-medium transition-all
                    ${
                      state.listedBy === tab.id
                        ? "bg-[#0073C6] text-white shadow-md"
                        : "text-black hover:bg-[#0073C6] hover:text-white"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm md:text-base text-black hover:text-white hover:bg-[#0073C6] rounded-full transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m-4 8v-4m10 4v-4m0 4l-4-4m4 4l4-4"
                />
              </svg>

              <div
                className="max-w-[105px] ml-auto sm:ml-[0] 
              overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {state.sortByfield != null && state.sortType != null
                  ? getSortyByValue(state)
                  : "New First"}
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-[40px] rounded-lg shadow-lg py-1 z-20 w-48 bg-white border border-white">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      // setSortBy(option.value);
                      handleSortBy(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`
                      block w-full text-left text-sm transition-colors px-4 py-2 
                      ${
                        getSortyByValue(state) === option.label
                          ? "text-white bg-[#0073C6]"
                          : "text-gray-700 hover:bg-[#0073C6] hover:text-white"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
