"use client";

import * as React from "react";

const tabs = [
  { id: "projects", label: "Projects" },
  { id: "owner", label: "Owner Listings" },
  { id: "agent", label: "Agent Listings" },
  { id: "builder", label: "Builder Listings" },
  { id: "all", label: "All" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "sqft-low-high", label: "Price/sq.ft.: Low to High" },
  { value: "sqft-high-low", label: "Price/sq.ft.: High to Low" },
];

export default function ProjectSearchTabs() {
  const [activeTab, setActiveTab] = React.useState("projects");
  const [sortBy, setSortBy] = React.useState("newest");
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-gray-800 sticky top-0 z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div
            ref={scrollContainerRef}
            onWheel={handleWheel}
            className="overflow-x-auto no-scrollbar"
          >
            <div className="flex items-center gap-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    whitespace-nowrap rounded-full px-4 py-2 text-sm md:text-base font-medium transition-all
                    ${
                      activeTab === tab.id
                        ? "bg-[#0073C6] text-white shadow-md"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
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
              className="flex items-center gap-2 px-4 py-2 text-sm md:text-base text-gray-300 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
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
              {sortOptions.find((option) => option.value === sortBy)?.label ||
                "Sort By"}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-20 border border-gray-700">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSortBy(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`
                      block w-full text-left px-4 py-2 text-sm transition-colors
                      ${
                        sortBy === option.value
                          ? "text-[#0073C6] bg-gray-700"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
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
