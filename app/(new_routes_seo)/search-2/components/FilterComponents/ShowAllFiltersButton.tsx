import { SEARCH_FILTER_DATA } from "@/app/data/search";
import React, { useState } from "react";
import {
  MdTune,
  MdKeyboardArrowDown,
  MdApartment,
  MdHouse,
  MdVilla,
  MdMapsHomeWork,
  MdLandscape,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import { toFormattedString } from "./buget/budget";
import { RangeSlider } from "@mantine/core";
import { useAtom } from "jotai";
import { projSearchStore } from "../../store/projSearchStore";

interface ShowAllFiltersButtonProps {
  selectedFilters: { [key: string]: string[] };
  toggleFilter: (category: string, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ShowAllFiltersButton({
  selectedFilters,
  toggleFilter,
  isOpen,
  onToggle,
}: ShowAllFiltersButtonProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const propertyiconss = {
    apt: {
      id: 35,
      name: "Apartment",
      icon: <MdApartment className="w-5 h-5 text-green-700" />,
    },
    Rwh: {
      id: 33,
      name: "RowHouse",
      icon: <MdHouse className="w-5 h-5 text-green-700" />,
    },
    vil: {
      id: 31,
      name: "Villa",
      icon: <MdVilla className="w-5 h-5 text-green-700" />,
    },
    vlmt: {
      id: 34,
      name: "Villament",
      icon: <MdMapsHomeWork className="w-5 h-5 text-green-700" />,
    },
    plt: {
      id: 32,
      name: "Plot",
      icon: <MdLandscape className="w-5 h-5 text-green-700" />,
    },
  };
  const [state, dispatch] = useAtom(projSearchStore);
  const toggleExpand = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderFilterSection = (
    title: string,
    data: any[],
    category: string,
    initialDisplay: number = 5
  ) => {
    const isExpanded = expandedSections[category] || false;
    const displayData = isExpanded ? data : data.slice(0, initialDisplay);
    console.log(displayData, "we are defining the result");
    const radioorChecked = ["status", "rera", "propertyType", "listingStatus"];

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="space-y-2">
          {displayData.map((item: any, index: number) => (
            <label key={item.cid || index} className="flex items-center gap-2">
              <input
                type={radioorChecked.includes(category) ? "radio" : "checkbox"}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={selectedFilters[category]?.includes(
                  item.Label ||
                    item.title ||
                    item.constDesc ||
                    item.cids ||
                    propertyiconss[item as keyof typeof propertyiconss]?.id
                )}
                onChange={() => {
                  const value =
                    category === "propertyType"
                      ? propertyiconss[item as keyof typeof propertyiconss]
                          ?.id || item.Label
                      : item.Label || item.title || item.constDesc;
                  toggleFilter(category, value);
                }}
              />
              {category === "propertyType" &&
                propertyiconss[item as keyof typeof propertyiconss]?.icon}
              <span>
                {propertyiconss[item as keyof typeof propertyiconss]?.name ||
                  item.Label ||
                  item.title ||
                  item.constDesc}
              </span>
            </label>
          ))}
        </div>
        {data.length > initialDisplay && (
          <button
            onClick={() => toggleExpand(category)}
            className="mt-2 text-blue-600 hover:text-blue-800 flex items-center"
          >
            {isExpanded ? (
              <>
                <MdExpandLess className="mr-1" />
                Show less
              </>
            ) : (
              <>
                <MdExpandMore className="mr-1" />
                Show more
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="  relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-full hover:bg-gray-50"
      >
        <MdTune className="w-5 h-5" />
        More Filters
        <MdKeyboardArrowDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full flex flex-col right-0 mt-2 w-[600px] bg-white rounded-lg shadow-lg border z-50 ">
          <div className="flex items-center justify-between gap-4 pb-4 border-b  ">
            <button
              onClick={onToggle}
              className="flex-1 text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              Clear Filter
            </button>
            <button
              onClick={onToggle}
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              Apply Filter
            </button>
          </div>
          <div className="flex flex-col justify-center">
            <div className="p-6 flex items-start  flex-wrap justify-between   ">
              {renderFilterSection(
                "Project Status",
                SEARCH_FILTER_DATA.projectstatus,
                "status"
              )}
              {renderFilterSection(
                "Listing Status",
                SEARCH_FILTER_DATA.listingStatus,
                "listingStatus"
              )}
              {renderFilterSection(
                "Property Type",
                Object.keys(propertyiconss),
                "propertyType"
              )}
              {renderFilterSection(
                "BHK Type",
                SEARCH_FILTER_DATA.bhkDetails,
                "bhk",
                6
              )}
              {renderFilterSection(
                "Amenities",
                SEARCH_FILTER_DATA.amenities,
                "amenities",
                8
              )}
              {renderFilterSection(
                "RERA Status",
                SEARCH_FILTER_DATA.rerastatus,
                "rera"
              )}
            </div>
            <div className="mb-6">
              <h3
                className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[2%] "
                id="Area (in Sq.ft)"
              >
                Area (In Sq.ft)
              </h3>
              <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
                {state.areaValue[0]} sq.ft - {state.areaValue[1]} sq.ft
              </p>
              <RangeSlider
                color="green"
                marks={[
                  { value: 0, label: "0 sq.ft" },
                  { value: 1000, label: "1000 sq.ft" },
                  { value: 2000, label: "2000 sq.ft" },
                  { value: 3000, label: "3000 sq.ft" },
                  { value: 4000, label: "4000 sq.ft" },
                  { value: 5000, label: "5000 sq.ft" },
                ]}
                min={0}
                max={5000}
                value={state.areaValue}
                //  onChange={(value) => toggleFilter("areaValue", value)}
                style={{ width: "80%" }}
                mb={"5%"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
