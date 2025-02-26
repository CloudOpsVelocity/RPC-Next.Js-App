"use client";

import { useState } from "react";
import Image from "next/image";
import { FiMapPin, FiHome, FiDollarSign, FiCheck } from "react-icons/fi";
import { BiBed } from "react-icons/bi";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const states = [
  { id: "KA", name: "Karnataka" },
  { id: "TN", name: "Tamil Nadu" },
  { id: "MH", name: "Maharashtra" },
];

const cities = {
  KA: ["Bangalore", "Mysore", "Hubli"],
  TN: ["Chennai", "Coimbatore", "Madurai"],
  MH: ["Mumbai", "Pune", "Nagpur"],
};

const properties = [
  {
    id: 1,
    name: "Prestige Park Grove",
    location: "Whitefield, Bangalore",
    state: "KA",
    city: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    price: "₹1.5 Cr Onwards",
    bedrooms: "3 BHK",
    size: "1800 sq ft",
    amenities: ["Swimming Pool", "Gym", "Clubhouse", "Children's Play Area"],
    possession: "Dec 2024",
    type: "Apartment",
  },
  {
    id: 2,
    name: "Brigade Woods",
    location: "Electronic City, Bangalore",
    state: "KA",
    city: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    price: "₹95 L Onwards",
    bedrooms: "2 BHK",
    size: "1200 sq ft",
    amenities: [
      "Rooftop Garden",
      "Jogging Track",
      "Indoor Games",
      "Party Hall",
    ],
    possession: "Jun 2025",
    type: "Apartment",
  },
  {
    id: 3,
    name: "Sobha Dream Acres",
    location: "Marathahalli, Bangalore",
    state: "KA",
    city: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    price: "₹1.8 Cr Onwards",
    bedrooms: "4 BHK",
    size: "2200 sq ft",
    amenities: ["Sky Lounge", "Infinity Pool", "Tennis Court", "Spa"],
    possession: "Mar 2025",
    type: "Villa",
  },
  {
    id: 4,
    name: "Godrej Royale Woods",
    location: "Devanahalli, Bangalore",
    state: "KA",
    city: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop",
    price: "₹2.1 Cr Onwards",
    bedrooms: "3 BHK",
    size: "2400 sq ft",
    amenities: ["Smart Home", "Yoga Deck", "Business Center", "Amphitheater"],
    possession: "Sep 2024",
    type: "Villa",
  },
  {
    id: 5,
    name: "Mysore Royal Villas",
    location: "Hebbal, Mysore",
    state: "KA",
    city: "Mysore",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop",
    price: "₹85 L Onwards",
    bedrooms: "3 BHK",
    size: "1600 sq ft",
    amenities: ["Garden", "Community Hall", "Security", "Park"],
    possession: "Ready to Move",
    type: "Villa",
  },
];

export default function Home() {
  const [selectedState, setSelectedState] = useState("KA");
  const [selectedCity, setSelectedCity] = useState("Bangalore");

  const filteredProperties = properties.filter(
    (property) =>
      property.state === selectedState && property.city === selectedCity
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop"
          alt="Bangalore Cityscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Discover premium properties across India's most vibrant cities
          </p>
        </div>
      </div>

      {/* Filters Section */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="w-full md:w-64">
            <Select
              value={selectedState}
              onValueChange={(value) => {
                setSelectedState(value);
                setSelectedCity(cities[value as keyof typeof cities][0]);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.id} value={state.id}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-64">
            <Select
              value={selectedCity}
              onValueChange={(value) => setSelectedCity(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities[selectedState as keyof typeof cities].map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div> */}

      {/* Properties Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Available Properties in {selectedCity}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-64">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {property.name}
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {property.type}
                  </span>
                </div>
                <p className="text-gray-600 flex items-center mb-4">
                  <FiMapPin className="mr-2" /> {property.location}
                </p>
                <div className="space-y-2 mb-4">
                  <p className="flex items-center text-gray-700">
                    <FiHome className="mr-2 text-blue-500" /> {property.size}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <BiBed className="mr-2 text-blue-500" /> {property.bedrooms}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FiDollarSign className="mr-2 text-blue-500" />
                    {property.price}
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Amenities:
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {property.amenities.map((amenity, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <FiCheck className="mr-2 text-green-500" /> {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">
                    Possession: {property.possession}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with our property experts for personalized assistance in
            finding your dream home in {selectedCity}.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
