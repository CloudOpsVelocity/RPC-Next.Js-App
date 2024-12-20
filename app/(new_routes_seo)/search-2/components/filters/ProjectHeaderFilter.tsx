'use client';

import { useState, useEffect, useRef } from "react";
import { MdSearch, MdClose, MdKeyboardArrowDown, MdLocationOn, MdFilterList } from "react-icons/md";
import PropertyTypeDropdown from "../FilterComponents/PropertyTypeDropdown";
import BHKTypeDropdown from "../FilterComponents/BHKTypeDropdown";
import BudgetDropdown from "../FilterComponents/BudgetDropdown";
import ShowAllFiltersButton from "../FilterComponents/ShowAllFiltersButton";

export default function HeaderFilters() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

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
        setOpenDropdown(null);
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
    } else {
      setSelectedFilters({
        ...selectedFilters,
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

  const handleClear = (category: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: [],
    }));
  }

  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <>
      <div className="w-full max-w-[70%] bg-white border-b sticky top-0 z-40">
        <div className="max-w-full px-1">
          <div className="flex flex-wrap items-center gap-2 py-3">
            <div className="flex-1 max-w-[39%] relative" >
              <div className="flex items-center border-2 border-[#0073C6] rounded-full">
                <div className="relative m-1">
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-[#0073C6] text-white rounded-full hover:bg-[#0073C6]/90 transition-colors"
                    onClick={() => handleDropdownToggle('buy')}
                  >
                    Buy
                    <MdKeyboardArrowDown className="w-5 h-5" />
                  </button>
                  {openDropdown === 'buy' && (
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
                <div className="flex w-full items-center overflow-hidden focus-within:ring-2 ring-[#0073C6]/20">
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

            <div className="hidden md:flex items-center gap-2">
              <PropertyTypeDropdown
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                handleClear={handleClear}
                isOpen={openDropdown === 'propertyType'}
                onToggle={() => handleDropdownToggle('propertyType')}
              />
              <BHKTypeDropdown
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                handleClear={handleClear}
                isOpen={openDropdown === 'bhkType'}
                onToggle={() => handleDropdownToggle('bhkType')}
              />
              <BudgetDropdown
                isOpen={openDropdown === 'budget'}
                onToggle={() => handleDropdownToggle('budget')}
              />
              <ShowAllFiltersButton
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                isOpen={openDropdown === 'allFilters'}
                onToggle={() => handleDropdownToggle('allFilters')}
              />
            </div>

            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 border-2 border-[#0073C6] text-[#0073C6] rounded-full"
              onClick={() => setIsDrawerOpen(true)}
            >
              <MdFilterList className="w-5 h-5" />
              Filters
            </button>
          </div>

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
              <PropertyTypeDropdown
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                handleClear={handleClear}
                isOpen={openDropdown === 'propertyType'}
                onToggle={() => handleDropdownToggle('propertyType')}
              />
              <BHKTypeDropdown
                selectedFilters={selectedFilters}
                toggleFilter={toggleFilter}
                handleClear={handleClear}
                isOpen={openDropdown === 'bhkType'}
                onToggle={() => handleDropdownToggle('bhkType')}
              />
              <BudgetDropdown
                isOpen={openDropdown === 'budget'}
                onToggle={() => handleDropdownToggle('budget')}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

