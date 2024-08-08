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
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import L from "leaflet";
import { useMediaQuery } from "@mantine/hooks";
import { em } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import selectedSearchAtom, { listingSearchAtom } from "@/app/store/search/map";

const Map = () => {
  const value = useAtomValue(listingSearchAtom);
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
  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <>
      <MapContainer
        center={position}
        className="md:h-[740px] h-[400px] w-full "
        scrollWheelZoom={true}
        zoom={100}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[parseFloat(value?.lat ?? 0), parseFloat(value?.lang ?? 0)]}
          icon={isMobile ? MobileIcon : MapIcon}
        >
          <Tooltip opacity={1} permanent direction="top" offset={[10, -35]}>
            <div className="p-3 rounded-2xl">
              <p className="text-[#001F35] text-[12px] md:text-[15px] not-italic font-semibold !m-0">
                3BHK Apartment for Sell <br />{" "}
                <span className="text-[#148B16] text-[12px] md:text-base not-italic font-bold">
                  in Kadugodi, ₹ 2.36 Cr
                </span>
              </p>

              <p className="text-[#148B16] text-[color:var(--Table-Blue-grey,#8791AE)] text-[12px] md:text-sm not-italic font-medium">
                Devasthanagalu, Varthur, Karnataka 560087
              </p>

              <p>
                <span></span>
              </p>
            </div>
          </Tooltip>
        </Marker>
      </MapContainer>
      <polyline />
    </>
  );
};

export default Map;
