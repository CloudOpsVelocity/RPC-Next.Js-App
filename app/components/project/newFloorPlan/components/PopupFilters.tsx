/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useCallback, useRef, useEffect } from "react";
import { getUniqueOptionsByKeys } from "../utils/generateuniqueoptions";
import { FaSearch, FaTimes } from "react-icons/fa";
import { propCgIdAtom } from "@/app/store/vewfloor";
import { useAtomValue } from "jotai";
import { projectprops } from "@/app/data/projectDetails";
import FilterInput from "./filter-input";

type Props = {
  options: any;
  handleUnitFilterChange: (name: string, value: string) => void;
  filters:any;
  setFilters:any;
};

export default function PopupFilters({
  options,
  handleUnitFilterChange,
  filters,
  setFilters
}: Props) {

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
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const propCgId = useAtomValue(propCgIdAtom);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isClickInside = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target as Node)
      );
      if (!isClickInside) {
        setFocusedFilter(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 

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



  return (
    <div className="space-y-3">
    {/* Filter inputs */}
    {options?.towerName && options?.towerName.length > 0 && (propCgId === projectprops.apartment || propCgId === projectprops.villament) && (
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="tower"
        >
          Tower Name
        </label>
        <FilterInput
          value={filters.towerName || ""}
          onChange={(value) => handleFilterChange("towerName", value)}
          options={filteredOptions("towerName")}
          placeholder="Select Tower"
          onBlur={onMouseOut}
          onSearchChange={(value) => onSearchChange("towerName", value)}
        />
      </div> 
    )}

    {options?.bhkName && options?.bhkName.length > 0 && propCgId !== projectprops.plot && (
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="bhk"
        >
          BHK Type
        </label>
        <FilterInput
          value={filters.bhkName || ""}
          onChange={(value) => handleFilterChange("bhkName", value)}
          options={filteredOptions("bhkName")}
          placeholder="Select BHK Type"
          onBlur={onMouseOut}
          onSearchChange={(value) => onSearchChange("bhkName", value)}
        />
      </div>
    )}

    {options?.facingName && options?.facingName.length > 0 && (
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="facing"
        >
          Facing
        </label>
        <FilterInput
          value={filters.facingName || ""}
          onChange={(value) =>
            handleFilterChange("facingName", value)
          }
          options={filteredOptions("facingName")}
          placeholder="Select Facing"
          onBlur={onMouseOut}
          onSearchChange={(value) => onSearchChange("facingName", value)}
        />
      </div>
    )}

    {options?.floor && options?.floor.length > 0 && propCgId !== projectprops.plot && (
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="floor"
        >
          Floor
        </label>
        <FilterInput
          value={filters.floor?.toString() || ""}
          onChange={(value) =>
            handleFilterChange("floor", parseInt(value))
          }
          options={filteredOptions("floor")}
          placeholder="Select Floor"
          onBlur={onMouseOut}
          onSearchChange={(value) => onSearchChange("floor", value)}
        />
      </div>
    )}

    {options?.unitNumber && options?.unitNumber.length > 0 && (
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="unitNumber"
        >
          Unit Number
        </label>
        <FilterInput
          value={filters.unitNumber || ""}
          onChange={(value) => handleFilterChange("unitNumber", value)}
          options={filteredOptions("unitNumber")}
          placeholder="Select Tower"
          onBlur={onMouseOut}
          onSearchChange={(value) => onSearchChange("unitNumber", value)}
        />
      </div> 
    )}

    {options?.block && options?.block.length > 0&& propCgId === projectprops.apartment && (
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="block"
        >
          Block
        </label>
        <FilterInput
          value={filters.block || ""}
          onChange={(value) => handleFilterChange("block", value)}
          options={filteredOptions("block")}
          placeholder="Select Tower"
          onBlur={onMouseOut}
          onSearchChange={(value) => onSearchChange("block", value)}
        />
      </div> 
    )}

    {options?.plotArea && options?.plotArea.length > 0 && propCgId === projectprops.plot && (
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="plotArea"
        >
          plot Area
        </label>
        <FilterInput
          value={filters.plotArea || ""}
          onChange={(value) => handleFilterChange("plotArea", value)}
          options={filteredOptions("plotArea")}
          placeholder="Select Tower"
          onBlur={onMouseOut}
          onSearchChange={(value) => onSearchChange("plotArea", value)}
        />
      </div> 
    )}

    {options?.length && options?.length.length > 0 && propCgId === projectprops.plot && (
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="length"
        >
          Length
        </label>
        <FilterInput
          value={filters.length || ""}
          onChange={(value) => handleFilterChange("length", value)}
          options={filteredOptions("length")}
          placeholder="Select Tower"
          onBlur={onMouseOut}
          onSearchChange={(value) => onSearchChange("length", value)}
        />
      </div> 
    )}

    {options?.width && options?.width.length > 0 && propCgId === projectprops.plot && (
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="width"
        >
          Width
        </label>
        <FilterInput
          value={filters.width || ""}
          onChange={(value) => handleFilterChange("width", value)}
          options={filteredOptions("width")}
          placeholder="Select Tower"
          onBlur={onMouseOut}
          onSearchChange={(value) => onSearchChange("width", value)}
        />
      </div> 
    )}
  </div>
  );
}
