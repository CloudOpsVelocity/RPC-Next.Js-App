"use client";

import { useState } from "react";
import { PropertyTabs } from "./components/property-tabs";
import { ViewOptions } from "./components/view-options";
import { FloorPlanModal } from "./components/floor-plan-modal";
import { FaCompass, FaCar, FaBuilding, FaArrowRight } from "react-icons/fa";
import type { PropertyUnit } from "./types/floor-plan";
import { BHKTabs } from "./components/bhk-tabs";

const propertyUnits: PropertyUnit[] = [
  {
    id: "1",
    type: "apartment",
    bhk: "2 BHK",
    bedrooms: 2,
    bathrooms: 2,
    tower: "Tower B",
    unitNumber: "121",
    builtupArea: 1211,
    facing: "North",
    carParking: 2,
    floorPlanImage: "https://picsum.photos/800/600?random=1",
  },
  {
    id: "2",
    type: "apartment",
    bhk: "1 BHK",
    bedrooms: 1,
    bathrooms: 2,
    tower: "Tower A",
    unitNumber: "Unit-01",
    builtupArea: 1231,
    facing: "East",
    carParking: 1,
    floorPlanImage: "https://picsum.photos/800/600?random=2",
  },
  {
    id: "3",
    type: "apartment",
    bhk: "3 BHK",
    bedrooms: 3,
    bathrooms: 3,
    tower: "Tower C",
    unitNumber: "301",
    builtupArea: 1500,
    facing: "West",
    carParking: 2,
    floorPlanImage: "https://picsum.photos/800/600?random=3",
  },
  {
    id: "4",
    type: "apartment",
    bhk: "2 BHK",
    bedrooms: 2,
    bathrooms: 2,
    tower: "Tower A",
    unitNumber: "205",
    builtupArea: 1250,
    facing: "South",
    carParking: 1,
    floorPlanImage: "https://picsum.photos/800/600?random=4",
  },
];

export default function FloorPlans() {
  const [selectedPropertyType, setSelectedPropertyType] = useState("apartment");
  const [selectedView, setSelectedView] = useState("type");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    unit: PropertyUnit | null;
  }>({
    isOpen: false,
    unit: null,
  });
  const [selectedBHK, setSelectedBHK] = useState("All");
  const [unitFilters, setUnitFilters] = useState({
    tower: "",
    floor: "",
    facing: "",
    minArea: "",
    maxArea: "",
  });

  const handleUnitFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUnitFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredUnits = propertyUnits.filter((unit) => {
    if (selectedPropertyType !== "apartment")
      return unit.type === selectedPropertyType;
    if (selectedBHK !== "All" && unit.bhk !== selectedBHK) return false;
    if (unitFilters.tower && unit.tower !== unitFilters.tower) return false;
    if (unitFilters.floor && !unit.unitNumber.startsWith(unitFilters.floor))
      return false;
    if (unitFilters.facing && unit.facing !== unitFilters.facing) return false;
    if (unitFilters.minArea && unit.builtupArea < parseInt(unitFilters.minArea))
      return false;
    if (unitFilters.maxArea && unit.builtupArea > parseInt(unitFilters.maxArea))
      return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Floor Plans For{" "}
            <span className="text-[#0073C6]">Unidus Breeze Apartment</span>
          </h1>
          <p className="text-gray-600">
            See floor plans as per your selected property type
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-gray-700">
            Select one of the phases to see Floor Plans
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors">
              Phase 1
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Beta Phase
            </button>
          </div>
        </div>

        <PropertyTabs onSelect={setSelectedPropertyType} />
        <ViewOptions onSelect={setSelectedView} />

        {selectedView === "type" && selectedPropertyType === "apartment" && (
          <div className="mt-4">
            <BHKTabs onSelect={setSelectedBHK} />
          </div>
        )}

        {selectedView === "unit" && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <select
              name="tower"
              onChange={handleUnitFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073C6]"
            >
              <option value="">All Towers</option>
              <option value="Tower A">Tower A</option>
              <option value="Tower B">Tower B</option>
              <option value="Tower C">Tower C</option>
            </select>
            <select
              name="floor"
              onChange={handleUnitFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073C6]"
            >
              <option value="">All Floors</option>
              <option value="1">1st Floor</option>
              <option value="2">2nd Floor</option>
              <option value="3">3rd Floor</option>
            </select>
            <select
              name="facing"
              onChange={handleUnitFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073C6]"
            >
              <option value="">All Facings</option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="East">East</option>
              <option value="West">West</option>
            </select>
            <select
              name="minArea"
              onChange={handleUnitFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073C6]"
            >
              <option value="">Min Area</option>
              <option value="1000">1000 sq ft</option>
              <option value="1200">1200 sq ft</option>
              <option value="1500">1500 sq ft</option>
            </select>
            <select
              name="maxArea"
              onChange={handleUnitFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0073C6]"
            >
              <option value="">Max Area</option>
              <option value="1500">1500 sq ft</option>
              <option value="2000">2000 sq ft</option>
              <option value="2500">2500 sq ft</option>
            </select>
          </div>
        )}

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {filteredUnits.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setModalState({ isOpen: true, unit })}
                className="w-full text-left p-6 rounded-lg transition-all bg-white border border-gray-200 hover:border-[#0073C6] hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-[#0073C6]">
                      {unit.bhk} | {unit.bedrooms} Bed - {unit.bathrooms} Bath
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {unit.tower} - Unit {unit.unitNumber}
                    </p>
                  </div>
                  <FaArrowRight className="text-[#0073C6] text-xl" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Super Builtup Area</p>
                    <p className="font-semibold">{unit.builtupArea} sq ft</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Facing</p>
                    <p className="font-semibold">{unit.facing}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Car Parking</p>
                    <p className="font-semibold">{unit.carParking}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="hidden md:block">
            <div className="sticky top-4">
              <img
                src="https://picsum.photos/800/600?random=0"
                alt="Default Floor Plan"
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="mt-4 text-center text-gray-600">
                Click on a unit to view its floor plan
              </p>
            </div>
          </div>
        </div>
      </div>

      {modalState.isOpen && (
        <FloorPlanModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ isOpen: false, unit: null })}
          units={propertyUnits}
          initialUnit={modalState.unit!}
        />
      )}
    </div>
  );
}
