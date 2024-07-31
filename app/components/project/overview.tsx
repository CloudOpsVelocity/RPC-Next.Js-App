"use client";
import React from "react";
import {
  EndDate,
  Locality,
  ProjectStatus,
  PropertyAvailable,
  ReraIcon,
  ReraStatusProj,
  StartDate,
  TotalLandArea,
  footerPhoneIcon,
} from "@/app/images/commonSvgs";
import ProjBasicDetails from "@/app/components/project/projBasicDetails";
import OverviewBanner from "./overviewBanner";
import Ratings from "./Ratings";
import ShortList from "./actions/shortList";
import CompareList from "./actions/compareList";
import { formatDateDDMMYYYY } from "@/app/utils/date";
import Message from "./actions/Message";
import ReportSection from "./actions/Report";

export default function Overview({
  maxPrice,
  minPrice,
  projectName,
  address,
  projectStatus,
  availableProperties,
  totalLandArea,
  totalUnit,
  localityName,
  startDate,
  endDate,
  cityName,
  pinCode,
  builderId,
  state,
  basePrice,
  media,
  companyName,
  postedByName,
  phaseList,
  PhaseOverview,
}: any) {
  return (
    <div
      className="pt-[2%] scroll-mt-[150px] w-[95%] sm:[95%] xl:w-[90%] rounded-[24px] shadow-md mb-[5%] sm:mb-[3%]  mt-[2%] bg-gradient-to-r from-[#F6F6F6] /0 via-[#FFF] /45 to-[#FEFFFF]/100 "
      id="overview"
    >
      <div className="pl-[2%] pr-[2%] flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="md:w-[80%]">
          <div className="">
            <h2 className="text-[22px] sm:text-[24px] xl:text-[32px] text-[#001F35] font-[700] capitalize break-words text-wrap w-full">
              {projectName}
            </h2>{" "}
          </div>

          <p className="text-[#242424]  text-sm sm:text-[20px] xl:text-[22px] not-italic font-[600] leading-[normal] w-[100%] tracking-[0.32px] sm:mt-[10px]  xl:mt-[14px] capitalize  sm:max-w-[1400px]">
            {`${address}, ${localityName}, ${cityName}, ${state}, ${pinCode}`}
          </p>
        </div>
        <div className="flex justify-center items-center sm:items-end sm:flex-col space-x-6">
          <Ratings />
          <a
            href={`tel:${8884440963}`}
            className="text-[13px] sm:text-[20px]  mt-3  text-[#0073C6] xl:text-2xl not-italic font-semibold leading-[normal] inline-flex justify-center items-center gap-1.5 p-1.5 xl:p-2 rounded-lg border-[0.8px] border-solid border-[#0073C6] bg-[#fafafa]"
          >
            {footerPhoneIcon}
            Call now
          </a>
        </div>
      </div>

      <div className="pl-[2%] pr-[2%] flex justify-start md:justify-between items-start md:items-end w-full mb-[3%] sm:mb-[1%] xl:mb-[3%] mt-[3%] sm:mt-[1%] xl:mt-[3%] flex-col md:flex-row ">
        <div className="flex justify-start items-start flex-wrap w-[100%] md:w-[80%] ">
          <ProjBasicDetails
            key="propertyAvailable"
            icon={<PropertyAvailable />}
            title="Property Available"
            value={availableProperties?.join(", ")}
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />
          <ProjBasicDetails
            key="projectStatus"
            icon={<ProjectStatus />}
            title="Project Status"
            value={projectStatus}
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />
          <ProjBasicDetails
            key="totalLandArea"
            icon={<TotalLandArea />}
            title="Project Land Area"
            value={`${totalLandArea} Acers`}
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />
          <ProjBasicDetails
            key="totalUnits"
            icon={<TotalLandArea />} // Adjust icon
            title="Units in Projects"
            value={`${totalUnit} Units`}
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />
          <ProjBasicDetails
            key="locality"
            icon={<Locality />}
            title="Locality"
            value={localityName}
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />
          <ProjBasicDetails
            key="startDate"
            icon={<StartDate />}
            title="Start Date"
            value={formatDateDDMMYYYY(startDate)}
            className="mr-[5%] pt-[2%] mb-[3%] "
          />
          <ProjBasicDetails
            key="endDate"
            icon={<EndDate />}
            title="End Date"
            value={formatDateDDMMYYYY(endDate)}
            className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
          />
          {phaseList?.length == 1 && (
            <ProjBasicDetails
              key="rerastatus"
              icon={<ReraStatusProj />}
              title="RERA Status"
              value={PhaseOverview[0]?.rerastatus}
              className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
            />
          )}

          {phaseList?.length == 1 &&
            PhaseOverview[0]?.rerastatus !== "Not Applied" && (
              <ProjBasicDetails
                key="reraId"
                icon={<EndDate />}
                title={
                  PhaseOverview[0]?.rerastatus === "Recieved"
                    ? "RERA ID"
                    : "Acknowledgement Id"
                }
                value={PhaseOverview[0]?.reraId}
                className="mr-[5%] sm:mr-[3%] xl:mr-[5%] pt-[2%] mb-[3%] sm:mb-[1.5%] xl:mb-[3%]  "
              />
            )}
        </div>
        <div className=" flex justify-start md:justify-end items-start md:items-end flex-col mt-[3%] md:mt-0 relative pb-2 sm:pb-4 xl:pb-10">
          <ReportSection />
          <ShortList />
          <CompareList />
          <Message />
        </div>
      </div>
      <OverviewBanner
        maxPrice={maxPrice}
        minPrice={minPrice}
        name={projectName}
        buiderName={postedByName}
        builderId={builderId}
        basePrice={basePrice}
        brocherUrl={media.projBroucherUrl}
      />
    </div>
  );
}
