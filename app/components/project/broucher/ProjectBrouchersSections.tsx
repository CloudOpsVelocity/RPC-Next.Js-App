import { memo } from "react";
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
