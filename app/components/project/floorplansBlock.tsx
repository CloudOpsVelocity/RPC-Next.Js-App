"use client";
import { propertyDetailsTypes, projectprops } from "../../data/projectDetails";
import Button from "../../elements/button";
import React, { useEffect, useState } from "react";
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
import { useAtom, useSetAtom } from "jotai";
import { floorPlansArray, selectedFloorAtom } from "@/app/store/floor";
import Loading from "../atoms/Loader";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import { useFloorPlanPopup } from "@/app/hooks/useFloorPlanPopup";
import { FormProvider, useForm } from "@/app/context/floorplanContext";
import { setPropertyValues } from "@/app/utils/dyanamic/projects";
import { isSingleLetterOrNumber } from "@/app/utils/letters";
import { ImgNotAvail } from "@/app/data/project";

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
  const setFloorsArray = useSetAtom(floorPlansArray);
  const [selectedFloor, setSelectedFloor] = useAtom(selectedFloorAtom);
  const [, { open, type }] = useFloorPlanPopup();
  const form = useForm();
  const selectedPhase = PhaseOverview?.find(
    (phase: any) => phase.phaseId === currentPhase
  );
  const { data: projectUnitsData, isLoading } = useQuery({
    queryKey: [`/${propCgId}/${currentPhase}/${slug}`],
    queryFn: () => getProjectUnits(slug, currentPhase, propCgId),
    keepPreviousData: true,
    staleTime: 30000,
    cacheTime: 300000,
  });

  const types =
    selectedPhase &&
    Object?.keys(selectedPhase.propTypeOverview).map((v) => {
      if (selectedPhase?.propTypeOverview[v].unitTypes?.length > 0) {
        return v;
      } else {
        return null;
      }
    });
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

  const handleOpen = () => {
    setSelectedFloor({
      ...projectUnitsData[0],
      floorPlanUrl: projectUnitsData[0].floorPlanUrl ?? ImgNotAvail,
    });
    form.setValues(setPropertyValues(projectUnitsData[0], propCgId));

    handleSearch();
    open("floor");
  };
  const handleContainerClick = () => {
    if (floorPlanType === "type" || floorPlanType === "bhk") {
      setSelectedFloor(null);
      setFloorsArray(projectUnitsData);
      open("container");
    }
  };
  const handleSearch = (): void => {
    const filteredFloors = projectUnitsData.filter(
      (floor: any) => floor.unitNumber === projectUnitsData[0].unitNumber
    );
    setFloorsArray(filteredFloors);
  };
  const [bhk, setBhk] = useState("0");
  useEffect(() => {
    if (
      projectUnitsData &&
      projectUnitsData.length > 0 &&
      type !== "overview"
    ) {
      setSelectedFloor(projectUnitsData[0]);
    }
  }, [projectUnitsData]);
  console.log(projectUnitsData);
  if (isLoading) return <Loading />;
  return (
    <div className="w-[90%] scroll-mt-[180px] mb-[5%]" id="floorPlans">
      <h1 className="text-[20px] lg:text-[32px] font-[600] text-[#001F35] mb-[12px]">
        FLOOR PLANS for{" "}
        <span className="text-[#148B16] font-[700] uppercase">{projName}</span>{" "}
      </h1>
      <p className="text-[16px] text-[#4D6677] md:text-2xl italic font-medium leading-[normal] capitalize">
        see floor plans as per your selected property type
      </p>
      <div
        className={`flex justify-start items-start md:items-center  mb-[2%] flex-col md:flex-row  ${
          phaseList?.length > 1 ? "mt-4" : "mt-[0%]"
        }`}
      >
        {phaseList?.length > 1 && (
          <>
            <p className="text-[20px] lg:text-[24px] font-[500] mb-[3%] md:mb-0 text-[#333] mr-[20px] ">
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
                      setCurrentPhase(each.phaseId);
                      setBhk("0");
                    }}
                    buttonClass={` mb-[5px] text-[14px] sm:text-[18px] lg:text-[20px] bg-[#ECF7FF] p-[8px] xl:px-[8px]  whitespace-nowrap text-[#000] rounded-[8px]${
                      currentPhase == each.phaseId
                        ? " font-[600] border-solid border-[1px] border-[#0073C6] "
                        : " font-[400]"
                    } `}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
      {projectUnitsData.length == 0 ? (
        <NoProperties
          phase={
            phaseList?.find((phase: any) => phase.phaseId == currentPhase)
              ?.phaseName as any
          }
        />
      ) : (
        <>
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
                      buttonClass={`flex justify-start mb-[3%] w-full rounded-[20px] gap-[8px]  items-center mr-[24px] md:ml-[0px] text-[14px] sm:text-[18px] ${
                        propCgId == keyName
                          ? "text-[#001F35] font-[500] shadow-md bg-[#D5EDFF]"
                          : "text-[#303A42] font-[400] bg-[#EEF7FE]"
                      } `}
                      onChange={() => {
                        getPropertyType(propertyDetailsTypes.get(keyName));
                        setBhk("0");
                        // setSelectedFloor(projectUnitsData[0]);
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

          <div
            className="   h-full md:h-[547px] w-full rounded-[14px] mt-[2%] border-solid border-[1px] border-[#92B2C8] bg-[#FFF] shadow-md flex flex-col-reverse md:flex-row justify-center items-center "
            onClick={handleContainerClick}
          >
            {floorPlanType === "type" && (
              <div className="w-full md:w-[50%] max-h-[456px] md:h-[547px] border-solid overflow-auto ">
                {projectUnitsData?.length !== 0 ? (
                  projectUnitsData?.map((data: any, ind: number) => (
                    <FloorplanDetailsCard
                      key={ind}
                      propCgId={propCgId}
                      data={data}
                      projData={projectUnitsData}
                      setValues={form.setValues}
                    />
                  ))
                ) : (
                  <NoProperties
                    phase={
                      phaseList?.find(
                        (phase: any) => phase.phaseId == currentPhase
                      )?.phaseName as any
                    }
                  />
                )}
              </div>
            )}

            {floorPlanType == "unit" && (
              <div className="w-full md:w-[50%]  h-[456px] !md:h-[547px] border-solid overflow-auto ">
                <Byunitblock propCgId={propCgId} data={projectUnitsData} />
              </div>
            )}

            {floorPlanType == "bhk" && propCgId != projectprops.plot && (
              <div className="w-full md:w-[50%] max-h-[456px] md:h-[547px] border-solid overflow-auto">
                <ByBhkBlock
                  propCgId={propCgId}
                  data={projectUnitsData}
                  setValues={form.setValues}
                  bhk={bhk}
                  setBhk={setBhk}
                />
              </div>
            )}

            <div className="w-full md:w-[50%] flex justify-end items-end flex-col p-[2%] shadow-inner md:shadow-none ">
              <p
                className="text-[14px] font-[500] text-[#005DA0] "
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
              >
                {projName}
                {propCgId != projectprops.plot &&
                  selectedFloor?.bhkName &&
                  " | " + selectedFloor?.bhkName}
                {propCgId == projectprops.apartment &&
                  selectedFloor?.towerName &&
                  selectedFloor?.towerName != "NA" &&
                  " | Tower " + selectedFloor?.towerName}
                {propCgId != projectprops.plot &&
                  " | Floor " +
                    `${
                      selectedFloor?.floor?.toString() === "0"
                        ? "G"
                        : selectedFloor?.floor
                    }`}
                {selectedFloor?.unitNumber &&
                  " | Unit No. " + selectedFloor?.unitNumber}
                {" | Facing " + selectedFloor?.facingName}
                {propCgId != projectprops.plot &&
                  selectedFloor?.superBuildUparea &&
                  " | Area. " + selectedFloor?.superBuildUparea + " sq.ft"}
                {propCgId == projectprops.plot &&
                  selectedFloor?.plotArea &&
                  " | Area. " + selectedFloor?.plotArea + " sq.ft"}
              </p>
              <div className="flex justify-center items-center h-[240px] lg:h-[450px] w-full">
                {selectedFloor?.floorPlanUrl ? (
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpen();
                    }}
                    src={selectedFloor?.floorPlanUrl as string}
                    className="w-full h-full cursor-pointer  object-contain"
                    alt="image"
                  />
                ) : (
                  <div className="flex justify-center items-center flex-col ">
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                      }}
                      src="/abc/noimage.svg"
                      className="w-[80%] h-full cursor-pointer"
                      alt="image"
                    />
                    <p className=" text-[#000] text-center text-[18px] md:text-[28px] lg:text-[32px] font-[600] ">
                      Image is not available
                    </p>
                  </div>
                )}
              </div>
              <div
                className="bg-[#F4FBFF] p-[10px] rounded-[29px] gap-[12px] flex justify-end items-center  cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
              >
                <p className="text-[12px] lg:text-[14px] font-[600] text-[#0073C6] underline ">
                  Click on image to open floor plan details
                </p>
              </div>
            </div>
          </div>
          <FormProvider form={form}>
            <FloorPlanModal
              projName={projName}
              propCgId={propCgId}
              data={projectUnitsData}
            />
          </FormProvider>
        </>
      )}
    </div>
  );
}

