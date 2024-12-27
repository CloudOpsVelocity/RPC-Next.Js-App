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
import { useAtom, useAtomValue } from "jotai";
import { projSearchStore } from "../../store/projSearchStore";
import LocalitySearch from "./city/searchInputSearch";
import useProjSearchAppliedFilters from "../../hooks/useProjSearchAppliedFilters";
import { useDebouncedState } from "@mantine/hooks";
import { serverCityAtom } from "@/app/store/search/serverCity";
import { useQuery } from "react-query";
import { getData } from "@/app/utils/api/search";

interface ShowAllFiltersButtonProps {
  selectedFilters: { [key: string]: string[] };
  toggleFilter: (category: string, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}
interface Location {
  name: string;
  stringUrl: null | string;
  stringId: string;
  type: string;
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
  const { handleClearFilters } = useProjSearchAppliedFilters();
  const locations: Location[] = [
    { name: "Whitefield", stringUrl: null, stringId: "563", type: "Locality" },
    {
      name: "Whisdfasdftefasdffield",
      stringUrl: null,
      stringId: "563",
      type: "Locality",
    },
    {
      name: "Whitesafdssffield",
      stringUrl: null,
      stringId: "563",
      type: "Locality",
    },
  ];
  const Phases: Location[] = [
    { name: "phase1", stringUrl: null, stringId: "563", type: "Locality" },
    { name: "phase3", stringUrl: null, stringId: "563", type: "Locality" },
    { name: "pahse4", stringUrl: null, stringId: "563", type: "Locality" },
  ];
  const builders: Location[] = [
    {
      name: "Projects of Mana Projects",
      stringUrl: null,
      stringId: "35",
      type: "BuilderProject",
    },

    {
      name: "Projects of Mana Projects",
      stringUrl: null,
      stringId: "35",
      type: "BuilderProject",
    },

    {
      name: "Mana Projects",
      stringUrl: "/builders/bengaluru/mana-projects",
      stringId: "9_35",
      type: "BuilderProject",
    },

    {
      name: "Projects of Mantri",
      stringUrl: null,
      stringId: "16",
      type: "BuilderProject",
    },

    {
      name: "Mantri",
      stringUrl: "/builders/bengaluru/mantri",
      stringId: "9_16",
      type: "BuilderDetail",
    },
  ];

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
  console.log();

