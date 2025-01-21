/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from "react";
import { propCgIdAtom } from "@/app/store/vewfloor";
import { useAtomValue } from "jotai";
import { projectprops } from "@/app/data/projectDetails";
import FilterInput from "./filter-input";
import { PropertyUnit } from "../types/floor-plan";

type Props = {
  options: any;
  dataFilters: any;
  setDataFilters: any;
  showFilters: any;
  setShowFilters: any;
};

export default function PopupFilters({
  options,
  dataFilters,
  setDataFilters,
  showFilters,
  setShowFilters,
}: Props) {
  const [filters, setFilters] = useState(dataFilters);
  const [backupFilters, setBackupFilters] = useState({
    unitNumber: "",
    bhkName: "",
    towerName: "",
    floor: "",
    facingName: "",
    block: "",
    plotArea: "",
    width: "",
    length: "",
    caretarea: "",
    superBuildUparea: "",
    totalNumberofBathroom: "",
    totalNumberOfBalcony: "",
    noOfCarParking: "",
    parkingType: "",
    terraceArea: "",
  });

  const propCgId = useAtomValue(propCgIdAtom);

  const filteredOptions = (key: keyof typeof filters) => {
    const filterValue = String(filters[key]).toLowerCase();
    return (
      options !== undefined &&
      options[key] !== undefined &&
      options[key].filter((option: string | number) => {
        const optionValue = String(option).toLowerCase();
        return optionValue.includes(filterValue);
      })
    );
  };

  function isActualNaN(value: any) {
    return value !== value;
  }

  const handleUnitFilterChange = (
    name: string | number | symbol,
    value: string | number
  ) => {
    setDataFilters((prev: PropertyUnit) => ({
      ...prev,
      [name]: isActualNaN(value) ? "" : value,
    }));
  };

  const handleFilterChange = (
    key: keyof typeof filters,
    value: string,
    type?: string
  ) => {
    setFilters((prev: any) => ({ ...prev, [key]: String(value) }));
    setBackupFilters((prev: any) => ({ ...prev, [key]: String(value) }));
    handleUnitFilterChange(key, value);
  };

  const onSearchChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: String(value) }));
  };

  const onMouseOut = (key: keyof typeof filters, value: string) => {
    let data = filteredOptions(key);
    if (data && !data.includes(value)) {
      setFilters((prev: { [key: string]: string }) => ({
        ...prev,
        [key]: backupFilters[key as keyof typeof backupFilters],
      }));
    } else {
      handleFilterChange(key, value);
    }
  };

  const clearFilters = () => {
    Object.keys(backupFilters).forEach((eachKey) => {
      handleFilterChange(eachKey, "", "C");
    });
  };

  const renderFilter = (
    key: keyof typeof filters,
    placeholder: string,
    title: string
  ) => {
    return (
      <div key={String(key)} className="relative mb-[10px]">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="tower"
        >
          {title}
        </label>
        <FilterInput
          value={
            placeholder == "Select Floor"
              ? filters[key] == "0"
                ? "G"
                : filters[key]
              : filters[key] || ""
          }
          onChange={(value: any) => handleFilterChange(key, value)}
          options={filteredOptions(key)}
          placeholder={placeholder}
          onBlur={(value: any) => onMouseOut(key, value)}
          onSearchChange={(value: any) => onSearchChange(key, value)}
        />
      </div>
    );
  };

  const onApplyFilters = (identifier: string) => {
    setShowFilters(false);

    if (identifier == "A") {
      setDataFilters(backupFilters);
    } else {
      setBackupFilters(dataFilters);
    }
  };

  return (
    <div
      className={`${
        showFilters ? "absolute inset-0 z-20 bg-white" : "hidden"
      } md:relative md:block w-full md:w-64 border-r bg-[#F8FBFF] h-full`}
    >
      <div className="sticky top-0 z-10 bg-[#F8FBFF] p-3 border-b flex justify-between items-center">
        <h3 className="font-medium">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-[#0073C6] text-sm font-bold hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="h-[calc(100vh-120px)] overflow-y-auto p-3 custom-scrollbar">
        <div className="flex flex-col">
          {/* Basic Details */}
          {options?.towerName &&
            options?.towerName.length > 0 &&
            (propCgId === projectprops.apartment ||
              propCgId === projectprops.villament) &&
            renderFilter("towerName", "Search Tower", "Tower Name")}

          {options?.bhkName &&
            options?.bhkName.length > 0 &&
            propCgId !== projectprops.plot &&
            renderFilter("bhkName", "Select BHK Type", "BHK Type")}

          {options?.facingName &&
            options?.facingName.length > 0 &&
            renderFilter("facingName", "Select Facing", "At Facing")}

          {options?.floor &&
            options?.floor.length > 0 &&
            propCgId !== projectprops.plot &&
            renderFilter("floor", "Select Floor", "At Floor")}

          {options?.unitNumber &&
            options?.unitNumber.length > 0 &&
            renderFilter("unitNumber", "Select Unit Number", "Unit Number")}

          {options?.block &&
            options?.block.length > 0 &&
            propCgId === projectprops.apartment &&
            renderFilter("block", "Select Block", "Block")}

          {/* Area Details */}
          {options?.plotArea &&
            options?.plotArea.length > 0 &&
            propCgId === projectprops.plot &&
            renderFilter("plotArea", "Select Plot Area", "Plot Area (sq.ft)")}

          {options?.caretarea &&
            options?.caretarea.length > 0 &&
            renderFilter(
              "caretarea",
              "Select Carpet Area",
              "Carpet Area (sq.ft)"
            )}

          {options?.superBuildUparea &&
            options?.superBuildUparea.length > 0 &&
            renderFilter(
              "superBuildUparea",
              "Select Super Built-up Area",
              "Super Built-up Area (sq.ft)"
            )}

          {options?.terraceArea &&
            options?.terraceArea.length > 0 &&
            renderFilter(
              "terraceArea",
              "Select Terrace Area",
              "Terrace Area (sq.ft)"
            )}

          {/* Unit Features */}
          {options?.totalNumberofBathroom &&
            options?.totalNumberofBathroom.length > 0 &&
            renderFilter(
              "totalNumberofBathroom",
              "Select Number of Bathrooms",
              "Number of Bathrooms"
            )}

          {options?.totalNumberOfBalcony &&
            options?.totalNumberOfBalcony.length > 0 &&
            renderFilter(
              "totalNumberOfBalcony",
              "Select Number of Balconies",
              "Number of Balconies"
            )}

          {options?.noOfCarParking &&
            options?.noOfCarParking.length > 0 &&
            renderFilter(
              "noOfCarParking",
              "Select Number of Car Parkings",
              "Number of Car Parkings"
            )}

          {options?.parkingType &&
            options?.parkingType.length > 0 &&
            renderFilter("parkingType", "Select Parking Type", "Parking Type")}

          {/* Plot Dimensions */}
          {options?.length &&
            options?.length.length > 0 &&
            propCgId === projectprops.plot &&
            renderFilter("length", "Select Length", "Length")}

          {options?.width &&
            options?.width.length > 0 &&
            propCgId === projectprops.plot &&
            renderFilter("width", "Select Width", "Width")}
        </div>
      </div>

      {showFilters && (
        <div className="sticky bottom-0 bg-[#F8FBFF] p-3 border-t flex justify-between items-center gap-[4px] md:hidden">
          <button
            onClick={() => onApplyFilters("A")}
            className="w-[50%] p-2 bg-[#0073C6] text-white rounded-[4px]"
          >
            Apply Filters
          </button>
          <button
            onClick={() => onApplyFilters("C")}
            className="w-[50%] p-2 bg-white text-[#0073C6] font-bold border-solid border-[1px] border-[#0073C6] rounded-[4px]"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
