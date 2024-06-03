"use client";
import React from "react";
import ProjectCarousel from "../../property/carousel/PropertyCard";
import useNearby from "@/app/hooks/property/useNearBy";

export default function NearByCarouselProperty({
  projName,
  lat,
  lng,
  projId,
  cg,
  propTypeName,
}: {
  projName: string;
  lat: string;
  lng: string;
  projId?: string;
  cg: string;
  propTypeName?: string;
}) {
  const { data } = useNearby({ lat, lng, projId, cg });
  return (
    <div
      className="flex flex-col justify-start items-start w-[100%] mt-[5%] scroll-mt-[220px]"
      id="similarListing"
    >
      <ProjectCarousel
        type="prop"
        title={
          propTypeName === "Independent House/Building"
            ? "NEARBY SIMILAR SELL LISTINGS"
            : "Other SELL listings in this Project"
        }
        projName={propTypeName === "Independent House/Building" ? "" : projName}
        content={
          propTypeName === "Independent House/Building"
            ? "Check some similar nearby listings available"
            : "See some more listings available in this project"
        }
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
