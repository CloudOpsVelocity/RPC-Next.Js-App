"use client";
import {
  propertyDetailsTypes,
  projectprops,
  BACKEND_PROP_TYPES,
  floorplanTypes,
} from "../../data/projectDetails";
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
const FloorPlanModal = dynamic(() => import("./modals/FloorPlan"), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

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
import NoProperties from "./notfound";
import Nofloor from "./error/nofloor";
import clsx from "clsx";
import CarouselSuggestion from "./unitblock/carousel";
import dynamic from "next/dynamic";
import { Divider } from "@mantine/core";
import RTK_CONFIG from "@/app/config/rtk";
import SubHeading from "./headings/SubHeading";

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
  const byUnitForm = useForm();
  const handleUnitFormClear = () => {
    const keys = Object.keys(byUnitForm.values);
    const resetValues = keys.reduce((acc: any, key) => {
      acc[key] = null;
      return acc;
    }, {});
    byUnitForm.setValues(resetValues);
  };
  const selectedPhase = PhaseOverview?.find(
    (phase: any) => phase.phaseId === currentPhase
  );
  const { data: projectUnitsData, isLoading } = useQuery({
    queryKey: [`/${propCgId}/${currentPhase}/${slug}`],
    queryFn: () => getProjectUnits(slug, currentPhase, propCgId),

    enabled: !!propCgId,
    ...RTK_CONFIG,
  });
  const types =
    selectedPhase &&
    Object?.keys(selectedPhase.propTypeOverview)
      .map((v) => {
        if (selectedPhase?.propTypeOverview[v].unitTypes?.length > 0) {
          return v;
        } else {
          return null;
        }
      })
      .sort();
  const getPropertyType = (data: any) => {
    if (data.id === 32 && floorPlanType === "bhk") {
      setFloorPlanType("type");
    }
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
    // setSelectedFloor({
    //   ...projectUnitsData[0],
    //   floorPlanUrl: projectUnitsData[0].floorPlanUrl ?? ImgNotAvail,
    // });
    // form.setValues(setPropertyValues(projectUnitsData[0], propCgId));
    // handlers.set(setPropertyValues(projectUnitsData[0], propCgId));
    // handleSearch();
    // open("floor");
    setSelectedFloor({
      ...selectedFloor,
      floorPlanUrl: selectedFloor.floorPlanUrl ?? ImgNotAvail,
    });
    form.setValues(setPropertyValues(selectedFloor, propCgId));
    handleSearch();
    open("floor");
  };
  const handleUnitClick = () => {
    form.setValues(setPropertyValues(selectedFloor, propCgId));
    const filteredFloors = projectUnitsData.filter(
      (floor: any) => floor.unitNumber === selectedFloor.unitNumber
    );
    setFloorsArray(filteredFloors);
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
      type !== "overview" &&
      floorPlanType !== "unit"
    ) {
      setSelectedFloor(projectUnitsData[0]);
    }
  }, [projectUnitsData]);
  useEffect(() => {
    // @ts-ignore
    types?.length > 0 && setPropCgId(BACKEND_PROP_TYPES[`${types[0]}`]);
  }, [currentPhase]);

  if (isLoading) return <Loading />;
  return (
    <div className="w-[90%] scroll-mt-[180px] mb-[5%]" id="floorPlans">
      <h1
        className="text-[20px] lg:text-[32px] font-[600] text-[#001F35] mb-[12px] scroll-mt-[280px]"
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
                      if (currentPhase == each.phaseId) return;

                      setCurrentPhase(each.phaseId);
                      setBhk("0");
                      if (floorPlanType === "unit") {
                        setSelectedFloor({});
                        handleUnitFormClear();
                      }
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
      {projectUnitsData?.length == 0 ? (
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
                          ? "text-[#001F35] font-[600] shadow-md bg-[#D5EDFF]"
                          : "text-[#303A42] font-[500] bg-[#EEF7FE]"
                      } `}
                      onChange={() => {
                        if (propCgId !== keyName) {
                          getPropertyType(propertyDetailsTypes.get(keyName));
                          setBhk("0");
                          if (floorPlanType == "unit") {
                            setSelectedFloor({});
                            handleUnitFormClear();
                            return;
                          }
                        }
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
              onChange={() => {
                if (floorPlanType !== "type") {
                  setFloorPlanType("type");
                  handleUnitFormClear();
                  // if (!selectedFloor?.unitNumber) {
                  setSelectedFloor(projectUnitsData[0]);
                  // }
                }
              }}
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
              onChange={() => {
                if (floorPlanType !== "unit") {
                  setFloorPlanType("unit");
                  handleUnitFormClear();
                  if (floorPlanType !== "unit") {
                    setSelectedFloor({});
                  }
                }
              }}
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
                onChange={() => {
                  if (floorPlanType !== "bhk") {
                    setFloorPlanType("bhk");
                    handleUnitFormClear();
                    // if (!selectedFloor?.unitNumber) {
                    setSelectedFloor(projectUnitsData[0]);
                    setBhk("0");
                    // }
                  }
                }}
                buttonClass={`text-[20px] lg:text-[24px] mr-[40px] whitespace-nowrap flex justify-center items-center gap-[6px] ${
                  floorPlanType == "bhk"
                    ? "font-[600] text-[#001F35]"
                    : "font-[400] text-[#4D6677]"
                } `}
              />
            )}
          </div>

          <div
            className="   h-full md:h-[547px] w-full rounded-[14px] mt-[2%] border-solid border-[1px] border-[#92B2C8] bg-[#FFF] shadow-md flex flex-col-reverse md:flex-row justify-center  "
            onClick={handleContainerClick}
          >
            {floorPlanType === "type" && (
              <div className="w-full md:w-[50%] max-h-[456px] md:h-[540px]  md:max-h-[540px] border-solid overflow-auto ">
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
              <>
                <div className="w-full md:w-[50%]  h-[456px] !md:h-[547px] border-solid overflow-auto pt-6">
                  <Byunitblock
                    propCgId={propCgId}
                    data={projectUnitsData}
                    form={byUnitForm}
                  />
                </div>
                <Divider size={15} orientation="vertical" color="#F3F3F3" />
              </>
            )}

            {floorPlanType == "bhk" && propCgId != projectprops.plot && (
              <div className="w-full md:w-[50%] max-h-[456px] md:h-[540px]  md:max-h-[540px]  border-solid overflow-auto">
                <ByBhkBlock
                  propCgId={propCgId}
                  data={projectUnitsData}
                  setValues={form.setValues}
                  bhk={bhk}
                  setBhk={setBhk}
                />
              </div>
            )}

            <div
              className={clsx(
                "w-full md:w-[50%] flex justify-center items-end flex-col h-full p-[2%] shadow-inner md:shadow-none relative",
                !selectedFloor?.unitNumber && "items-center"
              )}
            >
              {selectedFloor?.unitNumber ? (
                floorPlanType !== "unit" ? (
                  <>
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
                        ` | ${
                          propCgId == projectprops.rowHouse ||
                          propCgId == projectprops.villa
                            ? "Elevation"
                            : "Floor"
                        } ` +
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
                        " | Area. " +
                          selectedFloor?.superBuildUparea +
                          " sq.ft"}
                      {propCgId == projectprops.plot &&
                        selectedFloor?.plotArea &&
                        " | Area. " + selectedFloor?.plotArea + " sq.ft"}
                    </p>
                    <div className="flex justify-center items-end h-[240px] lg:h-[450px] w-full">
                      {selectedFloor?.floorPlanUrl ? (
                        <img
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpen();
                          }}
                          src={
                            (selectedFloor?.floorPlanUrl +
                              "?v" +
                              Math.random()) as string
                          }
                          className="w-full h-full cursor-pointer  object-contain"
                          alt="image"
                        />
                      ) : (
                        <div className="flex justify-center items-center flex-col min-w-fit">
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
                    <div className="flex ">
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
                  </>
                ) : (
                  <>
                    <p
                      className="text-[14px] font-[500] text-[#005DA0] text-center m-auto"
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
                        ` | ${
                          propCgId == projectprops.rowHouse ||
                          propCgId == projectprops.villa
                            ? "Elevation"
                            : "Floor"
                        } ` +
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
                        " | Area. " +
                          selectedFloor?.superBuildUparea +
                          " sq.ft"}
                      {propCgId == projectprops.plot &&
                        selectedFloor?.plotArea &&
                        " | Area. " + selectedFloor?.plotArea + " sq.ft"}
                    </p>
                    <div className="flex justify-center items-center  h-[240px] lg:h-[450px] w-full relative max-w-fit m-auto min-w-[541px] max-h-[415px]">
                      <div
                        className="bg-[#F4FBFF] p-x-[3px] p-1 rounded-[29px] gap-[6px] flex justify-end items-center  cursor-pointer absolute bottom-1 right-1 "
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpen();
                        }}
                      >
                        <p className="text-[12px] lg:text-[14px] font-[600] text-[#0073C6] underline text-nowrap">
                          Click on image to open floor plan details
                        </p>
                      </div>
                      {selectedFloor?.floorPlanUrl ? (
                        <img
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUnitClick();
                          }}
                          src={
                            (selectedFloor?.floorPlanUrl +
                              "?v" +
                              Math.random()) as string
                          }
                          className="w-full h-[100%] cursor-pointer  object-contain"
                          alt="image"
                        />
                      ) : (
                        <div className="flex items-center flex-col min-w-fit">
                          <img
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnitClick();
                            }}
                            src="/abc/noimage.svg"
                            className="w-[60%]  cursor-pointer"
                            alt="image"
                          />
                          <p className=" text-[#000] text-center text-[18px] md:text-[28px] lg:text-[32px] font-[600] ">
                            Image is not available
                          </p>
                        </div>
                      )}
                    </div>
                    {floorPlanType == "unit" && (
                      <CarouselSuggestion
                        form={byUnitForm}
                        propCgId={propCgId}
                      />
                    )}
                  </>
                )
              ) : (
                <Nofloor />
              )}
            </div>
          </div>
          <FormProvider form={form}>
            <FloorPlanModal
              projName={projName}
              propCgId={propCgId}
              data={projectUnitsData}
              form={byUnitForm}
              floorPlanType={floorPlanType}
            />
          </FormProvider>
        </>
      )}
    </div>
  );
}
