import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import {
  FaChevronCircleDown,
  FaSearch,
  FaTruckLoading,
  FaCheck,
} from "react-icons/fa";
import RTK_CONFIG from "@/app/config/rtk";
import { getAllCitiesDetails } from "@/app/utils/stats_cities";
import { FaLocationDot } from "react-icons/fa6";
import { useSetAtom } from "jotai";
import { homeSearchFiltersAtom } from "@/app/store/home";

interface City {
  id: string;
  name: string;
}

interface DefaultCityResponse {
  data: {
    city: string;
    cityId: string;
  };
}

export default function AutoCitySelectDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<(HTMLLIElement | null)[]>([]);
  const setCity = useSetAtom(homeSearchFiltersAtom);
  const getCity = async (): Promise<DefaultCityResponse> => {
    try {
      const res = await fetch("/api/get-user-city", {
        cache: "force-cache",
      });
      if (!res.ok) throw new Error("Failed to fetch default city");
      return await res.json();
    } catch (error) {
      console.error("Error fetching default city:", error);
      throw error;
    }
  };
  const {
    data: DefaultCity,
    isLoading: defaultCityLoading,
    error: defaultCityError,
  } = useQuery<DefaultCityResponse, Error>({
    queryKey: ["my-location"],
    queryFn: getCity,
    onSuccess: (data) => {
      setCity({
        type: "SET_CITY",
        payload: `${data.data.city}+${data.data.cityId}`,
      });
    },
    ...RTK_CONFIG,
  });

  const {
    data: AllCities,
    isLoading: citiesLoading,
    error: citiesError,
  } = useQuery<City[], Error>({
    queryKey: ["all-cities"],
    queryFn: getAllCitiesDetails,
    ...RTK_CONFIG,
    enabled: isOpen,
  });

  const filteredCities =
    AllCities?.filter(
      (city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        city.id !== selectedCity?.id
    ) || [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleCloseDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [searchTerm]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCloseDropdown();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex < filteredCities.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (event.key === "Enter" && focusedIndex >= 0) {
      handleCitySelect(filteredCities[focusedIndex]);
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && optionsRef.current[focusedIndex]) {
      optionsRef.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setCity({
      type: "SET_CITY",
      payload: `${city.name}+${city.id}`,
    });
    handleCloseDropdown();
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
    setSearchTerm("");
    setFocusedIndex(-1);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSearchTerm("");
      setFocusedIndex(-1);
    }
  };

  return (
    <div className="relative w-64 max-w-fit" ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="w-full p-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between space-x-1"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-gray-700">
          {selectedCity?.name || DefaultCity?.data?.city || "Select City"}
        </span>
        {selectedCity ? (
          <FaLocationDot
            className="h-5 w-5 text-green-500"
            aria-hidden="true"
          />
        ) : (
          <FaChevronCircleDown
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg min-w-[180px]"
          onKeyDown={handleKeyDown}
        >
          <div className="p-2">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md pr-8 text-gray-700"
                aria-label="Search cities"
              />
              <FaSearch
                className="absolute right-2 top-2.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>

          {defaultCityError && (
            <p className="p-2 text-center text-red-500">
              Error loading default city
            </p>
          )}

          {citiesError && (
            <p className="p-2 text-center text-red-500">Error loading cities</p>
          )}

          <ul className="max-h-60 overflow-auto scrollUnique" role="listbox">
            {citiesLoading ? (
              <li className="p-2 text-center">
                <FaTruckLoading
                  className="animate-spin h-5 w-5 mx-auto text-blue-500"
                  aria-label="Loading cities"
                />
              </li>
            ) : filteredCities.length > 0 ? (
              filteredCities.map((city, index) => (
                <li
                  key={city.id}
                  ref={(el) => {
                    if (el) optionsRef.current[index] = el;
                  }}
                  className={`p-2 hover:bg-gray-100 cursor-pointer ${
                    index === focusedIndex ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleCitySelect(city)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  role="option"
                  aria-selected={index === focusedIndex}
                  tabIndex={0}
                >
                  {city.name}
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-gray-500">No cities found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
