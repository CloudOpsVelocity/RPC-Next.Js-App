"use client";
import { useState } from "react";

export default function EnhancedIndianFooter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#f1f1f1] text-gray-800">
      {/* <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img
              className="h-10"
              src="/placeholder.svg?height=40&width=150"
              alt="Company name"
            />
            <p className="text-gray-600 text-base">
              Your trusted partner in Indian real estate since 1990.
            </p>
            <div className="flex space-x-6">
              {["facebook", "twitter", "linkedin", "instagram", "youtube"].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-[#0073C6]"
                  >
                    <span className="sr-only">{social}</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )
              )}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-[#0073C6] tracking-wider uppercase">
                  New Projects in India
                </h3>
                <ul className="mt-4 space-y-4">
                  {[
                    "New Delhi",
                    "Mumbai",
                    "Chennai",
                    "Pune",
                    "Noida",
                    "Gurgaon",
                    "Bangalore",
                    "Ahmedabad",
                  ].map((city) => (
                    <li key={city}>
                      <a
                        href="#"
                        className="text-base text-gray-600 hover:text-[#148B16]"
                      >
                        New Projects in {city}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-[#0073C6] tracking-wider uppercase">
                  Properties in India
                </h3>
                <ul className="mt-4 space-y-4">
                  {[
                    "New Delhi",
                    "Mumbai",
                    "Chennai",
                    "Pune",
                    "Noida",
                    "Gurgaon",
                    "Bangalore",
                    "Ahmedabad",
                  ].map((city) => (
                    <li key={city}>
                      <a
                        href="#"
                        className="text-base text-gray-600 hover:text-[#148B16]"
                      >
                        Property in {city}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-[#0073C6] tracking-wider uppercase">
                  Resources
                </h3>
                <ul className="mt-4 space-y-4">
                  {[
                    "Buying Guide",
                    "Selling Tips",
                    "Home Loans",
                    "Property Rates",
                    "Legal Advice",
                    "Vastu Shastra",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-base text-gray-600 hover:text-[#148B16]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-[#0073C6] tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  {[
                    "About Us",
                    "Our Team",
                    "Careers",
                    "Press",
                    "Contact",
                    "Testimonials",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-base text-gray-600 hover:text-[#148B16]"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-[#0073C6] tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Stay updated with the latest property listings and real estate
                news in India.
              </p>
              <form
                className="mt-4 sm:flex sm:max-w-md"
                onSubmit={handleSubmit}
              >
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0073C6] focus:border-[#0073C6]"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full bg-[#148B16] border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-[#0f6b11] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#148B16]"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#0073C6] tracking-wider uppercase">
                Download our app
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Get instant property alerts and explore Indian real estate on
                the go.
              </p>
              <div className="mt-4 flex space-x-4">
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#0073C6] hover:bg-[#005a9e]"
                >
                  <svg
                    className="h-6 w-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  App Store
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#0073C6] hover:bg-[#005a9e]"
                >
                  <svg
                    className="h-6 w-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-[#0073C6]">
              <span className="sr-only">Privacy Policy</span>
              <span className="text-sm">Privacy Policy</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#0073C6]">
              <span className="sr-only">Terms of Service</span>
              <span className="text-sm">Terms of Service</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#0073C6]">
              <span className="sr-only">Cookie Policy</span>
              <span className="text-sm">Cookie Policy</span>
            </a>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2023 Indian Real Estate Company. All rights reserved.
          </p>
        </div>
      </div> */}
    </footer>
  );
}
