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
}: {
  projName: string;
  phaseOverviewData: PhaseOverview[];
}): JSX.Element | null => {
  const isBrocherAvail = phaseOverviewData.some((phase) => phase.phaseBrochureUrl);
  if (!isBrocherAvail) return null;
  return (
    <BrocherContent projName={projName} phaseOverviewData={phaseOverviewData} />
  );
};

export default memo(ProjectBrouchersSection);
