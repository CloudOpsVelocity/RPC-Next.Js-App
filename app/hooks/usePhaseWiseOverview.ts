import React, { useState } from "react";
import { useQuery } from "react-query";
import { getProjectWiseOverView } from "../utils/api/project";
import { useParams } from "next/navigation";

export default function usePhaseWiseOverview() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const handlePhaseChange = (phaseId: number) => {
    console.log(phaseId);
    setCurrentPhase(phaseId);
  };
  const { slug } = useParams<{ slug: string }>();
  const { data: PhaseOverview, isLoading } = useQuery({
    queryKey: [`phases`],
    queryFn: () => getProjectWiseOverView(slug),
    onSuccess: (data) => {
      setCurrentPhase(data[0].phaseId);
    },
    keepPreviousData: true,
    staleTime: 30000,
    cacheTime: 300000,
  });
  const phaseList = PhaseOverview?.map((phase: any) => {
    return {
      phaseId: phase.phaseId,
      phaseName: phase.phaseName,
    };
  });
  return {
    phaseList,
    PhaseOverview,
    isLoading,
    handlePhaseChange,
    currentPhase,
    setCurrentPhase,
  };
}
