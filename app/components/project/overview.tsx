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
import { Main } from "@/app/validations/types/project";
import OverviewBanner from "./overviewBanner";
import Ratings from "./Ratings";
import ShortList from "./actions/shortList";
import CompareList from "./actions/compareList";
import { formatDateDDMMYYYY } from "@/app/utils/date";
import usePhaseWiseOverview from "@/app/hooks/usePhaseWiseOverview";
import LoginPopup from "./modals/LoginPop";
import Message from "./actions/Message";

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
}: Main) {
  const { PhaseOverview, phaseList } = usePhaseWiseOverview();
  return (
    <div
      className="pt-[2%] scroll-mt-[150px] w-[90%] rounded-[24px] shadow-md mb-[5%] mt-[2%] bg-gradient-to-r from-[#F6F6F6] /0 via-[#FFF] /45 to-[#FEFFFF]/100 "
      id="overview"
    >
      <div className="pl-[2%] pr-[2%] flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div>
          <h2 className="text-[24px] lg:text-[32px] text-[#148B16] font-[700] capitalize">
            {projectName}
          </h2>
          <p className="text-[16px] lg:text-[24px] text-[#505050] font-[500] capitalize sm:max-w-[85%]">
            {`${address}, ${localityName}, ${cityName}, ${state}, ${pinCode}`}
          </p>
        </div>
        <div className="flex justify-center sm:items-end sm:flex-col">
          <Ratings />
          <a
            href={`tel:${8766203976}`}
            className="text-[20px]  mt-3  text-[#0073C6] lg:text-2xl not-italic font-semibold leading-[normal] inline-flex justify-center items-center gap-1.5 p-2 rounded-lg border-[0.8px] border-solid border-[#0073C6] bg-[#fafafa]"
          >
            {footerPhoneIcon}
            Call now
          </a>
        </div>
      </div>

      <div className="pl-[2%] pr-[2%] flex justify-start md:justify-between items-start md:items-end w-full mb-[3%] mt-[3%] flex-col md:flex-row ">
        <div className="flex justify-start items-start flex-wrap w-[100%] md:w-[80%] ">
          <ProjBasicDetails
            key="propertyAvailable"
            icon={<PropertyAvailable />}
            title="Property Available"
            value={availableProperties?.join(", ")}
            className="mr-[5%] pt-[2%] mb-[3%]  "
          />
          <ProjBasicDetails
            key="projectStatus"
            icon={<ProjectStatus />}
            title="Project Status"
            value={projectStatus}
            className="mr-[5%] pt-[2%] mb-[3%] "
          />
          <ProjBasicDetails
            key="totalLandArea"
            icon={<TotalLandArea />}
            title="Total Land Area"
            value={`${totalLandArea} Acers`}
            className="mr-[5%] pt-[2%] mb-[3%] "
          />
          {/* <ProjBasicDetails
            key="elevation"
            icon={<TotalLandArea />} // Adjust icon
            title="Elevation"
            value={"G + 3"}
            className="mr-[5%] pt-[2%] mb-[3%] "
          /> */}
          <ProjBasicDetails
            key="totalUnits"
            icon={<TotalLandArea />} // Adjust icon
            title="Total No: of Units"
            value={`${totalUnit} Units`}
            className="mr-[5%] pt-[2%] mb-[3%] "
          />
          <ProjBasicDetails
            key="locality"
            icon={<Locality />}
            title="Locality"
            value={localityName}
            className="mr-[5%] pt-[2%] mb-[3%] "
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
            className="mr-[5%] pt-[2%] mb-[3%] "
          />
          {phaseList?.length == 1 && (
            <ProjBasicDetails
              key="rerastatus"
              icon={<ReraStatusProj />}
              title="RERA Status"
              value={PhaseOverview[0]?.rerastatus}
              className="mr-[5%] pt-[2%] mb-[3%] "
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
                className="mr-[5%] pt-[2%] mb-[3%] "
              />
            )}
        </div>
        <div className=" flex justify-start md:justify-end items-start md:items-end flex-col mt-[3%] md:mt-0 relative pb-10">
          <ShortList />
          <CompareList />
          <Message />
        </div>
      </div>
      <OverviewBanner
        maxPrice={maxPrice}
        minPrice={minPrice}
        name={projectName}
        builderId={builderId}
      />
    </div>
  );
}
