"use client";
// import { useHydrateAtoms } from "jotai/utils";
import dynamic from "next/dynamic";
import { useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";
import {
  // initialState,
  projSearchStore,
  // projSearchStore,
  searchPageMapToggle,
} from "../../store/newSearchProjectStore";
import Image from "next/image";
import { useAtom, useSetAtom } from "jotai";
import { useMediaQuery } from "@mantine/hooks";
import LeftSection from "../components/ProjectSearchLeftSection";
// import { useRouter } from "next/navigation";
const RightSection = dynamic(
  () => import("../components/ProjectSearchRightSection"),
  { ssr: false }
);
type Props = {
  serverData: any;
  frontendFilters: any;
  preAppliedFilters: any;
};

export default function Mainsection({
  frontendFilters,
  serverData,
  preAppliedFilters = null,
}: Props) {
  const [apiFilterQueryParams] = useQueryState("sf");
  // const setStore = useSetAtom(projSearchStore);
  const [isMapLoaded, setIsMapLoaded] = useAtom(searchPageMapToggle);
  // useEffect(() => {
  //   setStore({
  //     type: "update",
  //     payload: {
  //       ...initialState,
  //       ...frontendFilters,
  //     },
  //   });
  // }, [frontendFilters]);
  const isMobile = useMediaQuery("(max-width: 601px)");
  // const filtersData = Object.assign(frontendFilters, initialState);
  // useHydrateAtoms(
  //   [
  //     [
  //       projSearchStore,
  //       {
  //         type: "update",
  //         payload: {
  //           ...frontendFilters,
  //         },
  //       },
  //     ],
  //   ],
  //   {
  //     dangerouslyForceHydrate: true,
  //   }
  // );

  const [it, setIsTrue] = useState(apiFilterQueryParams !== preAppliedFilters);

  return (
    <>
      {/* {!isMobile && (
        <>
          <link
            rel="preconnect"
            href="https://media.getrightproperty.com"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            as="image"
            href={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/default-search-page-map.webp`}
          />
        </>
      )} */}

      <LeftSection
        serverData={serverData}
        frontendFilters={frontendFilters}
        isTrue={it}
        setIsTrue={setIsTrue}
        apiFilterQueryParams={apiFilterQueryParams}
        preAppliedFilters={preAppliedFilters}
      />
      {/* <div className="w-[100%] sm:w-[50%] -z-10" /> */}

      {isMapLoaded || isMobile ? (
        <RightSection
          serverData={serverData}
          key="projRightSection2"
          isTrue={it}
        />
      ) : (
        isMobile !== undefined &&
        isMobile === false && (
          <div className="hidden md:flex relative  md:w-[50%] max-w-full sm:fixed right-0 z-0 border-1 border-black border-solid justify-center items-center overflow-hidden max-h-[70vh] h-full w-full">
            <Image
              priority
              src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/default-search-page-map.webp`}
              alt="Search page map Image"
              fill
              quality={80}
              // className="object-contain"
              className="h-full w-full"
            />

            <button
              aria-label="Click to View Location Details"
              title="Click to View Location Details"
              onClick={() => setIsMapLoaded(true)}
              className="absolute z-10 px-6 py-3 text-white rounded-lg bg-btnPrimary shadow-lg hover:bg-btnPrimary transition-colors"
            >
              <span className="text-lg font-semibold">
                Click to View Location Details
              </span>
            </button>
          </div>

          // <div
          //   className={`hidden md:flex relative w-full !max-h-[70vh] sm:fixed right-0 flex justify-center items-center md:w-[50%] scroll-mt-[150px] z-0 border-[2px] border-black-500 border-solid h-[calc(100vh-65vh)] md:h-[calc(100vh-255px)] max-w-full`}
          // >
          //   <Image
          //     priority
          //     height={630}
          //     width={1200}
          //     src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/default-search-page-map.webp`}
          //     alt="search page map Image"
          //     className="h-full w-full !max-h-[100vh]"
          //     quality={80}
          //   />

          //   <button
          //     aria-label="Click to View Location Details"
          //     name="Click to View Location Details"
          //     title="Click to View Location Details"
          //     onClick={() => setIsMapLoaded(true)}
          //     className="absolute z-8 px-6 py-3 text-white rounded-lg bg-btnPrimary shadow-lg hover:bg-btnPrimary transition-colors "
          //   >
          //     <span className="text-lg font-semibold">
          //       Click to View Location Details
          //     </span>
          //   </button>
          // </div>
        )
      )}
    </>
  );
}
