"use client";

import { useState } from "react";
import { BsGrid, BsHash, BsBuilding } from "react-icons/bs";

const viewOptions = [
  { id: "type", label: "By Type", icon: <BsGrid className="w-4 h-4" /> },
  { id: "unit", label: "By Unit", icon: <BsHash className="w-4 h-4" /> },
  { id: "bhk", label: "By BHK", icon: <BsBuilding className="w-4 h-4" /> },
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
              ? "border-green-600 text-green-600"
              : "border-transparent hover:border-gray-300"
          }`}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
