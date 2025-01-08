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
} from "react-icons/fa";

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
  // const thumbnailUrl = currentUnit.floorPlanUrl.split(",")[1] || mainImageUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-7xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
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
        <div className="p-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <img
              src={mainImageUrl}
              alt={`Floor Plan for ${currentUnit.bhkName}`}
              className="w-full h-auto rounded-lg shadow-sm"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevUnit}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <FaChevronLeft className="w-6 h-6 text-[#0073C6]" />
              </button>
              <button
                onClick={handleNextUnit}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <FaChevronRight className="w-6 h-6 text-[#0073C6]" />
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-gray-600">Carpet Area</p>
                <p className="text-2xl font-semibold">
                  {currentUnit.caretarea} sq ft
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Super Built-up Area</p>
                <p className="text-2xl font-semibold">
                  {currentUnit.superBuildUparea} sq ft
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Tower & Floor</p>
                <p className="text-2xl font-semibold">
                  {currentUnit.towerName} - Floor {currentUnit.floor}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Unit Number</p>
                <p className="text-2xl font-semibold">
                  {currentUnit.unitNumber}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <FaBuilding className="text-[#0073C6] text-xl" />
                <div>
                  <p className="text-sm text-gray-600">Configuration</p>
                  <p className="font-semibold">{currentUnit.bhkName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaBath className="text-[#0073C6] text-xl" />
                <div>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                  <p className="font-semibold">
                    {currentUnit.totalNumberofBathroom}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaBath className="text-[#0073C6] text-xl" />
                <div>
                  <p className="text-sm text-gray-600">Balconies</p>
                  <p className="font-semibold">
                    {currentUnit.totalNumberOfBalcony}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaCar className="text-[#0073C6] text-xl" />
                <div>
                  <p className="text-sm text-gray-600">Parking</p>
                  <p className="font-semibold">
                    {currentUnit.noOfCarParking} {currentUnit.parkingType}
                  </p>
                </div>
              </div>
            </div>

            {currentUnit.terraceArea && currentUnit.terraceArea !== "null" && (
              <div className="flex items-center gap-2">
                <FaBuilding className="text-[#0073C6] text-xl" />
                <div>
                  <p className="text-sm text-gray-600">Terrace Area</p>
                  <p className="font-semibold">
                    {currentUnit.terraceArea} sq ft
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Filter Units</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <select
                  name="bhk"
                  value={filters.bhk}
                  onChange={handleFilterChange}
                  className="border rounded-md p-2"
                >
                  <option value="">All BHK</option>
                  {Array.from(new Set(units.map((unit) => unit.bhkName))).map(
                    (bhk) => (
                      <option key={bhk} value={bhk}>
                        {bhk}
                      </option>
                    )
                  )}
                </select>
                <select
                  name="tower"
                  value={filters.tower}
                  onChange={handleFilterChange}
                  className="border rounded-md p-2"
                >
                  <option value="">All Towers</option>
                  {Array.from(new Set(units.map((unit) => unit.towerName))).map(
                    (tower) => (
                      <option key={tower} value={tower}>
                        {tower}
                      </option>
                    )
                  )}
                </select>
                <select
                  name="facing"
                  value={filters.facing}
                  onChange={handleFilterChange}
                  className="border rounded-md p-2"
                >
                  <option value="">All Facings</option>
                  {Array.from(
                    new Set(units.map((unit) => unit.facingName))
                  ).map((facing) => (
                    <option key={facing} value={facing}>
                      {facing}
                    </option>
                  ))}
                </select>
                <select
                  name="floor"
                  value={filters.floor}
                  onChange={handleFilterChange}
                  className="border rounded-md p-2"
                >
                  <option value="">All Floors</option>
                  {Array.from(new Set(units.map((unit) => unit.floor)))
                    .sort((a, b) => a - b)
                    .map((floor) => (
                      <option key={floor} value={floor}>
                        Floor {floor}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-t">
          <h4 className="font-semibold text-lg mb-4">
            Available Units ({filteredUnits.length})
          </h4>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {filteredUnits.map((unit) => (
              <button
                key={unit.unitIdEnc}
                onClick={() => setCurrentUnit(unit)}
                className={`flex flex-col items-start p-4 border rounded-md min-w-[200px] transition-all ${
                  currentUnit.unitIdEnc === unit.unitIdEnc
                    ? "bg-[#0073C6] text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <img
                  src={unit?.floorPlanUrl?.split(",")[1] ?? ImgNotAvail}
                  alt={`Thumbnail for ${unit.bhkName}`}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <span className="text-sm font-semibold">{unit.bhkName}</span>
                <span className="text-xs">Unit {unit.unitNumber}</span>
                <span className="text-xs">{unit.facingName} Facing</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
