"use client";
import useNearby from "@/app/hooks/useNearby";
import React, { Fragment } from "react";
import useBuilder from "@/app/hooks/useBuilder";
import ProjectCarousel from "../../project/ProjectCard";
import { slugify } from "../BreadCrumb/ListingBreadcrumb";

export default function NearByCarouselProjProperty({
  projName,
  lat,
  lng,
  projId,
  builderId,
  company,
  nearBy,
}: {
  projName: string;
  lat: string;
  lng: string;
  projId?: string;
  builderId?: number; 
  company: string;
  nearBy?: {
    title: string;
  };
}) {
  const { data, mutate } = useNearby({ lat, lng, projId, builderId, company });
  const { data: builderData } = useBuilder({
    id: builderId ?? 1109,
    y: "N",
    type: "proj", 
  });

  // console.log(data?.nearbyProj);

  return (
    <div
      className="flex flex-col justify-start items-start w-full  scroll-mt-[150px]"
      id="similar-projects"
    >
      <ProjectCarousel
        type="proj"
        title={
          <Fragment>
            Other Projects By{" "}
            <span className="text-[#148B16]">
              {builderData?.data?.userName}
            </span>
          </Fragment>
        }
        builderLinkActive
        content="See what builder has posted"
        projName={""}
        data={
          data != undefined && data.builderProj != undefined
            ? data.builderProj
            : []
        }
        mutate={mutate}
        // builderName={builderData?.data?.userName}
        ct="builder"
        url={`/search?sf=builderIds=${builderData?.data?.userName ?? ""}${builderId ?? ""}`}
      />
      <ProjectCarousel
        type="proj"
        title={
          <Fragment>
            Nearby Projects{" "}
            <span className="text-[#148B16]"> 
              {builderData?.data?.userName}
            </span>
          </Fragment>
        }
        builderLinkActive
        content="See what builder has posted"
        projName={""}
        data={
          data != undefined && data.nearbyProj != undefined
            ? data.nearbyProj
            : []
        }
        mutate={mutate}
        // builderName={builderData?.data?.userName}
        ct="builder"
        url={`/search?sf=lat=${lat}-lng=${lng}`}
      />
    </div>
  );
}
