"use client";

import { useState, useEffect, useRef } from "react";
import {
  MdSearch,
  MdClose,
  MdKeyboardArrowDown,
  MdLocationOn,
  MdApartment,
  MdHouse,
  MdVilla,
  MdMapsHomeWork,
  MdLandscape,
  MdTune,
  MdFilterList,
} from "react-icons/md";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import PropTypeFilter from "@/app/(dashboard)/search/components/proptype";

export default function HeaderFilters() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchSuggestions = [
    "Whitefield, Bangalore",
    "Electronic City, Bangalore",
    "HSR Layout, Bangalore",
    "Indiranagar, Bangalore",
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFilter = (category: string, value: string) => {
   

    if(category === "bhk"){
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
    }else{
      setSelectedFilters({
        [category]: [value],
      });
    }
    
  };

  const removeFilter = (category: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== value),
    }));
  };

  const propertyIcons = {
    Apartment: <MdApartment className="w-5 h-5" />,
    "Row House": <MdHouse className="w-5 h-5" />,
    Villa: <MdVilla className="w-5 h-5" />,
    Villament: <MdMapsHomeWork className="w-5 h-5" />,
    Plot: <MdLandscape className="w-5 h-5" />,
  };

  return (
    <>
      <div className="w-full max-w-[70%] bg-white border-b sticky top-0 z-40">
        <div className="max-w-full px-1">
          {/* Header Filters */}
          <div
            className="flex flex-wrap items-center gap-2 py-3"
            ref={dropdownRef}
          >
          

            {/* Search Bar */}
            <div className="flex-1 max-w-[39%]  relative " ref={searchRef}>


              <div className="flex items-center border-2 border-[#0073C6] rounded-full">
                  {/* Buy Dropdown */}
                    <div className="relative m-1">
                      <button
                        className="flex items-center gap-2 px-4 py-2 bg-[#0073C6] text-white rounded-full hover:bg-[#0073C6]/90 transition-colors"
                        onClick={() =>
                          setActiveDropdown(activeDropdown === "buy" ? null : "buy")
                        }
                      >
                        Buy
                        <MdKeyboardArrowDown className="w-5 h-5" />
                      </button>
                      {activeDropdown === "buy" && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border p-2 z-50">
                          <div className="space-y-2">
                            {["Buy", "Rent", "PG/Co-living"].map((option) => (
                              <button
                                key={option}
                                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
              <div className="flex w-full items-center overflow-hidden focus-within:ring-2 ring-[#0073C6]/20 ">
                <input
                  type="text"
                  className="w-full py-2 px-4 outline-none"
                  placeholder="Search By Locality, Projects or Listings"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                />
                <MdSearch className="mr-4 text-[#0073C6] w-6 h-6" />
              </div>
                </div>              

              
              

              {/* Search Suggestions */}
              {isSearchOpen && (
                <div className="absolute max-w-[100%] bg-white mt-1 rounded-lg shadow-lg border z-50">
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setIsSearchOpen(false);
                      }}
                    >
                      <MdLocationOn className="w-5 h-5 text-[#148B16]" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-2">
              {/* Property Type Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-4 py-2 border-2 border-[#0073C6] text-[#0073C6] rounded-full hover:bg-[#0073C6]/5"
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "property" ? null : "property"
                    )
                  }
                >
                  Property Type
                  <MdKeyboardArrowDown className="w-5 h-5" />
                </button>
                {activeDropdown === "property" && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-2 z-50">
                    <div className="space-y-2">
                      {Object.entries(propertyIcons).map(([type, icon]) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="Radio"
                            className="rounded border-gray-300 text-[#0073C6] focus:ring-[#0073C6]"
                            checked={selectedFilters["propertyType"]?.includes(
                              type
                            )}
                            onChange={() => toggleFilter("propertyType", type)}
                          />
                          {icon}
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {/*  {activeDropdown === "property" && (
                   <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-2 z-50">
                    <div className="space-y-2">
                  <PropTypeFilter  />
                  </div>
                  </div>
                 )} */}
              </div>

              {/* BHK Type Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-4 py-2 border-2 border-[#148B16] text-[#148B16] rounded-full hover:bg-[#148B16]/5"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "bhk" ? null : "bhk")
                  }
                >
                  BHK Type
                  <MdKeyboardArrowDown className="w-5 h-5 to-blue-500" />
                </button>
                {activeDropdown === "bhk" && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-2 z-50">
                    <div className="grid grid-cols-2 gap-2">
                      {SEARCH_FILTER_DATA.bhkDetails.slice(0, 6).map((bhk) => (
                        <label
                          key={bhk.value}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-[#148B16] focus:ring-[#148B16]"
                            checked={selectedFilters["bhk"]?.includes(
                              bhk.title
                            )}
                            onChange={() => toggleFilter("bhk", bhk.title)}
                          />
                          <span>{bhk.title}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Budget Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-4 py-2 border-2 border-[#0073C6] text-[#0073C6] rounded-full hover:bg-[#0073C6]/5"
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "budget" ? null : "budget"
                    )
                  }
                >
                  Budget
                  <MdKeyboardArrowDown className="w-5 h-5" />
                </button>
                {activeDropdown === "budget" && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border p-4 z-50">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          placeholder="Min"
                          className="p-2 border rounded-md text-sm"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="p-2 border rounded-md text-sm"
                        />
                      </div>
                      <button className="w-full py-2 bg-[#0073C6] text-white rounded-md hover:bg-[#0073C6]/90">
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Show All Filters Button */}
              <button
                onClick={() => setShowAllFilters(!showAllFilters)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-full hover:bg-gray-50"
              >
                <MdTune className="w-5 h-5" />
                More Filters
              </button>
            </div>

            {/* Mobile Filter Button */}
            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 border-2 border-[#0073C6] text-[#0073C6] rounded-full"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MdFilterList className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Applied Filters */}
          {Object.entries(selectedFilters).some(
            ([_, values]) => values.length > 0
          ) && (
            <div className="py-2 border-t">
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFilters).map(([category, values]) =>
                  values.map((value) => (
                    <div
                      key={`${category}-${value}`}
                      className="flex items-center gap-2 bg-[#0073C6]/10 text-[#0073C6] px-3 py-1 rounded-full text-sm"
                    >
                      <span>{value}</span>
                      <button
                        onClick={() => removeFilter(category, value)}
                        className="text-[#0073C6] hover:text-[#0073C6]/70"
                      >
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
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
            <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
              {/* Project Status */}
              <div>
                <h3 className="font-semibold mb-3">Project Status</h3>
                <div className="space-y-2">
                  {SEARCH_FILTER_DATA.projectstatus.map((status) => (
                    <label key={status.cid} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#0073C6] focus:ring-[#0073C6]"
                        checked={selectedFilters["status"]?.includes(
                          status.Label
                        )}
                        onChange={() => toggleFilter("status", status.Label)}
                      />
                      <span>{status.Label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <h3 className="font-semibold mb-3">Property Type</h3>
                <div className="space-y-2">
                  {Object.entries(propertyIcons).map(([type, icon]) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#0073C6] focus:ring-[#0073C6]"
                        checked={selectedFilters["propertyType"]?.includes(
                          type
                        )}
                        onChange={() => toggleFilter("propertyType", type)}
                      />
                      {icon}
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BHK Type */}
              <div>
                <h3 className="font-semibold mb-3">BHK Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {SEARCH_FILTER_DATA.bhkDetails.map((bhk) => (
                    <label key={bhk.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#148B16] focus:ring-[#148B16]"
                        checked={selectedFilters["bhk"]?.includes(bhk.title)}
                        onChange={() => toggleFilter("bhk", bhk.title)}
                      />
                      <span>{bhk.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <h3 className="font-semibold mb-3">Budget Range</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="p-2 border rounded-md text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="p-2 border rounded-md text-sm"
                    />
                  </div>
                  <button className="w-full py-2 bg-[#0073C6] text-white rounded-md hover:bg-[#0073C6]/90">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show All Filters Section */}
      {showAllFilters && (
        <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">All Filters</h2>
              <button
                onClick={() => setShowAllFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Status */}
              <div>
                <h3 className="font-semibold mb-4">Project Status</h3>
                <div className="space-y-3">
                  {SEARCH_FILTER_DATA.projectstatus.map((status) => (
                    <label key={status.cid} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#0073C6] focus:ring-[#0073C6]"
                        checked={selectedFilters["status"]?.includes(
                          status.Label
                        )}
                        onChange={() => toggleFilter("status", status.Label)}
                      />
                      <span>{status.Label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <h3 className="font-semibold mb-4">Property Type</h3>
                <div className="space-y-3">
                  {Object.entries(propertyIcons).map(([type, icon]) => (
                    <label key={type} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#0073C6] focus:ring-[#0073C6]"
                        checked={selectedFilters["propertyType"]?.includes(
                          type
                        )}
                        onChange={() => toggleFilter("propertyType", type)}
                      />
                      {icon}
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BHK Type */}
              <div>
                <h3 className="font-semibold mb-4">BHK Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {SEARCH_FILTER_DATA.bhkDetails.map((bhk) => (
                    <label key={bhk.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#148B16] focus:ring-[#148B16]"
                        checked={selectedFilters["bhk"]?.includes(bhk.title)}
                        onChange={() => toggleFilter("bhk", bhk.title)}
                      />
                      <span>{bhk.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {SEARCH_FILTER_DATA.amenities.map((amenity) => (
                    <label
                      key={amenity.cid}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#0073C6] focus:ring-[#0073C6]"
                        checked={selectedFilters["amenities"]?.includes(
                          amenity.constDesc
                        )}
                        onChange={() =>
                          toggleFilter("amenities", amenity.constDesc)
                        }
                      />
                      <span>{amenity.constDesc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* RERA Status */}
              <div>
                <h3 className="font-semibold mb-4">RERA Status</h3>
                <div className="space-y-3">
                  {SEARCH_FILTER_DATA.rerastatus.map((status) => (
                    <label key={status.cid} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#0073C6] focus:ring-[#0073C6]"
                        checked={selectedFilters["rera"]?.includes(
                          status.constDesc
                        )}
                        onChange={() => toggleFilter("rera", status.constDesc)}
                      />
                      <span>{status.constDesc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
