"use client";
import {
  completedProjIconSvg,
  newLaunchProjIconSvg,
  onGoingProjIconSvg,
} from "@/app/images/commonSvgs";
import { getBuilderProjectsCount } from "@/app/utils/api/builder";
import React from "react";
import { useQuery } from "react-query";

type Props = {
  id: string;
};

export default function BuilderProjectsCount({ id }: Props) {
  const { data } = useQuery({
    queryKey: [`BuilderProjectsCount`, id],
    queryFn: async () => {
      const response = await getBuilderProjectsCount(id);
      const projectCount = response.projectCount;
      return {
        onGoing: projectCount["106"] || 0, // On Going
        completed: projectCount["107"] || 0, // Completed
        newLaunch: projectCount["108"] || 0, // New Launch
      };
    },
  });
  return (
    <div className="sm:rounded-[20px] mt-[3%] flex justify-between items-center bg-[#FFF] shadow-md w-[100%] mb-[3%]   sm:w-[65%] xl:w-[50%] p-[1%] border border-gray-300">
      <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
        <div className="flex justify-between items-center w-[90%] ">
          <span className=" text-[#202020]text-[16px]  sm:text-[20px] lg:text-[24px] font-[600]">
            {data?.newLaunch ?? 0}
          </span>
          {newLaunchProjIconSvg}
        </div>

        <p className=" text-[#148B16] text-[13px] lg:text-[20px] font-[700] ">
          New Launch {`Project${data?.newLaunch > 1 ? "s" : ""}`}
        </p>
      </div>

      <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
        <div className="flex justify-between items-center w-[90%] ">
          <span className=" text-[#202020]text-[16px]  sm:text-[20px] lg:text-[24px] font-[600]">
            {data?.onGoing ?? 0}
          </span>
          {onGoingProjIconSvg}
        </div>
        <p className=" text-[#0073C6] text-[13px] lg:text-[20px] font-[700]">
          Ongoing <br className="block sm:hidden" />{" "}
          {`Project${data?.onGoing > 1 ? "s" : ""}`}
        </p>
      </div>

      <div className="w-[30%] ">
        <div className="flex justify-between items-center w-[90%] ">
          <span className=" text-[#202020]text-[16px]  sm:text-[20px] lg:text-[24px] font-[600]">
            {data?.completed ?? 0}
          </span>
          {completedProjIconSvg}
        </div>
        <p className=" text-[#E3AC00] text-[13px] lg:text-[20px] font-[700]">
          Completed {`Project${data?.completed > 1 ? "s" : ""}`}
        </p>
      </div>
    </div>
  );
}
