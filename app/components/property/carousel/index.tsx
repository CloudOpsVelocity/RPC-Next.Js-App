"use client";
import React from "react";
import ProjectCarousel from "../../property/carousel/PropertyCard";
import useNearby from "@/app/hooks/property/useNearBy";
import { listingProps } from "@/app/data/projectDetails";

export default function NearByCarouselProperty({
  projName,
  lat,
  lng,
  projId,
  cg,
  propTypeName,
  bhkId,
}: {
  projName: string;
  lat: string;
  lng: string;
  projId?: string;
  cg: string;
  propTypeName: string;
  bhkId: number;
}) {
  const { data, mutate } = useNearby({
    lat,
    lng,
    projId,
    cg,
    bhkId,
    propType: listingProps[propTypeName.trim() as keyof typeof listingProps],
  });
  const listingType = cg === "R" ? "RENT" : "SELL";

  return (
    <div
      className="flex flex-col justify-start items-start w-[100%] mt-[5%] scroll-mt-[220px]"
      id="similarListing"
    >
      <ProjectCarousel
        type="prop"
        title={"Other SELL listings in this Project"}
        projName={""}
        content={
          propTypeName === "Independent House/Building"
            ? `Check some similar nearby ${listingType.toLowerCase()} listings available`
            : `See some more ${listingType.toLowerCase()} listings available in this project`
        }
        data={
          data != undefined && data.projListing != undefined
            ? data.projListing
            : []
        }
        mutate={mutate}
        ct="proj"
      />
      <ProjectCarousel
        type="prop"
        title={`NEARBY SIMILAR ${listingType} LISTINGS`}
        content={`Check some similar nearby ${listingType.toLowerCase()} listings available`}
        data={
          data != undefined && data.otherListing != undefined
            ? data.otherListing
            : []
        }
        mutate={mutate}
        ct="other"
      />
    </div>
  );
}
