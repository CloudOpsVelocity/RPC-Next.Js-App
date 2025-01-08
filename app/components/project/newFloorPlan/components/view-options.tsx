"use client";

import { useState } from "react";
import { FaBuilding, FaHashtag, FaTh } from "react-icons/fa";

const viewOptions = [
  {
    id: "type",
    label: "By Type",
    icon: <FaTh className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    id: "unit",
    label: "By Unit",
    icon: <FaHashtag className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    id: "bhk",
    label: "By BHK",
    icon: <FaBuilding className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
];

export function ViewOptions({ onSelect }: { onSelect: (id: string) => void }) {
  const [activeView, setActiveView] = useState("type");

  const handleViewClick = (id: string) => {
    setActiveView(id);
    onSelect(id);
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-nowrap overflow-x-auto gap-2 p-2 rounded-full shadow-lg bg-gray-50 scrollbar-hide">
        {viewOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleViewClick(option.id)}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 ease-in-out flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${
              activeView === option.id
                ? "bg-[#0073C6] text-white shadow-md transform scale-105"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 hover:scale-105"
            }`}
          >
            {option.icon}
            <span className="whitespace-nowrap">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
