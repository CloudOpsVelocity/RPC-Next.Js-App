/* eslint-disable no-unused-vars */
"use client";
import React from "react";
// const HeaderActions = dynamic(() => import("./HeaderActions"));
import MainSection from "./Main";
import { useAtom, useAtomValue } from "jotai";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import NoProperties from "../notfound";
import HeaderActions from "./HeaderActions";
import { listingProps, parseDataProjectProps } from "@/app/data/projectDetails";

type Props = {
  partialUnitData: any;
  projName: string;
  phaseList: any;
  data: any;
  type?: "overview" | "partial";
  handlePricingFloorPlanClick?: (selectedBhk: any) => void;
};

export default function PartialUnitData({
  partialUnitData,
  projName,
  phaseList,
  data,
  type,
  handlePricingFloorPlanClick,
}: Props) {
  const Cphase = useAtomValue(currentPhaseAtom);
  const currentPhase = Cphase ? Cphase : phaseList[0].phaseId;
  const sortOrder = ["apartment", "rowhouse", "villa", "villament", "plot"];
  const isPropTypesAvailable =
    (partialUnitData &&
      partialUnitData[currentPhase] &&
      Object.keys(partialUnitData[currentPhase] || {})) ??
    0;
  const sortedPropTypes = Object.keys(partialUnitData?.[currentPhase] || {})
    .filter(
      (key) => Object.keys(partialUnitData[currentPhase][key] || {}).length > 0
    )
    .sort(
      (a, b) =>
        sortOrder.indexOf(a.toLocaleLowerCase().replace(" ", "")) -
        sortOrder.indexOf(b.toLocaleLowerCase().replace(" ", ""))
    );
  const whichPropToUse =
    type == "overview" ? parseDataProjectProps : listingProps;
  const whichKeyname = type === "overview" ? "apiProp" : "name";
  const categoryId = useAtomValue(propCgIdAtom);
  const propCgId = categoryId
    ? categoryId
    : whichPropToUse[sortedPropTypes[0] as keyof typeof whichPropToUse];
  return (
    <div
      className={`w-[95%] md:w-[90%] scroll-mt-[150px] md:mb-[2%] sm:mb-[5%]  ${
        partialUnitData?.length > 0 && "min-h-[300px]"
      }`}
      id={type === "overview" ? "price-details" : "floor-plans"}
    >
      <HeaderActions
        whichPropToUse={whichPropToUse}
        whichKeyname={whichKeyname}
        projName={projName}
        phaseList={phaseList}
        type={type}
        propCgId={propCgId}
        sortedPropTypes={sortedPropTypes}
      />
      {isPropTypesAvailable.length > 0 ? (
        <MainSection
          partialUnitData={{
            ...partialUnitData,
            handlePricingFloorPlanClick,
          }}
          phaseList={phaseList}
          data={{ ...data, type }}
          propCgId={propCgId}
        />
      ) : (
        <NoProperties
          phase={
            phaseList?.find((phase: any) => phase.phaseId == currentPhase)
              ?.phaseName as any
          }
        />
      )}
    </div>
  );
}
