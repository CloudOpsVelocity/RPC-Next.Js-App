"use client";

import { useState } from "react";
import { FaBuilding, FaHashtag, FaTh } from "react-icons/fa";

const viewOptions = [
  { id: "type", label: "By Type", icon: <FaTh className="w-5 h-5" /> },
  { id: "unit", label: "By Unit", icon: <FaHashtag className="w-5 h-5" /> },
  { id: "bhk", label: "By BHK", icon: <FaBuilding className="w-5 h-5" /> },
];

export function ViewOptions({ onSelect }: { onSelect: (id: string) => void }) {
  const [activeView, setActiveView] = useState("type");

  const handleViewClick = (id: string) => {
    setActiveView(id);
    onSelect(id);
  };

  return (
    <div className="flex items-center gap-4 p-2 bg-gray-50 rounded-full shadow-lg">
      {viewOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => handleViewClick(option.id)}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full transition-all
          ${
            activeView === option.id
              ? "bg-btnPrimary text-white shadow-lg"
              : "bg-white text-gray-600 hover:bg-gray-100 hover:text-btnPrimary"
          }`}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
