"use client";
import { propertyDetailsTypes, projectprops } from "../../data/projectDetails";
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
} from "../../images/commonSvgs";
import FloorplanDetailsCard from "./floorplanDetailsCard";
import Byunitblock from "./byunitblock";
import ByBhkBlock from "./byBhkBlock";
import { PhaseList } from "@/app/validations/types/project";
import FloorPlanModal from "./modals/FloorPlan";
import { useQuery } from "react-query";
import { getProjectUnits } from "@/app/utils/api/project";
import usePhaseWiseOverview from "@/app/hooks/usePhaseWiseOverview";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { floorImageATom } from "@/app/store/image";
import { selectedFloorAtom } from "@/app/store/floor";
import Loading from "../atoms/Loader";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";

type Props = {
  data: PhaseList[];
  slug: string;
  projName: string;
};
export default function FloorplansBlock({ projName, slug }: Props) {
  const { phaseList, PhaseOverview } = usePhaseWiseOverview();

  const allKeys = [35, 33, 31, 34, 32];
  const [propCgId, setPropCgId] = useAtom(propCgIdAtom);
  const [currentPhase, setCurrentPhase] = useAtom(currentPhaseAtom);
  const [floorPlanType, setFloorPlanType] = useState("type");
  const setSelectedFloor = useSetAtom(selectedFloorAtom);
  const selectedPhase = PhaseOverview?.find(
    (phase: any) => phase.phaseId === currentPhase
  );
  const selectedFloor = useAtomValue(selectedFloorAtom);
  const { data: projectUnitsData, isLoading } = useQuery({
    queryKey: [`/${propCgId}/${currentPhase}/${slug}`],
    queryFn: () => getProjectUnits(slug, currentPhase, propCgId),
    keepPreviousData: true,
    staleTime: 30000,
    cacheTime: 300000,
  });

  if (isLoading) return <Loading />;
  const types = selectedPhase && Object?.keys(selectedPhase.propTypeOverview);
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

  const checkProperty = (key: any) => {
    if (
      key == projectprops.apartment &&
      types != undefined &&
      types.includes("apt")
    ) {
      return true;
    } else if (
      key == projectprops.rowHouse &&
      types != undefined &&
      types.includes("rowHouse")
    ) {
      return true;
    } else if (
      key == projectprops.villa &&
      types != undefined &&
      types.includes("villa")
    ) {
      return true;
    } else if (
      key == projectprops.villament &&
      types != undefined &&
      types.includes("vlmt")
    ) {
      return true;
    } else if (
      key == projectprops.plot &&
      types != undefined &&
      types.includes("plot")
    ) {
      return true;
    }
  };

  return (
    <div className="w-[90%] mb-[5%]" id="floorPlans">
      <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
        FLOOR PLANS for{" "}
        <span className="text-[#148B16] font-[700] uppercase">{projName}</span>{" "}
      </h1>
      <p className="text-[16px] text-[#4D6677] md:text-2xl italic font-medium leading-[normal] capitalize">
        see floor plans as per your selected property type
      </p>
      <div className=" flex justify-start items-start md:items-center mt-[2%] mb-[2%] flex-col md:flex-row ">
        <p className="text-[20px] lg:text-[24px] font-[500] mb-[3%] md:mb-0 text-[#333] mr-[20px] ">
          Select one of the phase to see project details
        </p>
        <div className=" flex justify-start items-start gap-[10px] flex-wrap ">
          {phaseList?.map((each: any, index: any) => {
            return (
              <Button
                key={index}
                title={`${each.phaseName}`}
                onChange={() => setCurrentPhase(each.phaseId)}
                buttonClass={` mb-[5px] text-[18px] lg:text-[20px] bg-[#ECF7FF] p-[8px] xl:p-[16px]  whitespace-nowrap text-[#000] rounded-[8px]${
                  currentPhase == each.phaseId
                    ? " font-[600] border-solid border-[1px] border-[#0073C6] "
                    : " font-[400]"
                } `}
              />
            );
          })}
        </div>
      </div>
      <div className=" flex justify-start items-start flex-wrap mt-[3%] gap-[2%] ">
        {propertyDetailsTypes != undefined &&
          propertyDetailsTypes != null &&
          allKeys.map((keyName) => {
            let name =
              //@ts-ignore
              propertyDetailsTypes.get(keyName).name != undefined
                ? //@ts-ignore
                  propertyDetailsTypes.get(keyName).name
                : null;
            if (checkProperty(keyName)) {
              return (
                <Button
                  key={keyName}
                  buttonClass={`flex justify-start mb-[3%] w-full rounded-[20px] gap-[8px] pr-[8px] items-center mr-[24px] md:ml-[24px] text-[18px] ${
                    propCgId == keyName
                      ? "text-[#001F35] font-[500] shadow-md bg-[#D5EDFF]"
                      : "text-[#303A42] font-[400] bg-[#EEF7FE]"
                  } `}
                  onChange={() => {
                    getPropertyType(propertyDetailsTypes.get(keyName));
                    setSelectedFloor(projectUnitsData[0]);
                  }}
                  title={name}
                  icon={getIcon(keyName)}
                />
              );
            }
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

      <div className="  h-full md:h-[456px] lg:h-[570px] w-full rounded-[14px] mt-[2%] border-solid border-[1px] border-[#92B2C8] bg-[#FFF] shadow-md flex flex-col md:flex-row justify-center items-center ">
        {floorPlanType === "type" && (
          <div className="w-full md:w-[50%] h-[456px] lg:h-[570px] border-solid overflow-auto ">
            {projectUnitsData?.length !== 0 ? (
              projectUnitsData?.map((data: any, ind: number) => (
                <FloorplanDetailsCard
                  key={ind}
                  propCgId={propCgId}
                  data={data}
                />
              ))
            ) : (
              <NoProperties />
            )}
          </div>
        )}

        {floorPlanType == "unit" && (
          <div className="w-full md:w-[50%]  h-[456px] lg:h-[570px] border-solid overflow-auto ">
            <Byunitblock propCgId={propCgId} data={projectUnitsData} />
          </div>
        )}

        {floorPlanType == "bhk" && propCgId != projectprops.plot && (
          <div className="w-full md:w-[50%]  h-[456px] lg:h-[570px] border-solid overflow-auto ">
            <ByBhkBlock propCgId={propCgId} data={projectUnitsData} />
          </div>
        )}

        <div className="w-full md:w-[50%] flex justify-end items-end flex-col p-[2%] shadow-inner md:shadow-none ">
          <p className=" text-[14px] lg:text-[16px] font-[500] text-[#005DA0] ">
            {projName}/2bhk/tower 1/ 04/north/1124 sq.ft
          </p>

          <FloorPlanModal propCgId={propCgId} data={projectUnitsData} />
        </div>
      </div>
    </div>
  );
}

const NoProperties = () => {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 h-full flex justify-center items-center">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-2xl tracking-tight font-extrabold lg:text-3xl text-primary-600 ">
          It seems we couldnt locate what you&rsquo;re looking for. Try
          enhancing your search and attempting again.
        </h1>
        <p className="mb-4 text-lg text-gray-500 dark:text-gray-400">
          Meanwhile, here are some of our other properties
        </p>
      </div>
    </div>
  );
};
