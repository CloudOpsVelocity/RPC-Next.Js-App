"use client";
import { Button, Divider, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import React from "react";
import S from "./Style.module.css";
import {
  apartmentCardImg,
  plotCardImg,
  rowhouseCardImg,
  villaCardImg,
  villamentCardImg,
} from "@/app/images/commonImages";
import { formatCurrency } from "@/app/utils/numbers";
import { useAtom, useAtomValue } from "jotai";
import { overviewAtom } from "@/app/store/overview";
import {
  ApartmentIcon,
  FlooringIcon,
  FloorsIcon,
  Marble,
  PlotIcon,
  RowHouseIcon,
  TowerIcon,
  VillaIcon,
  VillamentIcon,
} from "@/app/images/commonSvgs";
import { BACKEND_PROP_TYPES, projectprops } from "@/app/data/projectDetails";
import { sortUnits } from "@/app/utils/unitparser";
const iconStyles: string =
  " flex items-center justify-center w-[40px] h-[40px]  text-[#001F35]";
export default function FloorplanDrawer() {
  const [cg, setData] = useAtom(overviewAtom);
  console.log(cg.plotData);
  const getIcon = (id: number) => {
    let iconComponent;
    switch (id) {
      case projectprops.apartment:
        iconComponent = (
          <ApartmentIcon
            className={iconStyles}
            sc={{
              h: 38,
              w: 38,
              color: "#001F35",
            }}
          />
        );
        break;
      case projectprops.rowHouse:
        iconComponent = (
          <RowHouseIcon
            className={iconStyles}
            sc={{
              h: 38,
              w: 38,
              color: "#001F35",
            }}
          />
        );
        break;
      case projectprops.villa:
        iconComponent = (
          <VillaIcon
            className={iconStyles}
            sc={{
              h: 38,
              w: 38,
              color: "#001F35",
            }}
          />
        );
        break;
      case projectprops.villament:
        iconComponent = (
          <VillamentIcon
            className={iconStyles}
            sc={{
              h: 38,
              w: 38,
              color: "#001F35",
            }}
          />
        );
        break;
      case projectprops.plot:
        iconComponent = (
          <PlotIcon
            className={iconStyles}
            sc={{
              h: 38,
              w: 38,
              color: "#001F35",
            }}
          />
        );
        break;
      default:
        break;
    }
    return iconComponent;
  };

  const [, { close }] = useDisclosure(false);
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
  const handleClose = () => {
    close();
    setData({});
  };

  return (
    <>
      <Drawer
        opened={Object.keys(cg).length > 0 ? true : false}
        onClose={handleClose}
        title="property Details"
        position="right"
        zIndex={1000}
        classNames={S}
        size={"30%"}
      >
        <h3 className=" gap-2.5 pl-2.5  py-2.5 bg-[#EEF7FE] text-[#001F35] text-[28px] not-italic font-semibold leading-[normal] capitalize w-full mt-4 max-w-[90%] inline-flex">
          {getIcon(
            BACKEND_PROP_TYPES[
              cg?.propertyType as keyof typeof BACKEND_PROP_TYPES
            ]
          )}{" "}
          {propName(cg.propertyType, "name")} details
        </h3>
        <div>
          {/* Right */}
          <div className="flex items-center space-x-4 mt-6">
            {" "}
            <div className="max-w-[70px] lg:max-w-[115px] w-full h-[70px] lg:h-[115px] border-solid border-1 border-[#FFF] rounded-full bg-[#c9daee]  lg:bottom-[60px] ">
              <Image
                width={70}
                height={70}
                src={propName(cg?.propertyType, "img") as string}
                alt="Preview"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            {/* Left */}
            <div>
              {" "}
              <p className="text-[16px] text-right lg:text-[22px] text-[#148B16]  not-italic font-bold leading-[normal] mt-2">
                {formatCurrency(cg?.minPrice)} - {formatCurrency(cg?.maxPrice)}
              </p>
              <p className="text-[14px] lg:text-lg text-[#242424]  italic font-medium leading-[normal]">
                ₹ {cg?.basePrice} Base Price/ sq.ft
              </p>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-4 p-2 sideBarBg mt-5">
          <div className="flex gap-x-[16px] flex-wrap  ">
            {cg?.propertyType == "apt" || cg?.propertyType == "vlmt" ? (
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
            {cg?.propertyType === "rowHouse" || cg.propertyType === "villa" ? (
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
        </div>
        <Table data={cg?.unitTypes} cg={cg} propertyType={cg?.propertyType} />
        {/* Drawer content */}
      </Drawer>
    </>
  );
}

const Table = ({ data, propertyType, cg }: any) => {
  return (
    <div className="flex flex-col justify-center items-start gap-3.5 px-[9px] py-2.5 border rounded-[10px] border-solid border-[#9AB1BC] mt-5 max-w-[90%]">
      <h1 className="flex items-center gap-2.5 pl-2.5 w-full py-2.5 rounded-lg bg-[#ebeaff] text-[#001F35] text-[21px] not-italic font-semibold leading-[normal] capitalize">
        <Marble /> Units Available
      </h1>
      <div className={`flex  pr-3`}>
        {propertyType !== "plot" && (
          <ul className="list-disc pl-8">
            {data &&
              sortUnits(data)?.map((item: any) => (
                <li className="text-[#242424] text-[21px] not-italic font-semibold leading-[normal] capitalize">
                  {propertyType === "plot" ? item.split("_").join(" x ") : item}
                </li>
              ))}
          </ul>
        )}
        <PlotTable
          data={data}
          propertyType={propertyType}
          cg={cg}
          type="standard"
        />
        <Divider orientation="vertical" color="blue" />
        <PlotTable data={data} propertyType={propertyType} cg={cg} type="odd" />
      </div>
    </div>
  );
};

const PlotTable = ({ data, propertyType, cg, type }: any) => {
  const key = type === "standard" ? "standardPlots" : "oddPlots";
  const keyCount = type === "standard" ? "standardPlotCount" : "oddPlotCount";
  const title = propertyType === "plot" ? "Standard Unit" : "Odd Unit";
  return (
    propertyType === "plot" && (
      <div className="border-r-[0.5px] border-[#92B2C8]">
        <div className="flex items-center gap-1.5 p-2 rounded-md bg-[#EEF7FE] text-[#00487C] text-lg not-italic font-medium leading-[normal] capitalize mb-3">
          {title} ({cg.plotData[keyCount]} Units)
        </div>
        <ul className="list-disc pl-8">
          {cg.plotData.standardPlots &&
            sortUnits(cg.plotData[key])?.map((item: any) => (
              <li className="text-[#242424] text-[21px] not-italic font-semibold leading-[normal] capitalize">
                {propertyType === "plot" ? item.split("_").join(" x ") : item}
              </li>
            ))}
        </ul>
      </div>
    )
  );
};
