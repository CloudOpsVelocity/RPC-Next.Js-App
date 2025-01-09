"use client";

import { useEffect } from "react";
import {
  FaTimes,
  FaCompass,
  FaCar,
  FaBuilding,
  FaBath,
  FaHome,
} from "react-icons/fa";
import { FaRuler, FaTree, FaDownload, FaMessage } from "react-icons/fa6";
import { PropertyUnit } from "../types/floor-plan";
import { ImgNotAvail } from "@/app/data/project";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full h-full bg-white overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <h3 className="text-xl font-semibold text-[#0073C6]">
            {unit.bhkName} - Unit {unit.unitNumber}
          </h3>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors">
              <FaDownload className="w-4 h-4" />
              <span>Download Floor Plan</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors">
              <FaMessage className="w-4 h-4" />
              <span>Request Quotation</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left - Floor Plan Image */}
          <div className="flex-1 p-6 flex items-center justify-center bg-[#F8FBFF]">
            <img
              src={unit.floorPlanUrl?.split(",")[0] ?? ImgNotAvail}
              alt={`Floor Plan for ${unit.bhkName}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Right - Unit Details */}
          <div className="w-full lg:w-96 bg-white p-6 overflow-y-auto border-t lg:border-t-0 lg:border-l">
            <div className="space-y-6">
              {/* Area Details */}
              <div>
                <h4 className="text-lg font-semibold text-[#303A42] border-b pb-2">
                  Area Details
                </h4>
                <div className="grid gap-4 mt-4">
                  <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-2 rounded-lg">
                      <FaRuler className="text-[#0073C6] text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#4D6677] text-sm font-medium">
                        Carpet Area
                      </p>
                      <p className="text-[#303A42] text-base font-semibold">
                        {unit.caretarea} sq.ft
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
                        {unit.superBuildUparea} sq.ft
                      </p>
                    </div>
                  </div>

                  {unit.terraceArea && unit.terraceArea !== "null" && (
                    <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                      <div className="bg-[#ECF7FF] p-2 rounded-lg">
                        <FaTree className="text-[#0073C6] text-2xl" />
                      </div>
                      <div>
                        <p className="text-[#4D6677] text-sm font-medium">
                          Terrace Area
                        </p>
                        <p className="text-[#303A42] text-base font-semibold">
                          {unit.terraceArea} sq.ft
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Unit Features */}
              <div>
                <h4 className="text-lg font-semibold text-[#303A42] border-b pb-2">
                  Unit Features
                </h4>
                <div className="grid gap-4 mt-4">
                  <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-2 rounded-lg">
                      <FaHome className="text-[#0073C6] text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#4D6677] text-sm font-medium">
                        Tower & Floor
                      </p>
                      <p className="text-[#303A42] text-base font-semibold">
                        {unit.towerName} -{" "}
                        {unit.floor === 0
                          ? "Ground Floor"
                          : `${unit.floor}${(() => {
                              const suffixes = ["th", "st", "nd", "rd"];
                              const v = unit.floor % 100;
                              return (
                                suffixes[(v - 20) % 10] ||
                                suffixes[v] ||
                                suffixes[0]
                              );
                            })()} Floor`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                    <div className="bg-[#ECF7FF] p-2 rounded-lg">
                      <FaCompass className="text-[#0073C6] text-2xl" />
                    </div>
                    <div>
                      <p className="text-[#4D6677] text-sm font-medium">
                        Facing
                      </p>
                      <p className="text-[#303A42] text-base font-semibold">
                        {unit.facingName}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg">
                      <div className="bg-[#ECF7FF] p-2 rounded-lg">
                        <FaBath className="text-[#0073C6] text-2xl" />
                      </div>
                      <div>
                        <p className="text-[#4D6677] text-sm font-medium">
                          Bathrooms
                        </p>
                        <p className="text-[#303A42] text-base font-semibold">
                          {unit.totalNumberofBathroom}
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
                          {unit.totalNumberOfBalcony}
                        </p>
                      </div>
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
                        {unit.noOfCarParking} {unit.parkingType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
