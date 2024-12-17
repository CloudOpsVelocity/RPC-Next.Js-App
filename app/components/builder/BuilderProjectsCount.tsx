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
  const { data, isLoading, status } = useQuery({
    queryKey: [`BuilderProjectsCount`, id],
    queryFn: async () => {
      const response = await getBuilderProjectsCount(id);
      // Convert string like '{106=5, 107=1}' to proper object
      if (typeof response.projectCount === "string") {
        const countStr = response.projectCount.slice(1, -1); // Remove { }
        const counts = Object.fromEntries(
          countStr.split(",").map((pair: string) => {
            const [key, value] = pair.split("=").map((s: string) => s.trim());
            return [key, parseInt(value)];
          })
        );
        response.projectCount = counts;
      }

      return {
        ...response,
        onGoing: response.projectCount?.[106] || 0,
        newLaunch: response.projectCount?.[108] || 0,
        completed: response.projectCount?.[107] || 0,
      };
    },
  });
  if (isLoading) {
    return (
      <div className="sm:rounded-[20px] mt-[3%] flex justify-between items-center bg-[#FFF] shadow-md w-[100%] mb-[3%] sm:w-[65%] xl:w-[50%] p-[1%] border border-gray-300">
        <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px] animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-full" />
        </div>
        <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px] animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-full" />
        </div>
        <div className="w-[30%] animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="sm:rounded-[20px] mt-[3%] flex justify-between items-center bg-[#FFF] shadow-md w-[100%] mb-[3%]   sm:w-[65%] xl:w-[50%] p-[1%] border border-gray-300">
      <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
        <div className="flex justify-between items-center w-[90%] ">
          <span className=" text-[#202020]text-[16px]  sm:text-[20px] lg:text-[24px] font-[600]">
            {data?.newLaunch ?? 0}
          </span>
          {newLaunchProjIconSvg}
        </div>

        {data?.newLaunch > 0 ? (
          <a
            href={`/search?projStatus=108`}
            className=" text-[#148B16] text-[13px] lg:text-[20px] font-[700] "
          >
            New Launch {`Project${data?.newLaunch > 1 ? "s" : ""}`}
          </a>
        ) : (
          <p className=" text-[#148B16] text-[13px] lg:text-[20px] font-[700] ">
            New Launch Projects
          </p>
        )}
      </div>

      <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
        <div className="flex justify-between items-center w-[90%] ">
          <span className=" text-[#202020]text-[16px]  sm:text-[20px] lg:text-[24px] font-[600]">
            {data?.onGoing ?? 0}
          </span>
          {onGoingProjIconSvg}
        </div>
        {data?.onGoing > 0 ? (
          <a
            href={`/search?projStatus=106`}
            className=" text-[#0073C6] text-[13px] lg:text-[20px] font-[700]"
          >
            Ongoing <br className="block sm:hidden" />{" "}
            {`Project${data?.onGoing > 1 ? "s" : ""}`}
          </a>
        ) : (
          <p className=" text-[#0073C6] text-[13px] lg:text-[20px] font-[700]">
            Ongoing <br className="block sm:hidden" /> Projects
          </p>
        )}
      </div>

      <div className="w-[30%] ">
        <div className="flex justify-between items-center w-[90%] ">
          <span className=" text-[#202020]text-[16px]  sm:text-[20px] lg:text-[24px] font-[600]">
            {data?.completed ?? 0}
          </span>
          {completedProjIconSvg}
        </div>
        {data?.completed > 0 ? (
          <a
            href={`/search?projStatus=107`}
            className=" text-[#E3AC00] text-[13px] lg:text-[20px] font-[700]"
          >
            Completed {`Project${data?.completed > 1 ? "s" : ""}`}
          </a>
        ) : (
          <p className=" text-[#E3AC00] text-[13px] lg:text-[20px] font-[700]">
            Completed Projects
          </p>
        )}
      </div>
    </div>
  );
}
