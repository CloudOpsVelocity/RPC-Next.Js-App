import React from "react";
import { TowerIcon } from "../images/commonSvgs";

type Props = {};

export default function PropertyTypeDetailsCrad({}: Props) {
  return (
    <div className=" flex justify-between items-center w-[25%] rounded-[24px] shadow-md  pr-[2%] pl-[1%] mt-[70px] bg-gradient-to-l from-[#EFF5FF] /50 to-[#F2FAFF]/50 mb-[2%] ">
      <div className=" w-[130px] h-[130px] border-solid border-1 border-[#FFF] rounded-[50%] bg-[#c9daee] relative bottom-[90px] "></div>
      <div className="flex justify-end items-end flex-col ">
        <p className="text-[24px] text-[#00487C] font-[600] mb-[3%] mt-[3%]  ">
          Apartment
        </p>
        <p className="text-[20px] text-[#233] font-[500] mb-[3%]  ">
          UNITS : 1BHK,2 BHK, 3BHK, 4BHK
        </p>
        <div className="flex justify-end items-end mb-[3%] ">
          <p className="text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
            <TowerIcon />
            <span className="mr-[6px] ml-[6px]"> 4 </span> Towers
          </p>
          <p className="text-[20px] text-[#2A4C70] font-[500] ml-[26px]  ">
            <span className="mr-[6px] ml-[6px]">20 </span> Floors Plans
          </p>
        </div>
        <p className="text-[24px] text-[#148B16] font-[700] mb-[3%]  ">
          ₹ 12 Cr - ₹ 45 Cr
        </p>
      </div>
    </div>
  );
}
