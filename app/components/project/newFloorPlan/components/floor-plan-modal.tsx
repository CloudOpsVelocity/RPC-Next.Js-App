"use client";

import { useEffect } from "react";
import { IoClose, IoHome } from "react-icons/io5";
import { BsBuilding } from "react-icons/bs";
import { HiHashtag } from "react-icons/hi";

interface FloorPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  unitDetails: {
    bhk: string;
    tower: string;
    unitNumber: string;
  };
}

export function FloorPlanModal({
  isOpen,
  onClose,
  imageUrl,
  unitDetails,
}: FloorPlanModalProps) {
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
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <BsBuilding className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold">
              {unitDetails.bhk} -
              <span className="flex items-center gap-1 inline-flex">
                <IoHome className="w-4 h-4 text-gray-600" />
                Tower {unitDetails.tower}
              </span>{" "}
              -
              <span className="flex items-center gap-1 inline-flex">
                <HiHashtag className="w-4 h-4 text-gray-600" />
                Unit {unitDetails.unitNumber}
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <img src={imageUrl} alt="Floor Plan" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
