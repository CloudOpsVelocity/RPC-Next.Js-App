/* eslint-disable no-unused-vars */
"use client";
import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Coordinates } from "@/app/utils/maps";
import { useMediaQuery } from "@mantine/hooks";
import { nearbyLocationIcon } from "@/app/images/commonSvgs";
import dynamic from "next/dynamic";
import { useSetAtom } from "jotai";
import { isScrollingAtom as propScrollingAtom } from "@/app/components/property/Navigation";
import MapSkeleton from "@/app/components/maps/Skeleton";
import { isScrollingAtom } from "@/app/components/project/navigation";
import { useQuery } from "react-query";
import { getNearByLocations } from "@/app/test/newui/useProjectCardData";
import SearchCardCustomScrollArea from "./SearchCardCustomScrollArea";

export interface Area {
  name: string;
  Icon?: any;
  lat?: number;
  lng?: number;
  projName?: string;
  key?: string;
  type?: "proj" | "prop";
} 

const SearchCardNearbyBlock: React.FC<{
  lat: number;
  lang: number;
  projName: string;
  type: string;
  projId: string;
  propId:string;
  id: string;
}> = ({ lat, lang, projName, type, projId, propId, id }) => {
  const {
    data: mapData,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: projId,
    queryFn: () => getNearByLocations(type === "proj" ? projId : propId, type, lat, lang),
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/maps"), {
        loading: () => <MapSkeleton />,
        ssr: false,
      }),
    []
  );
  
  const [selected, setSelected] = useState<string>(mapData ? Object.keys(mapData)[0] : "");
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name?: string;
  }>();

  const sectionRef = useRef(null);

  useEffect(() => {
    setSelected(mapData ? Object.keys(mapData)[0] : "");
  }, [mapData]);

  const showLocationOnMap = useCallback(
    (location: { position: { lat: number; lng: number }; name: string }) => {
      setSelectedLocation({
        lat: location.position.lat,
        lng: location.position.lng,
        name: location.name,
      });
    },
    []
  );

  const isMobile = useMediaQuery(`(max-width: 750px)`);
  const isDesktop = useMediaQuery("(max-width: 1600px)");

  // const downData =
  //   mapData && mapData[selected] && mapData[selected].length > 0
  //     ? mapData[selected]
  //     : [];

  if (isFetching) return <div>Loading...</div>;
  if (isError || !mapData) return <div>No Nearby data available</div>;

  return (
    <div
      className="w-full scroll-mt-[170px] mb-[3%] sm:mb-0 pt-[10px] "
      id="location-map"
    >
      {Object.keys(mapData).length > 0 ? (
        <div
          className="w-full scroll-mt-[170px] mb-[3%] sm:mb-0"
          id="location-map"
        >
          <div className="flex gap-6 mb-5 flex-wrap w-full ">
            <SearchCardCustomScrollArea
              // areas={areas}
              selected={selected}
              setSelected={setSelected}
              data={mapData}
            />
          </div>
          {/* md:h-[456px] xl:h-[620px] */}
          <div className="border border-[#92B2C8] flex flex-col-reverse rounded-xl overflow-hidden shadow-lg  w-full mx-auto">
            <section className="bg-white">
                <div className="bg-blue-50 p-2 sm:px-3 sm:py-2 xl:px-5 xl:py-4 sticky top-0 left-0 w-full min-w-[385px] ">
                  <p className="text-[#001F35] text-[12px] xl:text-[14px] font-medium leading-[normal]  ">
                    Explore Your Surroundings, Everywhere Nearby!
                  </p>
                </div>
                <div
                  id="location-listing"
                  className={`flex px-[10px] pb-[${
                    isMobile ? 10 : 50
                  }px] ${
                    !isDesktop ? "flex-col" : "flex-row flex-wrap gap-[10px] " 
                  }`}
                >
                  {mapData && mapData[selected] && mapData[selected].length > 0 ? (
                    mapData[selected]
                      .map((location: any) => ({
                        ...location,
                        distance: location.distance,
                      }))
                      .sort(
                        (a: any, b: any) =>
                          Number(a.time?.split(" ")[0]) -
                          Number(b.time?.split(" ")[0])
                      )
                      .map((location: any) => (
                        <LocationList
                          type="public"
                          {...location}
                          key={location.lat}
                          origin={{
                            lat: Number(lat),
                            lng: Number(lang),
                          }}
                          isMobile={isMobile}
                          isProj={type}
                          onClick={setSelectedLocation}
                          setDirection={showLocationOnMap}
                          showLocationOnMap={showLocationOnMap}
                          sectionRef={sectionRef}
                        />
                      ))
                  ) : (
                    <p>No locations found.</p>
                  )}
                </div>
            </section>

            <section ref={sectionRef}>
              <Map
                key="leaflet2SearchPageDrawerMap"
                data={mapData && mapData[selected] ? mapData[selected] : []}
                selectedLocation={selectedLocation}
                projName={projName}
                lat={lat}
                lang={lang}
                selected={selected}
                setSelectedLocation={setSelectedLocation}
                type="proj"
                className="!max-h-[450px]"
              />
            </section>
          </div>
        </div>
      ) : (
        <div
          id="location-map"
          ref={sectionRef}
          className="w-full scroll-mt-[180px] sm:mt-[20px] xl:mt-[3.125rem] justify-center"
        >
          <Map
            key="leaflet2SearchPageDrawerMap"
            data={mapData && mapData[selected] ? mapData[selected] : []}
            selectedLocation={selectedLocation}
            projName={projName}
            lat={lat}
            lang={lang}
            selected={selected}
            setSelectedLocation={setSelectedLocation}
            type="proj"
          />
        </div>
      )}
    </div>
  );
};