  const renderFilterSection = (
    title: string,
    data: any[],
    category: string,
    initialDisplay: number = 5
  ) => {
    const isExpanded = expandedSections[category] || false;
    const displayData = isExpanded ? data : data.slice(0, initialDisplay);
    const radioorChecked = [
      "status",
      "rera",
      "propertyType",
      "listingStatus",
      "PostedBy",
      "UsedorNotUsed",
      "PhotosVedios",
      "furnish",
    ];

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="flex flex-row flex-wrap gap-2 items-center">
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

  const [localitySearch, setSearchLocality] = useDebouncedState("", 500);
  const [builderSearch, setBuilderSearch] = useDebouncedState("", 500);
  const serverCity = useAtomValue(serverCityAtom);
  const { data } = useQuery({
    queryFn: () => getData(localitySearch, "loc",state.city ?? serverCity ?? ""),
    queryKey: ["search" + "loc" + localitySearch],
    enabled: localitySearch !== "",
  });
  console.log(data, "locatata")
  const { isLoading: builderDataLoading, data: builderData } = useQuery({
    queryFn: () => getData(builderSearch, "builders",state.city ?? serverCity ?? ""),
    queryKey: ["search" + "builders" + builderSearch],
    enabled: builderSearch !== "",
  });
  const handleLocationChange = (selected: Location[]) => {
    console.log("Selected locations:", selected);
    
  };
  const isproject = state.listedBy == null;
  console.log(state)
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
        <div className="absolute top-full flex flex-col right-0 mt-2 min-w-[700px] bg-white rounded-lg shadow-lg border z-50 ">
          <div className="flex items-center justify-between gap-4 pb-4 border-b  ">
            <button
              onClick={() => {
                handleClearFilters("clearAll");
                onToggle();
              }}
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
          <div className="flex flex-col justify-start max-h-[60vh] overflow-y-auto">
          <div className="flex flex-col mb-6 ml-4 gap-6">
              <LocalitySearch<Location>
                data={locations}
                displayKey="name"
                valueKey="stringId"
                onChange={handleLocationChange}
                placeholder="Search locations..."
                label="Location"
                multiple
              />
             { isproject &&<LocalitySearch<Location>
                data={builders}
                displayKey="name"
                valueKey="stringId"
                onChange={handleLocationChange}
                placeholder="Search Builders..."
                label="Builder"
                multiple
              />}
            </div>
            <div className="p-6 flex  flex-col items-start  flex-wrap justify-between   ">
              {isproject &&
                renderFilterSection(
                  "Project Status",
                  SEARCH_FILTER_DATA.projectstatus,
                  "status"
                )}
              {!isproject&&renderFilterSection(
                "Property Status",
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
              {isproject&&renderFilterSection(
                "RERA Status",
                SEARCH_FILTER_DATA.rerastatus,
                "rera"
              )}
            </div>
            <div className="mb-6  ml-4">
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
                className="ml-[14px] md:ml-4 "
                mb={"5%"}
              />
            </div>

            <div className="mb-6 ml-4">
              <h3
                className=" text-[#202020] mb-[1%] text-[14px] font-[600] mt-[5%] "
                id="Budget"
              >
                Budget
              </h3>
              <p className="text-[#4D6677] text-[14px] md:text-[16px] font-[600] mb-[2%] ml-[14px] md:ml-0  ">
                ₹ {toFormattedString(state.bugdetValue[0])} - ₹{" "}
                {toFormattedString(state.bugdetValue[1])}
              </p>
              <RangeSlider
                color="green"
                key="budgetSlider"
                //onChange={(value) => toggleFilter("bugdetValue", value)}
                style={{ width: "80%" }}
                defaultValue={[
                  state?.bugdetValue[0] ?? 500000,
                  state?.bugdetValue[1] ?? 600000000,
                ]}
                value={state.bugdetValue}
                min={0}
                max={state.cg === "R" ? 100000 : 600000000}
                step={state.cg === "R" ? 1 : 100000}
                label={(value) => toFormattedString(value)}
                // size={isMobile ? "xs" : "md"}
                className="ml-[14px] md:ml-1 "
                // classNames={{markLabel: S.sliderMarkLable}}
              />
            </div>
            <div className="p-6 flex flex-col items-start  flex-wrap justify-between   ">
              {renderFilterSection(
                "Bathrooms",
                SEARCH_FILTER_DATA.Bathrooms,
                "bathrooms",
                6
              )}
              {renderFilterSection(
                "parking",
                SEARCH_FILTER_DATA.Parkings,
                "prakings",
                6
              )}
             
              {/* {renderFilterSection(
                "facings",
                SEARCH_FILTER_DATA.facing,
                "facings",
                9
              )} */}
              {!isproject &&
                renderFilterSection(
                  "UsedorNotUsed",
                  SEARCH_FILTER_DATA.UsedorNotUsed,
                  "Used or NotUsed"
                )}
              {!isproject &&
                renderFilterSection(
                  "PostedBy",
                  SEARCH_FILTER_DATA.PostedBy,
                  "PostedBy"
                )}
              {!isproject &&
                renderFilterSection(
                  "Photos & Videos",
                  SEARCH_FILTER_DATA.photoAvail,
                  "PhotosVedios"
                )}
              {!isproject &&
                renderFilterSection(
                  "Furnishing",
                  SEARCH_FILTER_DATA.furnish,
                  "furnish"
                )}
              {isproject&&renderFilterSection(
                "Phases",
                SEARCH_FILTER_DATA.furnish,
                "Phases"
              )}
               {renderFilterSection(
                "Amenities",
                SEARCH_FILTER_DATA.amenities,
                "amenities",
                8
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
