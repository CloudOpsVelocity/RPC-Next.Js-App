"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaChevronDown, FaSearch, FaFilter } from "react-icons/fa";

const builders = [
  {
    logo: "https://getrightproperty-test-bucket-new.s3.ap-south-1.amazonaws.com/images/varify/builder/398/logo.webp?v=0.21045573608338342",
    name: "Prestige Group",
    operatingCities: ["Mumbai", "Bangalore", "Chennai"],
    operatingSince: 1986,
    description:
      "Leading real estate developer known for luxury residential and commercial projects across India.",
  },
  {
    logo: "https://getrightproperty-test-bucket-new.s3.ap-south-1.amazonaws.com/images/varify/builder/398/logo.webp?v=0.21045573608338342",
    name: "Godrej Properties",
    operatingCities: ["Bangalore", "Mysore", "Hyderabad"],
    operatingSince: 1990,
    description:
      "Renowned for innovative, sustainable, and high-quality real estate developments across India.",
  },
  // ... Add more builders with their respective operating states
];

type Props = {
  state: string;
};

export default function StateBuilder({ state }: Props) {
  const [filterState, setFilterState] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const filteredAndSortedBuilders = builders
    .filter(
      (builder) =>
        (filterState === "" || builder.operatingCities.includes(filterState)) &&
        builder.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      {/* Fixed Header */}
      <div className="fixed top-[68px] left-0 right-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 capitalize mb-4 md:mb-0">
            All Builders
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            {/* Mobile Filter Button */}
            <button
              className="md:hidden w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center"
              onClick={() => setShowFilter(!showFilter)}
            >
              <FaFilter className="mr-2" />
              {showFilter ? "Hide Filters" : "Show Filters"}
            </button>

            {/* Filter Options */}
            <div
              className={`md:flex ${
                showFilter ? "flex" : "hidden"
              } flex-col md:flex-row w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0`}
            >
              <select
                className="w-full md:w-auto appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
              >
                <option value="">All Citites</option>
                {allCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <select
                className="w-full md:w-auto appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Sort A-Z</option>
                <option value="desc">Sort Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-4 py-8 mt-32 md:mt-16">
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredAndSortedBuilders.map((builder, index) => (
            <div
              key={builder.name}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 border border-blue-100"
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-center mb-4 md:mb-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-50 rounded-lg mb-4 md:mb-0 md:mr-4 flex items-center justify-center overflow-hidden shadow-md">
                    <Image
                      width={80}
                      height={80}
                      src={builder.logo}
                      alt={`${builder.name} logo`}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-blue-900 text-center md:text-left">
                    {builder.name}
                  </h2>
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-3">
                  <span className="font-semibold text-blue-700">
                    Operating in:
                  </span>{" "}
                  {builder.operatingCities.join(", ")}
                </p>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                  <span className="font-semibold text-blue-700">
                    Operating since:
                  </span>{" "}
                  {builder.operatingSince}
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6">
                  {builder.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button className="w-full sm:w-auto bg-blue-600 text-white font-semibold text-sm md:text-base px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                    See Projects
                  </button>
                  <button className="w-full sm:w-auto bg-white text-blue-800 font-semibold text-sm md:text-base px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-50 transition duration-300 border-2 border-blue-600 shadow-md">
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
