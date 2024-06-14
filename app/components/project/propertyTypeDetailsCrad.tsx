import React from "react";
import { FlooringIcon, FloorsIcon, TowerIcon } from "../../images/commonSvgs";
import { projectprops, propertyDetailsTypes } from "../../data/projectDetails";
import {
  apartmentCardImg,
  plotCardImg,
  rowhouseCardImg,
  villaCardImg,
  villamentCardImg,
} from "@/app/images/commonImages";
import Image from "next/image";
import { useAtom, useSetAtom } from "jotai";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import { formatCurrency } from "@/app/utils/numbers";
import { useFloorPlanPopup } from "@/app/hooks/useFloorPlanPopup";
import { floorPlansArray, selectedFloorAtom } from "@/app/store/floor";
import { parseUnits } from "@/app/utils/unitparser";
import { QueryCache, useQuery } from "react-query";
import { queryClient } from "@/app/utils/query";
import {
  getCachedProjectUnits,
  getProjectUnits,
} from "@/app/utils/api/project";
import { useParams } from "next/navigation";
import clsx from "clsx";
import ShowUnitsButton from "./button/showUnits";
import { countPlots } from "@/app/utils/count/plot";
import { pluralizeOrSingularize } from "@/app/utils/plural";
import RTK_CONFIG from "@/app/config/rtk";

