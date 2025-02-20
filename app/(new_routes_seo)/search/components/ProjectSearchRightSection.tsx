"use client";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import MapSkeleton from "@/app/components/maps/Skeleton";

import { useInfiniteQuery } from "react-query";
import { getSearchData } from "../utils/project-search-queryhelpers";
import { useQueryState } from "nuqs";
import RTK_CONFIG from "@/app/config/rtk";
import { usePathname } from "next/navigation";
import ModalBox from "@/app/test/newui/components/Card/Top/Right/ModalBox";
import { useMediaQuery } from "@mantine/hooks";
import { useAtom, useAtomValue } from "jotai";
import { modalPopup, selectedNearByAtom } from "@/app/store/search/map";
import Overlay from "@/app/test/newui/components/modals/Overlay";
import LocationCard from "@/app/test/newui/components/modals/overly_items/LocationList";

const RightSection = ({ serverData }: any) => {
  const Map = useMemo(
    () =>
      dynamic(
        () => import("@/app/components/maps/search/ProjectSearchPageMap"),
        {
          loading: () => <MapSkeleton />,
          ssr: false,
        }
      ),
    []
  );
  const [apiFilterQueryParams] = useQueryState("sf");
  const pathname = usePathname();
  let isTrue = pathname.includes("search")
    ? true
    : serverData !== null && apiFilterQueryParams !== null;
  const isMobile = useMediaQuery("(max-width: 601px)");
  const [mapPopup, setMapPopup] = useAtom(modalPopup);
  const {data: nearByData, isOpen} = useAtomValue(selectedNearByAtom);
  
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [
        `searchQuery${apiFilterQueryParams ? `-${apiFilterQueryParams}` : ""}`,
      ],
      queryFn: async ({ pageParam = 0 }) => {
        if (!isTrue) {
          return serverData;
        }
        const response = await getSearchData(
          pageParam,
          apiFilterQueryParams ? apiFilterQueryParams : ""
        );

        return response;
      },
      getNextPageParam: (lastPage: any, allPages: any) => {
        const nextPage = allPages.length; 
        if (lastPage.length < 20) {
          return;
        }
        return nextPage;
      },
      ...RTK_CONFIG,
      enabled: false,
    }); 
  const apidata = !isTrue ? serverData : data?.pages?.flat() || [];

  return (
    !isMobile ?
      <div
        className=" w-full max-h-[70vh] sm:fixed right-0 flex justify-start items-start md:w-[60%] xl:w-[50%] scroll-mt-[150px] z-0 "
        id="mobileMap"
      >
        <Map
          projName={"Searched Location"}
          lat={(apidata && apidata[0]?.lat) ?? 47.46489}
          lang={(apidata && apidata[0]?.lang) ?? 15.34043}
          data={apidata}
          type={"proj"}
          styles="h-[calc(100vh-65vh)] sm:h-[calc(78vh)] md:h-[calc(100vh-220px)] xl:h-[calc(100vh-262px)] w-full  max-w-full"
        />
      </div>
      :
      mapPopup.isOpen && 
      <ModalBox 
        isOpen={mapPopup.isOpen}
        handleChange={()=>setMapPopup((prev:any) => ({...prev, isOpen: false}))} 
      >
        <div className="flex flex-col justify-between items-center h-full w-full ">
          <div
            className={` w-full ${nearByData && Object.keys(nearByData).length > 0 ? "h-[calc(100vh-70vh)]" : "h-[calc(100vh-40vh)]"} right-0 flex justify-start items-start md:w-[60%] xl:w-[50%] scroll-mt-[150px] z-0 relative `}
          >
            <Map
              projName={"Searched Location"}
              lat={(apidata && apidata[0]?.lat) ?? 47.46489}
              lang={(apidata && apidata[0]?.lang) ?? 15.34043} 
              data={apidata}
              type={"proj"}
              // styles="h-[calc(100vh-40vh)] w-full max-w-full"
              styles={` z-1 w-full max-w-full ${nearByData && Object.keys(nearByData).length > 0 ? "h-[calc(100vh-70vh)]" : "h-[calc(100vh-40vh)]"}`}
            />
          </div>

          {nearByData && Object.keys(nearByData).length > 0 &&
          <div className="!max-h-[300px] overflow-y-auto w-full ">
            <LocationCard data={nearByData} />
          </div>
          }
        </div>

      </ModalBox>
  );
};
 
export default RightSection;
