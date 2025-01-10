/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from "react";
import { propCgIdAtom } from "@/app/store/vewfloor";
import { useAtomValue } from "jotai";
import { projectprops } from "@/app/data/projectDetails";
import FilterInput from "./filter-input";

type Props = {
  options: any;
  handleUnitFilterChange: (name: string, value: string) => void;
  dataFilters:any;
};

export default function PopupFilters({
  options,
  handleUnitFilterChange,
  dataFilters,
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

  const [focusedFilter, setFocusedFilter] = useState<string | null>(null);
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

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: String(value) }));
    setBackupFilters((prev) => ({ ...prev, [key]: String(value) }));
    handleUnitFilterChange(key, value);
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
      handleFilterChange(eachKey, "");
    });
  };

    const renderFilter = (key: keyof typeof filters, placeholder: string, title: string) => {  
      const isFocused = focusedFilter === key;

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

  return (
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
      className="ml-auto p-[4px] bg-[#0073C6] text-white text-[14px] rounded-lg "
    >
      Clear Filters
    </button>
  </div>
  );
}