type Props = {
  cg: any;
  propertyType: string;
  phase: number;
};
const getPropId = (key: string) => {
  switch (key) {
    case "apt":
      return projectprops.apartment;
      break;
    case "plot":
      return projectprops.plot;
      break;
    case "rowHouse":
      return projectprops.rowHouse;
      break;
    case "villa":
      return projectprops.villa;
      break;
    case "vlmt":
      return projectprops.villament;
      break;
    default:
      return 35;
  }
};
export default function PropertyTypeDetailsCrad({
  cg,
  propertyType,
  phase,
}: Props) {
  const { slug } = useParams<{ slug: string }>();
  const [, { open }] = useFloorPlanPopup();
  const setcurrentPhase = useSetAtom(currentPhaseAtom);
  const setPrpCgId = useSetAtom(propCgIdAtom);
  const setSelectedFloor = useSetAtom(selectedFloorAtom);
  const [, setFloorsArray] = useAtom(floorPlansArray);
  const { data: projectUnitsData } = useQuery({
    queryKey: [`/${getPropId(propertyType)}/${phase}/${slug}`],
    queryFn: () => getProjectUnits(slug, phase, getPropId(propertyType)),
    ...RTK_CONFIG,
  });
  const handleOpen = () => {
    open("overview");
  };
  const updateValues = (newCurrentPhase: number, newPropCgId: number) => {
    setcurrentPhase(newCurrentPhase);
    setPrpCgId(newPropCgId);
    setFloorsArray(projectUnitsData);
    setSelectedFloor(null);
    handleOpen();
  };

  const propName = (key: string, type?: string) => {
    switch (key) {
      case "apt":
        if (type == "name") {
          return "Apartment";
        } else {
          return apartmentCardImg;
        }
        break;
      case "plot":
        if (type == "name") {
          return "Plot";
        } else {
          return plotCardImg;
        }
        break;
      case "rowHouse":
        if (type == "name") {
          return "Rowhouse";
        } else {
          return rowhouseCardImg;
        }
        break;
      case "villa":
        if (type == "name") {
          return "Villa";
        } else {
          return villaCardImg;
        }
        break;
      case "vlmt":
        if (type == "name") {
          return "Villament";
        } else {
          return villamentCardImg;
        }
        break;
    }
  };
  const plotCounts =
    propertyType === "plot" && projectUnitsData && countPlots(projectUnitsData);
  return (
    <div
      className="flex  justify-between items-start min-h-[225px] w-[100%] max-w-[359px] lg:max-w-[510px] rounded-[24px] shadow-md pr-[1%] pl-[1%] mt-[70px] bg-gradient-to-l from-[#EFF5FF] /50 to-[#F2FAFF]/50 mb-[2%] cursor-pointer"
      onClick={() => updateValues(phase, getPropId(propertyType as string))}
    >
      <div className="leftSection max-w-[46%] flex flex-col justify-between min-h-[225px]">
        <div className="max-w-[90px] lg:max-w-[115px] w-full h-[90px] lg:h-[115px] border-solid border-1 border-[#FFF] rounded-full bg-[#c9daee] relative bottom-[50px] lg:bottom-[60px] mb-[-40px]">
          <Image
            width={90}
            height={90}
            src={propName(propertyType, "img") as string}
            alt="Preview"
            className="w-full h-full object-cover rounded-[14px]"
          />
        </div>
        <div className="down mb-3">
          <div className="flex   mt-[36px] gap-x-[16px] flex-wrap  ">
            {propertyType == "apt" || propertyType == "vlmt" ? (
              <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
                <TowerIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
                <span className="mr-[6px] ml-[6px]"> {cg?.elevation} </span>{" "}
                Tower{cg?.elevation > 1 ? "s" : ""}
              </p>
            ) : (
              ""
            )}
            <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
              <FlooringIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
              <span className="mr-[6px] ml-[6px]">{cg?.unitCount} </span> Units
            </p>
            {propertyType === "rowHouse" || propertyType === "villa" ? (
              <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
                <FloorsIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
                <span className="mr-[6px] ml-[6px]">
                  {"G+" + cg?.elevation}
                </span>{" "}
                Elevation
              </p>
            ) : (
              ""
            )}
          </div>

          <button className="text-[16px] lg:text-[18px] inline-flex max-w-fit justify-center items-center gap-2.5 px-2 py-1 mb-[2%] cursor-pointer  rounded border-[0.8px] border-solid border-[#0073C6] bg-[#fff] text-[#0073C6] text-lg not-italic font-semibold leading-[normal]">
            View Floor Plans
          </button>
        </div>
      </div>
      <div className="rightSection pt-3 flex flex-col">
        <p className="text-[#00487C]   md:text-xl not-italic font-semibold leading-[normal] ml-[10px] text-right">
          {propName(propertyType, "name")}
        </p>
        <p className="text-[16px] text-right lg:text-[22px] text-[#148B16]  not-italic font-bold leading-[normal] mt-2">
          {formatCurrency(cg?.minPrice)} - {formatCurrency(cg?.maxPrice)}
        </p>
        <p className="text-[14px] lg:text-lg text-[#242424]  italic font-medium leading-[normal]">
          ₹ {cg?.basePrice} Base Price/ sq.ft
        </p>
        <p className="text-[14px] lg:text-[18px]  mb-[3%] text-right text-[#4D6677] text-lg not-italic font-semibold leading-[normal] capitalize mt-3 ">
          Units available : <br />{" "}
          {propertyType !== "plot" ? (
            <span
              className={clsx(
                "text-[#242424] text-right text-lg not-italic font-semibold leading-[22px] max-w-[135px] inline-block min-h-[44px] w-[80%]",
                propertyType === "plot" && "!max-w-full"
              )}
            >
              {parseUnits(cg?.unitTypes, propertyType).map(
                (unitType, index, array) => (
                  <React.Fragment key={index}>
                    {unitType}
                    {index < array.length - 1 && ", "}
                    {index === 1 && <br />}
                  </React.Fragment>
                )
              )}
            </span>
          ) : (
            <>
              <p className="text-[#242424] text-right text-base not-italic font-semibold leading-[normal]">
                {plotCounts?.standardPlotCount > 0 &&
                  `Standard Plot : ${
                    plotCounts?.standardPlotCount
                  } ${pluralizeOrSingularize(
                    plotCounts?.standardPlotCount,
                    "Units"
                  )} `}
              </p>
              <p className="text-[#242424] text-right text-base not-italic font-semibold leading-[normal] min-h-[19px]">
                {plotCounts?.oddPlotCount > 0 &&
                  `Odd Plot : ${
                    plotCounts?.oddPlotCount
                  } ${pluralizeOrSingularize(
                    plotCounts?.oddPlotCount,
                    "Units"
                  )}`}
              </p>
            </>
          )}
        </p>
        {(cg?.unitTypes.length > 4 || propertyType === "plot") && (
          <ShowUnitsButton cg={{ ...cg, propertyType, plotData: plotCounts }} />
        )}
      </div>
    </div>
  );
}

