"use client";

import { useState } from "react";
import { FaChevronCircleDown } from "react-icons/fa";

const builders = [
  {
    logo: "/placeholder.svg?height=80&width=80",
    name: "BuildMaster Pro",
    operatingCities: ["New York", "Los Angeles", "Chicago"],
    operatingSince: 2005,
    description:
      "Expert builders specializing in modern residential and commercial projects.",
  },
  {
    logo: "/placeholder.svg?height=80&width=80",
    name: "Urban Constructors",
    operatingCities: ["San Francisco", "Seattle", "Portland"],
    operatingSince: 2010,
    description:
      "Innovative urban development and sustainable building solutions.",
  },
  {
    logo: "/placeholder.svg?height=80&width=80",
    name: "Heritage Homes",
    operatingCities: ["Boston", "Philadelphia", "Washington D.C."],
    operatingSince: 1995,
    description:
      "Preserving history through expert restoration and period-accurate new builds.",
  },
  {
    logo: "/placeholder.svg?height=80&width=80",
    name: "Eco Builders",
    operatingCities: ["Denver", "Austin", "Portland"],
    operatingSince: 2015,
    description:
      "Environmentally conscious construction focusing on energy efficiency and sustainability.",
  },
];

export default function BuildersDirectory() {
  const [filterCity, setFilterCity] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredAndSortedBuilders = builders
    .filter(
      (builder) =>
        filterCity === "" || builder.operatingCities.includes(filterCity)
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const allCities = Array.from(
    new Set(builders.flatMap((builder) => builder.operatingCities))
  ).sort();

  return (
    <div className="min-h-screen bg-white mt-[3.5%]">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-[#0073C6] mb-12 text-center">
          Builders Directory
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-12 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Filter by City */}
            <div className="relative w-full md:w-auto">
              <select
                className="appearance-none bg-white border-2 border-gray-300 text-gray-800 text-lg rounded-lg focus:ring-[#0073C6] focus:border-[#0073C6] block w-full p-3 pr-10 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
              >
                <option value="">Filter by City</option>
                {allCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <FaChevronCircleDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={24}
              />
            </div>

            {/* Sort by Name */}
            <div className="relative w-full md:w-auto">
              <select
                className="appearance-none bg-white border-2 border-gray-300 text-gray-800 text-lg rounded-lg focus:ring-[#0073C6] focus:border-[#0073C6] block w-full p-3 pr-10 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Sort A-Z</option>
                <option value="desc">Sort Z-A</option>
              </select>
              <FaChevronCircleDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={24}
              />
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedBuilders.map((builder, index) => (
            <div
              key={index}
              className="bg-gradient-to-l from-white via-[#E5F6FF] to-[#C4E1FF] border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-xl hover:scale-105 transform transition-all duration-300"
            >
              <div className="p-2">
                <div className="flex items-center mb-4">
                  <img
                    src={builder.logo}
                    alt={`${builder.name} logo`}
                    className="w-16 h-16 rounded-full mr-4 border-4 border-gray-200"
                  />
                  <h2 className="text-xl font-bold text-[#0073C6]">
                    {builder.name}
                  </h2>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Operating in:</span>{" "}
                  {builder.operatingCities.join(", ")}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Operating since:</span>{" "}
                  {builder.operatingSince}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {builder.description}
                </p>

                {/* Buttons */}
                <div className="flex space-x-2">
                  <button className="bg-[#0073C6] text-white font-semibold text-sm px-4 py-1 rounded hover:opacity-90 transition duration-200">
                    See Projects
                  </button>
                  <button className="bg-gray-200 text-gray-800 font-semibold text-sm px-4 py-1 rounded hover:bg-gray-300 transition duration-200">
                    Explore Builder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
