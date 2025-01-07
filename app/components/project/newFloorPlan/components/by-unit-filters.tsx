import React, { useState, useCallback, useRef, useEffect } from "react";
import { getUniqueOptionsByKeys } from "../utils/generateuniqueoptions";
import { FaSearch, FaTimes } from "react-icons/fa";

type Props = {
  units: any;
  handleUnitFilterChange: (name: string, value: string) => void;
};

export default function ByUnitFilters({
  units,
  handleUnitFilterChange,
}: Props) {
  const [filters, setFilters] = useState({
    unitNumber: "",
    bhkName: "",
    towerName: "",
    floor: "",
    facingName: "",
    block: "",
  });

  const [focusedFilter, setFocusedFilter] = useState<string | null>(null);
  console.log(filters);
  const memoOptions = useCallback(() => {
    return getUniqueOptionsByKeys(
      units,
      ["unitNumber", "bhkName", "towerName", "floor", "facingName", "block"],
      filters
    );
  }, [units]);

  const options = memoOptions();

  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: String(value) }));
    handleUnitFilterChange(key, value);
  };

  const clearFilter = (key: keyof typeof filters) => {
    handleFilterChange(key, "");
  };

  const filteredOptions = (key: keyof typeof filters) => {
    const filterValue = filters[key].toLowerCase();
    return options[key].filter((option: string | number) => {
      const optionValue = String(option).toLowerCase();
      return optionValue.includes(filterValue);
    });
  };

  const renderFilter = (key: keyof typeof filters, placeholder: string) => {
    const isFocused = focusedFilter === key;

    return (
      <div
        key={key}
        className="relative"
        ref={(el) => {
          if (el) dropdownRefs.current[key] = el;
        }}
      >
        <div className="relative">
          <input
            type="text"
            value={filters[key]}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            onFocus={() => setFocusedFilter(key)}
            className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073C6] w-full"
            placeholder={placeholder}
          />
          {filters[key] ? (
            <button
              onClick={() => clearFilter(key)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={`Clear ${key} filter`}
            >
              <FaTimes />
            </button>
          ) : (
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          )}
        </div>
        {isFocused && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredOptions(key).map((option: string) => (
              <li
                key={option}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  handleFilterChange(key, option);
                  setFocusedFilter(null);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {options.towerName && renderFilter("towerName", "Search Tower")}
      {options.floor && renderFilter("floor", "Search Floor")}
      {options.facingName && renderFilter("facingName", "Search Facing")}
      {options.unitNumber && renderFilter("unitNumber", "Search Unit Number")}
      {options.block && renderFilter("block", "Search Block")}
      {options.bhkName && renderFilter("bhkName", "Search Unit Type")}
    </div>
  );
}
