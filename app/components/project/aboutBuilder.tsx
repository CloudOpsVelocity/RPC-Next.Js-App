import ReadMore from "../atoms/readmore";
import Button from "../../elements/button";
import React from "react";

type Props = {};

export default function AboutBuilder({}: Props) {
  return (
    <div className="w-[90%] mt-[5%]">
      <div className="w-full justify-between items-center ">
        <h1 className=" text-[#023993] text-[24px] lg:text-[32px] font-[700]">
          About Builder
        </h1>
        <p className=" text-[#148B16] italic text-[20px] lg:text-[26px] font-[700]">
          SARANG BY SUMADHURA
        </p>
        <div className="rounded-[20px] mt-[1%] flex justify-between items-center bg-[#FFF] shadow-md w-[100%] mb-[2%] lg:w-[50%] p-[1%] ">
          <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
            <p className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              05
            </p>
            <p className=" text-[#148B16] text-[16px] lg:text-[20px] font-[700]">
              New Launch Projects
            </p>
          </div>

          <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
            <p className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              15
            </p>
            <p className=" text-[#0073C6] text-[16px] lg:text-[20px] font-[700]">
              New Launch Projects
            </p>
          </div>

          <div className="w-[30%] ">
            <p className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              35
            </p>
            <p className=" text-[#E3AC00] text-[16px] lg:text-[20px] font-[700]">
              New Launch Projects
            </p>
          </div>
        </div>

        <ReadMore
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis auteeeee irure dolor in
          repllllllllll rehen laborum"
          maxLines={4}
        />

        <p className=" text-[#212C33] text-[22px] lg:text-[24px] font-[500] mt-[3%] italic ">
          Builder Address{" "}
        </p>
        <p className=" text-[#2A4C70] text-[18px] lg:text-[20px] font-[700] mt-[1%] italic ">
          Folium by Sumadhura, Borewell Rd, Whitefield, Palm Meadows,
          Ramagondanahalli, Bengaluru, Karnataka 560066
        </p>
        <Button
          title="View Builder Details"
          // onChange={() => ""}
          buttonClass=" bg-[#0073C6] rounded-[10px] text-[#FFF] text-[18px] lg:text-[20px] font-[700] p-[10px] mt-[1%] "
        />
      </div>
    </div>
  );
}
