"use client";
import useNearby from "@/app/hooks/useNearby";
import React from "react";

export default function NearByCarousel() {
  const { data } = useNearby();
  console.log(data);
  return (
    <div>
      {JSON.stringify(data)}
      {/* <div className="flex flex-col justify-start items-start w-[90%]">
          <ProjectCarousel
            type="proj"
            title="nEAR BY pROJECTS OF"
            projName={data.projectName}
            content="See what other customers also viewed"
          />

          <ProjectCarousel
            type="prop"
            title="Projects By Developers"
            content="See what developers has posted"
          />
        </div> */}
    </div>
  );
}
