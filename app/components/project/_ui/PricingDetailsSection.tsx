"use client";

import getIcon from "@/app/(new_routes_seo)/residential/projects/utils/icons";
import {
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
  const [propCgId, setPropCgId] = useAtom(propCgIdAtom);

  const propTypes = Object.keys(
    unitData && unitData[currentPhase] ? unitData[currentPhase] : {}
  ).sort();

  const filteredData =
    unitData[currentPhase]?.[propertyDetailsTypes.get(propCgId)?.apiProp ?? ""];

  return (
    <section
      className="sm:p-6 bg-white rounded-lg shadow-lg w-[90%] mx-auto mt-2 sm:mt-[100px]"
      id="pricing"
    >
      <h2 className="text-h2 sm:text-[22px] xl:text-[32px] font-semibold text-gray-800 mb-4">
        Pricing Details of{" "}
        <span className="text-greenPrimary font-extrabold">{projName}</span>
      </h2>
      {phaseList?.length > 1 && (
        <>
          <p className="text-base font-medium mb-4 text-gray-600">
            Select one of the phases to see project details
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
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
                buttonClass={`text-xs sm:text-sm bg-teal-500 hover:bg-teal-600 p-2 rounded-lg transition-colors duration-200 ${
                  currentPhase === each.phaseId
                    ? "font-semibold border-2 border-teal-600 text-teal-600"
                    : "font-medium text-gray-800"
                }`}
              />
            ))}
          </div>
        </>
      )}
      <div className="flex flex-wrap sm:gap-3 mb-2 sm:mb-4">
        {propTypes?.map((each: string) => {
          const keyName =
            parseDataProjectProps[each as keyof typeof parseDataProjectProps];
          let name =
            //@ts-ignore
            propertyDetailsTypes.get(keyName)?.name ?? null;
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
        {filteredData &&
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
          ))}
      </div>
    </section>
  );
};

export default PricingSection;
