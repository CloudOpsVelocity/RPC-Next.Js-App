"use client";
import React from "react";
import SubHeading from "../headings/SubHeading";
import Button from "@/app/elements/button";
import { isSingleLetterOrNumber } from "@/app/utils/letters";
import { useAtom } from "jotai";
import { currentPhaseAtom } from "@/app/store/vewfloor";
import NoProperties from "../notfound";
import {
  BACKEND_PROP_TYPES,
  parseDataProjectProps,
  projectprops,
  propertyDetailsTypes,
} from "@/app/data/projectDetails";

type Props = {
  partialUnitData: any;
  projName: string;
  phaseList: any;
};

export default function HeaderActions({
  partialUnitData,
  projName,
  phaseList,
}: Props) {
  const [currentPhase, setCurrentPhase] = useAtom(currentPhaseAtom);
  const propTypes = Object.keys(partialUnitData[currentPhase]);

  return (
    <div>
      {" "}
      <h1
        className="text-h2 lg:text-[32px] font-[600] text-[#001F35] mb-[12px] scroll-mt-[280px]"
        id="floorPlansdiv"
      >
        Floor Plans For{" "}
        <span className="text-[#148B16] font-[700] ">{projName}</span>{" "}
      </h1>
      <SubHeading text="See floor plans as per your selected property type" />
      <div
        className={`flex justify-start items-start md:items-center  mb-[2%] flex-col md:flex-row  ${
          phaseList?.length > 1 ? "mt-4" : "mt-[0%]"
        }`}
      >
        {phaseList?.length > 1 && (
          <>
            <p className="text-[14px] sm:text-[20px] lg:text-[24px] font-[500] mb-2 sm:mb-[44px] md:mb-0 text-[#333] sm:mr-[20px] ">
              Select one of the phase to see project details
            </p>
            <div className=" flex justify-start items-start gap-[10px] flex-wrap ">
              {phaseList?.map((each: any, index: any) => {
                return (
                  <Button
                    key={index}
                    title={
                      isSingleLetterOrNumber(each.phaseName)
                        ? `Phase: ${each.phaseName}`
                        : each.phaseName
                    }
                    onChange={() => {
                      if (currentPhase == each.phaseId) return;
                      setCurrentPhase(each.phaseId);
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
            {propTypes?.length == 0 ? (
              <NoProperties
                phase={
                  phaseList?.find((phase: any) => phase.phaseId == currentPhase)
                    ?.phaseName as any
                }
              />
            ) : (
              <div className=" flex justify-start items-start flex-wrap mt-[3%] gap-[2%] ">
                {propTypes?.map((each: string, index: any) => {
                  let name =
                    //@ts-ignore
                    propertyDetailsTypes.get(parseDataProjectProps[each])
                      .name != undefined
                      ? //@ts-ignore
                        propertyDetailsTypes.get(parseDataProjectProps[each])
                          .name
                      : null;
                  return (
                    <Button
                      key={index}
                      //   buttonClass={`flex justify-start mb-2 sm:mb-[3%] w-full rounded-[20px] gap-[8px]  items-center mr-[24px] md:ml-[0px] text-[12px] sm:text-[18px] border ${
                      //     33 == (parseDataProjectProps[each] as number)
                      //       ? "text-[#001F35] text-[14px] sm:text-base font-[600] shadow-md bg-[#c8f5ca] sm:bg-[#D5EDFF]"
                      //       : "text-[#303A42] font-[500] bg-[#E1FFE2] sm:bg-[#EEF7FE]"
                      //   } `}
                      //   onChange={() => {
                      //     if (propCgId !== keyName) {
                      //       getPropertyType(propertyDetailsTypes.get(keyName));
                      //     }
                      //   }}
                      title={name}
                      //   icon={getIcon(keyName)}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
