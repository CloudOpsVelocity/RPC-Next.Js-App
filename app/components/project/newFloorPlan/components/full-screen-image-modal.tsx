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
import { useAtomValue } from "jotai";
import { propCgIdAtom } from "@/app/store/vewfloor";
import { projectprops, propertyDetailsTypes } from "@/app/data/projectDetails";
import { downloadFn } from "@/app/(auth)/utils/handleCallBackAction";
import Image from "next/image";

interface FullScreenImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: PropertyUnit;
  handleReqcallBack: any;
}

type Props = {
  title: string;
  value: any;
  icon: any;
};

const DataItem = ({ title, value, icon }: Props) => {
  return (
    <div
      key={title}
      className="flex items-center gap-4 bg-[#F8FBFF] p-3 rounded-lg"
    >
      <div className="bg-[#ECF7FF] p-2 rounded-lg">{icon}</div>
      <div>
        <p className="text-[#4D6677] text-sm font-medium">{title}</p>
        <p className="text-[#303A42] text-base font-semibold">{value}</p>
      </div>
    </div>
  );
};

export function FullScreenImageModal({
  isOpen,
  onClose,
  unit,
  handleReqcallBack,
}: FullScreenImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation(); // Prevent event from bubbling up
        onClose();
      }
    };

    const handlePopState = () => {
      onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape, true); // Use capture phase
      window.addEventListener("popstate", handlePopState);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape, true); // Clean up with capture phase
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const propCgId = useAtomValue(propCgIdAtom);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full h-full bg-white overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start md:items-center justify-between flex-col md:flex-row p-2 border-b bg-white relative">
          <h3 className="text-base md:text-xl font-semibold text-[#0073C6]">
            {`${
              propCgId !== projectprops.plot
                ? unit.bhkName
                : `(${unit.length} X ${unit.width}) ${unit.plotArea} sq.ft`
            } - 
            ${
              propertyDetailsTypes && propertyDetailsTypes.get(propCgId)
                ? propertyDetailsTypes?.get(propCgId)?.name
                : ""
            } - 
            Unit ${unit.unitNumber}`}
          </h3>
          <div className="flex items-center w-full justify-end gap-2 md:gap-4 mt-2 md:mt-0">
            <button
              onClick={() =>
                unit.floorPlanUrl?.split(",")[0]
                  ? downloadFn(unit.floorPlanUrl?.split(",")[0])
                  : ""
              }
              className={`flex items-center gap-1 md:gap-2 p-2 md:px-4 md:py-2 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors ${
                unit.floorPlanUrl?.split(",")[0] ? "" : "cursor-not-allowed"
              } `}
              disabled={unit.floorPlanUrl?.split(",")[0] ? false : true}
              title={
                unit.floorPlanUrl?.split(",")[0]
                  ? "Click to Download Floorplan"
                  : "Floorplan not Available"
              }
            >
              <FaDownload className="w-4 h-4" />
              <span className="hidden md:inline">Download Floor Plan</span>
            </button>
            <button
              onClick={() => handleReqcallBack(unit)}
              className="flex items-center gap-1 md:gap-2 p-2 md:px-4 md:py-2 bg-[#0073C6] text-white rounded-lg hover:bg-[#005a9e] transition-colors"
            >
              <FaMessage className="w-4 h-4" />
              <span className="text-xs md:text-sm">Request Quotation</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaTimes className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left - Floor Plan Image */}
          <div className="flex-1 p-[10px] md:p-6 flex items-center justify-center bg-[#F8FBFF]">
            <Image
              width={800}
              height={600}
              src={unit.floorPlanUrl?.split(",")[0] ?? ImgNotAvail}
              alt={`Floor Plan for ${unit.bhkName}`}
              className="max-w-full h-full  object-contain"
            />
          </div>

          {/* Right - Unit Details */}
          <div className="w-full lg:w-96 bg-white p-[10px] md:p-6 overflow-y-auto border-t lg:border-t-0 lg:border-l">
            <div className="space-y-6">
              {/* Area Details */}
              <div>
                <h4 className="text-lg font-semibold text-[#303A42] mb-[20px] border-b pb-2">
                  Area Details
                </h4>
                <div className="flex gap-[10px] flex-wrap ">
                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Super Built-up Area"
                      value={`${unit.superBuildUparea} sq.ft`}
                      icon={
                        <FaRuler className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Carpet Area"
                      value={`${unit.caretarea} sq.ft`}
                      icon={
                        <FaRuler className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {(propCgId === projectprops.apartment ||
                    propCgId === projectprops.villament) && (
                    <DataItem
                      title="Tower"
                      value={unit.towerName}
                      icon={
                        <FaHome className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Floor"
                      value={
                        unit.floor === 0
                          ? "Ground Floor"
                          : `${unit.floor}${(() => {
                              const suffixes = ["th", "st", "nd", "rd"];
                              const v = unit.floor % 100;
                              return (
                                suffixes[(v - 20) % 10] ||
                                suffixes[v] ||
                                suffixes[0]
                              );
                            })()} Floor`
                      }
                      icon={
                        <FaBuilding className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId === projectprops.plot && (
                    <DataItem
                      title="Length"
                      value={`${unit.length} ft`}
                      icon={
                        <FaRuler className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId === projectprops.plot && (
                    <DataItem
                      title="Width"
                      value={`${unit.width} ft`}
                      icon={
                        <FaRuler className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId === projectprops.plot && (
                    <DataItem
                      title="Plot Area"
                      value={`${unit.plotArea} sq.ft`}
                      icon={
                        <FaTree className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}
                </div>
              </div>

              {/* Unit Features */}
              <div>
                <h4 className="text-lg font-semibold mb-[20px] text-[#303A42] border-b pb-2">
                  Unit Features
                </h4>
                <div className="flex gap-[10px] flex-wrap">
                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Unit Type"
                      value={unit.bhkName}
                      icon={
                        <FaBuilding className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  <DataItem
                    title="Facing"
                    value={unit.facingName}
                    icon={
                      <FaCompass className="text-[#0073C6] text-xl sm:text-2xl" />
                    }
                  />

                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Bathrooms"
                      value={unit.totalNumberofBathroom}
                      icon={
                        <FaBath className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Balconies"
                      value={unit.totalNumberOfBalcony}
                      icon={
                        <FaHome className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {propCgId !== projectprops.plot && (
                    <DataItem
                      title="Car Parking"
                      value={`${unit.noOfCarParking} ${
                        unit.parkingType ? unit.parkingType : ""
                      }`}
                      icon={
                        <FaCar className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}

                  {unit.terraceArea && unit.terraceArea !== "null" && (
                    <DataItem
                      title="Terrace Area"
                      value={`${unit.terraceArea} sq.ft`}
                      icon={
                        <FaTree className="text-[#0073C6] text-xl sm:text-2xl" />
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
