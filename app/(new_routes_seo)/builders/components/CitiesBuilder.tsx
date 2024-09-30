"use client";

import { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const builders = [
  {
    logo: "https://getrightproperty-test-bucket-new.s3.ap-south-1.amazonaws.com/images/varify/builder/398/logo.webp?v=0.21045573608338342",
    name: "Prestige Group",
    operatingCities: ["Bangalore", "Mumbai", "Chennai"],
    operatingSince: 1986,
    description:
      "Leading real estate developer known for luxury residential and commercial projects across India.",
  },
  {
    logo: "https://getrightproperty-test-bucket-new.s3.ap-south-1.amazonaws.com/images/varify/builder/398/logo.webp?v=0.21045573608338342",
    name: "Godrej Properties",
    operatingCities: ["Mumbai", "Pune", "Bangalore"],
    operatingSince: 1990,
    description:
      "Renowned for innovative, sustainable, and high-quality real estate developments across India.",
  },
  {
    logo: "https://getrightproperty-test-bucket-new.s3.ap-south-1.amazonaws.com/images/varify/builder/398/logo.webp?v=0.21045573608338342",
    name: "DLF Limited",
    operatingCities: ["Delhi", "Gurgaon", "Chennai"],
    operatingSince: 1946,
    description:
      "India's largest real estate company, offering a wide range of properties from luxury homes to integrated townships.",
  },
  {
    logo: "https://getrightproperty-test-bucket-new.s3.ap-south-1.amazonaws.com/images/varify/builder/398/logo.webp?v=0.21045573608338342",
    name: "Sobha Limited",
    operatingCities: ["Bangalore", "Gurgaon", "Kerala"],
    operatingSince: 1995,
    description:
      "Specializes in luxury apartments, villas, and integrated townships with a focus on quality and customer satisfaction.",
  },
  {
    logo: "https://getrightproperty-test-bucket-new.s3.ap-south-1.amazonaws.com/images/varify/builder/398/logo.webp?v=0.21045573608338342",
    name: "Lodha Group",
    operatingCities: ["Mumbai", "Pune", "London"],
    operatingSince: 1980,
    description:
      "One of India's largest real estate developers, known for its iconic residential and commercial projects.",
  },
  {
    logo: "https://getrightproperty-test-bucket-new.s3.ap-south-1.amazonaws.com/images/varify/builder/398/logo.webp?v=0.21045573608338342",
    name: "Hiranandani Developers",
    operatingCities: ["Mumbai", "Bangalore", "Chennai"],
    operatingSince: 1978,
    description:
      "Pioneers in developing integrated townships and known for their neo-classical architectural style.",
  },
  {
    logo: "https://getrightproperty-test-bucket-new.s3.ap-south-1.amazonaws.com/images/varify/builder/398/logo.webp?v=0.21045573608338342",
    name: "Tata Housing",
    operatingCities: ["Mumbai", "Bangalore", "Gurgaon"],
    operatingSince: 1984,
    description:
      "Part of the Tata Group, known for its sustainable and innovative residential and commercial projects across India.",
  },
  {
    logo: "https://getrightproperty-test-bucket-new.s3.ap-south-1.amazonaws.com/images/varify/builder/398/logo.webp?v=0.21045573608338342",
    name: "Brigade Group",
    operatingCities: ["Bangalore", "Mysore", "Hyderabad"],
    operatingSince: 1986,
    description:
      "Specializes in residential, commercial, and hospitality sectors, known for its quality constructions and timely delivery.",
  },
];

export default function BuildersDirectory({city}:{city:string}) {
  const [filterCity, setFilterCity] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedBuilders = builders
    .filter(
      (builder) =>
        (filterCity === "" || builder.operatingCities.includes(filterCity)) &&
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
      <div className="fixed top-20 left-0 right-0 bg-white shadow-md z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 capitalize mb-4 md:mb-0">
            Builders in {city}
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search builders..."
                className="w-full md:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              className="w-full md:w-auto appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
            >
              <option value="">All Cities</option>
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

      {/* Main Content */}
      <div className="w-full mx-auto px-4 py-8 mt-32 md:mt-16">
        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredAndSortedBuilders.map((builder, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 border border-blue-100"
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-center mb-4 md:mb-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-50 rounded-lg mb-4 md:mb-0 md:mr-4 flex items-center justify-center overflow-hidden shadow-md">
                    <img
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
                  <span className="font-semibold text-blue-700">Operating in:</span>{" "}
                  {builder.operatingCities.join(", ")}
                </p>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                  <span className="font-semibold text-blue-700">Operating since:</span>{" "}
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
