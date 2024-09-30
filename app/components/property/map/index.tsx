/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import React, { useState, useCallback, useRef, useMemo, Fragment } from "react";
import { LuTrain, LuSearch } from "react-icons/lu";
import {
  Text,
  Tabs,
  TextInput,
  Loader,
  ScrollArea,
  Skeleton,
} from "@mantine/core";

import { clsx } from "clsx";
import {
  Coordinates,
  calculateDistance,
  calculateTime,
} from "@/app/utils/maps";
import { useDebouncedState, useMediaQuery } from "@mantine/hooks";
import Loading from "../../atoms/Loader";
import dynamic from "next/dynamic";
import MapSkeleton from "../../maps/Skeleton";
import PropertyHeading from "../../property/heading";
import useMapData from "@/app/hooks/property/useMapData";

import {
  AtmIcon,
  BankIcon,
  BusIcon,
  ClinikIcon,
  CommuteIcon,
  HospitalIcon,
  MallIcon,
  MarketIcon,
  PostOfficeIcon,
  RestaurentIcon,
  SchoolIcon,
  TrainIcon,
  nearbyLocationIcon,
} from "@/app/images/commonSvgs";
import CustomScrollArea from "../../project/map/ScrollPanel";
import { isScrollingAtom } from "../Navigation";
import { useAtom } from "jotai";
import SubHeading from "../../project/headings/SubHeading";
interface Area {
  name: string;
  Icon?: any;
  lat?: number;
  lng?: number;
  projName?: string;
  key?: string;
  type?: "proj" | "prop";
}

