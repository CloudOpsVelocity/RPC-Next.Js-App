"use client";
import React, { useCallback, useState, useEffect } from "react";
import { PropertyTabs } from "./components/property-tabs";
import { ViewOptions } from "./components/view-options";
import { FloorPlanModal } from "./components/floor-plan-modal";
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
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";

const iconStyles: string =
  " flex items-center justify-center w-[34px] sm:w-[40px] h-[34px] sm:h-[40px] bg-[#FAFDFF] rounded-[50%] ";

interface FloorPlansProps {
  phases: any;
  projName: string;
  partialUnitData: any;
  phaseOverview: any;
  slug: string;
  postedById: number;
}

export default function FloorPlans({
  phases,
  projName,
  partialUnitData,
  phaseOverview,
  slug,
  postedById,
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
  const [allBhkNames, setAllBhkNames] = useState(["All"]);

  const selectedPhaseData = phaseOverview?.find(
    (phase: any) => phase.phaseId === selectedPhase
  );

  const types =
    selectedPhaseData?.propTypeOverview &&
    Object?.keys(
      selectedPhaseData?.propTypeOverview && selectedPhaseData.propTypeOverview
    )
      .map((v) => {
        if (selectedPhaseData?.propTypeOverview[v].unitTypes) {
          return v;
        } else {
          return null;
        }
      })
      .sort()
      .filter((v) => v !== null);

  const [unitFilters, setUnitFilters] = useState({});
  const [, { open }] = useReqCallPopup(); 
  const handleBhkClick = (bhk: string) => {
    setSelectedBHK(bhk);
    setUnitFilters((prev) => ({ ...prev, bhkName: bhk === "All" ? "" : bhk }));
  };

  const handleViewClick = (type: string) => {
    setAllBhks();
    setSelectedView(type);
    handleBhkClick("All");
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

  // Memoize the filtering options
  const memoOptions = useCallback(() => {
    if (!projectUnitsData) return {};
    return getUniqueOptionsByKeys(
      projectUnitsData,
      [
        "unitNumber",
        "bhkName",
        "towerName",
        "floor",
        "facingName",
        "block",
        "plotArea",
        "width",
        "length",
      ],
      unitFilters
    );
  }, [projectUnitsData, unitFilters]);

  const { options, filteredUnits } =
    selectedView === "unit" || selectedView === "bhk"
      ? memoOptions()
      : { options: {}, filteredUnits: projectUnitsData || [] };

  const setAllBhks = () => {
    if (Array.isArray(options?.bhkName)) {
      let data = ["All", ...options.bhkName];
      setAllBhkNames(() => {
        return [...data];
      });
    }
  };

  useEffect(() => {
    setSelectedView("type");
    setAllBhks();
  }, [propCgId, phases]);

  const allKeys = [
    "unitNumber",
    "bhkName",
    "towerName",
    "floor",
    "facingName",
    "block",
    "length",
    "width",
    "plotArea",
  ];

  const onSelectCard = (unit: any) => {
    if(!unit) return;
    setModalState({ isOpen: true, unit });
    setSelectedView("bhk");
    handleBhkClick("All");
    allKeys.forEach((eachKey) => {
      if (unit[eachKey]) {
        handleUnitFilterChange(eachKey, unit[eachKey]);
      }
    });
  };

  const onClosingPopup = () => {
    handleBhkClick("All");
    setAllBhks();
    setModalState(prev=>({ ...prev, isOpen: false }));
    allKeys.forEach((eachKey) => {
      handleUnitFilterChange(eachKey, "");
    });
  };
  const handleOpenFullScreenModal = (unit: PropertyUnit) => {
    setFullScreenModalState({ isOpen: true, unit: unit });

  };
  const handleReqcallBack = (unit: PropertyUnit) => {
    open({
      modal_type: "REQ_QUOTE",
      reqId: unit.unitIdEnc,
      source: "projBanner",
      postedByName: unit.bhkName,
      title: unit.unitNumber,
      postedId: postedById,
    });
  };

  const rightSideUnit = modalState.unit !== null ? modalState.unit : projectUnitsData && projectUnitsData[0] ? projectUnitsData[0] : {};

  return (
    <div className="w-full md:w-[90%] mx-auto px-3 md:px-4 py-8">
      <h2
        className="text-h2 sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[4px] sm:mb-[10px] xl:mb-[6px] capitalize"
        id="floorPlansdiv"
      >
        Floor Plans For{" "}
        <span className="text-[#148B16] font-[700] ">{projName}</span>{" "}
      </h2>
      <SubHeading text="See floor plans as per your selected property type" />
      <div className="space-y-6 flex flex-col items-start justify-start">
        <div
          className={`flex justify-start items-start md:items-center mb-[2%] flex-col md:flex-row ${
            phases?.length > 1 ? "mt-2 md:mt-4" : "mt-[0%]"
          }`}
        >
          {phases?.length > 1 && (
            <>
              <p className="text-[14px] sm:text-[20px] lg:text-[24px] font-[500] mb-2 sm:mb-[44px] md:mb-0 text-[#333] sm:mr-[20px] ">
                Select one of the phase to see Floor Plans
              </p>
              <div className="flex justify-start items-start gap-[10px] flex-wrap ">
                {phases?.map((each: any) => (
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
                    }}
                    buttonClass={`mb-[5px] text-[14px] sm:text-[18px] lg:text-[20px] bg-[#ECF7FF] p-[8px] xl:px-[8px] capitalize whitespace-nowrap text-[#000] rounded-[8px] ${
                      selectedPhase == each.phaseId
                        ? "font-[600] border-solid border-[1px] border-[#0073C6]"
                        : "font-[400]"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {types && types.length > 0 && (
          <>
            <PropertyTabs types={types} />
            <ViewOptions
              onSelect={handleViewClick}
              selectedView={selectedView}
            />

            {selectedView === "bhk" &&
              selectedPropertyType === "apartment" &&
              propCgId !== projectprops.plot && (
                <BHKTabs
                  onSelect={handleBhkClick}
                  bhkNames={allBhkNames}
                  selectedBHK={selectedBHK}
                />
              )}

            {selectedView === "unit" && (
              <ByUnitFilters
                options={options}
                handleUnitFilterChange={handleUnitFilterChange}
              />
            )}
          </>
        )}

        <div className="mt-3 gap-6 flex justify-between w-full ">
          {/* FLOOR PLAN LEFT SECTION */}
          <FloorplanLeftsection
            units={filteredUnits}
            isLoading={isLoading}
            onSelectCard={onSelectCard}
            handleReqcallBack={handleReqcallBack}
          />
          <div className="hidden md:block w-[50%] ">
            <div 
              className="sticky top-4" 
              onClick={()=> rightSideUnit ? onSelectCard(rightSideUnit) : ("")}
            >
              <Image
                src={
                  isLoading
                    ? "data:image/webp;base64,...(fallback image)"
                    : rightSideUnit && rightSideUnit.floorPlanUrl
                    ? rightSideUnit.floorPlanUrl.split(",")[0]
                    : ImgNotAvail
                }
                alt="Default Floor Plan"
                width={800}
                height={600}
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
          modalState={modalState}
          onClose={() => onClosingPopup()}
          initialUnit={rightSideUnit}
          units={projectUnitsData || []}
          filters={unitFilters}
          setFilters={setUnitFilters}
          filteredUnits={filteredUnits}
          options={options || {}}
          handleOpenFullScreenModal={handleOpenFullScreenModal}
          handleReqcallBack={handleReqcallBack}
        />
      )}

      {fullScreenModalState.isOpen && fullScreenModalState.unit && (
        <FullScreenImageModal
          isOpen={fullScreenModalState.isOpen}
          onClose={() => setFullScreenModalState({ isOpen: false, unit: null })}
          unit={fullScreenModalState.unit}
          handleReqcallBack={handleReqcallBack}
        />
      )}
    </div>
  );
}
