"use client";

import React, { useCallback, useState } from "react";
import { PropertyTabs } from "./components/property-tabs";
import { ViewOptions } from "./components/view-options";
import { FloorPlanModal } from "./components/floor-plan-modal";
import {
  FaCompass,
  FaCar,
  FaBuilding,
  FaArrowRight,
  FaExpandAlt,
  FaParking,
  FaBath,
} from "react-icons/fa";
import type { PropertyUnit } from "./types/floor-plan";
import { BHKTabs } from "./components/bhk-tabs";
import { FullScreenImageModal } from "./components/full-screen-image-modal";
import { useAtom, useAtomValue } from "jotai";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import {
  ApartmentIcon,
  PlotIcon,
  VillamentIcon,
  VillaIcon,
  RowHouseIcon,
} from "@/app/images/commonSvgs";
import { projectprops } from "@/app/data/projectDetails";
import SubHeading from "../headings/SubHeading";
import { isSingleLetterOrNumber } from "@/app/utils/letters";
import Button from "@/app/elements/button";
import { useQuery } from "react-query";
import { getProjectUnits } from "@/app/utils/api/project";
import RTK_CONFIG from "@/app/config/rtk";
import { BiBuildingHouse } from "react-icons/bi";
import { LuBedDouble } from "react-icons/lu";
import Image from "next/image";
import { ImgNotAvail } from "@/app/data/project";
import { FaBed } from "react-icons/fa6";
import { MdBalcony } from "react-icons/md";
import PropertyCard from "./components/property-card";
import ByUnitFilters from "./components/by-unit-filters";
import FloorplanLeftsection from "./components/floorplan-leftsection";
import { getUniqueOptionsByKeys } from "./utils/generateuniqueoptions";
const iconStyles: string =
  " flex items-center justify-center w-[34px] sm:w-[40px] h-[34px] sm:h-[40px] bg-[#FAFDFF] rounded-[50%] ";
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

interface FloorPlansProps {
  phases: any;
  projName: string;
  partialUnitData: any;
  phaseOverview: any;
  slug: string;
}

export default function FloorPlans({
  phases,
  projName,
  partialUnitData,
  phaseOverview,
  slug,
}: FloorPlansProps): JSX.Element {
  const [selectedPhase, setSelectedPhase] = useAtom(currentPhaseAtom);
  const propCgId = useAtomValue(propCgIdAtom);
  const [selectedPropertyType, setSelectedPropertyType] = useState("apartment");
  const [selectedView, setSelectedView] = useState("type");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    unit: PropertyUnit | null;
  }>({
    isOpen: false,
    unit: null,
  });
  const [fullScreenModalState, setFullScreenModalState] = useState<{
    isOpen: boolean;
    unit: PropertyUnit | null;
  }>({
    isOpen: false,
    unit: null,
  });
  const [selectedBHK, setSelectedBHK] = useState("All");

  const [unitFilters, setUnitFilters] = useState({});
  const handleBhkClick = (bhk: string) => {
    setSelectedBHK(bhk);
    setUnitFilters((prev) => ({ ...prev, bhkName: bhk === "All" ? "" : bhk }));
  };
  const { data: projectUnitsData, isLoading } = useQuery({
    queryKey: [`/${propCgId}/${selectedPhase}/${slug}`],
    queryFn: () => getProjectUnits(slug, selectedPhase, propCgId),
    enabled: !!propCgId,
    ...RTK_CONFIG,
  });

  const handleUnitFilterChange = (name: string, value: string | number) => {
    setUnitFilters((prev) => ({ ...prev, [name]: value }));
  };
  const memoOptions = useCallback(() => {
    if (!projectUnitsData) return {};
    return getUniqueOptionsByKeys(
      projectUnitsData,
      ["unitNumber", "bhkName", "towerName", "floor", "facingName", "block"],
      unitFilters
    );
  }, [projectUnitsData, unitFilters]);

  const { options, filteredUnits } = memoOptions();
  return (
    <div className="w-[90%] mx-auto px-4 py-8">
      <h2
        className="text-h2 sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[4px] sm:mb-[10px] xl:mb-[6px] capitalize"
        id="floorPlansdiv"
      >
        Floor Plans For{" "}
        <span className="text-[#148B16] font-[700] ">{projName}</span>{" "}
      </h2>
      <SubHeading text="See floor plans as per your selected property type" />
      <div className="space-y-6">
        <div
          className={`flex justify-start items-start md:items-center  mb-[2%] flex-col md:flex-row  ${
            phases?.length > 1 ? "mt-4" : "mt-[0%]"
          }`}
        >
          {phases?.length > 1 && (
            <>
              <p className="text-[14px] sm:text-[20px] lg:text-[24px] font-[500] mb-2 sm:mb-[44px] md:mb-0 text-[#333] sm:mr-[20px] ">
                Select one of the phase to see Floor Plans
              </p>
              <div className=" flex justify-start items-start gap-[10px] flex-wrap ">
                {phases?.map((each: any, index: any) => {
                  return (
                    <Button
                      key={each.phaseId}
                      title={
                        isSingleLetterOrNumber(each.phaseName)
                          ? `Phase: ${each.phaseName}`
                          : each.phaseName
                      }
                      onChange={() => {
                        if (selectedPhase == each.phaseId) return;
                        setSelectedPhase(each.phaseId);
                        // setBhk("0");
                        // resetFilters();
                        // if (floorPlanType === "unit") {
                        //   setSelectedFloor({});
                        //   handleUnitFormClear();
                        // }
                      }}
                      buttonClass={` mb-[5px] text-[14px] sm:text-[18px] lg:text-[20px] bg-[#ECF7FF] p-[8px] xl:px-[8px] capitalize  whitespace-nowrap text-[#000] rounded-[8px]  ${
                        selectedPhase == each.phaseId
                          ? " font-[600] border-solid border-[1px] border-[#0073C6] "
                          : " font-[400]"
                      } `}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
        <PropertyTabs phaseOverview={phaseOverview} />
        <ViewOptions onSelect={setSelectedView} />

        {selectedView === "bhk" && selectedPropertyType === "apartment" && (
          <div className="mt-4">
            <BHKTabs onSelect={handleBhkClick} />
          </div>
        )}
        {selectedView === "unit" && (
          <ByUnitFilters
            options={options}
            handleUnitFilterChange={handleUnitFilterChange}
          />
        )}

        <div className="mt-3 grid md:grid-cols-2 gap-6">
          {/* FLOOR PLAN LEFT SECTION */}
          <FloorplanLeftsection
            units={filteredUnits}
            setModalState={setModalState}
            isLoading={isLoading}
          />
          <div className="hidden md:block">
            <div className="sticky top-4">
              <Image
                src={
                  isLoading
                    ? "data:image/webp;base64,UklGRhQCAABXRUJQVlA4WAoAAAAgAAAABQAAAwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggJgAAALABAJ0BKgYABAAHQJYlAF2AIddgkAAA/pT5fFPr1JgkQfFzYAAA"
                    : projectUnitsData[0]?.floorPlanUrl ?? ImgNotAvail
                }
                alt="Default Floor Plan"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg shadow-md"
              />
              {/* )} */}
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
      {fullScreenModalState.isOpen && (
        <FullScreenImageModal
          isOpen={fullScreenModalState.isOpen}
          onClose={() => setFullScreenModalState({ isOpen: false, unit: null })}
          unit={fullScreenModalState.unit!}
        />
      )}
    </div>
  );
}
