"use client";
import { useHydrateAtoms } from "jotai/utils";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";
import React, { useState } from "react";
import { projSearchStore } from "../store/projSearchStore";
const LeftSection = dynamic(
  () => import("../components/ProjectSearchLeftSection")
);
const RightSection = dynamic(
  () => import("../components/ProjectSearchRightSection")
);
type Props = {
  serverData: any;
  frontendFilters: any;
};

export default function Mainsection({ frontendFilters, serverData }: Props) {
  const [apiFilterQueryParams] = useQueryState("sf");
  useHydrateAtoms([
    [
      projSearchStore,
      {
        type: "update",
        payload: {
          ...frontendFilters,
        },
      },
    ],
  ]);

  const pathname = usePathname();
  const [it, setIsTrue] = useState(
    pathname.includes("search")
      ? true
      : serverData !== null && apiFilterQueryParams !== null
  );
  const isTrue = it || (serverData !== null && apiFilterQueryParams !== null);

  return (
    <>
      <LeftSection
        serverData={apiFilterQueryParams === null ? serverData : null}
        frontendFilters={frontendFilters}
        isTrue={isTrue}
        setIsTrue={setIsTrue}
      />
      <div className="w-[100%] sm:w-[50%] -z-10" />
      <RightSection
        serverData={apiFilterQueryParams === null ? serverData : null}
        key="projRightSection2"
        isTrue={isTrue}
      />
    </>
  );
}
