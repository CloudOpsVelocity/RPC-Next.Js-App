import React from "react";
import About from "../project/about";
import {
  TotalLandArea,
  callIconSvg,
  completedProjIconSvg,
  emailIconSvg,
  lacationIconSvg,
  newLaunchProjIconSvg,
  onGoingProjIconSvg,
} from "@/app/images/commonSvgs";
import { Data } from "@/app/validations/types/builder";
import Card from "./BuilderDetails/Card";

type Props = {};

export default function ProjectDetails({
  mission,
  companyName,
  builderAddress,
  officecontact,
  newProject,
  onGoingProject,
  completedProject,
  email,
  mobile,
  stateName,
  cityName,
  pinCode,
  userName,
  localityName,
  citiesName,
}: Data) {
  return (
    <React.Fragment>
      <div className="sm:rounded-[20px] mt-[3%] flex justify-between items-center bg-[#FFF] shadow-md w-[100%] mb-[3%]   sm:w-[65%] xl:w-[50%] p-[1%] border border-gray-300">
        <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
          <div className="flex justify-between items-center w-[90%] ">
            <span className=" text-[#202020]text-[16px]  sm:text-[20px] lg:text-[24px] font-[600]">
              {newProject??0}
            </span>
            {newLaunchProjIconSvg}
          </div>

          <p className=" text-[#148B16] text-[13px] lg:text-[20px] font-[700] ">
            New Launch {`Project${newProject > 1 ? "s" : ""}`}
          </p>
        </div>

        <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
          <div className="flex justify-between items-center w-[90%] ">
            <span className=" text-[#202020]text-[16px]  sm:text-[20px] lg:text-[24px] font-[600]">
              {onGoingProject??0}
            </span>
            {onGoingProjIconSvg}
          </div>
          <p className=" text-[#0073C6] text-[13px] lg:text-[20px] font-[700]">
            Ongoing <br className="block sm:hidden" />{" "}
            {`Project${onGoingProject > 1 ? "s" : ""}`}
          </p>
        </div>

        <div className="w-[30%] ">
          <div className="flex justify-between items-center w-[90%] ">
            <span className=" text-[#202020]text-[16px]  sm:text-[20px] lg:text-[24px] font-[600]">
              {completedProject??0}
            </span>
            {completedProjIconSvg}
          </div>
          <p className=" text-[#E3AC00] text-[13px] lg:text-[20px] font-[700]">
            Completed {`Project${completedProject > 1 ? "s" : ""}`}
          </p>
        </div>
      </div>

      <About
        id="whyBuy"
        heading="About Builder"
        projName={userName}
        content={mission}
        className="!mb-[14px] sm:!mb-[40px] !mt-[0px] !ml-0 sm:w-full"
        maxLines={7}
      />
      <div
        className="flex w-full flex-col justify-center items-start gap-3.5 sm:gap-8 border border-[color:var(--blue-stroke,#4D6677)] shadow-[0px_4px_31.5px_0px_rgba(91,143,182,0.19)] p-4 sm:p-8 rounded-[7px] border-solid bg-[#FCFCFC] mb-5 sm:mb-[40px] xl:mb-[80px]
  "
      >
        <div className="flex flex-row sm:flex-row gap-3.5 xl:justify-center xl:items-center sm:gap-10 xl:gap-16 flex-wrap ">
          <Card
            Icon={emailIconSvg}
            title="Email"
            content={email}
            type="email"
          />
          <Card
            Icon={callIconSvg}
            title="Contact"
            content={`${officecontact}`}
            type="mobile"
          />

          <Card
            Icon={<TotalLandArea className="!w-[18px] !h-[18px]" />}
            title="State"
            content={stateName}
            type="text"
          />
          <Card
            Icon={<TotalLandArea className="!w-[18px] !h-[18px]" />}
            title="City"
            content={cityName}
            type="text"
          />

          <Card
            Icon={<TotalLandArea className="!w-[18px] !h-[18px]" />}
            title="PIN Code"
            content={pinCode}
            type="text"
          />
        </div>

        <Card
          Icon={lacationIconSvg}
          title="Address"
          content={`${builderAddress}`}
          type="text"
        />
        <Card
          Icon={lacationIconSvg}
          title="Operating Cities"
          content={citiesName && citiesName.join(", ")}
          type="text"
          textClassName="capitalize"
        />
      </div>
      {/* <ProjectDrawer /> */}
    </React.Fragment>
  );
}
