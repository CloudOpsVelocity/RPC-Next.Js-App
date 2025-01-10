/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from "react";
import { propCgIdAtom } from "@/app/store/vewfloor";
import { useAtomValue } from "jotai";
import { projectprops } from "@/app/data/projectDetails";
import FilterInput from "./filter-input";
import { useMediaQuery } from "@mantine/hooks";
import { PropertyUnit } from "../types/floor-plan";

type Props = {
  options: any;
  // handleUnitFilterChange: (name: string, value: string) => void;
  dataFilters:any;
  setDataFilters:any;
  showFilters:any;
  setShowFilters:any;
};

export default function PopupFilters({
  options,
  // handleUnitFilterChange,
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
    length:"",
    width: "",
  });

  const isMobile = useMediaQuery("(max-width: 601px)");
  
  const propCgId = useAtomValue(propCgIdAtom);

  const filteredOptions = (key: keyof typeof filters) => {
    const filterValue = String(filters[key]).toLowerCase();
    return (
      options !== undefined && options[key] !== undefined &&
      options[key].filter((option: string | number) => {
        const optionValue = String(option).toLowerCase();
        return optionValue.includes(filterValue);
      })
    );
  };

  
  function isActualNaN(value: any) {
    return value !== value; // Only NaN is not equal to itself
  }

  const handleUnitFilterChange = (name: string | number | symbol, value: string | number) => {
    setDataFilters((prev: PropertyUnit) => ({
      ...prev,
      [name]: isActualNaN(value) ? "" : value,
    }));
  };

  const handleFilterChange = (key: keyof typeof filters, value: string, type?:string) => {
    setFilters((prev) => ({ ...prev, [key]: String(value) }));
    setBackupFilters((prev) => ({ ...prev, [key]: String(value) }));
    // if(!isMobile || type === "C"){
      handleUnitFilterChange(key, value);
    // }
  };

  const onSearchChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: String(value) }));
  };

  const onMouseOut = (key: keyof typeof filters, value: string) => {
    let data = filteredOptions(key);
    if(data && !data.includes(value)){
      setFilters((prev) => ({ ...prev, [key]: backupFilters[key] }));
    }else{
      handleFilterChange(key, value);
    }
  };

  const clearFilters = () => {
    Object.keys(backupFilters).forEach((eachKey) => {
      handleFilterChange(eachKey, "", "C");
    });
  };

  const renderFilter = (key: keyof typeof filters, placeholder: string, title: string) => {  
    return (
      <div key={key} className="relative mb-[10px]">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="tower"
        >
          {title}
        </label>
        <FilterInput
          value={filters[key] || ""}
          onChange={(value) => handleFilterChange(key, value)}
          options={filteredOptions(key)}
          placeholder={placeholder}
          onBlur={(value) => onMouseOut(key, value)}
          onSearchChange={(value:any) => onSearchChange(key, value)}
        />
      </div>
    );
  };

  const onApplyFilters = (identifier:string) => {
    setShowFilters(false);

    if(identifier == "A"){
      setDataFilters(backupFilters);
    }else{
      setBackupFilters(dataFilters);
    }
  };

  return (
      <div
        className={`${showFilters ? "absolute inset-0 z-20 bg-white" : "hidden"
        } md:relative md:block w-full md:w-64 border-r bg-[#F8FBFF] p-3 overflow-y-auto`}
      >

        <div className="flex flex-col ">
          
          {/* Filter inputs */}
          {options?.towerName && options?.towerName.length > 0 && (propCgId === projectprops.apartment || propCgId === projectprops.villament) && (
            renderFilter("towerName", "Search Tower", "Tower Name")
          )}

          {options?.bhkName && options?.bhkName.length > 0 && propCgId !== projectprops.plot && (
            renderFilter("bhkName", "Select BHK Type", "BHK Type")
          )}

          {options?.facingName && options?.facingName.length > 0 && (
            renderFilter("facingName", "Select Facing", "Facing")
          )}

          {options?.floor && options?.floor.length > 0 && propCgId !== projectprops.plot && (
            renderFilter("floor", "Select Floor", "Floor")
          )}

          {options?.unitNumber && options?.unitNumber.length > 0 && (
            renderFilter("unitNumber", "Select Unit Number", "Unit Number")
          )}

          {options?.block && options?.block.length > 0&& propCgId === projectprops.apartment && (
            renderFilter("block", "Select Block", "Block")
          )}

          {options?.plotArea && options?.plotArea.length > 0 && propCgId === projectprops.plot && (
            renderFilter("plotArea", "Select Plot Area", "Plot Area")
          )}

          {options?.length && options?.length.length > 0 && propCgId === projectprops.plot && (
            renderFilter("length", "Select Length", "Length")
          )}

          {options?.width && options?.width.length > 0 && propCgId === projectprops.plot && (
            renderFilter("width", "Select Width", "Width")
          )}

          <button
            onClick={() => clearFilters()}
            className="ml-auto p-[4px] bg-[#0073C6] text-white text-[14px] rounded-[4px] "
          >
            Clear Filters
          </button>
        </div>

        {showFilters && (
          <div className="flex justify-between items-center gap-[4px]">
            <button
              onClick={() => onApplyFilters("A")}
              className="w-[50%] mt-4 p-2 bg-[#0073C6] text-white rounded-[4px] md:hidden"
            >
              Apply Filters
            </button>
            <button
              onClick={() => onApplyFilters("C")}
              className="w-[50%] mt-4 p-2 bg-white text-[#0073C6] font-bold md:hidden border-solid border-[1px] border-[#0073C6] rounded-[4px] "
            >
              Cancel
            </button>
          </div>
        )}
      </div>
  );
}
