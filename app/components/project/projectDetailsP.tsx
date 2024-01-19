"use client";
import { projectprops } from "@/app/data/projectDetails";
import Button from "@/app/elements/button";
import {
  EndDate,
  IdIcon,
  SecurityIcon,
  StartDate,
  TotalLandArea,
} from "@/app/images/commonSvgs";
import ProjBasicDetails from "@/app/components/project/projBasicDetails";
import PropertyTypeDetailsCrad from "@/app/components/project/propertyTypeDetailsCrad";
import React, { useState } from "react";
import { PhaseList } from "@/app/validations/types/project";
import { useQuery } from "react-query";
import { getProjectWiseOverView } from "@/app/utils/api/project";
type Props = {
  data: PhaseList[];
  slug: string;
};
export default function ProjectDetailsP({ data, slug }: Props) {
  const phases = [
    { phaseId: 554, phaseName: "Phase 1" },
    { phaseId: 555, phaseName: "Phase 2" },
    { phaseId: 559, phaseName: "Phase 3" },
  ];
  const [currentPhase, setCurrentPhase] = useState(554);
  const handlePhaseChange = (phaseId: number) => {
    setCurrentPhase(phaseId);
  };
  const { data: PhaseOverview } = useQuery({
    queryKey: [`phases`],
    queryFn: () => getProjectWiseOverView(slug),
  });
  const selectedPhase = PhaseOverview?.find(
    (phase: any) => phase.phaseId === currentPhase
  );
  return (
    <div className="w-[90%] mb-[5%]" id="propertyDetails">
      <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35]">
        Property Details{" "}
        <span className="text-[#148B16] font-[700] uppercase">SARANG</span>{" "}
      </h1>

      <p className="text-[16px] lg:text-[24px] font-[500] text-[#4D6677]">
        Know about your dream project and its details; Where comfort meets
        Luxury, Where every details matters
      </p>

      <div className=" flex justify-start items-center mt-[2%] mb-[2%]">
        <p className="text-[20px] lg:text-[24px] font-[500] text-[#333] mr-[20px] ">
          Select one of the phase to see project details
        </p>
        <div className=" flex justify-start items-start flex-wrap gap-[10px] ">
          {phases?.map((phase, index) => (
            <Button
              key={phase.phaseId}
              title={phase.phaseName}
              onChange={() => handlePhaseChange(phase.phaseId)}
              buttonClass={` mb-[5px] text-[16px] lg:text-[24px] bg-[#ECF7FF] p-[8px] xl:p-[16px]  whitespace-nowrap text-[#000] rounded-[8px] ${
                currentPhase === phase.phaseId
                  ? " font-[600] border-solid border-[1px] border-[#0073C6] "
                  : " font-[400]"
              } `}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-start items-start flex-wrap w-[80%]">
        {selectedPhase && (
          <>
            <ProjBasicDetails
              key="launchDate"
              icon={<EndDate />}
              title="Launch Date"
              value={selectedPhase.launchDate}
              className="mr-[3%] mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]"
            />
            <ProjBasicDetails
              key="possessionDate"
              icon={<StartDate />}
              title="Possession Date"
              value={selectedPhase.possassionDate}
              className="mr-[3%] mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]"
            />
            <ProjBasicDetails
              key="landArea"
              icon={<TotalLandArea />}
              title="Land Area"
              value={`${selectedPhase.landArea} Acers`}
              className="mr-[3%] mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]"
            />
            <ProjBasicDetails
              key="reraStatus"
              icon={<SecurityIcon />}
              title="RERA STATUS"
              value={selectedPhase.rerastatus}
              className="mr-[3%] mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]"
            />
            <ProjBasicDetails
              key="reraId"
              icon={<IdIcon />}
              title="RERA ID"
              value={selectedPhase.reraId}
              className="mr-[3%] mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]"
            />
          </>
        )}
      </div>
      <div className="flex justify-start items-start gap-[4%] flex-wrap mt-[3%]">
        {selectedPhase && (
          <>
            {Object.keys(selectedPhase.propTypeOverview).map(
              (propertyTypeKey) => (
                <PropertyTypeDetailsCrad
                  key={propertyTypeKey}
                  cg={selectedPhase.propTypeOverview[propertyTypeKey]}
                  propertyType={propertyTypeKey}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}
