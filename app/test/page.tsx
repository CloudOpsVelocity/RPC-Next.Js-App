/* eslint-disable react/no-array-index-key */
'use client'
import React from 'react'
type Props = {}

export default function Page({}: Props) {
 
  return (
    <div style={{ width: "95%", margin: "0 auto" }}>
     <AmenitiesDisplay />
      </div>
  )
}


import  { useState } from 'react';

const amenitiesData = {
  "Sports & Fitness Amenities": {
    "Indoor Sports Facilities": [
      { cid: 1, name: "Badminton Court (Indoor)", icon: "🏸" },
      { cid: 2, name: "Squash Court", icon: "🏆" },
      { cid: 3, name: "Table Tennis", icon: "🏓" },
      { cid: 4, name: "Carrom and Chess Room", icon: "♟️" },
      { cid: 5, name: "Pool/Billiards Table", icon: "🎱" }
    ],
    "Outdoor Sports Facilities": [
      { cid: 6, name: "Tennis Court", icon: "🎾" },
      { cid: 7, name: "Football Field", icon: "⚽" },
      { cid: 8, name: "Basketball Court", icon: "🏀" },
      { cid: 9, name: "Cricket Practice Pitch/Net", icon: "🏏" },
      { cid: 10, name: "Volleyball Court", icon: "🏐" },
      { cid: 11, name: "Skating Rink", icon: "⛸️" },
      { cid: 12, name: "Mini Golf", icon: "⛳" },
      { cid: 13, name: "Multi-Purpose Sports Court", icon: "🏅" }
    ]
  },
  "Recreational and Leisure Amenities": {
    "Entertainment Zones": [
      { cid: 14, name: "Cinema Room", icon: "🎬" },
      { cid: 15, name: "Lounge Area", icon: "🛋️" }
    ]
  }
};

interface Amenity {
  cid: number;
  name: string;
  icon: string;
}

interface AmenitiesSubCategory {
  [key: string]: Amenity[];
}

interface AmenitiesCategory {
  [key: string]: AmenitiesSubCategory;
}

const AmenitiesDisplay = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(amenitiesData)[0]);

  const categories = Object.keys(amenitiesData) as Array<keyof typeof amenitiesData>;
  const subCategories = Object.keys(amenitiesData[selectedCategory] as AmenitiesSubCategory);

  return (
    <div className="flex p-4">
      {/* Sidebar Categories */}
      <div className="w-1/4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`flex items-center gap-[9px] self-stretch p-2.5 bg-[#f3f3f3] mb-2 ${selectedCategory === category ? 'bg-green-100 text-green-700 font-semibold' : 'bg-gray-100'}`}
          >
            <div className=' w-1 h-[27px] bg-[#B6CEAF]' />   {category}
          </button>
        ))}
      </div>

      {/* Main Display */}
      <div className="flex-grow p-4 bg-gray-50 border rounded-md">
        {subCategories.map((subCategory) => (
          <div key={subCategory} className="mb-6">
            <h4 className="text-gray-700 font-semibold mb-2">{subCategory}</h4>
            <div className="flex flex-wrap gap-2">
              {(amenitiesData[selectedCategory] as AmenitiesSubCategory)[subCategory].map((amenity: Amenity) => (
                <div
                  key={amenity.cid}
                  className="p-2 border rounded-md bg-white shadow-sm flex items-center space-x-2"
                >
                  <span>{amenity.icon}</span>
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
