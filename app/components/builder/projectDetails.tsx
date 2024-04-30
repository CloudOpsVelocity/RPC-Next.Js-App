import React from "react";
import About from "../project/about";
import {
  callIconSvg,
  completedProjIconSvg,
  emailIconSvg,
  lacationIconSvg,
  newLaunchProjIconSvg,
  onGoingProjIconSvg,
} from "@/app/images/commonSvgs";
import { Data } from "@/app/validations/types/builder";
import ProjectDrawer from "../project/Drawer";

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
}: Data) {
  return (
    <React.Fragment>
      <div className="rounded-[20px] mt-[3%] flex justify-between items-center bg-[#FFF] shadow-md w-[100%] mb-[3%] lg:w-[50%] p-[1%] ">
        <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
          <div className="flex justify-between items-center w-[90%] ">
            <span className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              {newProject}
            </span>
            {newLaunchProjIconSvg}
          </div>

          <p className=" text-[#148B16] text-[16px] lg:text-[20px] font-[700]">
            New Launch Projects
          </p>
        </div>

        <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
          <div className="flex justify-between items-center w-[90%] ">
            <span className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              {onGoingProject}
            </span>
            {onGoingProjIconSvg}
          </div>
          <p className=" text-[#0073C6] text-[16px] lg:text-[20px] font-[700]">
            Ongoing Projects
          </p>
        </div>

        <div className="w-[30%] ">
          <div className="flex justify-between items-center w-[90%] ">
            <span className=" text-[#202020] text-[20px] lg:text-[24px] font-[600]">
              {completedProject}
            </span>
            {completedProjIconSvg}
          </div>
          <p className=" text-[#E3AC00] text-[16px] lg:text-[20px] font-[700]">
            Completed Projects
          </p>
        </div>
      </div>

      <About
        id="whyBuy"
        heading="About"
        projName={companyName}
        content={mission}
      />

      <div className="w-full flex justify-start items-start mb-[4%] mt-[-2%] flex-wrap gap-[5%]  ">
        <div className="flex justify-start items-start flex-col mb-[2%] ">
          <p className="inline-flex justify-center items-center gap-1 rounded-[20px] p-2 bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 space-x-2 mb-2">
            {emailIconSvg}{" "}
            <span className="text-[#303030] text-2xl not-italic font-medium leading-[normal] tracking-[0.96px]">
              Email
            </span>
          </p>
          <a
            href={`mailto:${email}`}
            className="text-[#00487C] text-[16px] lg:text-[20px] font-[600] underline "
          >
            {email}
          </a>
        </div>

        <div className="flex justify-start items-start flex-col mb-[2%] ">
          <p className="inline-flex justify-center items-center gap-1 rounded-[20px] p-2 bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 space-x-2 mb-2">
            {callIconSvg}{" "}
            <span className="text-[#303030] text-2xl not-italic font-medium leading-[normal] tracking-[0.96px]">
              Contact
            </span>
          </p>
          <a
            href={`tel:${mobile}`}
            className="text-[#00487C] text-[16px] lg:text-[20px] font-[600] underline "
          >
            +91- {mobile}
          </a>
        </div>

        <div className="flex justify-start items-start flex-col mb-[2%] w-[100%] md:w-[40%] ">
          <p className="inline-flex justify-center items-center gap-1 rounded-[20px] p-2 bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 space-x-2 mb-2">
            {lacationIconSvg}{" "}
            <span className="text-[#303030] text-2xl not-italic font-medium leading-[normal] tracking-[0.96px]">
              Address
            </span>
          </p>
          <p className="text-[#00487C] text-xl not-italic font-semibold leading-8 pl-2">
            {builderAddress}
          </p>
        </div>
      </div>
      {/* <ProjectDrawer /> */}
    </React.Fragment>
  );
}
