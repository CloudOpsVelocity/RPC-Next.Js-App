import { getProjectUnits } from "@/app/utils/api/project";
import { FaArrowRight } from "react-icons/fa";
import RTK_CONFIG from "@/app/config/rtk";
import React from "react";
import { useQuery } from "react-query";
import { currentPhaseAtom } from "@/app/store/vewfloor";
import { propCgIdAtom } from "@/app/store/vewfloor";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai";
import { useParams } from "next/navigation";
import { FaBath, FaBed, FaBuilding, FaCompass } from "react-icons/fa";
import { BiBuildingHouse } from "react-icons/bi";
import { MdBalcony } from "react-icons/md";

type Props = {
  setModalState: (state: any) => void;
};

export default function FloorplanLeftsection({ setModalState }: Props) {
  const [selectedPhase, setSelectedPhase] = useAtom(currentPhaseAtom);
  const propCgId = useAtomValue(propCgIdAtom);
  const slug = useParams<{ slug: string }>().slug.split("-").at(-1) ?? "";
  const { data: projectUnitsData, isLoading } = useQuery({
    queryKey: [`/${propCgId}/${selectedPhase}/${slug}`],
    queryFn: () => getProjectUnits(slug, selectedPhase, propCgId),
    enabled: !!propCgId,
    ...RTK_CONFIG,
  });
  console.log(projectUnitsData);
  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        projectUnitsData &&
        projectUnitsData.map((unit: any) => (
          <button
            onClick={() => setModalState({ isOpen: true, unit })}
            className="w-full  rounded-xl border-2 border-gray-200 p-4 transition-all hover:border-[#0073C6] hover:shadow-xl group from-[#F8FAFC] to-white"
            key={unit.unitId}
          >
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="flex-1 w-full sm:w-auto">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-2xl sm:text-2xl font-bold text-[#232323]">
                    {unit.bhkName}
                  </h3>
                  <span className="px-3 py-1 text-sm font-semibold bg-blue-50 text-[#0073C6] rounded-full">
                    {unit.aptTypeName}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-gray-600 text-base sm:text-lg">
                  {unit.towerName && (
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <FaBuilding className="text-[#0073C6] mr-2" />
                      <p className="font-semibold">{unit.towerName}</p>
                    </div>
                  )}
                  {unit.floor && (
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <BiBuildingHouse className="text-[#0073C6] mr-2" />
                      <p className="font-semibold">Floor {unit.floor}</p>
                    </div>
                  )}
                  {unit.unitNumber && (
                    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <FaBed className="text-[#0073C6] mr-2" />
                      <p className="font-semibold">Unit {unit.unitNumber}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap justify-between w-full sm:w-auto gap-4 mt-4 sm:mt-0">
                {unit.superBuildUparea && (
                  <div className="space-y-1">
                    <p className="text-gray-500 text-sm font-medium">
                      Super Built-up Area
                    </p>
                    <p className="text-gray-900 text-xl font-bold">
                      {unit.superBuildUparea} sq.ft
                    </p>
                  </div>
                )}
                {unit.facingName && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <FaCompass className="text-[#0073C6] text-lg" />
                      <p className="text-gray-500 text-sm font-medium">
                        Facing
                      </p>
                    </div>
                    <p className="text-gray-900 text-xl font-bold">
                      {unit.facingName}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4 ">
              {unit.bhkName && (
                <div className="flex items-center gap-2">
                  <FaBed className="text-[#0073C6] text-2xl" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Bedrooms
                    </p>
                    <p className="text-lg font-bold">
                      {unit.bhkName.split(" ")[0]}
                    </p>
                  </div>
                </div>
              )}
              {unit.totalNumberofBathroom && (
                <div className="flex items-center gap-2">
                  <FaBath className="text-[#0073C6] text-2xl" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Bathrooms
                    </p>
                    <p className="text-lg font-bold">
                      {unit.totalNumberofBathroom}
                    </p>
                  </div>
                </div>
              )}
              {unit.totalNumberOfBalcony && (
                <div className="flex items-center gap-2">
                  <MdBalcony className="text-[#0073C6] text-2xl" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Balconies
                    </p>
                    <p className="text-lg font-bold">
                      {unit.totalNumberOfBalcony}
                    </p>
                  </div>
                </div>
              )}
              {unit.terraceArea && unit.terraceArea !== "null" && (
                <div className="flex items-center gap-2">
                  <BiBuildingHouse className="text-[#0073C6] text-2xl" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Terrace Area
                    </p>
                    <p className="text-lg font-bold">
                      {unit.terraceArea} sq.ft
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* View Details Button */}
            <div className="mt-4 text-right">
              <span className="inline-flex items-center text-[#0073C6] font-semibold group-hover:underline">
                View Details
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </button>
        ))
      )}
    </div>
  );
}
