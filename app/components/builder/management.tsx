import React from "react";
import About from "../project/about";
import { callIconSvg } from "@/app/images/commonSvgs";
import { Data } from "@/app/validations/types/builder";

type Props = {};

export default function ManagementBlock({
  companyName,
  ceoName,
  founderName,
  vision,
  citiesName,
  officecontact,
}: Data) {
  return (
    <div className="shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[10px] w-full p-[1%] mb-[6%] pt-[2%]  bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100  shadow-[#5b8fb630] ">
      <h1 className=" text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
        <span className="text-[#148B16] font-[700] ">{companyName} </span>
        Management{" "}
      </h1>

      <div className="flex justify-start items-start w-full flex-wrap gap-[3%] mb-[2%] mt-[2%]  ">
        <div className="bg-[#FFF] rounded-[10px] shadow-lg border-[#92B2C8] border-[1px] border-solid p-[16px] mb-[3%] ">
          <p className="text-[20px] md:text-[24px] font-[600] text-[#202020] ">
            {ceoName}
          </p>
          <p className="text-[16px] md:text-[20px] font-[700] text-[#00487C] italic">
            CEO, {companyName}
          </p>
        </div>

        <div className="bg-[#FFF] rounded-[10px] shadow-lg border-[#92B2C8] border-[1px] border-solid p-[16px] mb-[3%] ">
          <p className="text-[20px] md:text-[24px] font-[600] text-[#202020] ">
            {founderName}
          </p>
          <p className="text-[16px] md:text-[20px] font-[700] text-[#00487C] italic">
            Founder, {companyName}
          </p>
        </div>
      </div>

      <h1 className=" text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
        <span className="text-[#148B16] font-[700]">{companyName}'s</span>{" "}
        Vision
      </h1>
      <About id="builder_vision" heading="" projName={""} content={vision} />

      <div className=" flex justify-start items-center w-full gap-[8px] mt-[-3%] mb-[2%] ">
        {callIconSvg}
        <p className="text-[16px] md:text-[24px] font-[500] text-[#00487C]">
          Office Contact
        </p>
        <p className="text-[16px] md:text-[24px] font-[600] text-[#00487C] underline">
          +91- {officecontact}
        </p>
      </div>

      <h1 className=" text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
        <span className="text-[#148B16] font-[700] ">
          {companyName} Projects{" "}
        </span>
        in Different Branches{" "}
      </h1>

      <div className="flex justify-start items-start w-full flex-wrap gap-[3%] mb-[2%] mt-[1%] ">
        {citiesName?.map((item, index) => (
          <p
            className="text-[16px] md:text-[24px]  text-[#00487C] bg-[#FFF] rounded-[10px] shadow-lg p-[1%] px-[16px] hover:bg-[#00487C] hover:text-[#FFF] cursor-pointer ] text-2xl not-italic  font-semibold leading-[normal] tracking-[0.96px]"
            key={index}
          >
            Project in <span className="capitalize">{item}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
