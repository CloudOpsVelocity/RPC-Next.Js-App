"use client";

import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L, { LatLngTuple } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { useMediaQuery } from "@mantine/hooks";
import { em } from "@mantine/core";
import { useAtom } from "jotai";
import selectedSearchAtom from "@/app/store/search/map";
import TooltipProj from "./Tooltip";
import TooltipProp from "./ToolltipProp";

const Map = ({ data, lat, lang }: any) => {
  const position: LatLngTuple = [lat, lang];
  console.log(data);
  return (
    <>
      <MapContainer
        center={position}
        className="h-[250px] sm:h-full max-h-[250px] w-full sm:max-w-[700px] sm:max-h-[600px] xl:max-h-[740px] xl:max-w-full  -z-[1]"
        scrollWheelZoom
        zoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* @ts-ignore */}
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
  const [selected, setSelectedValue] = useAtom(selectedSearchAtom);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const map = useMap();
  useEffect(() => {
    if (selected && selected.projOrPropName) {
      map.setView([parseFloat(selected.lat), parseFloat(selected.lang)], 19);
    }
  }, [selected, map]);
  useEffect(() => {
    if (data && data[0] && data[0]?.lat && data[0]?.lang) {
      map.setView([parseFloat(data[0]?.lat), parseFloat(data[0]?.lang)], 14);
    }
  }, [data, map]);
  // 1. FIND IS IT PROPERTY OR PRJECT
  // 2. CREATE TOOLTIPS FOR EACH SECTION

  return (
    data &&
    data.length > 0 &&
    data?.map((item: any, index: number) => {
      const isProp = !!item?.propIdEnc;
      const title = selected?.type;
      const itemId = item[title === "proj" ? "projIdEnc" : "propIdEnc"];
      const selectedId = selected?.reqId;
      return (
        <Marker
          key={Math.random()}
          position={[parseFloat(item?.lat || 0), parseFloat(item?.lang || 0)]}
          eventHandlers={{
            click: () => {
              setSelectedValue({
                projOrPropName: isProp ? item.propName : item.projName,
                lat: item.lat,
                lang: item.lang,
                type: isProp ? "prop" : "proj",
                reqId: itemId,
              });
            },
          }}
          icon={isMobile ? MobileIcon : MapIcon}
        >
          {selected && selectedId === itemId && (
            <Tooltip
              opacity={1}
              permanent
              direction="top"
              offset={[10, -35]}
              className="min-w-fit"
            >
              {!isProp ? (
                <TooltipProj data={item} />
              ) : (
                <TooltipProp data={item} />
              )}
            </Tooltip>
          )}

          <Tooltip
            opacity={1}
            direction="top"
            offset={[10, -35]}
            className="min-w-fit"
          >
            {!isProp ? (
              <TooltipProj data={item} />
            ) : (
              <TooltipProp data={item} />
            )}
          </Tooltip>
        </Marker>
      );
    })
  );
};
