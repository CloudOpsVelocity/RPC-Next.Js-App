"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import {
  MdSearch,
  MdClose,
  MdLocationOn,
  MdFilterList,
  MdBusiness,
} from "react-icons/md";
import PropertyTypeDropdown from "../FilterComponents/PropertyTypeDropdown";

import BHKTypeDropdown from "../FilterComponents/BHKTypeDropdown";
import BudgetDropdown from "../FilterComponents/BudgetDropdown";
import ShowAllFiltersButton from "../FilterComponents/ShowAllFiltersButton";
import BuyRent from "../FilterComponents/BuyRent";
import { extractApiValues } from "@/app/utils/dyanamic/projects";
import { useAtom } from "jotai";
import { projSearchStore } from "../../store/projSearchStore";
import { usePathname } from "next/navigation";
import useProjSearchAppliedFilters from "../../hooks/useProjSearchAppliedFilters";
import useProjSearchMatcher from "../../hooks/useProjSearchMatcher";
import { myClientLogger } from "@/app/utils/clientLogger";
import SelectedFilters from "./SelectedFilters";
import ProjSearchCityDropDown from "../FilterComponents/city/ProjectSearchCityDropdown";

export default function HeaderFilters() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [state, dispatch] = useAtom(projSearchStore);
  const path = usePathname();
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { handleApplyFilters } = useProjSearchAppliedFilters();
  const {
    data: searchData,
    isLoading,
    handleResetQuery,
    onSearchChange,
    name,
  } = useProjSearchMatcher();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilter = (category: string, value: string) => {
    if (
      category === "bhk" ||
      category === "amenities" ||
      category == "bathrooms" ||
      category == "prakings" ||
      category == "Phases"
    ) {
      setSelectedFilters((prev) => {
        const current = prev[category] || [];
        const updated = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        return {
          ...prev,
          [category]: updated,
        };
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        [category]: [value],
      });
    }
  };

  const handleClear = (category: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: [],
    }));
  };

  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };
  const handleSearchChange = (e: any) => {
    const value = e.target.value;

    setSearchQuery(value);

    onSearchChange(value);
  };
  const isListingSearch = path.includes("listing");
  const AgentOwnerBuilderMap = new Map([
    ["BuilderAgentListing", "A"],
    ["BuilderOwnerListing", "I"],
    ["BuilderBuilderListing", "B"],
    ["ProjectAgentListing", "A"],
    ["ProjectOwnerListing", "I"],
    ["ProjectBuilderListing", "B"],
  ]);
  const handlePush = async (type: string, data: any) => {
    switch (type) {
      case "loc":
        dispatch({
          type: "pushToArray",
          payload: {
            key: "locality",
            value: `${data.name}+${data.stringId}`,
          },
        });
        handleApplyFilters();
        // handleAddSearch(`${data.name}+${data.stringId}`);
        break;
      case "projects":
        if (data.type === "Project") {
          window.open(data.stringUrl);
        } else {
          if (isListingSearch) {
            dispatch({
              type: "update",
              payload: {
                projIdEnc: data.stringId.split("_")[0],
                // phaseId: data.stringId.split("_")[1],
                projName: data.name,
              },
            });
          } else {
            window.open(
              `/search/listing?projIdEnc=${
                data.stringId.split("_")[0]
              }&phaseId=${data.stringId.split("_")[1]}&projName=${data.name}`
            );
          }
        }

        break;
      case "listing":
        {
          const paramsObject = extractApiValues(data.stringId);

          let localityName = data.name.split(" in ")[1].toLowerCase().trim();

          if (isListingSearch) {
            dispatch({
              type: "update",
              payload: {
                propType: parseInt(paramsObject.PT as string),
                ...(paramsObject.BH && {
                  bhk: [parseInt(paramsObject.BH as string)],
                }),
                cg: paramsObject.CG as string,
                locality: [`${localityName}+${paramsObject.LT}`],
              },
            });
            handleApplyFilters();
          } else {
            const url = `/search/listing?propTypes=${paramsObject.PT}${
              paramsObject.BH ? `&unitTypes=${paramsObject.BH}` : ""
            }&cg=${
              paramsObject.CG
            }&localities=${localityName}%2B${encodeURIComponent(
              paramsObject.LT
            )}`;
            window.open(url);
          }
        }
        break;
      case "Project Listings":
        {
          let projectName = data.name.split(" in ")[1].trim();
          // console.log(projectName);
          const url = `projIdEnc=${
            data.stringId
          }&listedBy=${AgentOwnerBuilderMap.get(
            data.type
          )}&projName=${projectName}`;
          window.open("/search/listing?" + url);
        }
        break;
      case "builders":
        if (data.type === "BuilderDetail") {
          window.open(data.stringUrl);
        } else {
          const url =
            encodeURIComponent(data.name) +
            "%2B" +
            encodeURIComponent(data.stringId.split("_")[1]);
          window.open(
            `/search?builderIds=${url}&city=${data.stringId.split("_")[0]}${
              data.type !== "BuilderProject"
                ? `&listedBy=${AgentOwnerBuilderMap.get(data.type)}`
                : ""
            }`
          );
        }
        // setFilters((prevFilters) => ({
        //   ...prevFilters,
        //   builderIds: [...prevFilters.builderIds, `${data.name}+${data.id}`],
        // }));
        // handleResetQuery();
        break;
      default:
        break;
    }
  };
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/matcher/string?word=${searchQuery}&cityId=${
        state.city?.split("+")[1] || 9
      }`
    );
    const data = await res.json();
    if (Object.hasOwn(data, "ids")) {
      let ids = extractApiValues(data.ids);
      if (ids.LT || ids.CT || ids.PT || ids.BH || ids.PJ) {
        dispatch({
          type: "update",
          payload: {
            ...(ids.LT && { locality: [`${searchQuery}+${ids.LT}`] }),
            ...(ids.PT && { propType: parseInt(ids.PT as string) }),
            ...(ids.BH && { bhk: [parseInt(ids.BH as string)] }),
            ...(ids.PJ && { projIdEnc: ids.PJ as string, listedBy: "All" }),
          },
        });
      }

      handleApplyFilters();
      handleResetQuery();
      setIsSearchOpen(false);
      // myClientLogger("info", data);
      return;
    }
  };
  return (
    <>
      <div className="w-full  xl:max-w-[70%] max-h-[60vh] overflow- bg-white border-b sticky top-0 z-40">
        <div className=" px-1 ">
          <div
            ref={searchRef}
            className="flex flex-wrap items-center gap-2 py-3"
          >
            <div className="flex-1 min-w-full sm:min-w-min sm:max-w-[39%] relative order-1">
              <div className="flex items-center border-2 border-[#0073C6] rounded-full">
                <BuyRent
                  openDropdown={openDropdown}
                  handleDropdownToggle={handleDropdownToggle}
                />
                <form
                  onSubmit={handleFormSubmit}
                  className=" relative flex w-full items-center overflow-hidden "
                >
                  <input
                    type="text"
                    className="w-full py-2 px-4 outline-none"
                    placeholder="Search By Locality, Projects or Listings"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e)}
                    onFocus={() => setIsSearchOpen(true)}
                  />
                  <MdSearch className="mr-4 text-[#0073C6] w-6 h-6" />
                </form>
              </div>
              {isLoading ? (
                <div className="absolute min-w-[100%] bg-white mt-1 rounded-lg shadow-lg border z-50 max-h-[400px] overflow-y-auto">
                  <div className="p-3 text-gray-500">Loading...</div>
                </div>
              ) : (
                isSearchOpen && (
                  <div className="absolute min-w-[100%] bg-white mt-1 rounded-lg shadow-lg border z-50 max-h-[400px] overflow-y-auto">
                    {searchData.loc?.length > 0 ||
                    searchData.builders?.length > 0 ||
                    searchData.projects?.length > 0 ||
                    searchData.listing?.length > 0 ? (
                      <>
                        {["loc", "listing", "projects", "builders"].map(
                          (type) =>
                            searchData[type]?.length > 0 && (
                              <div key={type}>
                                <div className="font-bold p-2 capitalize">
                                  {type === "loc"
                                    ? "Locality"
                                    : type === "listing"
                                    ? "Listings"
                                    : type}
                                </div>
                                {searchData[type].map(
                                  (item: any, index: number) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 px-2 py-1  hover:bg-gray-50 cursor-pointer"
                                      onClick={() => {
                                        setSearchQuery(item.name); // Set the item name as search query
                                        setIsSearchOpen(false); // Close the dropdown
                                        handlePush(type, item);
                                      }}
                                    >
                                      {type === "loc" || type === "listing" ? (
                                        <MdLocationOn className="w-5 h-5 text-[#148B16]" />
                                      ) : type === "builders" ? (
                                        <MdBusiness className="w-5 h-5 text-[#148B16]" />
                                      ) : type === "projects" ? (
                                        <svg
                                          version="1.1"
                                          id="real_x5F_estate_1_"
                                          xmlns="http://www.w3.org/2000/svg"
                                          x={0}
                                          y={0}
                                          viewBox="0 0 128 128"
                                          className="w-5"
                                          xmlSpace="preserve"
                                        >
                                          <style
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                ".st0{display:none}.st1{display:inline}.st2{fill:#148B16}", // Changed fill color to #148B16
                                            }}
                                          />
                                          <g id="building_1_">
                                            <path
                                              className="st2"
                                              d="M88.6 11.5H75.5L0 47.6v69h128V31.2L88.6 11.5zm0 6.6 32.8 16.4V41L88.6 27.9v-9.8zm0 19.6 32.8 13.1V64l-32.8-9.8V37.7zm0 26.3 32.8 9.8v16.4l-32.8-9.8V64zm-13.1 0v16.4L6.6 96.8V87l68.9-23zM6.6 77.1v-9.8l68.9-29.5v16.4L6.6 77.1zm68.9-59v9.8L6.6 57.4v-6.6l68.9-32.7zm-.6 91.8H6.6v-6.6l68.9-13.1v19.7h-.6zm13.9 0h-.2V90.3l32.8 9.8v9.8H88.8z"
                                              id="icon_7_"
                                            />
                                          </g>
                                        </svg>
                                      ) : null}
                                      <span>{item.name}</span>
                                    </div>
                                  )
                                )}
                              </div>
                            )
                        )}
                      </>
                    ) : (
                      <div className="p-3 text-gray-500">
                        {name
                          ? "No suggestions available"
                          : "Search or type something"}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
            <div className="order-2 sm:order-first">
              <ProjSearchCityDropDown />
            </div>
            <div className="hidden md:flex items-center gap-2 order-2">
              {/*  <PropertyTypeDropdown
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                handleClear={handleClear}
                isOpen={openDropdown === "propertyType"}
                onToggle={() => handleDropdownToggle("propertyType")}
              />
              <BHKTypeDropdown
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                handleClear={handleClear}
                isOpen={openDropdown === "bhkType"}
                onToggle={() => handleDropdownToggle("bhkType")}
              />
              <BudgetDropdown
                isOpen={openDropdown === "budget"}
                onToggle={() => handleDropdownToggle("budget")}
              /> */}
              <ShowAllFiltersButton
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                isOpen={openDropdown === "allFilters"}
                onToggle={() => handleDropdownToggle("allFilters")}
              />
            </div>

            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 border-2 border-[#0073C6] text-[#0073C6] rounded-full order-3"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MdFilterList className="w-5 h-5" />
              Filters
            </button>
          </div>
          <SelectedFilters />
          {/* Selected Filters */}
        </div>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className=" max-h-[100vh] p-4 space-y-6 overflow-y">
              {/* <PropertyTypeDropdown
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                handleClear={handleClear}
                isOpen={openDropdown === "propertyType"}
                onToggle={() => handleDropdownToggle("propertyType")}
              />
              <BHKTypeDropdown
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                handleClear={handleClear}
                isOpen={openDropdown === "bhkType"}
                onToggle={() => handleDropdownToggle("bhkType")}
              />
              <BudgetDropdown
                isOpen={openDropdown === "budget"}
                onToggle={() => handleDropdownToggle("budget")}
              /> */}
              <ShowAllFiltersButton
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                isOpen
                onToggle={() => handleDropdownToggle("allFilters")}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
