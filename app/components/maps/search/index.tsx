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
import L from "leaflet";
import { useMediaQuery } from "@mantine/hooks";
import { em } from "@mantine/core";

const Map = ({ data, lat, lang }: any) => {
  const position: LatLngTuple = [lat, lang];
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
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  console.log(data);
  return (
    <>
      <MapContainer
        center={position}
        zoom={isMobile ? 10 : 12}
        className="md:h-[740px] h-[250px] w-full -z-[1]"
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
              icon={isMobile ? MobileIcon : MapIcon}
            >
              {/* <Tooltip opacity={1} permanent direction="top">
                <div className=" ">
                  <p className="text-[#00487C] text-lg not-italic font-semibold leading-[normal]">
                    {item.projName}
                  </p>
                </div>
              </Tooltip> */}

              <Popup>
                <>
                  <div>
                    <p className="text-[#202020] text-2xl not-italic font-medium leading-[normal] p-0 !m-0">
                      {item.projName}
                    </p>

                    <p className="text-[#0073C6] text-xs not-italic font-medium leading-[normal] underline">
                      Agent Listing Available : {item.agentListing}{" "}
                    </p>
                    <p className="text-[#4D6677] text-xs not-italic font-medium leading-[normal] underline">
                      Owner Listing Available : {item.ownerListing}{" "}
                    </p>
                  </div>
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
