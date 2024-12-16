"use client";

import { useEffect } from "react";
import { FaTimes, FaCompass, FaCar, FaBuilding } from "react-icons/fa";
import { PropertyUnit } from "../types/floor-plan";

interface FullScreenImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: PropertyUnit;
}

export function FullScreenImageModal({
  isOpen,
  onClose,
  unit,
}: FullScreenImageModalProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full h-full flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <FaTimes className="w-6 h-6 text-gray-600" />
        </button>
        <div className="w-full md:w-3/4 h-full flex items-center justify-center p-4">
          <img
            src={unit.floorPlanImage}
            alt={`Floor Plan for ${unit.bhk}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="w-full md:w-1/4 bg-white p-6 overflow-y-auto">
          <h3 className="text-2xl font-semibold text-[#0073C6] mb-4">
            {unit.bhk} Floor Plan Details
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Super Builtup Area</p>
              <p className="text-xl font-semibold">{unit.builtupArea} sq ft</p>
            </div>
            <div>
              <p className="text-gray-600">Unit Number</p>
              <p className="text-xl font-semibold">{unit.unitNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">Tower</p>
              <p className="text-xl font-semibold">{unit.tower}</p>
            </div>
            <div>
              <p className="text-gray-600">Facing</p>
              <p className="text-xl font-semibold">{unit.facing}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <FaBuilding className="text-[#0073C6] text-xl" />
              <span>{unit.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCompass className="text-[#0073C6] text-xl" />
              <span>{unit.bathrooms} Bathrooms</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <FaCar className="text-[#0073C6] text-xl" />
            <span>Car Parking: {unit.carParking}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
