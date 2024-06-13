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
import React from "react";
import { PhaseList } from "@/app/validations/types/project";
import usePhaseWiseOverview from "@/app/hooks/usePhaseWiseOverview";
import { formatDateDDMMYYYY } from "@/app/utils/date";
import { isSingleLetterOrNumber } from "@/app/utils/letters";
import { sqftToAcres } from "@/app/utils/landarea";
import NoProperties from "./notfound";
import SubHeading from "./headings/SubHeading";
type Props = {
  data: PhaseList[];
  slug: string;
  projName: string;
};
const styles = {
  box: "mr-[3%] mb-[4%] md:mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8] ",
};
export default function ProjectDetailsP({ projName }: Props) {
  const { PhaseOverview, currentPhase, handlePhaseChange, phaseList } =
    usePhaseWiseOverview();
  const selectedPhase = PhaseOverview?.find(
    (phase: any) => phase.phaseId === currentPhase
  );
  const propertyTypeOrder = ["apt", "rowHouse", "villa", "vlmt", "plot"];
  const orderedPropertyTypes =
    selectedPhase &&
    propertyTypeOrder.filter((propertyType) =>
      Object.keys(selectedPhase.propTypeOverview).includes(propertyType)
    );
  return (
    <div className="w-[90%] mb-[5%] scroll-mt-[180px]" id="propertyDetails">
      <h1 className="text-[20px] lg:text-[32px] font-[600] text-[#001F35] mb-[12px]">
        Property Details Of{" "}
        <span className="text-[#148B16] font-[700] ">{projName}</span>{" "}
      </h1>
      <SubHeading
        text="Know about your dream project and its details; where comfort meets
        luxury, where every details matters"
      />

      <div className=" sm:flex justify-start items-center mt-[2%] mb-[1%]">
        {PhaseOverview && PhaseOverview?.length > 1 && (
          <>
            <p className="text-[16px] lg:text-[24px] font-[500] text-[#333] mr-[20px] ">
              Select one of the phase to see project details
            </p>
            <div className=" flex justify-start items-start flex-wrap gap-[10px] mt-1 sm:mt-0">
              {PhaseOverview?.map((phase: any, index: any) => {
                return (
                  <Button
                    key={phase.phaseId}
                    title={
                      isSingleLetterOrNumber(phase.phaseName)
                        ? `Phase: ${phase.phaseName}`
                        : phase.phaseName
                    }
                    onChange={() => handlePhaseChange(phase.phaseId)}
                    buttonClass={` mb-[5px] text-[18px] lg:text-[20px] bg-[#ECF7FF] p-[8px] xl:px-[8px]  whitespace-nowrap text-[#000] rounded-[8px] ${
                      currentPhase === phase.phaseId
                        ? " font-[600] border-solid border-[1px] border-[#0073C6] "
                        : " font-[400]"
                    } `}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
      {orderedPropertyTypes?.length === 0 && (
        <NoProperties
          phase={
            phaseList?.find((phase: any) => phase.phaseId == currentPhase)
              ?.phaseName as any
          }
          className={"mb-6"}
        />
      )}
      {phaseList?.length > 1 && (
        <div className="flex justify-start items-start flex-wrap w-full">
          {selectedPhase && (
            <>
              <ProjBasicDetails
                key="launchDate"
                icon={<EndDate />}
                title="Launch Date"
                value={formatDateDDMMYYYY(selectedPhase.launchDate)}
                className={styles.box}
              />
              <ProjBasicDetails
                key="possessionDate"
                icon={<StartDate />}
                title="Possession Date"
                value={formatDateDDMMYYYY(selectedPhase.possassionDate)}
                className={styles.box}
              />
              <ProjBasicDetails
                key="landArea"
                icon={<TotalLandArea />}
                title="Land Area"
                value={
                  selectedPhase.landArea
                    ? `${sqftToAcres(selectedPhase.landArea).toFixed(2)} Acers`
                    : null
                }
                className={styles.box}
              />
              <ProjBasicDetails
                key="reraStatus"
                icon={<SecurityIcon />}
                title="RERA STATUS"
                value={
                  selectedPhase.rerastatus === "Not Applied"
                    ? "Upcoming"
                    : selectedPhase.rerastatus
                }
                className={styles.box}
              />
              {selectedPhase.reraId && (
                <ProjBasicDetails
                  key="reraId"
                  icon={<IdIcon />}
                  title={
                    selectedPhase.rerastatus === "Applied"
                      ? "Acknowledgement Number"
                      : "RERA ID"
                  }
                  value={selectedPhase.reraId}
                  className={styles.box}
                />
              )}
            </>
          )}
        </div>
      )}

      <div className="flex justify-start items-start gap-[4%] flex-wrap mt-[3%]">
        {selectedPhase && (
          <>
            {orderedPropertyTypes.map((propertyTypeKey: any) => {
              const enable =
                selectedPhase.propTypeOverview[propertyTypeKey].unitTypes
                  ?.length > 0;

              return (
                enable && (
                  <PropertyTypeDetailsCrad
                    phase={currentPhase}
                    key={propertyTypeKey}
                    cg={selectedPhase.propTypeOverview[propertyTypeKey]}
                    propertyType={propertyTypeKey}
                  />
                )
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
