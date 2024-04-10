import React from "react";
import { useQuery } from "react-query";
import { getProjectUnits } from "../utils/api/project";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { currentPhaseAtom, propCgIdAtom } from "../store/vewfloor";
import { useParams } from "next/navigation";
import { floorPlansArray } from "../store/floor";
import { QueryCache } from "@tanstack/react-query";

export default function useUnitTypes() {
  // const setFloorPlans = useSetAtom(floorPlansArray);
  const { slug } = useParams<{ slug: string }>();
  const propCgId = useAtomValue(propCgIdAtom);
  const currentPhase = useAtomValue(currentPhaseAtom);
  const { data: projectUnitsData, isLoading } = useQuery({
    queryKey: [`/${propCgId}/${currentPhase}/${slug}`],
    queryFn: () => getProjectUnits(slug, currentPhase, propCgId),
    keepPreviousData: true,
    staleTime: 30000,
    cacheTime: 300000,
  });
  return {
    projectUnitsData,
    isLoading,
  };
}
