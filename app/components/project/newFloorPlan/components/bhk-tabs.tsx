"use client";

import { useState } from "react";

const bhkOptions = ["All", "1 BHK", "2 BHK", "3 BHK", "4 BHK"];

export function BHKTabs({ onSelect }: { onSelect: (bhk: string) => void }) {
  const [activeBHK, setActiveBHK] = useState("All");

  const handleBHKClick = (bhk: string) => {
    setActiveBHK(bhk);
    onSelect(bhk);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {bhkOptions.map((bhk) => (
        <button
          key={bhk}
          onClick={() => handleBHKClick(bhk)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeBHK === bhk
              ? "bg-[#0073C6] text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {bhk}
        </button>
      ))}
    </div>
  );
}
