import React from "react";
import { FlooringIcon, FloorsIcon, TowerIcon } from "../../images/commonSvgs";
import { projectprops, propertyDetailsTypes } from "../../data/projectDetails";

type Props = {
  cg: any;
};

export default function PropertyTypeDetailsCrad({ cg }: Props) {
  return (
    <div className=" flex flex-col justify-start items-start w-[100%] max-w-[359px] lg:max-w-[510px] rounded-[24px] shadow-md  pr-[2%] pl-[1%] mt-[70px] bg-gradient-to-l from-[#EFF5FF] /50 to-[#F2FAFF]/50 mb-[2%] ">
      <div className="flex justify-between items-start w-full ">
        <div className=" max-w-[110px] lg:max-w-[130px] w-full h-[110px] lg:h-[130px] border-solid border-1 border-[#FFF] rounded-full bg-[#c9daee] relative bottom-[50px] lg:bottom-[60px] mb-[-40px] "></div>
        <div className="flex justify-between items-start mb-[3%] w-[90%] mt-[3%]">
          <p className="text-[16px] lg:text-[20px] text-[#00487C] font-[600] ml-[10px] ">
            {/* @ts-ignore */}
            {propertyDetailsTypes.get(cg).name}
          </p>

          <div className="flex justify-end items-start flex-col">
            <p className="text-[16px] text-right lg:text-[20px] text-[#148B16] font-[700]">
              ₹ 12 Cr - ₹ 45 Cr
            </p>
            <p className="text-[12px] text-right lg:text-[14px] text-[#00487C] font-[500]">
              ₹ 1200 Base Price/ sq.ft
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-end flex-col w-full ">
        <p className="text-[14px] lg:text-[18px] text-[#233] font-[500] mb-[3%] text-right ">
          UNITS : 1BHK,2 BHK, 3BHK, 4BHK
        </p>
        <div className="flex justify-end items-end mb-[3%] gap-[16px]">
          {cg == projectprops.apartment || cg == projectprops.villament ? (
            <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
              <TowerIcon className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px] " />
              <span className="mr-[6px] ml-[6px]"> 4 </span> Towers
            </p>
          ) : (
            ""
          )}
          <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
            <FlooringIcon className=" w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]  " />
            <span className="mr-[6px] ml-[6px]">20 </span> Units
          </p>
          {cg == projectprops.apartment || cg == projectprops.villament ? (
            <p className="text-[14px] lg:text-[20px] text-[#2A4C70] font-[500] flex justify-start items-start  ">
              <FloorsIcon className=" w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]  " />
              <span className="mr-[6px] ml-[6px]">G+2 </span> Elevation
            </p>
          ) : (
            ""
          )}
        </div>

        <p className="text-[16px] lg:text-[18px] text-[#0073C6] font-[600] underline mb-[2%] cursor-pointer ">
          View Floor Plans
        </p>
      </div>
    </div>
  );
}
