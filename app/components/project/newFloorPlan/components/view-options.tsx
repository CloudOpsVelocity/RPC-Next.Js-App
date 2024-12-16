"use client";

import { useState } from "react";
import { FaBuilding, FaHashtag, FaTh } from "react-icons/fa";

const viewOptions = [
  { id: "type", label: "By Type", icon: <FaTh className="w-4 h-4" /> },
  { id: "unit", label: "By Unit", icon: <FaHashtag className="w-4 h-4" /> },
];

export function ViewOptions({ onSelect }: { onSelect: (id: string) => void }) {
  const [activeView, setActiveView] = useState("type");

  const handleViewClick = (id: string) => {
    setActiveView(id);
    onSelect(id);
  };

  return (
    <div className="flex gap-4 border-b">
      {viewOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => handleViewClick(option.id)}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
            activeView === option.id
              ? "border-[#0073C6] text-[#0073C6]"
              : "border-transparent hover:border-gray-300 text-gray-600 hover:text-gray-900"
          }`}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
