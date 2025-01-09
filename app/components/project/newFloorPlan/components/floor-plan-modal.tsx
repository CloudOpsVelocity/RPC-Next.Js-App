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
  filters: Partial<PropertyUnit>;
  setFilters: (filters: Partial<PropertyUnit>) => void;
  filteredUnits: PropertyUnit[];
  options?: Record<keyof PropertyUnit, string[]>;
}

export function FloorPlanModal({
  isOpen,
  onClose,
  units,
  initialUnit,
  filters,
  setFilters,
  filteredUnits: propFilteredUnits,
  options,
}: FloorPlanModalProps) {
  console.log(options);
  const [currentUnit, setCurrentUnit] = useState(initialUnit);
  const [filteredUnits, setFilteredUnits] = useState(propFilteredUnits);

  const [currentPage, setCurrentPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = {
    sm: 2,
    md: 4,
    lg: 8,
  };

  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return itemsPerPage.sm;
      if (window.innerWidth < 1024) return itemsPerPage.md;
      return itemsPerPage.lg;
    }
    return itemsPerPage.lg;
  };

  // Function to ensure the current unit is visible in the carousel
  const ensureUnitVisible = (unit: PropertyUnit) => {
    const unitIndex = filteredUnits.findIndex(
      (u) => u.unitIdEnc === unit.unitIdEnc
    );
    const itemsPerPageCount = getItemsPerPage();
    const targetPage = Math.floor(unitIndex / itemsPerPageCount);
    setCurrentPage(targetPage);
  };

  const handlePrevUnit = () => {
    const currentIndex = filteredUnits.findIndex(
      (unit) => unit.unitIdEnc === currentUnit.unitIdEnc
    );
    const prevIndex =
      (currentIndex - 1 + filteredUnits.length) % filteredUnits.length;
    const nextUnit = filteredUnits[prevIndex];
    setCurrentUnit(nextUnit);
    ensureUnitVisible(nextUnit);
  };

  const handleNextUnit = () => {
    const currentIndex = filteredUnits.findIndex(
      (unit) => unit.unitIdEnc === currentUnit.unitIdEnc
    );
    const nextIndex = (currentIndex + 1) % filteredUnits.length;
    const nextUnit = filteredUnits[nextIndex];
    setCurrentUnit(nextUnit);
    ensureUnitVisible(nextUnit);
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevUnit();
      } else if (e.key === "ArrowRight") {
        handleNextUnit();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, currentUnit]);

  useEffect(() => {
    setFilteredUnits(propFilteredUnits);
    setCurrentPage(0);
  }, [propFilteredUnits]);

  useEffect(() => {
    ensureUnitVisible(currentUnit);
  }, [filteredUnits]);

  const handleFilterChange = (name: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  if (!isOpen) return null;
  const mainImageUrl = currentUnit?.floorPlanUrl?.split(",")[0] || ImgNotAvail;
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
              {options.towerName && options.towerName.length > 0 && (
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="tower"
                  >
                    Tower Name
                  </label>
                  <FilterInput
                    value={filters.towerName || ""}
                    onChange={(value) => handleFilterChange("towerName", value)}
                    options={options.towerName}
                    placeholder="Select Tower"
                  />
                </div>
              )}

              {options.bhkName && options.bhkName.length > 0 && (
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="bhk"
                  >
                    BHK Type
                  </label>
                  <FilterInput
                    value={filters.bhkName || ""}
                    onChange={(value) => handleFilterChange("bhkName", value)}
                    options={options.bhkName}
                    placeholder="Select BHK Type"
                  />
                </div>
              )}

              {options.facingName && options.facingName.length > 0 && (
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="facing"
                  >
                    Facing
                  </label>
                  <FilterInput
                    value={filters.facingName || ""}
                    onChange={(value) =>
                      handleFilterChange("facingName", value)
                    }
                    options={options.facingName}
                    placeholder="Select Facing"
                  />
                </div>
              )}

              {options.floor && options.floor.length > 0 && (
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="floor"
                  >
                    Floor
                  </label>
                  <FilterInput
                    value={filters.floor?.toString() || ""}
                    onChange={(value) =>
                      handleFilterChange("floor", parseInt(value))
                    }
                    options={options.floor}
                    placeholder="Select Floor"
                  />
                </div>
              )}

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
