import React, { useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import SearchProjBugdetFilter from "./buget";
import useProjSearchAppliedFilters from "../../hooks/useProjSearchAppliedFilters";

interface BudgetDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function BudgetDropdown({
  isOpen,
  onToggle,
}: BudgetDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          onToggle();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);
  const { handleApplyFilters } = useProjSearchAppliedFilters();
  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 border-2 border-[#0073C6] text-[#0073C6] rounded-full hover:bg-[#0073C6]/5"
        onClick={onToggle}
      >
        Budget
        <MdKeyboardArrowDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
          <div className="flex items-center justify-between gap-4 pb-4 border-b">
            <button
              onClick={() => alert("bhk")}
              className="flex-1 text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              Clear Filter
            </button>
            <button
              onClick={() => handleApplyFilters(() => onToggle())}
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              Apply Filter
            </button>
          </div>
          {/* <h3 className="text-lg font-semibold mb-4">Set Budget Range</h3> */}
          <div className="space-y-4">
            <SearchProjBugdetFilter />
          </div>
        </div>
      )}
    </div>
  );
}
