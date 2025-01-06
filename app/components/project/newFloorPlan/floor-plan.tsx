"use client";

import { useState } from "react";
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
  const { data: projectUnitsData, isLoading } = useQuery({
    queryKey: [`/${propCgId}/${selectedPhase}/${slug}`],
    queryFn: () => getProjectUnits(slug, selectedPhase, propCgId),
    enabled: !!propCgId,
    ...RTK_CONFIG,
  });

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
        {/* {projectUnitsData?.length == 0 ? (
          <NoProperties
            phase={
              phaseList?.find((phase: any) => phase.phaseId == currentPhase)
                ?.phaseName as any
            }
          />
        ) : */}
        <PropertyTabs phaseOverview={phaseOverview} />
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
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              projectUnitsData &&
              projectUnitsData.map((unit: any) => (
                <button
                  onClick={() => setModalState({ isOpen: true, unit })}
                  className="w-full bg-white rounded-xl border-2 border-gray-200 p-6 transition-all hover:border-[#0073C6] hover:shadow-lg group"
                  key={unit.unitId}
                >
                  {/* Header Section */}
                  <div className="flex items-start justify-between gap-4 border-b border-gray-100">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-bold text-[#0073C6] text-nowrap">
                          {unit.bhkName}
                        </h3>
                        <span className="px-3 py-1 text-sm font-semibold bg-blue-50 text-[#0073C6] rounded-full">
                          {unit.aptTypeName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        {unit.towerName && (
                          <p className="text-sm font-medium font-bold">
                            {unit.towerName}
                          </p>
                        )}
                        {unit.floor && (
                          <p className="text-sm font-medium font-bold">
                            - Floor {unit.floor}
                          </p>
                        )}
                        {unit.unitNumber && (
                          <p className="text-sm font-medium font-bold">
                            - Unit {unit.unitNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      {unit.superBuildUparea && (
                        <div className="space-y-1">
                          <p className="text-gray-500 text-sm font-medium">
                            Super Built-up Area
                          </p>
                          <p className="text-gray-900 text-lg font-bold">
                            {unit.superBuildUparea} sq.ft
                          </p>
                        </div>
                      )}
                      {unit.facingName && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <FaCompass className="text-[#0073C6] text-sm" />
                            <p className="text-gray-500 text-sm font-medium">
                              Facing
                            </p>
                          </div>
                          <p className="text-gray-900 text-lg font-bold">
                            {unit.facingName}
                          </p>
                        </div>
                      )}
                    </div>
                    <FaArrowRight className="text-[#0073C6] text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Additional Details */}
                  <div className="grid grid-cols-4 gap-4 mb-6 bg-gray-50 rounded-lg p-4">
                    {unit?.bhkName && (
                      <div className="flex items-center gap-2">
                        <LuBedDouble className="text-[#0073C6] text-lg" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Bedrooms
                          </p>
                          <p className="text-sm font-bold">
                            {unit?.bhkName?.split(" ")[0]}
                          </p>
                        </div>
                      </div>
                    )}
                    {unit.totalNumberofBathroom && (
                      <div className="flex items-center gap-2">
                        <FaBath className="text-[#0073C6] text-lg" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Bathrooms
                          </p>
                          <p className="text-sm font-bold">
                            {unit.totalNumberofBathroom}
                          </p>
                        </div>
                      </div>
                    )}
                    {unit.totalNumberOfBalcony && (
                      <div className="flex items-center gap-2">
                        <BiBuildingHouse className="text-[#0073C6] text-lg" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Balconies
                          </p>
                          <p className="text-sm font-bold">
                            {unit.totalNumberOfBalcony}
                          </p>
                        </div>
                      </div>
                    )}
                    {unit.terraceArea && (
                      <div className="flex items-center gap-2">
                        <BiBuildingHouse className="text-[#0073C6] text-lg" />
                        <div>
                          <p className="text-xs text-gray-500 font-medium">
                            Terrace Area
                          </p>
                          <p className="text-sm font-bold">
                            {unit.terraceArea} sq.ft
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
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
