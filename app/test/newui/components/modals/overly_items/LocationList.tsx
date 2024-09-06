// components/LocationCard.tsx
import React, { useState } from "react";
// types.ts

export interface LocationItem {
  placeId: string;
  name: string;
  rating: number;
  totalRating: number;
  distance: string;
  time: string;
}

export interface LocationData {
  [category: string]: LocationItem[];
}

interface LocationCardProps {
  data: LocationData;
}

const LocationCard: React.FC<LocationCardProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Object.keys(data)[0]
  );
  const handleTabClick = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden  w-full">
      {/* Tabs */}
      <div className="border-b">
        <ul className="flex">
          {Object.keys(data).map((category) => (
            <li
              key={category}
              onClick={() => handleTabClick(category)}
              className={`cursor-pointer px-3 py-2 text-center text-sm ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      {/* Content */}
      <div className=" overflow-y-auto ">
        {data && data[selectedCategory] && data[selectedCategory].length > 0 ? (
          <ul className="space-y-2 grid grid-cols-2 ">
            {data[selectedCategory].map((item) => (
              <li
                key={item.placeId}
                className="border p-2 rounded-lg shadow-sm"
              >
                <h3 className="text-sm font-semibold truncate">{item.name}</h3>
                <p className="text-gray-600 text-xs">
                  Rating: {item.rating} ({item.totalRating} reviews)
                </p>
                <p className="text-gray-600 text-xs">
                  Distance: {item.distance}
                </p>
                <p className="text-gray-600 text-xs">Time: {item.time}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-xs">No data available</p>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
