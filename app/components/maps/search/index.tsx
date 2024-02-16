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
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import Image from "next/image";
import { MapIcon } from "@/app/data/map";
import L from "leaflet";

const Map = ({ data, selectedLocation, projName, lat, lang }: any) => {
  const position: LatLngTuple = [lat, lang];
  const MapIcon = L.icon({
    iconUrl: "/searchmarker.png",
    iconSize: [60, 60],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });
  return (
    <>
      <MapContainer
        center={position}
        zoom={12}
        style={{ height: "740px", width: "100%", zIndex: -1 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data &&
          data.length > 0 &&
          data?.map((item: any) => (
            <Marker
              position={[parseFloat(item?.lat), parseFloat(item?.lang)]}
              icon={MapIcon}
            >
              {/* {selectedLocation?.lat === item?.lat && (
                <Tooltip opacity={1} permanent direction="top">
                  <div className=" ">
                    <p className="text-[#00487C] text-lg not-italic font-semibold leading-[normal]">
                      {item.projName}
                    </p>
                  </div>
                </Tooltip>
              )} */}

              <Popup>
                <>
                  <p className="text-[#006A02] text-xl not-italic font-semibold leading-[normal]">
                    {item.projName}
                  </p>
                </>
              </Popup>
            </Marker>
          ))}

        <polyline />
      </MapContainer>
    </>
  );
};

export default Map;