// export function PropertyTypeDetailsCradTest({
//   cg,
//   propertyType,
//   phase,
// }: Props) {
//   const { slug } = useParams<{ slug: string }>();
//   const [, { open }] = useFloorPlanPopup();
//   const setcurrentPhase = useSetAtom(currentPhaseAtom);
//   const setPrpCgId = useSetAtom(propCgIdAtom);
//   const setSelectedFloor = useSetAtom(selectedFloorAtom);
//   const [, setFloorsArray] = useAtom(floorPlansArray);
//   const { data: projectUnitsData } = useQuery({
//     queryKey: [`/${getPropId(propertyType)}/${phase}/${slug}`],
//     queryFn: () => getProjectUnits(slug, phase, getPropId(propertyType)),
//   });
//   const handleOpen = () => {
//     open("overview");
//   };
//   const updateValues = (newCurrentPhase: number, newPropCgId: number) => {
//     setcurrentPhase(newCurrentPhase);
//     setPrpCgId(newPropCgId);
//     setFloorsArray(projectUnitsData);
//     setSelectedFloor(null);
//     handleOpen();
//   };

//   const propName = (key: string, type?: string) => {
//     switch (key) {
//       case "apt":
//         if (type == "name") {
//           return "Apartment";
//         } else {
//           return apartmentCardImg;
//         }
//         break;
//       case "plot":
//         if (type == "name") {
//           return "Plot";
//         } else {
//           return plotCardImg;
//         }
//         break;
//       case "rowHouse":
//         if (type == "name") {
//           return "Rowhouse";
//         } else {
//           return rowhouseCardImg;
//         }
//         break;
//       case "villa":
//         if (type == "name") {
//           return "Villa";
//         } else {
//           return villaCardImg;
//         }
//         break;
//       case "vlmt":
//         if (type == "name") {
//           return "Villament";
//         } else {
//           return villamentCardImg;
//         }
//         break;
//     }
//   };
//   return (
//     <div
//       className="flex flex-col justify-start items-start min-h-[235px] w-[100%] max-w-[359px] lg:max-w-[510px] rounded-[24px] shadow-md pr-[2%] pl-[1%] mt-[70px] bg-gradient-to-l from-[#EFF5FF] /50 to-[#F2FAFF]/50 mb-[2%] cursor-pointer"
//       onClick={() => updateValues(phase, getPropId(propertyType as string))}
//     >
//       <div className="flex justify-between items-start w-full ">
//         <div className="max-w-[90px] lg:max-w-[115px] w-full h-[90px] lg:h-[115px] border-solid border-1 border-[#FFF] rounded-full bg-[#c9daee] relative bottom-[50px] lg:bottom-[60px] mb-[-40px]">
//           <Image
//             width={90}
//             height={90}
//             src={propName(propertyType, "img") as string}
//             alt="Preview"
//             className="w-full h-full object-cover rounded-[14px]"
//           />
//         </div>
//         <div className="flex justify-between items-start mb-[3%] w-[90%] mt-[3%]">
//           <p className="text-[16px] lg:text-[18px] text-[#00487C] font-[600] ml-[10px]">
//             {propName(propertyType, "name")}
//           </p>

//           <div className="flex justify-end items-end flex-col">
//             <p className="text-[16px] text-right lg:text-[18.5px] text-[#148B16] font-[700]">
//               {formatCurrency(cg?.minPrice)} - {formatCurrency(cg?.maxPrice)}
//             </p>
//             <p className="text-[14px] lg:text-[16px] italic text-[#00487C] font-[500]">
//               ₹ {cg?.basePrice} Base Price/ sq.ft
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end items-end flex-col w-full ">
//         <p className="text-[14px] lg:text-[18px] text-[#233] font-[500] mb-[3%] text-right">
//           UNITS: {parseUnits(cg?.unitTypes)}
//         </p>
//         <div className="flex justify-end items-end mb-[3%] gap-[16px]">
//           {propertyType == "apt" || propertyType == "vlmt" ? (
//             <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
//               <TowerIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
//               <span className="mr-[6px] ml-[6px]"> {cg?.elevation} </span>{" "}
//               Towers
//             </p>
//           ) : (
//             ""
//           )}
//           <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
//             <FlooringIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
//             <span className="mr-[6px] ml-[6px]">{cg?.unitCount} </span> Units
//           </p>
//           {propertyType === "rowHouse" || propertyType === "villa" ? (
//             <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
//               <FloorsIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]" />
//               <span className="mr-[6px] ml-[6px]">{"G+" + cg?.elevation}</span>{" "}
//               Elevation
//             </p>
//           ) : (
//             ""
//           )}
//         </div>

//         <button className="text-[16px] lg:text-[18px] text-[#0073C6] font-[600] underline mb-[2%] cursor-pointer mt-[28px]">
//           View Floor Plans
//         </button>
//       </div>
//     </div>
//   );
// }
