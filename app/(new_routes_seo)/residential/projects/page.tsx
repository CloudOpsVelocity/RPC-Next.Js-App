"use client";

import { useState } from "react";
import Image from "next/image";
import { FiMapPin, FiHome, FiDollarSign, FiCheck } from "react-icons/fi";
import { BiBed } from "react-icons/bi";

const projects = [
  {
    id: 1,
    name: "Lakeside Serenity",
    location: "Whitefield, Bangalore",
    image: "/placeholder.svg?height=400&width=600",
    price: "₹1.2 Cr Onwards",
    bedrooms: "2, 3 BHK",
    size: "1200 - 1800 sq ft",
    amenities: ["Swimming Pool", "Gym", "Clubhouse", "Children's Play Area"],
  },
  {
    id: 2,
    name: "Green Valley Heights",
    location: "Electronic City, Bangalore",
    image: "/placeholder.svg?height=400&width=600",
    price: "₹80 L Onwards",
    bedrooms: "1, 2 BHK",
    size: "650 - 1100 sq ft",
    amenities: [
      "Rooftop Garden",
      "Jogging Track",
      "Indoor Games",
      "Party Hall",
    ],
  },
  {
    id: 3,
    name: "Skyline Towers",
    location: "Hebbal, Bangalore",
    image: "/placeholder.svg?height=400&width=600",
    price: "₹1.5 Cr Onwards",
    bedrooms: "3, 4 BHK",
    size: "1800 - 2500 sq ft",
    amenities: ["Sky Lounge", "Infinity Pool", "Tennis Court", "Spa"],
  },
  {
    id: 4,
    name: "Urban Oasis",
    location: "Koramangala, Bangalore",
    image: "/placeholder.svg?height=400&width=600",
    price: "₹1.8 Cr Onwards",
    bedrooms: "3, 4 BHK",
    size: "2000 - 2800 sq ft",
    amenities: [
      "Smart Home Features",
      "Yoga Deck",
      "Business Center",
      "Amphitheater",
    ],
  },
];

export default function BangaloreProjects() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Image
          src="/placeholder.svg?height=800&width=1200"
          alt="Bangalore Skyline"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Discover Your Dream Home in Bangalore
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
            Explore our premium residential projects in India's Silicon Valley
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Projects in Bangalore
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-64">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 flex items-center mb-4">
                  <FiMapPin className="mr-2" /> {project.location}
                </p>
                <div className="space-y-2 mb-4">
                  <p className="flex items-center text-gray-700">
                    <FiHome className="mr-2 text-blue-500" /> {project.size}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <BiBed className="mr-2 text-blue-500" /> {project.bedrooms}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <FiDollarSign className="mr-2 text-blue-500" />{" "}
                    {project.price}
                  </p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Key Amenities:
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {project.amenities.slice(0, 4).map((amenity, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <FiCheck className="mr-2 text-green-500" /> {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl mb-8">
            Our team of experts is here to help you find the ideal property in
            Bangalore.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
}
