"use client";

import { ImgNotAvail } from "@/app/data/project";
import { useEffect, useState } from "react";
import {
  FaTimes,
  FaCompass,
  FaCar,
  FaBuilding,
  FaChevronLeft,
  FaChevronRight,
  FaBath,
  FaHome,
} from "react-icons/fa";
import { FaRuler, FaTree } from "react-icons/fa6";
import FilterInput from "./filter-input";

interface PropertyUnit {
  unitIdEnc: string;
  projIdEnc: string;
  bhkName: string;
  towerName: string;
  floor: number;
  unitNumber: string;
  facingName: string;
  caretarea: string;
  superBuildUparea: string;
  terraceArea: string;
  parkingType: string;
  totalNumberofBathroom: number;
  totalNumberOfBalcony: number;
  noOfCarParking: number;
  floorPlanUrl: string;
}

interface FloorPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  units: PropertyUnit[];
  initialUnit: PropertyUnit;
}

export function FloorPlanModal({
  isOpen,
  onClose,
  units,
  initialUnit,
}: FloorPlanModalProps) {
  const [currentUnit, setCurrentUnit] = useState(initialUnit);
  const [filteredUnits, setFilteredUnits] = useState(units);
  const [filters, setFilters] = useState({
    bhk: "",
    tower: "",
    facing: "",
    floor: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = {
    sm: 2,
    md: 4,
    lg: 8,
  };

  // Get unique values for filter options
  const uniqueBHKs = Array.from(new Set(units.map((unit) => unit.bhkName)));
  const uniqueTowers = Array.from(new Set(units.map((unit) => unit.towerName)));
  const uniqueFacings = Array.from(
    new Set(units.map((unit) => unit.facingName))
  );
  const uniqueFloors = Array.from(
    new Set(units.map((unit) => unit.floor))
  ).sort((a, b) => a - b);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const filtered = units.filter((unit) => {
      return (
        (filters.bhk === "" || unit.bhkName === filters.bhk) &&
        (filters.tower === "" || unit.towerName === filters.tower) &&
        (filters.facing === "" || unit.facingName === filters.facing) &&
        (filters.floor === "" || unit.floor.toString() === filters.floor)
      );
    });
    setFilteredUnits(filtered);
    setCurrentPage(0);
  }, [filters, units]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrevUnit = () => {
    const currentIndex = filteredUnits.findIndex(
      (unit) => unit.unitIdEnc === currentUnit.unitIdEnc
    );
    const prevIndex =
      (currentIndex - 1 + filteredUnits.length) % filteredUnits.length;
    setCurrentUnit(filteredUnits[prevIndex]);
  };

  const handleNextUnit = () => {
    const currentIndex = filteredUnits.findIndex(
      (unit) => unit.unitIdEnc === currentUnit.unitIdEnc
    );
    const nextIndex = (currentIndex + 1) % filteredUnits.length;
    setCurrentUnit(filteredUnits[nextIndex]);
  };

  if (!isOpen) return null;

  const mainImageUrl = currentUnit?.floorPlanUrl?.split(",")[0] || ImgNotAvail;

  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return itemsPerPage.sm;
      if (window.innerWidth < 1024) return itemsPerPage.md;
      return itemsPerPage.lg;
    }
    return itemsPerPage.lg;
  };

  const totalPages = Math.ceil(filteredUnits.length / getItemsPerPage());
  const startIndex = currentPage * getItemsPerPage();
  const visibleUnits = filteredUnits.slice(
    startIndex,
    startIndex + getItemsPerPage()
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full h-full bg-white overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b bg-white">
          <h3 className="text-lg md:text-xl font-semibold text-[#0073C6]">
            {currentUnit.bhkName} - Unit {currentUnit.unitNumber}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 rounded-full bg-[#ECF7FF] text-[#0073C6]"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-48px)]">
          {/* Left Side - Filters */}
          <div
            className={`${
              showFilters ? "absolute inset-0 z-20 bg-white" : "hidden"
            } md:relative md:block w-full md:w-64 border-r bg-[#F8FBFF] p-3 overflow-y-auto`}
          >
            <div className="space-y-3">
              {/* Filter inputs */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="tower"
                >
                  Tower Name
                </label>
                <FilterInput
                  value={filters.tower}
                  onChange={(value) =>
                    handleFilterChange({ target: { name: "tower", value } })
                  }
                  options={uniqueTowers}
                  placeholder="Select Tower"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="bhk"
                >
                  BHK Type
                </label>
                <FilterInput
                  value={filters.bhk}
                  onChange={(value) =>
                    handleFilterChange({ target: { name: "bhk", value } })
                  }
                  options={uniqueBHKs}
                  placeholder="Select BHK Type"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="facing"
                >
                  Facing
                </label>
                <FilterInput
                  value={filters.facing}
                  onChange={(value) =>
                    handleFilterChange({ target: { name: "facing", value } })
                  }
                  options={uniqueFacings}
                  placeholder="Select Facing"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="floor"
                >
                  Floor
                </label>
                <FilterInput
                  value={filters.floor}
                  onChange={(value) =>
                    handleFilterChange({ target: { name: "floor", value } })
                  }
                  options={uniqueFloors.map((floor) =>
                    floor === 0
                      ? "Ground Floor"
                      : `${floor}${
                          floor === 1
                            ? "st"
                            : floor === 2
                            ? "nd"
                            : floor === 3
                            ? "rd"
                            : "th"
                        } Floor`
                  )}
                  placeholder="Select Floor"
                />
              </div>

              {showFilters && (
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full mt-4 p-2 bg-[#0073C6] text-white rounded-lg md:hidden"
                >
                  Apply Filters
                </button>
              )}
            </div>
          </div>

          {/* Center - Floor Plan and Details */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-y-auto">
              {/* Floor Plan Image */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="h-full flex flex-col">
                  <div className="flex-1">
                    <img
                      src={mainImageUrl}
                      alt={`Floor Plan for ${currentUnit.bhkName}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={handlePrevUnit}
                      className="flex items-center gap-2 px-4 py-2 bg-[#ECF7FF] text-[#0073C6] rounded-lg hover:bg-[#0073C6] hover:text-white"
                    >
                      <FaChevronLeft />
                      <span className="hidden sm:inline">Previous</span>
                    </button>
                    <button
                      onClick={handleNextUnit}
                      className="flex items-center gap-2 px-4 py-2 bg-[#ECF7FF] text-[#0073C6] rounded-lg hover:bg-[#0073C6] hover:text-white"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>

              {/* Unit Details */}
              <div className="bg-white p-3 sm:p-6 rounded-xl shadow-lg space-y-3 sm:space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <h4 className="text-base sm:text-lg font-semibold text-[#303A42] border-b pb-2">
                  Area Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      <FaRuler className="text-[#0073C6] text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#4D6677] text-xs sm:text-sm font-medium">
                        Carpet Area
                      </p>
                      <p className="text-[#303A42] text-sm sm:text-base font-semibold">
                        {currentUnit.caretarea} sq.ft
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      <FaRuler className="text-[#0073C6] text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#4D6677] text-xs sm:text-sm font-medium">
                        Super Built-up Area
                      </p>
                      <p className="text-[#303A42] text-sm sm:text-base font-semibold">
                        {currentUnit.superBuildUparea} sq.ft
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      <FaHome className="text-[#0073C6] text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#4D6677] text-xs sm:text-sm font-medium">
                        Tower
                      </p>
                      <p className="text-[#303A42] text-sm sm:text-base font-semibold">
                        {currentUnit.towerName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      <FaBuilding className="text-[#0073C6] text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#4D6677] text-xs sm:text-sm font-medium">
                        Floor
                      </p>
                      <p className="text-[#303A42] text-sm sm:text-base font-semibold">
                        {currentUnit.floor === 0
                          ? "Ground Floor"
                          : `${currentUnit.floor}${(() => {
                              const suffixes = ["th", "st", "nd", "rd"];
                              const v = currentUnit.floor % 100;
                              return (
                                suffixes[(v - 20) % 10] ||
                                suffixes[v] ||
                                suffixes[0]
                              );
                            })()} Floor`}
                      </p>
                    </div>
                  </div>
                </div>

                <h4 className="text-base sm:text-lg font-semibold text-[#303A42] border-b pb-2 mt-3 sm:mt-6">
                  Unit Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      <FaBuilding className="text-[#0073C6] text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#4D6677] text-xs sm:text-sm font-medium">
                        Unit Type
                      </p>
                      <p className="text-[#303A42] text-sm sm:text-base font-semibold">
                        {currentUnit.bhkName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      <FaCompass className="text-[#0073C6] text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#4D6677] text-xs sm:text-sm font-medium">
                        Facing
                      </p>
                      <p className="text-[#303A42] text-sm sm:text-base font-semibold">
                        {currentUnit.facingName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      <FaBath className="text-[#0073C6] text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#4D6677] text-xs sm:text-sm font-medium">
                        Bathrooms
                      </p>
                      <p className="text-[#303A42] text-sm sm:text-base font-semibold">
                        {currentUnit.totalNumberofBathroom}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      <FaHome className="text-[#0073C6] text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#4D6677] text-xs sm:text-sm font-medium">
                        Balconies
                      </p>
                      <p className="text-[#303A42] text-sm sm:text-base font-semibold">
                        {currentUnit.totalNumberOfBalcony}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                      <FaCar className="text-[#0073C6] text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#4D6677] text-xs sm:text-sm font-medium">
                        Car Parking
                      </p>
                      <p className="text-[#303A42] text-sm sm:text-base font-semibold">
                        {currentUnit.noOfCarParking} {currentUnit.parkingType}
                      </p>
                    </div>
                  </div>

                  {currentUnit.terraceArea &&
                    currentUnit.terraceArea !== "null" && (
                      <div className="flex items-center gap-2 sm:gap-4 bg-[#F8FBFF] p-2 sm:p-3 rounded-lg">
                        <div className="bg-[#ECF7FF] p-1.5 sm:p-2 rounded-lg">
                          <FaTree className="text-[#0073C6] text-xl sm:text-2xl" />
                        </div>
                        <div>
                          <p className="text-[#4D6677] text-xs sm:text-sm font-medium">
                            Terrace Area
                          </p>
                          <p className="text-[#303A42] text-sm sm:text-base font-semibold">
                            {currentUnit.terraceArea} sq.ft
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Bottom Carousel */}
            <div className="border-t bg-white p-3">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold">
                  Available Units ({filteredUnits.length})
                </h4>
                <div className="flex gap-1">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 0))
                    }
                    disabled={currentPage === 0}
                    className="p-1 rounded-lg bg-[#ECF7FF] text-[#0073C6] disabled:opacity-50"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages - 1)
                      )
                    }
                    disabled={currentPage === totalPages - 1}
                    className="p-1 rounded-lg bg-[#ECF7FF] text-[#0073C6] disabled:opacity-50"
                  >
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                {visibleUnits.map((unit) => (
                  <button
                    key={unit.unitIdEnc}
                    onClick={() => setCurrentUnit(unit)}
                    className={`flex flex-col items-start p-2 border rounded-md ${
                      currentUnit.unitIdEnc === unit.unitIdEnc
                        ? "bg-[#0073C6] text-white"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={unit?.floorPlanUrl?.split(",")[0] ?? ImgNotAvail}
                      alt={`Thumbnail for ${unit.bhkName}`}
                      className="w-full aspect-video object-cover rounded-md mb-1"
                    />
                    <span className="text-xs font-semibold">
                      {unit.bhkName}
                    </span>
                    <span className="text-xs">Unit {unit.unitNumber}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
