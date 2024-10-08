"use client";

import getIcon from "@/app/(new_routes_seo)/residential/projects/utils/icons";
import {
  listingProps,
  parseDataProjectProps,
  propertyDetailsTypes,
} from "@/app/data/projectDetails";
import Button from "@/app/elements/button";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import { isSingleLetterOrNumber } from "@/app/utils/letters";
import { useAtom } from "jotai";
import React from "react";

const PricingSection = ({ unitData, projName, phaseList }: any) => {
  const [currentPhase, setCurrentPhase] = useAtom(currentPhaseAtom);
  const [propCgId, setPropCgId] = useAtom(propCgIdAtom ?? 35);
  const sorted = ["Apartment", "Row House", "Villa", "Villament", "Plot"];
  const propTypes = Object.keys(
    unitData && unitData[currentPhase] ? unitData[currentPhase] : {}
  ).sort((a, b) => sorted.indexOf(a) - sorted.indexOf(b));
  console.log(propTypes);
  const filteredData =
    unitData[currentPhase]?.[propertyDetailsTypes.get(propCgId)?.name ?? ""];
  return (
    <section
      className="sm:p-6 bg-white rounded-lg shadow-lg w-[90%] mx-auto mt-2 sm:mt-[100px]"
      id="price-details"
    >
      <h2 className="text-h2 sm:text-[22px] xl:text-[32px] font-semibold text-gray-800 mb-4">
        Pricing Details of{" "}
        <span className="text-greenPrimary font-extrabold">{projName}</span>
      </h2>
      {phaseList?.length > 1 && (
        <>
          <p className="text-base font-semibold mb-4 text-gray-700">
            Select a phase to view project details
          </p>
          <div className="flex flex-wrap gap-4 mb-4">
            {phaseList?.map((each: any) => (
              <Button
                key={`phase_${each.phaseName}`}
                title={
                  isSingleLetterOrNumber(each.phaseName)
                    ? `Phase: ${each.phaseName}`
                    : each.phaseName
                }
                onChange={() => {
                  if (currentPhase === each.phaseId) return;
                  setCurrentPhase(each.phaseId);
                }}
                buttonClass={`text-sm sm:text-base bg-[#0073C6] hover:bg-blue-600 p-3 rounded-xl transition-colors duration-200 ${
                  currentPhase === each.phaseId
                    ? "font-bold border-2 border-blue-600 text-white shadow-md"
                    : "font-medium text-white shadow"
                }`}
              />
            ))}
          </div>
        </>
      )}
      <div className="flex flex-wrap sm:gap-3 mb-2 sm:mb-4">
        {propTypes?.map((each: string) => {
          const keyName = listingProps[each as keyof typeof listingProps];
          let name =
            //@ts-ignore
            each;
          return (
            <Button
              key={keyName}
              buttonClass={`flex items-center gap-2 mb-2 rounded-full sm:py-1 px-2 sm:px-4 text-xs sm:text-sm border font-semibold ${
                propCgId === keyName
                  ? "text-blue-700 bg-blue-100 border-blue-700 font-semibold"
                  : "text-gray-700 bg-gray-200 border-gray-300"
              }`}
              onChange={() => {
                if (propCgId !== keyName) {
                  setPropCgId(keyName);
                }
              }}
              title={name}
              icon={getIcon(keyName)}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 max-h-[400px] sm:max-h-[550px] overflow-y-auto">
        {filteredData ? (
          Object.entries(filteredData).map(([bhkType, bhkData]: any) => (
            <div
              key={`${projName}-${bhkType}`}
              className="p-4 rounded-lg shadow-md bg-gradient-to-br from-blue-50 to-white border border-blue-200 flex flex-col gap-3"
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {bhkType}
              </h3>
              <div className="text-sm sm:text-base text-gray-700 font-semibold">
                <span className="font-medium text-gray-800">Price Range:</span>{" "}
                ₹{parseInt(bhkData.minPrice).toLocaleString()} - ₹
                {parseInt(bhkData.maxPrice).toLocaleString()}
              </div>
              <div className="text-sm sm:text-base text-gray-700 font-semibold">
                <span className="font-medium text-gray-800">SBA Range:</span>{" "}
                {bhkData.minSba} - {bhkData.maxSba} sq ft
              </div>
              <div className="text-sm sm:text-base text-gray-700 font-semibold">
                <span className="font-medium text-gray-800">CA Range:</span>{" "}
                {bhkData.minCa} - {bhkData.maxCa} sq ft
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-700 font-semibold bg-gray-100 p-4 rounded-lg shadow-md">
            <p>No units available. Coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;
