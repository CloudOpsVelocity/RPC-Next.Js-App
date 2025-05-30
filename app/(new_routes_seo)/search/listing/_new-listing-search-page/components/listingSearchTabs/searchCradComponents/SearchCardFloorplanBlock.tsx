"use client";

import React from "react";
import Image from "next/image";
import { listingProps, projectprops } from "@/app/data/projectDetails";
import { propertyDetailsSvgs } from "@/app/images/commonSvgs";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
type Props = { data: any, type:string };
export default function SearchCardFloorplanBlock({data, type}: Props) {
  let floorplanUrl = data.floorPlan.split(",")[1]

  return (
    <div className=" flex flex-col justify-center items-center gap-2">
        {/* <button
            className="flex flex-col items-center justify-center gap-2.5 ml-auto p-1 rounded-[10px] bg-[#0073C6] text-white text-[12px] md:text-[14px] md:text-[16px] not-italic font-bold leading-[normal] tracking-[0.96px]  "
            onClick={(e) => {
              e.preventDefault();
              handleDownload();
            }}
        >{downLoadIcon}</button> */}

        <DetailsSection data={data} /> 

        <Image
            src={floorplanUrl}
            height={650}
            width={700}
            alt="post"
            className="h-auto w-full border border-solid border-1-black mb-[20px] "
        />
    </div>
  );
};


