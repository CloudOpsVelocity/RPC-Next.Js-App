"use client";

import { useEffect, useState } from "react";
import {
  FaTimes,
  FaCompass,
  FaCar,
  FaBuilding,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { PropertyUnit } from "../types/floor-plan";

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
    const filtered = units.filter(
      (unit) =>
        (filters.bhk === "" || unit.bhk === filters.bhk) &&
        (filters.tower === "" || unit.tower === filters.tower) &&
        (filters.facing === "" || unit.facing === filters.facing)
    );
    setFilteredUnits(filtered);
  }, [filters, units]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrevUnit = () => {
    const currentIndex = filteredUnits.findIndex(
      (unit) => unit.id === currentUnit.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredUnits.length) % filteredUnits.length;
    setCurrentUnit(filteredUnits[prevIndex]);
  };

  const handleNextUnit = () => {
    const currentIndex = filteredUnits.findIndex(
      (unit) => unit.id === currentUnit.id
    );
    const nextIndex = (currentIndex + 1) % filteredUnits.length;
    setCurrentUnit(filteredUnits[nextIndex]);
  };

  if (!isOpen) return null;

  console.log(currentUnit.bedrooms)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-2xl font-semibold text-[#0073C6]">
            Floor Plan Details
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaTimes className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <img
              src={currentUnit.floorPlanImage}
              alt={`Floor Plan for ${currentUnit.bhk}`}
              className="w-full h-auto rounded-lg shadow-sm"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevUnit}
                className="p-2 bg-gray-100 rounded-full"
              >
                <FaChevronLeft className="w-6 h-6 text-[#0073C6]" />
              </button>
              <button
                onClick={handleNextUnit}
                className="p-2 bg-gray-100 rounded-full"
              >
                <FaChevronRight className="w-6 h-6 text-[#0073C6]" />
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-gray-600">Super Builtup Area</p>
                <p className="text-2xl font-semibold">
                  {currentUnit.builtupArea} sq ft
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Unit Number</p>
                <p className="text-2xl font-semibold">
                  {currentUnit.unitNumber}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Tower</p>
                <p className="text-2xl font-semibold">{currentUnit.tower}</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Facing</p>
                <p className="text-2xl font-semibold">{currentUnit.facing}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FaBuilding className="text-[#0073C6] text-xl" />
                <span>{currentUnit.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCompass className="text-[#0073C6] text-xl" />
                <span>{currentUnit.bathrooms} Bathrooms</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaCar className="text-[#0073C6] text-xl" />
              <span>Car Parking: {currentUnit.carParking}</span>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Filter Units</h4>
              <div className="grid grid-cols-3 gap-4">
                <select
                  name="bhk"
                  value={filters.bhk}
                  onChange={handleFilterChange}
                  className="border rounded-md p-2"
                >
                  <option value="">All BHK</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                </select>
                <select
                  name="tower"
                  value={filters.tower}
                  onChange={handleFilterChange}
                  className="border rounded-md p-2"
                >
                  <option value="">All Towers</option>
                  <option value="Tower A">Tower A</option>
                  <option value="Tower B">Tower B</option>
                  <option value="Tower C">Tower C</option>
                </select>
                <select
                  name="facing"
                  value={filters.facing}
                  onChange={handleFilterChange}
                  className="border rounded-md p-2"
                >
                  <option value="">All Facings</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-t">
          <h4 className="font-semibold text-lg mb-4">Filtered Units</h4>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {filteredUnits.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setCurrentUnit(unit)}
                className={`flex flex-col items-center p-4 border rounded-md min-w-[150px] ${
                  currentUnit.id === unit.id
                    ? "bg-[#0073C6] text-white"
                    : "bg-white"
                }`}
              >
                <img
                  src={unit.floorPlanImage}
                  alt={`Thumbnail for ${unit.bhk}`}
                  className="w-20 h-20 object-cover rounded-md mb-2"
                />
                <span className="text-sm font-semibold">{unit.bhk}</span>
                <span className="text-xs">{unit.tower}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
