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
    <div className="w-full max-w-md  p-2 bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-nowrap overflow-x-auto gap-2 p-1 scrollbar-hide">
        {bhkOptions.map((bhk) => (
          <button
            key={bhk}
            onClick={() => handleBHKClick(bhk)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0073C6] ${
              activeBHK === bhk
                ? "bg-[#0073C6] text-white shadow-lg transform scale-105"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105"
            }`}
          >
            {bhk}
          </button>
        ))}
      </div>
    </div>
  );
}
