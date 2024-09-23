import { GrpDarkLogoSvg } from "@/app/images/getrightLogo";
import { useState } from "react";
import { FaAppStoreIos, FaLocationDot } from "react-icons/fa6";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import Subscribe from "./Subscribe";

export default function EnhancedFooter() {
  const socialIcons = [
    { name: "facebook", icon: <FaFacebook size={24} /> },
    { name: "instagram", icon: <FaInstagram size={24} /> },
    { name: "twitter", icon: <FaTwitter size={24} /> },
    { name: "youtube", icon: <FaYoutube size={24} /> },
    { name: "linkedin", icon: <FaLinkedin size={24} /> },
  ];
  const sections = [
    {
      title: "New Projects In India",
      links: ["New Delhi", "Banglore", "Chennai"].map(
        (city) => `New Projects in ${city}`
      ),
    },
    {
      title: "Properties",
      links: [
        "For Sale",
        "For Rent",
        "New Developments",
        "Commercial",
        "Vacation Rentals",
        "Foreclosures",
      ],
    },
    {
      title: "Resources",
      links: [
        "Mortgage Calculator",
        "Market Trends",
        "Buying Guide",
        "Selling Tips",
        "Home Valuation",
        "Real Estate News",
      ],
    },
    {
      title: "Our Pages",
      links: [
        "Home",
        "Projects",
        "Properties",
        "About Us",
        "Blog",
        "Contact Us",
      ],
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Our Team",
        "Careers",
        "Press",
        "Contact",
        "Partnerships",
      ],
    },
    {
      title: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "Cookie Policy",
        "Fair Housing",
        "Accessibility",
        "Sitemap",
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#253F59] to-[#1E2A38] text-white">
      <div className="max-w-[95%] mx-auto pt-12 pb-6 px-4 sm:px-6 lg:pt-16 lg:pb-8 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-6 xl:col-span-1">
            <GrpDarkLogoSvg className="w-[180px] md:w-[180px] -ml-2" />
            <p className="text-white text-lg font-light">
              We pride ourselves on delivering exceptional customer service
              &amp; building lasting relationships with our clients.
            </p>
            <div className="flex space-x-6">
              {socialIcons.map(({ name, icon }) => (
                <a
                  key={name}
                  href="/"
                  className="text-white hover:text-yellow-400 transition-colors transform hover:scale-110"
                >
                  <span className="sr-only">{name}</span>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
            <div className="md:grid md:grid-cols-3 md:gap-8">
              {sections.slice(0, 3).map(({ title, links }) => (
                <div key={title}>
                  <h3 className="text-sm font-semibold text-yellow-400 tracking-wider uppercase">
                    {title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="/"
                          className="text-base text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="md:grid md:grid-cols-4 md:gap-8">
              {sections.slice(3).map(({ title, links }) => (
                <div key={title}>
                  <h3 className="text-sm font-semibold text-yellow-400 tracking-wider uppercase">
                    {title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="/"
                          className="text-base text-gray-300 hover:text-yellow-400 transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-yellow-400 tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
              <p className="mt-4 text-base text-gray-300">
                Get the latest news, market trends, and hot property listings
                delivered to your inbox.
              </p>
              <Subscribe />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-yellow-400 tracking-wider uppercase">
                Download our app
              </h3>
              <p className="mt-4 text-base text-gray-300">
                Get instant property alerts and manage your favorites on the go.
              </p>
              <div className="mt-4 flex space-x-4">
                <a
                  href="/"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-800 hover:bg-yellow-500 transition-colors"
                >
                  <FaAppStoreIos size={24} className="mr-1.5" />
                  App Store
                </a>
                <a
                  href="/"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-800 hover:bg-yellow-500 transition-colors"
                >
                  <IoLogoGooglePlaystore size={24} className="mr-1" />
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <button className="text-white hover:text-yellow-400 inline-flex md:items-center md:justify-center flex-wrap text-left">
              <FaLocationDot className="mr-1" /> Whitefield, Bengaluru-560066
            </button>
            <a
              href={`tel:${8884440963}`}
              className="text-white hover:text-yellow-400 inline-flex md:items-center md:justify-center flex-wrap text-left"
            >
              <FaPhoneAlt className="mr-1" /> +91-8884440963
            </a>
          </div>
          <p className="mt-8 text-base text-white md:mt-0 md:order-1">
            Copyright © 2024 GetRightProperty. All Rights Reserved.
            <span>
              <br />A Product By &quot;
              <a
                href="https://rpclan.com/"
                target="_blank"
                className="hover:text-yellow-400 transition-colors"
              >
                {" "}
                RPCLAN SERVICES PVT.LTD
              </a>
              &quot;
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
