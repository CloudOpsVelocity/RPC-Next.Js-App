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

const Map = ({ data, lat, lang, type }: any) => {
  const position: LatLngTuple = [lat, lang];
  return (
    <>
      <MapContainer
        center={position}
        className="h-[calc(100vh-75vh)] sm:h-[calc(78vh)] xl:h-[calc(100vh-24vh)] w-full  max-w-full -z-[1]"
        scrollWheelZoom
        zoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* @ts-ignore */}
        <MapContent data={data} type={type} />
      </MapContainer>
      <polyline />
    </>
  );
};

export default Map;

const MapContent = ({ data, type }: any): JSX.Element | null => {
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
    if (data && data?.length > 0) {
      const bounds = L.latLngBounds(
        data.map((item: any) => [parseFloat(item.lat), parseFloat(item.lang)])
      );
      map.fitBounds(bounds);
    }
  }, [data, map]);
  return (
    data &&
    data?.map((item: any) => {
      const isProp = !!item?.propIdEnc;
      const itemId = isProp ? item.propIdEnc : item.projIdEnc;
      const itemPropType = isProp ? item?.propTypeName : item?.propType;

      // Group phases if it's a project
      const phases = !isProp
        ? {
            [item.phaseName]: {
              phaseName: item.phaseName,
              propertyTypes: [
                {
                  propType: item.propType,
                  minPrice: item.minPrice,
                  maxPrice: item.maxPrice,
                },
              ],
            },
          }
        : null;

      return (
        <Marker
          key={itemId}
          position={[parseFloat(item?.lat || 0), parseFloat(item?.lang || 0)]}
          icon={isMobile ? MobileIcon : MapIcon}
          eventHandlers={{
            click: () => {
              setSelectedValue({
                projOrPropName: isProp ? item.propTypeName : item.projName,
                lat: item.lat,
                lang: item.lang,
                type: isProp ? "prop" : "proj",
                reqId: itemId,
                propType: itemPropType,
              });
            },
          }}
        >
          <Tooltip
            key={"tooltip_" + itemId + (selected?.reqId ?? "")}
            opacity={1}
            permanent={selected?.reqId === itemId}
            direction="top"
            offset={[10, -35]}
            className={`${
              isProp ? "min-w-fit" : isMobile ? "min-w-[300px]" : "min-w-[400px]"
            }  max-w-screen-sm !p-0`}
            sticky
          >
            {!isProp ? (
              <TooltipProj
                data={{
                  projName: item.projName,
                  city: item.city,
                  state: item.state,
                  locality: item.locality,
                  postedByName: item.postedByName,
                  phases: Object.values(phases || {}),
                }}
              />
            ) : (
              <TooltipProp data={item} />
            )}
          </Tooltip>
        </Marker>
      );
    })
  );
};
