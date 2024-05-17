"use client";
import useNearby from "@/app/hooks/useNearby";
import React from "react";
import ProjectCarousel from "./ProjectCard";
import useBuilder from "@/app/hooks/useBuilder";

export default function NearByCarousel({
  projName,
  lat,
  lng,
  projId,
  builderId,
}: {
  projName: string;
  lat: string;
  lng: string;
  projId?: string;
  builderId: number;
}) {
  const { data, mutate } = useNearby({ lat, lng, projId, builderId });
  const { data: builderData } = useBuilder({
    id: builderId,
    y: "N",
    type: "proj",
  });
  return (
    <div
      className="flex flex-col justify-start items-start w-full mt-[5%] scroll-mt-[180px]"
      id="similar"
    >
      <ProjectCarousel
        type="proj"
        title="Projects By"
        content="See what builder has posted"
        projName={builderData?.data?.companyName}
        data={
          data != undefined && data.builderProj != undefined
            ? data.builderProj
            : []
        }
        mutate={mutate}
        ct="builder"
      />
      <ProjectCarousel
        type="proj"
        title="nEAR BY pROJECTS OF"
        projName={projName}
        content="See what other customers also viewed"
        data={
          data != undefined && data.nearbyProj != undefined
            ? data.nearbyProj
            : []
        }
        mutate={mutate}
        ct="proj"
      />
    </div>
  );
}
