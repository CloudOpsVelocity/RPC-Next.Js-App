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
import { useAtom, useAtomValue } from "jotai";
import { parital_unit_atom } from "@/app/store/partialsUnits";
import { currentPhaseAtom, propCgIdAtom } from "@/app/store/vewfloor";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import { sortUnits } from "@/app/utils/unitparser";
export default function InFoCarousel({ partialUnitData }: Props) {
  const [selected, setSelected] = useAtom(parital_unit_atom);
  const currentPhase = useAtomValue(currentPhaseAtom);
  const propCgId = useAtomValue(propCgIdAtom);
  const data =
    partialUnitData[currentPhase][
      propertyDetailsTypes.get(propCgId)?.apiProp ?? ""
    ];
  const handleCardClick = (index: number) => {
    setSelected(index);
  };
  return (
    <div className="max-h-[450px] w-[60%] overflow-scroll ">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 sticky top-0">
        <tr className="flex flex-row bg-[#00487C] justify-start items-center gap-3">
          <th className="w-[116px] justify-center text-center items-start gap-2.5 px-2.5 py-2 text-white text-[16px] not-italic font-bold leading-[normal] ">Unit Type</th>
          <th className=" w-[232px]  justify-center text-center items-start gap-2.5 px-2.5 py-2 text-white text-[16px] not-italic font-bold leading-[normal] ">Super Built- Up Area</th>
          <th className="w-[149px]  justify-center text-center items-start gap-2.5 px-2.5 py-2 text-white text-[16px] not-italic font-bold leading-[normal] ">Carpet Area</th>
          <th className=" w-[149px] justify-center text-center items-start gap-2.5 px-2.5 py-2 text-white text-[16px] not-italic font-bold leading-[normal] ">Unit Price</th>
          <th className=" w-[250px]  justify-center text-center items-start gap-2.5 px-2.5 py-2 text-white text-[16px] not-italic font-bold leading-[normal] ">Floor Plan</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        
        { data &&
        sortUnits(Object.keys(data)).map((item: any, index: number) => {
          const values = data[item]
      return (
        <tr key={index} className="hover:bg-gray-100 flex flex-row justify-start items-start ">
          <td className=" w-[116px] justify-center text-center items-start gap-2.5 px-2.5 py-5 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid;
          bg-[#eef7ff]">{values.maxSba}</td>
          <td  className=" w-[232px]  justify-center text-center items-start gap-2.5 px-2.5 py-5 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid;
          bg-[#FFF]">{values.maxPrice}</td>
          <td  className=" w-[232px]  justify-center text-center items-start gap-2.5 px-2.5 py-5 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid;
          bg-[#D9DFE3]">{values.maxPrice}</td>
          <td  className="w-[149px] justify-center text-center items-start gap-2.5 px-2.5 py-5 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid;
          bg-[#FFF]">{values.maxCa}</td>
          <td  className="w-[250px]  justify-center text-center items-start gap-2.5 px-2.5 py-5 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid;
          bg-[#D9DFE3]">
            <button className="text-[#0073C6] text-[16px] text-nowrap not-italic font-semibold leading-[normal];
  font-family: Montserrat" onClick={()=>{alert()}}>
              <div className="flex flex-row gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
        <path d="M19.75 1.375H3.25C2.49375 1.375 1.875 1.99375 1.875 2.75V19.25C1.875 20.0063 2.49375 20.625 3.25 20.625H13.5625V19.25C13.5625 17.325 15.075 15.8125 17 15.8125V14.4375C14.3188 14.4375 12.1875 16.5688 12.1875 19.25H10.125V16.5H8.75V19.25H3.25V2.75H8.75V12.375H10.125V8.9375H12.875V7.5625H10.125V2.75H19.75V7.5625H17V8.9375H19.75V19.25H17V20.625H19.75C20.5063 20.625 21.125 20.0063 21.125 19.25V2.75C21.125 1.99375 20.5063 1.375 19.75 1.375Z" fill="#0073C6"/>
      </svg>
        <span>View Floor Plan</span>


              </div>
             
            </button>
          </td>


        </tr>
      )
        } )}
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
