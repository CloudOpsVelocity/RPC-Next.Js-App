"use client";

import React, { useEffect } from "react";
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
import { useAtomValue } from "jotai";
import selectedSearchAtom from "@/app/store/search/map";

const Map = ({ data, lat, lang }: any) => {
  const position: LatLngTuple = [lat, lang];
  return (
    <>
      <MapContainer
        center={position}
        className="md:h-[740px] h-[250px] w-full -z-[1]"
        scrollWheelZoom={true}
        zoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapContent data={data} />
      </MapContainer>
      <polyline />
    </>
  );
};

export default Map;

const MapContent = ({ data }: any) => {
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
  const selected = useAtomValue(selectedSearchAtom);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const map = useMap();
  useEffect(() => {
    if (selected && selected.projName) {
      map.panTo([parseFloat(selected.lat), parseFloat(selected.lang)]);
    }
  }, [selected, map]);
  return (
    <>
      {data &&
        data.length > 0 &&
        data?.map((item: any, index: number) => (
          <Marker
            key={index}
            position={[parseFloat(item?.lat || 0), parseFloat(item?.lang || 0)]}
            icon={isMobile ? MobileIcon : MapIcon}
          >
            {selected?.projName === item.projName && (
              <Tooltip opacity={1} permanent direction="top" offset={[10, -35]}>
                <div className="p-3 rounded-2xl">
                  <p className="text-[#202020] text-2xl not-italic font-medium leading-[normal] p-0 !m-0">
                    {item.projName}
                  </p>

                  <p className="text-[#0073C6] text-xs not-italic font-medium leading-[normal] underline mb-1">
                    Agent Listing Available : {item.agentListing}{" "}
                  </p>
                  <p className="text-[#4D6677] text-xs not-italic font-medium leading-[normal] underline">
                    Owner Listing Available : {item.ownerListing}{" "}
                  </p>
                </div>
              </Tooltip>
            )}

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
    </>
  );
};