export default SearchCardNearbyBlock;


const LocationList: React.FC<{
  name: string;
  geometry: Coordinates;
  vicinity: string;
  lat: number;
  lang: number;
  type: "public" | "drive" | "walk";
  onClick: (location: any) => void;
  onChangeTravelMode: (mode: string) => void;
  showLocationOnMap: (location: any) => void;
  distance: any;
  duration: any;
  rating?: number;
  origin: {
    lat: number;
    lng: number;
  };
  time: string;
  isProj: "proj" | "prop";
  isMobile: boolean;
  sectionRef: any;
}> = ({
  name,
  showLocationOnMap,
  lat,
  lang,
  distance,
  time,
  isProj,
  isMobile,
  sectionRef
}) => {  
  const isDesktop = useMediaQuery("(max-width: 1600px)");

  const setIsScrolling = useSetAtom(
    isProj === "prop" ? propScrollingAtom : isScrollingAtom
  );
  const scrollToTopic = (id: string): void => {
    setIsScrolling(true);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
    setTimeout(() => setIsScrolling(false), 3000);
  };
  const handleClick = () => {
    sectionRef?.current?.scrollIntoView({ top: 0, behavior: 'smooth' });
    console.log(sectionRef);
    showLocationOnMap({
      position: {
        lat,
        lng: lang,
      },
      name,
    });
    if (isMobile) {
      scrollToTopic("near-by-projects");
    }
  };

  return (
    <div
      className={`bg-gray-50 border rounded-lg cursor-pointer mt-[6px] py-1 md:py-2 xl:py-1 px-2`}
      onClick={handleClick}
    >
      <div className={`flex items-center justify-between ${isDesktop ? " flex-nowrap gap-[1rem] " : "sm:flex-wrap" }`}>
        <h3 className="text-black text-[12px] not-italic font-medium leading-[normal] max-w-[60%] capitalize w-[70%]">
          {name}
        </h3>
        <div className="flex gap-1 text-sm">
          <span className="flex items-center">
            {nearbyLocationIcon}
            <span className="ml-[4px] text-[#005DA0] text-[12px]  not-italic font-medium leading-[normal] text-nowrap">
              {distance ?? "N/A"}
            </span>
            <span className="mx-2">|</span>
            <span className="text-[#001F35] text-[12px] not-italic font-medium leading-[normal] text-nowrap">
              {time ?? "N/A"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