const LeafMap: React.FC<{
  lat: string;
  lang: string;
  projName: string;
  type?: "proj" | "prop";
  projId?: string;
  mapData: any;
}> = ({ lat, lang, projName, type, projId, mapData }) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/maps"), {
        loading: () => <MapSkeleton />,
        ssr: false,
      }),
    []
  );
  const [selected, setSelected] = useState<string>(Object.keys(mapData)[0]);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name?: string;
  }>();

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
  const downData =
    mapData && mapData[selected] && mapData[selected].length > 0
      ? mapData[selected].slice(isMobile ? -5 : -8)
      : [];
  return Object.keys(mapData).length > 0 ? (
    <div className="w-full scroll-mt-[150px] mx-auto mb-[3%]" id="nearBy">
      <div className="flex justify-between w-[95%] sm:w-[90%] mx-auto">
        {type === "prop" ? (
          <PropertyHeading
            title={
              <Fragment>
                Near By Locations{" "}
                <span className="text-[#148B16]">{projName}</span>
              </Fragment>
            }
            desc=" Explore near by convenient amenities, entertainment, and essential
            services"
            className="sm:mb-[8px]"
          />
        ) : (
          <div>
            <h2 className="text-h2 lg:text-[32px] font-semibold mb-[12px] capitalize break-words max-w-[78%]">
              <span>Near By Locations </span>
              <span className="text-[#148B16] font-bold">{projName} </span>
            </h2>
            <SubHeading
              text="Explore nearby convenient amenities, entertainment, and essential services"
              className="mt-2 mb-4 sm:mb-8"
            />
          </div>
        )}
      </div>
      <div className="flex gap-6 mb-5 mt-1 flex-wrap w-[95%] ml-0 md:ml-4">
        <CustomScrollArea
          areas={areas}
          selected={selected}
          setSelected={setSelected}
          data={mapData}
        />
      </div>

      <div className="border border-[#92B2C8] flex flex-col-reverse md:grid grid-cols-1 md:grid-cols-[2fr_3fr] rounded-xl overflow-hidden shadow-lg md:h-[620px] w-[95%] sm:w-[90%] mx-auto">
        <section className="bg-white">
          <div id="tabs">
            <Tabs defaultValue="public">
              <div className="bg-blue-50 px-5 py-4">
                <p className="text-[#001F35] sm:text-[22px] font-medium leading-[normal]">
                  Explore Your Surroundings, Everywhere Nearby!
                </p>
              </div>
            </Tabs>
            <div id="location-listing" className="grid gap-2">
              <ScrollArea
                max-h={isMobile && "400"}
                h={isMobile ? "auto" : 600}
                pb={isMobile ? 10 : 50}
                px={10}
              >
                {mapData[selected] && mapData[selected].length > 0 ? (
                  mapData[selected]
                    .map((location: any, index: any) => ({
                      ...location,
                      distance: location.distance,
                    }))
                    .sort(
                      (a: any, b: any) =>
                        Number(a.time?.split(" ")[0]) -
                        Number(b.time?.split(" ")[0])
                    )
                    .map((location: any, index: any) => (
                      <LocationList
                        type="public"
                        {...location}
                        key={location.name}
                        origin={{
                          lat: Number(lat),
                          lng: Number(lang),
                        }}
                        isMobile={isMobile}
                        isProj={type}
                        onClick={setSelectedLocation}
                        setDirection={showLocationOnMap}
                        showLocationOnMap={showLocationOnMap}
                      />
                    ))
                ) : (
                  <p>No locations found.</p>
                )}
              </ScrollArea>
            </div>
          </div>
        </section>
        <section>
          <Map
            data={mapData && mapData[selected] ? mapData[selected] : []}
            selectedLocation={selectedLocation}
            projName={projName}
            lat={lat}
            lang={lang}
            selected={selected}
            setSelectedLocation={setSelectedLocation}
            type="prop"
          />
        </section>
      </div>

      {mapData[selected] && mapData[selected].length > 0 && (
        <div className="mt-8 w-[90%] mx-auto hidden sm:block">
          <h1 className="text-[#303030] text-[16px] md:text-xl not-italic font-medium leading-[normal] tracking-[0.8px] capitalize">
            {selected.split("_").join(" ")} Nearby
          </h1>
          <div className="flex gap-2 mt-3 flex-wrap gap-x-5">
            {downData.map((item: any, index: number) => (
              <MapCard
                key={`Nearby_${item?.name}`}
                {...item}
                origin={{
                  lat: Number(lat),
                  lng: Number(lang),
                }}
                type={type}
                showLocationOnMap={showLocationOnMap}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div
      id="nearBy"
      className="w-[95%] md:w-[90%] scroll-mt-[180px]  mb-[5%] justify-center"
    >
      <div className="flex justify-between w-[90%] ">
        {type === "prop" ? (
          <PropertyHeading
            title={projName}
            desc=""
            className="sm:mb-[8px] mt-[50px]"
            projName={""}
          />
        ) : (
          <div>
            <h2 className="text-h2 lg:text-[32px] font-semibold mb-[12px] capitalize break-words max-w-[78%]">
              <span>Map Preview Of </span>
              <span className="text-[#148B16] font-bold">{projName} </span>
            </h2>
            {/*  <SubHeading
                    text="Explore nearby convenient amenities, entertainment, and essential services"
                    className="mt-2 mb-4 sm:mb-8"
                  /> */}
          </div>
        )}
      </div>
      <Map
        data={mapData && mapData[selected] ? mapData[selected] : []}
        selectedLocation={selectedLocation}
        projName={projName}
        lat={lat}
        lang={lang}
        selected={selected}
        setSelectedLocation={setSelectedLocation}
        type="prop"
        className="sm:!h-[500px]"
      />
    </div>
  );
};

export default LeafMap;

const MapCard = ({
  name,
  showLocationOnMap,
  lat,
  lang,
  origin,
  distance,
  time,
}: any) => {
  const [isScrolling, setIsScrolling] = useAtom(isScrollingAtom);
  const handleClick = () => {
    showLocationOnMap({
      position: {
        lat,
        lng: lang,
      },
      name,
    });
    scrollToTopic("nearBy");
  };
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
  return (
    <div
      className="flex flex-col items-start gap-3 px-2 py-3.5 cursor-pointer shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[10px] border-[0.5px] border-solid border-[#D9D9D9] bg-[#fcfcfc] min-w-[385px] max-w-[385px]"
      onClick={handleClick}
    >
      <div className="">
        <p className="text-black text-base not-italic font-medium leading-[normal] capitalize">
          {name}
        </p>
        <div className="flex gap-1 text-sm mt-[14px]">
          <span className="flex items-center min-w-[70px]">
            {nearbyLocationIcon}
            <span className="ml-[4px] text-[#005DA0] text-base not-italic font-medium leading-[normal] ]">
              {distance ?? "N/A"}
            </span>{" "}
          </span>
          <span className="mx-1">|</span>
          <span className="text-[#001F35] text-lg not-italic font-medium leading-[normal]">
            {time ?? "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

const LocationList: React.FC<{
  name: string;
  geometry: Coordinates;
  vicinity: string;
  lat: number;
  lang: number;
  type: "public" | "drive" | "walk";
  onClick: (location: any) => void;
  onChangeTravelMode: (mode: string) => void; // New prop for changing travel mode
  showLocationOnMap: (location: any) => void;
  distance: any;
  duration: any;
  rating?: number;
  origin: {
    lat: number;
    lng: number;
  };
  time: string;
}> = ({ name, showLocationOnMap, lat, lang, distance, time }) => {
  const handleClick = () => {
    showLocationOnMap({
      position: {
        lat,
        lng: lang,
      },
      name,
    });
  };

  return (
    <div
      className="p-2 bg-gray-50 border rounded-lg cursor-pointer mt-[12px] max-w-[640px] py-3 px-2"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <h6 className="text-black text-lg not-italic font-medium leading-[normal] capitalize w-[70%]">
          {name}
        </h6>
        <div className="flex gap-1 text-sm">
          <span className="flex items-center">
            {nearbyLocationIcon}
            <span className="ml-[4px] text-[#005DA0] text-lg not-italic font-medium leading-[normal] ">
              {distance ?? "N/A"}
            </span>
            <span className="mx-2">|</span>
            <span className="text-[#001F35] text-lg not-italic font-medium leading-[normal]">
              {time ?? "N/A"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export const areas: Area[] = [
  {
    name: "commute",
    Icon: CommuteIcon,
    key: "transit_station",
  },
  {
    name: "Train",
    Icon: TrainIcon,
    key: "train_station",
  },
  {
    name: "Bus",
    Icon: BusIcon,
    key: "bus_station",
  },

  {
    name: "Hospital",
    Icon: HospitalIcon,
    key: "hospital",
  },

  {
    name: "School",
    Icon: SchoolIcon,
    key: "school",
  },

  {
    name: "Market",
    Icon: MarketIcon,
    key: "supermarket",
  },

  {
    name: "Restaurant",
    Icon: RestaurentIcon,
    key: "food",
  },

  {
    name: "Bank",
    Icon: BankIcon,
    key: "bank",
  },

  {
    name: "Clinic",
    Icon: ClinikIcon,
    key: "clinic",
  },

  {
    name: "ATM",
    Icon: AtmIcon,
    key: "atm",
  },

  {
    name: "Post Office",
    Icon: PostOfficeIcon,
    key: "post_office",
  },

  {
    name: "Mall",
    Icon: MallIcon,
    key: "shopping_mall",
  },
];
