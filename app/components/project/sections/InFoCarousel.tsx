"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
type Props = {
  partialUnitData: any;
};
import Style from "./Carouse.module.css";
import InfoCard from "./InfoCard";
import {
  DarkCarouseIcon,
  DarkNextCarouselButton,
} from "@/app/images/commonSvgs";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  parital_unit_atom,
  selectedPartialUnitAtom,
} from "@/app/store/partialsUnits";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import { sortUnits } from "@/app/utils/unitparser";
import { formatCurrency } from "@/app/utils/numbers";
export default function InFoCarousel({ partialUnitData }: Props) {
  const [selected, setSelected] = useAtom(parital_unit_atom);
  const currentPhase = useAtomValue(currentPhaseAtom);
  const propCgId = useAtomValue(propCgIdAtom);
  const data =
    partialUnitData[currentPhase][
      propertyDetailsTypes.get(propCgId)?.apiProp ?? ""
    ];
  const setData = useSetAtom(selectedPartialUnitAtom);
  const handleCardClick = (units: any, item: any) => {
    setData({
      main: 0,
      others: units, 
      priceRange: `${formatCurrency(data[item].minPrice)} - ${formatCurrency(
        data[item].maxPrice
      )}`, 
    });
  };
  return (
    <div className={` justify-start flex-col items-start mr-auto max-w-[1120px] overflow-x-auto max-h-[510px] md:max-h-[780px] overflow-auto `}>
      <table className="min-w-full border-collapse  mr-auto ">
        <thead className=" sticky top-0 z-[1]">
          <tr className="flex flex-row justify-start items-center">
            <th className="  w-[111px] md:w-[220px] sticky left-0 top-0 flex bg-[#00487C] justify-center text-center items-start px-2.5 py-2 text-white text-[14px] md:text-[16px] not-italic font-bold leading-[normal] ">
              Unit Type
            </th>
            <th className=" w-[180px] md:w-[220px] flex bg-[#00487C] justify-center text-center items-start px-2.5 py-2 text-white text-[14px] md:text-[16px] not-italic font-bold leading-[normal] ">
              Super Built- Up Area
            </th>
            <th className="w-[180px] md:w-[220px] flex bg-[#00487C] justify-center text-center items-start px-2.5 py-2 text-white text-[14px] md:text-[16px] not-italic font-bold leading-[normal] ">
              Carpet Area
            </th>
            <th className=" w-[180px] md:w-[220px] flex bg-[#00487C] justify-center text-center items-start px-2.5 py-2 text-white text-[14px] md:text-[16px] not-italic font-bold leading-[normal] ">
              Unit Price
            </th>
            <th className=" w-[180px] md:w-[220px] flex bg-[#00487C] justify-center text-center items-start px-2.5 py-2 text-white text-[14px] md:text-[16px] not-italic font-bold leading-[normal] ">
              Floor Plan
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data &&
            sortUnits(Object.keys(data)).map((item: any, index: number) => {
              const units = data[item].unitDataDtoList;
              return (
                <tr
                  key={index}
                  className="flex flex-row justify-start items-start !z-[1] "
                >
                  <td
                    className={`bg-[#EEF7FF] shadow-gray-950 shadow-right mb:shadow-right-0 sticky left-0  w-[111px] md:w-[220px]  text-gray-900 text-[16px] md:text-[18px] not-italic font-semibold h-[60px] flex justify-center text-center items-center border-t-0 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid sm:shadow-lg md:shadow-none shadow-t-0 shadow-b-0 shadow-l-0 `}
                  >
                    {item}
                  </td>
                  <td
                    className=" w-[180px] md:w-[220px] bg-[#FFF] text-gray-900 text-[16px] md:text-[18px] not-italic font-semibold h-[60px] flex  justify-center text-center items-center border-t-0 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid  "
                  >
                    {data[item].minSba}sq.ft - {data[item].maxSba}sq.ft
                  </td>
                  <td
                    className=" w-[180px] md:w-[220px] bg-[#EEF7FF] text-gray-900 text-[16px] md:text-[18px] not-italic font-semibold h-[60px] flex justify-center text-center items-center border-t-0 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid"
                  >
                    {data[item].minCa}sq.ft - {data[item].maxCa}sq.ft
                  </td>
                  <td
                    className="w-[180px] md:w-[220px] bg-[#FFF] text-gray-900 text-[16px] md:text-[18px] not-italic font-semibold h-[60px] flex justify-center text-center items-center border-t-0 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid"
                  >
                    {formatCurrency(data[item].minPrice)} -{" "}
                    {formatCurrency(data[item].maxPrice)}
                  </td>
                  <td
                    className="w-[180px] md:w-[220px] bg-[#EEF7FF] text-gray-900 text-[16px] md:text-[18px] not-italic font-semibold h-[60px] flex justify-center text-center items-center border-t-0 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid"
                  >
                    <button
                      className="text-[#0073C6] text-[16px] text-nowrap not-italic font-semibold leading-[normal];
  font-family: Montserrat"
                      onClick={() => handleCardClick(units, item)}
                    >
                      <div className="flex flex-row gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23"
                          height="22"
                          viewBox="0 0 23 22"
                          fill="none"
                        >
                          <path
                            d="M19.75 1.375H3.25C2.49375 1.375 1.875 1.99375 1.875 2.75V19.25C1.875 20.0063 2.49375 20.625 3.25 20.625H13.5625V19.25C13.5625 17.325 15.075 15.8125 17 15.8125V14.4375C14.3188 14.4375 12.1875 16.5688 12.1875 19.25H10.125V16.5H8.75V19.25H3.25V2.75H8.75V12.375H10.125V8.9375H12.875V7.5625H10.125V2.75H19.75V7.5625H17V8.9375H19.75V19.25H17V20.625H19.75C20.5063 20.625 21.125 20.0063 21.125 19.25V2.75C21.125 1.99375 20.5063 1.375 19.75 1.375Z"
                            fill="#0073C6"
                          />
                        </svg>
                        <span>View Floor Plan</span>
                      </div>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>

    /*     <Carousel
      classNames={Style}
      slideSize="20.333333%"
      slideGap="md"
      align="start"
      slidesToScroll={1}
      mt={20}
      nextControlIcon={<DarkNextCarouselButton />}
      previousControlIcon={<DarkCarouseIcon />}
      mih={120}
    >
      {data &&
        sortUnits(Object.keys(data)).map((item: any, index: number) => (
          <InfoCard
            {...{
              active: selected === index,
              ...data[item],
              label: item,
              propCgId: propCgId,
            }}
            cardClick={() => handleCardClick(index)}
          />
        ))}
    </Carousel> */
  );
}
