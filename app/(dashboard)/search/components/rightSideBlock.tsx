"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import MapSkeleton from "@/app/components/maps/Skeleton";

const RightSideBlock = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/maps"), {
        loading: () => <MapSkeleton />,
        ssr: false,
      }),
    []
  );
  return (
    <div className=" w-[50%] flex justify-center items-start ">
      <Map projName={"Searched Location"} lat={47.46489} lang={15.34043} />
    </div>
  );
};

export { RightSideBlock };
