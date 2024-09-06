"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import S from "@/app/styles/Share.module.css";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { LatLngTuple } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import * as L from "leaflet";
import { useMediaQuery } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import {
  listingSearchAtom,
  mobileSearchPageMapModalReducerAtom,
} from "@/app/store/search/map";
import { BlueMobileMapIcon } from "@/app/data/map";

const Map = () => {
  const value = useAtomValue(mobileSearchPageMapModalReducerAtom);
  const position: LatLngTuple = [value?.lat || 0, value?.lang || 0];
  const MapIcon = L.icon({
    iconUrl: "/searchmarker.png",
    iconSize: [60, 60],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });
  const MobileIcon = L.icon({
    iconUrl: "/searchmarker.png",
    iconSize: [30, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });
  const fakeData = [
    {
      projId: 13,
      name: "Bidarahalli",
      placeId: "ChIJnwXug3YQrjsR5lpOWN-IQI0",
      lat: "13.060045",
      lang: "77.716167",
      rating: "4.6",
      totalRating: "15",
      categoryName: "bus_station",
      distance: "3.2 km",
      time: "10 mins",
    },
    {
      projId: 13,
      name: "Bayyapannahalli",
      placeId: "ChIJYw7d8pgarjsRaEMHXcIWrLs",
      lat: "13.071653",
      lang: "77.720732",
      rating: "4.2",
      totalRating: "11",
      categoryName: "bus_station",
      distance: "4.7 km",
      time: "14 mins",
    },
    {
      projId: 13,
      name: "Cheemasandra Gate",
      placeId: "ChIJI3ZleCEQrjsRiqwRngSt7m8",
      lat: "13.039474",
      lang: "77.740574",
      rating: "4.5",
      totalRating: "6",
      categoryName: "bus_station",
      distance: "5.0 km",
      time: "13 mins",
    },
    {
      projId: 13,
      name: "Rampura Cross",
      placeId: "ChIJYbZK65kQrjsRkAe_0ZEbR3s",
      lat: "13.051856",
      lang: "77.681135",
      rating: "3.7",
      totalRating: "7",
      categoryName: "bus_station",
      distance: "6.8 km",
      time: "18 mins",
    },
    {
      projId: 13,
      name: "Gundur",
      placeId: "ChIJwcJpw-warjsRFdUlmbnRiNQ",
      lat: "13.086839",
      lang: "77.71509499999999",
      rating: "4.1",
      totalRating: "19",
      categoryName: "bus_station",
      distance: "6.6 km",
      time: "18 mins",
    },
    {
      projId: 13,
      name: "KR Puram Railway Station",
      placeId: "ChIJF43gRhYRrjsRm6ZhFZkK_lU",
      lat: "13.001414",
      lang: "77.67806",
      rating: "4",
      totalRating: "6",
      categoryName: "bus_station",
      distance: "7.4 km",
      time: "21 mins",
    },
    {
      projId: 13,
      name: "KR Puram Railway Station",
      placeId: "ChIJS9AJ-D0RrjsRkNmvYZxES68",
      lat: "12.999855",
      lang: "77.676468",
      rating: "3.9",
      totalRating: "39",
      categoryName: "bus_station",
      distance: "8.6 km",
      time: "25 mins",
    },
  ];
  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <>
      <MapContainer
        center={position}
        className="md:h-[740px] h-[400px] w-full "
        scrollWheelZoom
        zoom={10}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[value.lat ?? 0, value?.lang ?? 0]}
          icon={isMobile ? MobileIcon : MapIcon}
        >
          <Tooltip
            opacity={1}
            permanent
            direction="top"
            offset={[10, -35]}
            className="!bg-transparent !border-none !outline-none"
          >
            <div className=" rounded-2xl">
              <p className="text-[#001F35]  text-[12px] md:text-[15px] not-italic font-bold !m-0">
                3BHK Apartment for Sell <br />{" "}
                <span className="text-[#148B16] text-[14px] md:text-base not-italic font-bold">
                  in Kadugodi, ₹ 2.36 Cr
                </span>
              </p>

              <p className="text-[#148B16] text-gray-700 text-[12px] md:text-sm not-italic font-semibold">
                Devasthanagalu, Varthur, Karnataka 560087
              </p>

              <p>
                <span />
              </p>
            </div>
          </Tooltip>
          {fakeData.map((item) => {
            return (
              <Marker
                key={item?.lat}
                position={[parseFloat(item?.lat), parseFloat(item?.lang)]}
                title={item.name}
                {...(isMobile && { icon: BlueMobileMapIcon })}
                zIndexOffset={100}
              >
                {/* {selectedLocation?.lat === item?.lat && ( */}
                <Tooltip
                  key={item.lat}
                  opacity={1}
                  direction="top"
                  className="min-w-fit z-50"
                  offset={[-16, -16]}
                >
                  <div className=" ">
                    <p className="text-[#00487C] text-lg not-italic font-semibold leading-[normal]">
                      {item.name}
                    </p>
                  </div>
                </Tooltip>

                {/* )} */}

                {/* <Popup className="min-w-fit">
                <p className="text-[#00487C] text-xs sm:text-[17px] italic font-medium leading-[normal]">
                  {item.name}
                </p>
              </Popup> */}
              </Marker>
            );
          })}
        </Marker>
      </MapContainer>
      <polyline />
    </>
  );
};

export default Map;
