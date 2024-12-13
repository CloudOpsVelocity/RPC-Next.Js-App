"use client";

import { useState } from "react";
import { PropertyTabs } from "./components/property-tabs";
import { ViewOptions } from "./components/view-option";
import { FloorPlanModal } from "./components/floor-plan-modal";
import { BsCompass, BsCarFront, BsBuilding } from "react-icons/bs";
import type { PropertyUnit } from "./types/floor-plan";

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
    floorPlanImage: "/placeholder.svg?height=600&width=800",
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
    floorPlanImage: "/placeholder.svg?height=600&width=800",
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

  const filteredUnits = propertyUnits.filter(
    (unit) => unit.type === selectedPropertyType
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Floor Plans For{" "}
            <span className="text-green-600">
              Unidus Breeze Apartment Check Check Removed
            </span>
          </h1>
          <p className="text-gray-600">
            See floor plans as per your selected property type
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-gray-700">
            Select one of the phase to see Floor Plans
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded">
              Phase 1
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded">
              Beta Phase
            </button>
          </div>
        </div>

        <PropertyTabs onSelect={setSelectedPropertyType} />
        <ViewOptions onSelect={setSelectedView} />

        <div className="space-y-4">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className="border rounded-lg p-4 grid md:grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {unit.bhk} | {unit.bedrooms} Bed - {unit.bathrooms} Bath
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <BsBuilding className="w-4 h-4 text-gray-500" />
                      <span>Tower: {unit.tower}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BsCompass className="w-4 h-4 text-gray-500" />
                      <span>Facing: {unit.facing}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Super Builtup Area:</span>
                    <span className="font-medium">
                      {unit.builtupArea} sq ft
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsCarFront className="w-4 h-4 text-gray-500" />
                    <span>Car Parking: {unit.carParking}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Unit Number:</span>
                    <span className="font-medium">{unit.unitNumber}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={() => setModalState({ isOpen: true, unit })}
                  className="relative group"
                >
                  <img
                    src={unit.floorPlanImage}
                    alt="Floor Plan Preview"
                    className="w-full max-w-sm rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    Click to view floor plan
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalState.unit && (
        <FloorPlanModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ isOpen: false, unit: null })}
          imageUrl={modalState.unit.floorPlanImage || ""}
          unitDetails={{
            bhk: modalState.unit.bhk,
            tower: modalState.unit.tower,
            unitNumber: modalState.unit.unitNumber,
          }}
        />
      )}
    </div>
  );
}
