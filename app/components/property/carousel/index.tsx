"use client";
import React from "react";
import ProjectCarousel from "../../project/ProjectCard";
import useNearby from "@/app/hooks/property/useNearBy";

export default function NearByCarouselProperty({
  projName,
  lat,
  lng,
  projId,
  cg,
}: {
  projName: string;
  lat: string;
  lng: string;
  projId?: string;
  cg: string;
}) {
  const { data } = useNearby({ lat, lng, projId, cg });
  return (
    <div
      className="flex flex-col justify-start items-start w-[100%] mt-[5%] scroll-mt-[220px]"
      id="similar"
    >
      <ProjectCarousel
        type="prop"
        title="Other SELL listings in this Project"
        projName={projName}
        content="See some more listings available in this project"
        data={
          data != undefined && data.otherListing != undefined
            ? data.otherListing
            : []
        }
      />

      <ProjectCarousel
        type="prop"
        title="NEARBY SIMILAR SELL LISTINGS"
        content="Check some similar nearby listings available"
        data={
          data != undefined && data.projListing != undefined
            ? data.projListing
            : []
        }
      />
    </div>
  );
}
