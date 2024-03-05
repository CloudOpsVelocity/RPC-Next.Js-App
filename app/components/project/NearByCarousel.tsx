"use client";
import useNearby from "@/app/hooks/useNearby";
import React from "react";
import ProjectCarousel from "./ProjectCard";

export default function NearByCarousel({
  projName,
  lat,
  lng,
  projId,
}: {
  projName: string;
  lat: string;
  lng: string;
  projId?: string;
}) {
  const { data } = useNearby({ lat, lng, projId });
  return (
    <div
      className="flex flex-col justify-start items-start w-[90%] mt-[5%]"
      id="similar"
    >
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
      />

      <ProjectCarousel
        type="proj"
        title="Projects By Developers"
        content="See what developers has posted"
        data={
          data != undefined && data.builderProj != undefined
            ? data.builderProj
            : []
        }
      />
    </div>
  );
}
