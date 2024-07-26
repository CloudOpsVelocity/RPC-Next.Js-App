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
          <th className=" w-[149px]  justify-center text-center items-start gap-2.5 px-2.5 py-2 text-white text-[16px] not-italic font-bold leading-[normal] ">Floor Plan</th>
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
          <td  className="w-[149px]  justify-center text-center items-start gap-2.5 px-2.5 py-5 border-r-[0.5px] border-r-[#D9DFE3] border-b-[0.5px] border-b-[#D9DFE3] border-solid;
          bg-[#D9DFE3]">
            <button onClick={()=>{alert()}}>
              floorplan
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
