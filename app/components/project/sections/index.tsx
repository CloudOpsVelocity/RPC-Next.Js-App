"use client";
import React from "react";
import HeaderActions from "./HeaderActions";
import MainSection from "./Main";
import { useAtomValue } from "jotai";
import { currentPhaseAtom } from "@/app/store/vewfloor";
import NoProperties from "../notfound";

type Props = {
  partialUnitData: any;
  projName: string;
  phaseList: any;
  data: any;
  type?: "overview" | "partial";
};

export default function PartialUnitData({
  partialUnitData,
  projName,
  phaseList,
  data,
  type,
}: Props) {
  const currentPhase = useAtomValue(currentPhaseAtom);
  const isPropTypesAvailable = Object.keys(partialUnitData[currentPhase] || {});
  return (
    <div
      className={`w-[95%] md:w-[90%] scroll-mt-[50px] md:mb-[2%] sm:mb-[5%]  ${
        partialUnitData.length > 0 && "min-h-[300px]"
      }`}
      id="floorPlans"
    >
      <HeaderActions
        partialUnitData={partialUnitData}
        projName={projName}
        phaseList={phaseList}
        type={type}
      />
      {isPropTypesAvailable.length > 0 ? (
        <MainSection
          partialUnitData={partialUnitData}
          data={{ ...data, type }}
        />
      ) : (
        <NoProperties phase="test" />
      )}
    </div>
  );
}
