"use client";
import React, { useEffect } from "react";
import SubHeading from "../headings/SubHeading";
import Button from "@/app/elements/button";
import { isSingleLetterOrNumber } from "@/app/utils/letters";
import { useAtom, useSetAtom } from "jotai";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import NoProperties from "../notfound";
import {
  PlotIcon,
  VillamentIcon,
  VillaIcon,
  RowHouseIcon,
  ApartmentIcon,
  ByTypeSvg,
  ByUnitSvg,
  ByBhkSvg,
  PopupOpenSvg,
} from "@/app/images/commonSvgs";
import {
  BACKEND_PROP_TYPES,
  parseDataProjectProps,
  projectprops,
  propertyDetailsTypes,
} from "@/app/data/projectDetails";
import { parital_unit_atom } from "@/app/store/partialsUnits";

type Props = {
  partialUnitData: any;
  projName: string;
  phaseList: any;
};
const iconStyles: string =
  " flex items-center justify-center w-[34px] sm:w-[40px] h-[34px] sm:h-[40px] bg-[#FAFDFF] rounded-[50%] ";
export default function HeaderActions({
  partialUnitData,
  projName,
  phaseList,
}: Props) {
  const getIcon = (id: number) => {
    let iconComponent;
    switch (id) {
      case projectprops.apartment:
        iconComponent = <ApartmentIcon className={iconStyles} />;
        break;
      case projectprops.rowHouse:
        iconComponent = <RowHouseIcon className={iconStyles} />;
        break;
      case projectprops.villa:
        iconComponent = <VillaIcon className={iconStyles} />;
        break;
      case projectprops.villament:
        iconComponent = <VillamentIcon className={iconStyles} />;
        break;
      case projectprops.plot:
        iconComponent = <PlotIcon className={iconStyles} />;
        break;
      default:
        break;
    }
    return iconComponent;
  };
  const [currentPhase, setCurrentPhase] = useAtom(currentPhaseAtom);
  const setSelected = useSetAtom(parital_unit_atom);
  const propTypes = Object?.keys(
    partialUnitData && partialUnitData[currentPhase]
      ? partialUnitData[currentPhase]
      : {}
  ).sort();
  console.log(propTypes);
  const [propCgId, setPropCgId] = useAtom(propCgIdAtom);
  useEffect(() => {
    // @ts-ignore
    propTypes?.length > 0 &&
      setPropCgId(
        parseDataProjectProps[
          propTypes[0] as keyof typeof parseDataProjectProps
        ]
      );
  }, [currentPhase, propTypes, setPropCgId]);

  return (
    <div>
      {" "}
      <h1
        className="text-h2 lg:text-[32px] mt-[3%] xl:mt-[100px] font-[600] text-[#001F35] mb-[12px] scroll-mt-[280px]"
        id="floorPlansdiv"
      >
        Floor Plans For{" "}
        <span className="text-[#148B16] font-[700] ">{projName}</span>{" "}
      </h1>
      <SubHeading text="See floor plans as per your selected property type" />
      <div
        className={`flex justify-start items-start md:items-center  mb-[8px] flex-col md:flex-row  ${
          phaseList?.length > 1 ? "mt-4" : "mt-[0%]"
        }`}
      >
        {phaseList?.length > 1 && (
          <>
            <p className="text-[14px] sm:text-[20px] lg:text-[24px] font-[500] mb-2 sm:mb-[32px] md:mb-0 text-[#333] sm:mr-[20px] ">
              Select one of the phase to see project details
            </p>
            <div className=" flex justify-start items-start gap-[10px] flex-wrap ">
              {phaseList?.map((each: any, index: any) => {
                return (
                  <Button
                    key={`phase_${each.phaseName}`}
                    title={
                      isSingleLetterOrNumber(each.phaseName)
                        ? `Phase: ${each.phaseName}`
                        : each.phaseName
                    }
                    onChange={() => {
                      if (currentPhase == each.phaseId) return;
                      setCurrentPhase(each.phaseId);
                      setSelected(0);
                    }}
                    buttonClass={` mb-[5px] text-[14px] sm:text-[18px] lg:text-[20px] bg-[#ECF7FF] p-[8px] xl:px-[8px]  whitespace-nowrap text-[#000] rounded-[8px]
                        ${
                          currentPhase == each.phaseId
                            ? " font-[600] border-solid border-[1px] border-[#0073C6] "
                            : " font-[400]"
                        } 
                    
                    `}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className=" flex justify-start items-start flex-wrap gap-[2%] ">
        {propTypes?.map((each: string, index: any) => {
          const keyName =
            parseDataProjectProps[each as keyof typeof parseDataProjectProps];
          let name =
            //@ts-ignore
            propertyDetailsTypes.get(keyName).name != undefined
              ? //@ts-ignore
                propertyDetailsTypes.get(keyName).name
              : null;
          return (
            <Button
              key={keyName}
              buttonClass={`flex justify-start mb-2 sm:mb-[3%] w-full rounded-[20px] gap-[8px]  items-center mr-[24px] md:ml-[0px] text-[12px] sm:text-[18px] border ${
                propCgId == keyName
                  ? "text-[#001F35] text-[14px] sm:text-base font-[600] shadow-md bg-[#c8f5ca] sm:bg-[#D5EDFF]"
                  : "text-[#303A42] font-[500] bg-[#E1FFE2] sm:bg-[#EEF7FE]"
              } `}
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
    </div>
  );
}

const propTypesIndexMap = new Map([
  ["apartment", 0],
  ["villa", 1],
  ["rowHouse", 2],
  ["villament", 3],
  ["plot", 4],
]);
