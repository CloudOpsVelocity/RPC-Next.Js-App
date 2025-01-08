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
  const itemsPerPage = 8; // Increased items per page for desktop

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

  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleUnits = filteredUnits.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full h-full bg-white overflow-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <h3 className="text-2xl font-semibold text-[#0073C6]">
            {currentUnit.bhkName} - Unit {currentUnit.unitNumber}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaTimes className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4 h-[calc(100vh-80px)] flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow overflow-auto">
            {/* Floor Plan Image Section */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={mainImageUrl}
                  alt={`Floor Plan for ${currentUnit.bhkName}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrevUnit}
                  className="flex items-center gap-2 px-4 py-2 bg-[#ECF7FF] text-[#0073C6] rounded-lg hover:bg-[#0073C6] hover:text-white transition-all"
                >
                  <FaChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={handleNextUnit}
                  className="flex items-center gap-2 px-4 py-2 bg-[#ECF7FF] text-[#0073C6] rounded-lg hover:bg-[#0073C6] hover:text-white transition-all"
                >
                  <span>Next</span>
                  <FaChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Unit Details Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
              <h4 className="text-lg font-semibold text-[#303A42] border-b pb-2">
                Area Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                  <div className="bg-[#ECF7FF] p-2 rounded-lg">
                    <FaRuler className="text-[#0073C6] text-2xl" />
                  </div>
                  <div>
                    <p className="text-[#4D6677] text-sm font-medium">
                      Carpet Area
                    </p>
                    <p className="text-[#303A42] text-base font-semibold">
                      {currentUnit.caretarea} sq.ft
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                  <div className="bg-[#ECF7FF] p-2 rounded-lg">
                    <FaRuler className="text-[#0073C6] text-2xl" />
                  </div>
                  <div>
                    <p className="text-[#4D6677] text-sm font-medium">
                      Super Built-up Area
                    </p>
                    <p className="text-[#303A42] text-base font-semibold">
                      {currentUnit.superBuildUparea} sq.ft
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                  <div className="bg-[#ECF7FF] p-2 rounded-lg">
                    <FaHome className="text-[#0073C6] text-2xl" />
                  </div>
                  <div>
                    <p className="text-[#4D6677] text-sm font-medium">Tower</p>
                    <p className="text-[#303A42] text-base font-semibold">
                      {currentUnit.towerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                  <div className="bg-[#ECF7FF] p-2 rounded-lg">
                    <FaBuilding className="text-[#0073C6] text-2xl" />
                  </div>
                  <div>
                    <p className="text-[#4D6677] text-sm font-medium">Floor</p>
                    <p className="text-[#303A42] text-base font-semibold">
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

              <h4 className="text-lg font-semibold text-[#303A42] border-b pb-2 mt-6">
                Unit Features
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                  <div className="bg-[#ECF7FF] p-2 rounded-lg">
                    <FaBuilding className="text-[#0073C6] text-2xl" />
                  </div>
                  <div>
                    <p className="text-[#4D6677] text-sm font-medium">
                      Unit Type
                    </p>
                    <p className="text-[#303A42] text-base font-semibold">
                      {currentUnit.bhkName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                  <div className="bg-[#ECF7FF] p-2 rounded-lg">
                    <FaCompass className="text-[#0073C6] text-2xl" />
                  </div>
                  <div>
                    <p className="text-[#4D6677] text-sm font-medium">Facing</p>
                    <p className="text-[#303A42] text-base font-semibold">
                      {currentUnit.facingName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                  <div className="bg-[#ECF7FF] p-2 rounded-lg">
                    <FaBath className="text-[#0073C6] text-2xl" />
                  </div>
                  <div>
                    <p className="text-[#4D6677] text-sm font-medium">
                      Bathrooms
                    </p>
                    <p className="text-[#303A42] text-base font-semibold">
                      {currentUnit.totalNumberofBathroom}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                  <div className="bg-[#ECF7FF] p-2 rounded-lg">
                    <FaHome className="text-[#0073C6] text-2xl" />
                  </div>
                  <div>
                    <p className="text-[#4D6677] text-sm font-medium">
                      Balconies
                    </p>
                    <p className="text-[#303A42] text-base font-semibold">
                      {currentUnit.totalNumberOfBalcony}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                  <div className="bg-[#ECF7FF] p-2 rounded-lg">
                    <FaCar className="text-[#0073C6] text-2xl" />
                  </div>
                  <div>
                    <p className="text-[#4D6677] text-sm font-medium">
                      Car Parking
                    </p>
                    <p className="text-[#303A42] text-base font-semibold">
                      {currentUnit.noOfCarParking} {currentUnit.parkingType}
                    </p>
                  </div>
                </div>

                {currentUnit.terraceArea &&
                  currentUnit.terraceArea !== "null" && (
                    <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                      <div className="bg-[#ECF7FF] p-2 rounded-lg">
                        <FaTree className="text-[#0073C6] text-2xl" />
                      </div>
                      <div>
                        <p className="text-[#4D6677] text-sm font-medium">
                          Terrace Area
                        </p>
                        <p className="text-[#303A42] text-base font-semibold">
                          {currentUnit.terraceArea} sq.ft
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Compact Carousel at Bottom */}
          <div className="mt-2 border-t pt-2 bg-white sticky bottom-0 w-full">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-[#303A42]">
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
                  <FaChevronLeft />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                  }
                  disabled={currentPage === totalPages - 1}
                  className="p-1 rounded-lg bg-[#ECF7FF] text-[#0073C6] disabled:opacity-50"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 pb-2">
              {visibleUnits.map((unit) => (
                <button
                  key={unit.unitIdEnc}
                  onClick={() => setCurrentUnit(unit)}
                  className={`w-full flex flex-col items-start p-2 border rounded-md transition-all ${
                    currentUnit.unitIdEnc === unit.unitIdEnc
                      ? "bg-[#0073C6] text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <img
                    src={unit?.floorPlanUrl?.split(",")[1] ?? ImgNotAvail}
                    alt={`Thumbnail for ${unit.bhkName}`}
                    className="w-full aspect-video object-cover rounded-md mb-1"
                  />
                  <span className="text-xs font-semibold">{unit.bhkName}</span>
                  <span className="text-xs">Unit {unit.unitNumber}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
