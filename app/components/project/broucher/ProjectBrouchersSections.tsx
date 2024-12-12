"use client";
import { memo, useState, useEffect } from "react";
import BrocherContent from "./BrocherContent";

interface PhaseOverview {
  phaseId: number;
  phaseName: string | null;
  phaseBrochureUrl: string | null;
}

const ProjectBrouchersSection = ({
  projName,
  phaseOverviewData,
  singleBroucher,
}: {
  projName: string;
  phaseOverviewData: PhaseOverview[];
  singleBroucher: string;
}): JSX.Element | null => {
  const isBrocherAvail =
    singleBroucher || phaseOverviewData.some((phase) => phase.phaseBrochureUrl);
  const [deviceMemory, setDeviceMemory] = useState(null);

  // useEffect(() => {
  //   if ("deviceMemory" in navigator) {
  //     setDeviceMemory(navigator.deviceMemory);
  //   } else {
  //     console.log(
  //       "Device memory information is not supported in this browser."
  //     );
  //   }
  // }, []);
  // console.log(deviceMemory);
  if (!isBrocherAvail) return null;
  return (
    <BrocherContent
      projName={projName}
      phaseOverviewData={phaseOverviewData}
      singleBrocher={singleBroucher}
    />
  );
};

export default memo(ProjectBrouchersSection);
