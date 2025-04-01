"use client";
import { useHydrateAtoms } from "jotai/utils";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";
import React, { useState } from "react";
import { projSearchStore, searchPageMapToggle } from "../store/projSearchStore";
import Image from "next/image";
import { useAtom, useAtomValue } from "jotai";
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
  const [isMapLoaded, setIsMapLoaded] = useAtom(searchPageMapToggle);

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
  console.log({ apiFilterQueryParams });
  return (
    <>
      <LeftSection
        serverData={apiFilterQueryParams === null ? serverData : null}
        frontendFilters={frontendFilters}
        isTrue={isTrue}
        setIsTrue={setIsTrue}
      />
      <div className="w-[100%] sm:w-[50%] -z-10" />
      {isMapLoaded ? 
          <RightSection
            serverData={apiFilterQueryParams === null ? serverData : null} 
            key="projRightSection2"
            isTrue={isTrue}
          />
      :
        <div
            className={`relative w-full max-h-[70vh] sm:fixed right-0 flex justify-center items-center md:w-[60%] xl:w-[50%] scroll-mt-[150px] z-0 border-[2px] border-black-500 border-solid 
                        h-[calc(100vh-65vh)] md:h-[calc(100vh-255px)] w-full max-w-full`}
        >
            <Image
                  height={630}
                  width={1200}
                  src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/default-search-page-map.webp`}
                  alt="search page map Image"
                  className="h-full w-full"
                  quality={80}
            />

            <button
              onClick={() => setIsMapLoaded(true)}
              className="absolute z-8 px-6 py-3 text-white rounded-lg bg-btnPrimary shadow-lg hover:bg-btnPrimary transition-colors "
            >
              <span className="text-lg font-semibold">
                Click to View Location Details
              </span>
            </button>
        </div> 
        }
    </>
  );
}