const NoProperties = ({ phase }: { phase: string }) => {
  return (
    <div className="flex items-center gap-4 p-2.5 bg-[#E9FFE9]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="58"
        height="58"
        viewBox="0 0 58 58"
        fill="none"
      >
        <path
          d="M10.9318 45.0859C10.9318 46.0885 11.7418 46.8984 12.7443 46.8984H45.2561C46.2586 46.8984 47.0686 46.0885 47.0686 45.0859V31.8887C47.0686 21.9086 38.9803 13.8203 29.0002 13.8203C19.0201 13.8203 10.9318 21.9086 10.9318 31.8887V45.0859ZM15.01 31.8887C15.01 24.1629 21.2744 17.8984 29.0002 17.8984C36.726 17.8984 42.9904 24.1629 42.9904 31.8887V42.8203H22.883V33.1348C22.883 32.8232 22.6281 32.5684 22.3166 32.5684H19.8244C19.5129 32.5684 19.258 32.8232 19.258 33.1348V42.8203H15.01V31.8887ZM12.2855 17.5869L14.5285 15.3439C14.7041 15.1684 14.7041 14.8795 14.5285 14.7039L10.6826 10.858C10.5974 10.7737 10.4824 10.7264 10.3626 10.7264C10.2427 10.7264 10.1277 10.7737 10.0426 10.858L7.7996 13.101C7.71527 13.1861 7.66797 13.3011 7.66797 13.421C7.66797 13.5408 7.71527 13.6559 7.7996 13.741L11.6455 17.5869C11.8211 17.7625 12.1043 17.7625 12.2855 17.5869ZM50.2121 13.101L47.9691 10.858C47.884 10.7737 47.769 10.7264 47.6491 10.7264C47.5293 10.7264 47.4143 10.7737 47.3291 10.858L43.4832 14.7039C43.3989 14.7891 43.3516 14.9041 43.3516 15.0239C43.3516 15.1438 43.3989 15.2588 43.4832 15.3439L45.7262 17.5869C45.9018 17.7625 46.1906 17.7625 46.3662 17.5869L50.2121 13.741C50.3877 13.5598 50.3877 13.2766 50.2121 13.101ZM47.1252 50.5234H10.8752C9.87265 50.5234 9.06269 51.3334 9.06269 52.3359V53.6953C9.06269 53.9445 9.26659 54.1484 9.51581 54.1484H48.4846C48.7338 54.1484 48.9377 53.9445 48.9377 53.6953V52.3359C48.9377 51.3334 48.1277 50.5234 47.1252 50.5234ZM27.4143 10.1953H30.5861C30.8353 10.1953 31.0393 9.99141 31.0393 9.74219V4.30469C31.0393 4.05547 30.8353 3.85156 30.5861 3.85156H27.4143C27.165 3.85156 26.9611 4.05547 26.9611 4.30469V9.74219C26.9611 9.99141 27.165 10.1953 27.4143 10.1953Z"
          fill="#148B16"
        />
      </svg>
      <p className="text-[#242424] text-[26px] not-italic font-semibold leading-[normal]">
        Currently, no units are available in {phase}. Stay tuned! Thank you for
        your patience.
      </p>
    </div>
  );
};