const DetailsSection = ({data}:{data: any}) => {
  const {propTypeName} = data;

  return(
    <div className="flex w-full gap-[10px] flex-wrap pb-[20px]">
              {listingProps[propTypeName] !== projectprops.plot && (
                <DetailCard
                  icon={propertyDetailsSvgs.unitType}
                  title="Unit Information"
                  items={[
                    { label: "Unit Type", value: data.bhkName ?? "" },
                    { label: "At Floor", value: data.atFloor !== undefined ? data.atFloor == 0 ? "G" : data.atFloor : "" },
                    { label: "Unit Number", value: data.unitNumber ?? "" },

                    ...(data.aptTypeName &&
                    (listingProps[propTypeName] === projectprops.apartment ||
                      listingProps[propTypeName]  === projectprops.villament)
                      ? [
                          {
                            label: "Property Type",
                            value: data.aptTypeName.replace(
                              "Apartment",
                              listingProps[propTypeName]  === projectprops.apartment
                                ? "Apartment"
                                : "Villament"
                            ),
                          },
                        ]
                      : []),
                    ...(data.towerName &&
                    (listingProps[propTypeName]  === projectprops.apartment ||
                      listingProps[propTypeName]  === projectprops.villament)
                      ? [{ label: "Tower", value: data.towerName }]
                      : []),
                    ...(data.block &&
                    listingProps[propTypeName]  === projectprops.apartment &&
                    listingProps[propTypeName]  !== projectprops.plot
                      ? [{ label: "Block", value: data.block }]
                      : []),
                    ...(data.floor !== undefined
                      ? [
                          {
                            label:
                              listingProps[propTypeName]  === projectprops.rowHouse ||
                              listingProps[propTypeName]  === projectprops.villa
                                ? "At Elevation"
                                : "At Floor",
                            value: `${
                              data.isBasement === "Y" ? "B+" : ""
                            }${
                              data.floor === 0 || data.floor === "0"
                                ? "G"
                                : listingProps[propTypeName]  === projectprops.rowHouse ||
                                  listingProps[propTypeName]  === projectprops.villa
                                ? `G+${data.floor}`
                                : data.floor
                            }`,
                          },
                        ]
                      : []),
                    ...(data.totalFloor !== undefined &&
                    listingProps[propTypeName]  !== projectprops.plot
                      ? [
                          {
                            label: "Total No.Of Floors",
                            value: data.totalFloor,
                          },
                        ]
                      : []),
                  ]}
                />
              )}

              {/* Area Details */}
              <DetailCard
                icon={propertyDetailsSvgs.superBuildUparea}
                title="Area Details"
                items={[
                  ...(listingProps[propTypeName]  !== projectprops.plot
                    ? [
                        {
                          label: "Super Builtup Area",
                          value: `${formatNumberWithSuffix(
                            data.sba ?? 0,
                            false
                          )} sq.ft`,
                        },
                        {
                          label: "Carpet Area",
                          value: `${formatNumberWithSuffix(
                            data.ca ?? 0,
                            false
                          )} sq.ft`,
                        },
                      ]
                    : []),
                  ...(data.pa &&
                  (listingProps[propTypeName]  === projectprops.plot ||
                    listingProps[propTypeName]  === projectprops.villa ||
                    listingProps[propTypeName]  === projectprops.rowHouse ||
                    listingProps[propTypeName]  === projectprops.independent)
                    ? [
                        {
                          label: "Plot Area",
                          value: `${formatNumberWithSuffix(
                            data.pa,
                            false
                          )} sq.ft`,
                        },
                      ]
                    : []),
                  ...(data.ga && listingProps[propTypeName]  !== projectprops.plot
                    ? [
                        {
                          label: "Garden Space",
                          value: `${data.ga} sq.ft`,
                        },
                      ]
                    : []),
                  ...(data.gardenArea &&
                  (listingProps[propTypeName]  === projectprops.villa ||
                    listingProps[propTypeName]  === projectprops.rowHouse ||
                    listingProps[propTypeName]  === projectprops.villament)
                    ? [
                        {
                          label: "Garden Area",
                          value: `${formatNumberWithSuffix(
                            data.gardenArea,
                            false
                          )} sq.ft`,
                        },
                      ]
                    : []),
                  ...(data.ta && listingProps[propTypeName]  !== projectprops.plot
                    ? [
                        {
                          label: "Terrace Area",
                          value: `${formatNumberWithSuffix(
                            data.ta,
                            false
                          )} sq.ft`,
                        },
                      ]
                    : []),
                  ...(data.ba && listingProps[propTypeName]  !== projectprops.plot
                    ? [
                        {
                          label: "Balcony Area",
                          value: `${data.ba} sq.ft`,
                        },
                      ]
                    : []),
                  ...(data.terraceArea &&
                  data.terraceArea !== "null" &&
                  (listingProps[propTypeName]  === projectprops.villa ||
                    listingProps[propTypeName]  === projectprops.rowHouse ||
                    listingProps[propTypeName]  === projectprops.villament ||
                    listingProps[propTypeName]  === projectprops.independent)
                    ? [
                        {
                          label: "Terrace Area",
                          value: `${formatNumberWithSuffix(
                            data.terraceArea,
                            false
                          )} sq.ft`,
                        },
                      ]
                    : []),
                  ...(data.totalBalconySize &&
                  listingProps[propTypeName]  === projectprops.villament
                    ? [
                        {
                          label: "Balcony Size",
                          value: `${formatNumberWithSuffix(
                            data.totalBalconySize,
                            false
                          )} sq.ft`,
                        },
                      ]
                    : []),
                ]}
              />

              {/* Parking Details */}
              {listingProps[propTypeName]  !== projectprops.plot &&
                (data.noocp ||
                  data.noccp ||
                  data.nocbp ||
                  data.noobp) && (
                  <DetailCard
                    icon={propertyDetailsSvgs.noOfCarParking}
                    title="Parking Details"
                    items={[
                      ...(data.noocp
                        ? [
                            {
                              label: "Open Car Parking",
                              value: data.noocp,
                            },
                          ]
                        : []),
                      ...(data.noccp
                        ? [
                            {
                              label: "Closed Car Parking",
                              value: data.noccp,
                            },
                          ]
                        : []),
                      ...(data.nocbp
                        ? [
                            {
                              label: "Closed Bike Parking",
                              value: data.nocbp,
                            },
                          ]
                        : []),
                      ...(data.noobp
                        ? [
                            {
                              label: "Open Bike Parking",
                              value: data.noobp,
                            },
                          ]
                        : []),
                    ]}
                  />
                )}

              {/* Other Details */}
              <DetailCard
                icon={propertyDetailsSvgs.facingName}
                title="Other Details"
                items={[
                  {
                    label:
                      listingProps[propTypeName]  === projectprops.plot ? "Plot Facing" : "Facing",
                    value: data.facing ?? "",
                  },
                  ...(data.totalNumberOfBalcony &&
                  listingProps[propTypeName]  !== projectprops.plot
                    ? [
                        {
                          label: "Number of Balconies",
                          value: data.totalNumberOfBalcony.toString(),
                        },
                      ]
                    : []),
                  ...(listingProps[propTypeName]  !== projectprops.plot
                    ? [
                        {
                          label: "Number of Bathrooms",
                          value:
                            data.bathroom?.toString() ?? "0",
                        },
                        {
                          label: "Number of Balcony",
                          value:
                            data.balcony?.toString() ?? "0",
                        },
                        
                      ]
                    : []),
                  ...(listingProps[propTypeName]  === projectprops.plot && data.length
                    ? [
                        {
                          label: "Length of Plot",
                          value: `${data.length} ft.`,
                        },
                      ]
                    : []),
                  ...(listingProps[propTypeName]  === projectprops.plot && data.width
                    ? [
                        {
                          label: "Breadth of Plot",
                          value: `${data.width} ft.`,
                        },
                      ]
                    : []),
                ]}
              />
        </div>
  )
}


interface DetailCardProps {
  icon: JSX.Element;
  title: string;
  items: Array<{ label: string; value: string | number }>;
}

const DetailCard = ({ icon, title, items }: DetailCardProps) => {
  if (items.length === 0) return null;

  return (
    <div className="bg-[#F8FBFF] p-[8px] md:p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-1 md:mb-3">
        <div className="bg-[#ECF7FF] p-2 rounded-lg">{icon}</div>
        <h3 className="text-[#303A42] font-semibold text-[12px] md:text-[14px] xl:text-[16px]">{title}</h3>
      </div>
      <div className="space-y-[4px] md:space-y-2">
        {items.map((item) => {
          return (
            item.value !== "" &&
            <div key={item.label} className="flex justify-between text-sm gap-[4px] md:gap-[10px]">
              <span className="text-[#4D6677] text-[12px] md:text-[14px] xl:text-[16px]">{item.label}</span>
              <span className="text-[#1A1A1A] font-semibold text-[12px] md:text-[14px] xl:text-[16px]">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
