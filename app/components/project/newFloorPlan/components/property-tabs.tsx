"use client";

import { useState } from "react";
import { FaBuilding, FaHome, FaHotel, FaLandmark } from "react-icons/fa";
import { TabItem } from "../types/floor-plan";

const propertyTabs: TabItem[] = [
  {
    id: "apartment",
    label: "Apartment",
    icon: <FaBuilding className="w-4 h-4" />,
  },
  { id: "row-house", label: "Row House", icon: <FaHome className="w-4 h-4" /> },
  { id: "villa", label: "Villa", icon: <FaHotel className="w-4 h-4" /> },
  { id: "villament", label: "Villament", icon: <FaHome className="w-4 h-4" /> },
  { id: "plot", label: "Plot", icon: <FaLandmark className="w-4 h-4" /> },
];

export function PropertyTabs({ onSelect }: { onSelect: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState("apartment");

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    onSelect(id);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {propertyTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === tab.id
              ? "bg-[#0073C6] text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
