"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getProjectWiseOverView } from "../utils/api/project";
import { useParams } from "next/navigation";
import { currentPhaseAtom } from "../store/vewfloor";
import { useAtom } from "jotai";

export default function usePhaseWiseOverview() {
  const [currentPhase, setFloorPhase] = useAtom(currentPhaseAtom);
  // const [currentPhase, setCurrentPhase] = useState(0);
  const handlePhaseChange = (phaseId: number) => {
    setFloorPhase(phaseId);
  };
  const { slug } = useParams<{ slug: string }>();
  const { data: PhaseOverview, isLoading } = useQuery({
    queryKey: [`phaseoverview` + slug],
    queryFn: () => getProjectWiseOverView(slug),
    onSuccess: (data) => {
      setFloorPhase(data[0].phaseId);
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
  const hasReraStatus =
    PhaseOverview &&
    PhaseOverview.some((phase: any) => phase.rerastatus === "Recieved");

  return {
    phaseList,
    PhaseOverview,
    isLoading,
    handlePhaseChange,
    currentPhase,
    setCurrentPhase: setFloorPhase,
    hasReraStatus,
  };
}
