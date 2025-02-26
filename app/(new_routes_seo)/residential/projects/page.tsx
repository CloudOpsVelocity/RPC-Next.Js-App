"use client";

import { useState } from "react";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import Link from "next/link";

const stateData = {
  name: "Karnataka",
  cities: [
    {
      name: "Bangalore",
      properties: [
        {
          id: 1,
          name: "Properties in Bangalore",
          image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
          link: "/search/listing",
        },
        {
          id: 2,
          name: "Projects in Bangalore",
          image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
          link: "/search",
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/default.jpg`}
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
            Discover premium properties in Bangalore
          </p>
        </div>
      </div>

      {/* Properties Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          We are available in these states:
        </h2>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 max-w-2xl w-full ">
          <div className="p-6">
            <div className="relative flex items-center justify-center h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <h3 className="text-2xl font-bold text-white">
                {stateData.name}
              </h3>
            </div>

            {stateData.cities.map((city) => (
              <div key={city.name} className="mt-6">
                <h4 className="text-xl font-semibold text-gray-800">
                  {city.name}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {city.properties.map((property) => (
                    <Link
                      href={property.link}
                      key={property.id}
                      className="bg-gray-100 rounded-lg overflow-hidden shadow-md"
                    >
                      <div className="relative h-40">
                        <Image
                          src={property.image}
                          alt={property.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-lg font-medium text-gray-800">
                          {property.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-bgSecondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with our property experts for personalized assistance in
            finding your dream home in Bangalore.
          </p>
          <a
            href={`https://api.whatsapp.com/send?phone=+918884440963&text=${encodeURIComponent(
              "Hello, I'm interested in finding a home in Bangalore. Can you help me with this?"
            )}`}
            className="bg-white text-bgSecondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
