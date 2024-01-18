"use client";
import {
  propertyDetailsTypes,
  projectprops,
  floorplanTypes,
} from "../../data/projectDetails";
import Button from "../../elements/button";
import React, { useState } from "react";
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
} from "../../images/commonSvgs";
import FloorplanDetailsCard from "./floorplanDetailsCard";
import Byunitblock from "./byunitblock";
import ByBhkBlock from "./byBhkBlock";
import { PhaseList } from "@/app/validations/types/project";
import FloorPlanModal from "./modals/FloorPlan";

const dummyProptypesList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default function FloorplansBlock({ data }: { data: PhaseList[] }) {
  const [allKeys, setAllKeys] = useState([35, 33, 31, 34, 32]);
  const [propCgId, setPropCgId] = useState();
  const [floorPlanType, setFloorPlanType] = useState("type");
  const [currentPhase, setCurrentPhase] = useState("");

  const getPropertyType = (data: any) => {
    setPropCgId(data.id);
  };

  const iconStyles: string =
    " flex items-center justify-center w-[40px] h-[40px] bg-[#FAFDFF] rounded-[50%] ";

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

  return (
    <div className="w-[90%] mb-[5%]" id="floorPlans">
      <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
        FLOOR PLANS for sarang by sumadhura{" "}
        <span className="text-[#148B16] font-[700] uppercase">
          sarang by sumadhura
        </span>{" "}
      </h1>
      <p className="text-[16px] lg:text-[24px] font-[500] text-[#4D6677]">
        see floor plans as per your selected property type
      </p>
      <div className=" flex justify-start items-start md:items-center mt-[2%] mb-[2%] flex-col md:flex-row ">
        <p className="text-[20px] lg:text-[24px] font-[500] mb-[3%] md:mb-0 text-[#333] mr-[20px] ">
          Select one of the phase to see project details
        </p>
        <div className=" flex justify-start items-start gap-[10px] flex-wrap ">
          {data?.map((each, index) => {
            return (
              <Button
                key={index}
                title={`Phase ${each.phaseName}`}
                onChange={() => setCurrentPhase(`${each.phaseId}`)}
                buttonClass={` mb-[5px] text-[18px] lg:text-[20px] bg-[#ECF7FF] p-[8px] xl:p-[16px]  whitespace-nowrap text-[#000] rounded-[8px]${
                  currentPhase == `${each.phaseId}`
                    ? " font-[600] border-solid border-[1px] border-[#0073C6] "
                    : " font-[400]"
                } `}
              />
            );
          })}
        </div>
      </div>
      <div className=" flex justify-start items-start flex-wrap mt-[3%] ">
        {propertyDetailsTypes != undefined &&
          propertyDetailsTypes != null &&
          allKeys.map((keyName) => {
            let name =
              //@ts-ignore
              propertyDetailsTypes.get(keyName).name != undefined
                ? //@ts-ignore
                  propertyDetailsTypes.get(keyName).name
                : null;

            return (
              <Button
                key={keyName}
                buttonClass={`flex justify-start mb-[3%] rounded-[20px] gap-[8px] pr-[8px] items-center mr-[24px] md:ml-[24px] text-[18px] ${
                  propCgId == `${keyName}`
                    ? "text-[#001F35] font-[500] shadow-md bg-[#D5EDFF]"
                    : "text-[#303A42] font-[400] bg-[#EEF7FE]"
                } `}
                onChange={() =>
                  getPropertyType(propertyDetailsTypes.get(keyName))
                }
                title={name}
                icon={getIcon(keyName)}
              />
            );
          })}
      </div>

      <div className=" flex justify-start items-start mt-[3%] flex-wrap mb-[3%] md:mb-0 ">
        <Button
          title="By Type"
          icon={
            <ByTypeSvg className=" w-[24px] h-[24px] lg:w-[30px] lg:h-[30px] " />
          }
          onChange={() => setFloorPlanType("type")}
          buttonClass={`text-[20px] lg:text-[24px] mr-[40px] whitespace-nowrap flex justify-center items-center gap-[6px] ${
            floorPlanType == "type"
              ? "font-[600] text-[#001F35]"
              : "font-[400] text-[#4D6677]"
          } `}
        />

        <Button
          title="By Unit"
          icon={
            <ByUnitSvg className=" w-[24px] h-[24px] lg:w-[30px] lg:h-[30px] " />
          }
          onChange={() => setFloorPlanType("unit")}
          buttonClass={`text-[20px] lg:text-[24px] mr-[40px] whitespace-nowrap flex justify-center items-center gap-[6px] ${
            floorPlanType == "unit"
              ? "font-[600] text-[#001F35]"
              : "font-[400] text-[#4D6677]"
          } `}
        />
        {propCgId != projectprops.plot && (
          <Button
            title="By BHK"
            icon={
              <ByBhkSvg className=" w-[24px] h-[24px] lg:w-[30px] lg:h-[30px] " />
            }
            onChange={() => setFloorPlanType("bhk")}
            buttonClass={`text-[20px] lg:text-[24px] mr-[40px] whitespace-nowrap flex justify-center items-center gap-[6px] ${
              floorPlanType == "bhk"
                ? "font-[600] text-[#001F35]"
                : "font-[400] text-[#4D6677]"
            } `}
          />
        )}
      </div>

      <div className=" h-[456px] lg:h-[570px] w-full rounded-[14px] mt-[2%] border-solid border-[1px] border-[#92B2C8] bg-[#FFF] shadow-md flex justify-center items-center ">
        {floorPlanType == "type" && (
          <div className="w-[50%] h-[456px] lg:h-[570px] border-solid overflow-auto ">
            {dummyProptypesList.map((eachItem, ind) => {
              return <FloorplanDetailsCard key={ind} propCgId={propCgId} />;
            })}
          </div>
        )}

        {floorPlanType == "unit" && (
          <div className="w-[50%]  h-[456px] lg:h-[570px] border-solid overflow-auto ">
            <Byunitblock propCgId={propCgId} />
          </div>
        )}

        {floorPlanType == "bhk" && propCgId != projectprops.plot && (
          <div className="w-[50%]  h-[456px] lg:h-[570px] border-solid overflow-auto ">
            <ByBhkBlock propCgId={propCgId} />
          </div>
        )}

        <div className="w-[50%] flex justify-end items-end flex-col p-[2%] ">
          <p className=" text-[14px] lg:text-[16px] font-[500] text-[#005DA0] ">
            Sarang by sumadhura/2bhk/tower 1/ 04/north/1124 sq.ft
          </p>
          <div className="flex justify-center items-center h-[300px] lg:h-[450px]">
            {/* dISPLAY FLOOR PLAN HERE */}
          </div>
          <FloorPlanModal propCgId={propCgId} />
        </div>
      </div>
    </div>
  );
}
