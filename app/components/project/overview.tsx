import React from "react";
import PriceBag, {
  EndDate,
  Locality,
  Phone,
  ProjectStatus,
  PropertyAvailable,
  RatingStar,
  StartDate,
  TotalLandArea,
  WhatsAppButton,
} from "@/app/images/commonSvgs";
import ProjBasicDetails from "@/app/components/project/projBasicDetails";
import Button from "../../elements/button";
import { Main } from "@/app/validations/types/project";
import OverviewBanner from "./overviewBanner";
import { useDisclosure } from "@mantine/hooks";

export default function Overview({
  maxPrice,
  minPrice,
  postedBy,
  projectName,
  address,
  projectStatus,
  availableProperties,

  totalLandArea,
  totalUnit,
  localityName,
  startDate,
  endDate,
}: Main) {
  return (
    <div
      className="pt-[2%] w-[90%] rounded-[24px] shadow-md mb-[5%] mt-[2%] bg-gradient-to-r from-[#F6F6F6] /0 via-[#FFF] /45 to-[#FEFFFF]/100 "
      id="overview"
    >
      <div className="pl-[2%] pr-[2%] flex justify-between items-center ">
        <div>
          <h2 className="text-[24px] lg:text-[32px] text-[#148B16] font-[700]">
            {projectName}
          </h2>
          <p className="text-[16px] lg:text-[24px] text-[#505050] font-[500]">
            {address}
          </p>
        </div>
        <div className="flex justify-center items-end flex-col">
          <p className="text-[20px] flex justify-start items-start lg:text-[24px] text-[#4D6677] font-[700] whitespace-nowrap">
            4.0 Ratings
            <RatingStar fill="#FFD600" className="h-[32px] w-[32px]" />
          </p>
          <p className="text-[20px] lg:text-[24px] text-[#0073C6] font-[600] decoration-dashed underline whitespace-nowrap ">
            Call now
          </p>
        </div>
      </div>

      <div className="pl-[2%] pr-[2%] flex justify-start md:justify-between items-start md:items-end w-full mb-[3%] mt-[3%] flex-col md:flex-row ">
        <div className="flex justify-start items-start flex-wrap w-[100%] md:w-[80%] ">
          <ProjBasicDetails
            key="propertyAvailable"
            icon={<PropertyAvailable />}
            title="Property Available"
            value={availableProperties.join(", ")}
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
            value={totalLandArea}
            className="mr-[5%] pt-[2%] mb-[3%] "
          />
          <ProjBasicDetails
            key="elevation"
            icon={<TotalLandArea />} // Adjust icon
            title="Elevation"
            value={"G + 3"}
            className="mr-[5%] pt-[2%] mb-[3%] "
          />
          <ProjBasicDetails
            key="totalUnits"
            icon={<TotalLandArea />} // Adjust icon
            title="Total No: of Units"
            value={totalUnit}
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
            value={startDate}
            className="mr-[5%] pt-[2%] mb-[3%] "
          />
          <ProjBasicDetails
            key="endDate"
            icon={<EndDate />}
            title="End Date"
            value={endDate}
            className="mr-[5%] pt-[2%] mb-[3%] "
          />
        </div>
        <div className=" flex justify-start md:justify-end items-start md:items-end flex-col mt-[3%] md:mt-0 ">
          <p className="text-[20px] lg:text-[24px] text-[#0073C6] font-[600] whitespace-nowrap underline decoration-dashed ">
            Add to Compare
          </p>
          <p className="text-[20px] lg:text-[24px] text-[#0073C6] font-[600] underline whitespace-nowrap decoration-dashed ">
            Add to Shortlist
          </p>
        </div>
      </div>
      <OverviewBanner maxPrice={maxPrice} minPrice={minPrice} />
    </div>
  );
}
