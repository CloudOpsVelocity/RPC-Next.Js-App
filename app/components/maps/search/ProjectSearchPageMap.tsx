/* eslint-disable react/jsx-no-useless-fragment */
"use client";
import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L, { LatLngTuple } from "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { useMediaQuery } from "@mantine/hooks";
import { em } from "@mantine/core";
import { useAtom, useAtomValue } from "jotai";
import selectedSearchAtom, { selectedNearByAtom } from "@/app/store/search/map";
import TooltipProj from "./Tooltip";
import TooltipProp from "./ToolltipProp";
import { createCustomIconReactLeafLet, icons } from "@/app/data/map";
import { RecenterIcon } from "@/app/images/commonSvgs";

const RecenterButton = ({ center }: { center: any }) => {
  const [selected, setSelectedValue] = useAtom(selectedSearchAtom);
  const { allMarkerRefs } = useAtomValue(selectedNearByAtom);
  const map = useMap();
  const handleRecenter = () => {
    if (!selected?.reqId) return;
    setSelectedValue((prev) => ({
      ...prev,
      reqId: selected?.reqId,
      lat: selected?.lat,
      lang: selected?.lang,
      type: selected?.type,
      propType: selected?.propType,
    }));

    const position: any = [parseFloat(selected.lat), parseFloat(selected.lang)];

    map.setView(position, 100);

    if (!allMarkerRefs) return;
    const marker = allMarkerRefs.current.get(selected?.reqId);
    if (marker) marker.openPopup();
  };

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    isMobile && (
      <button
        onClick={(e: any) => {
          handleRecenter();
          e.stopPropagation();
        }}
        className="absolute top-[10px] right-[10px] cursor-pointer flex justify-center items-center z-[1000] !bg-black rounded-full shadow-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition p-[4px]"
      >
        <RecenterIcon />
      </button>
    )
  );
};

const Map = ({ data, lat, lang, type, styles }: any) => {
  const position: LatLngTuple = [lat, lang];
  return (
    <>
      <MapContainer
        center={position}
        className={
          styles
            ? styles
            : "h-[calc(100vh-75vh)] sm:h-[calc(78vh)] xl:h-[calc(100vh-24vh)] w-full max-w-full "
        }
        scrollWheelZoom
        zoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterButton center={position} />
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
    iconSize: [50, 50],
    iconAnchor: [5, 38],
    popupAnchor: [0, -38],
  });

  const [selected, setSelectedValue] = useAtom(selectedSearchAtom);
  const [
    {
      isOpen,
      selectedNearbyItem,
      id,
      allMarkerRefs,
      data: nearbyData,
      category,
    },
    setSelectedNearby,
  ] = useAtom(selectedNearByAtom);

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const map = useMap();

  // 🔹 Create unique refs for each marker
  const markerRefs = useRef(new window.Map());

  if (allMarkerRefs === null) {
    setSelectedNearby((prev: any) => ({ ...prev, allMarkerRefs: markerRefs }));
  }

  // 🔹 Event handlers for each marker
  const getEventHandlers = (itemId: string) => ({
    mouseover: () => {
      const marker = markerRefs.current.get(itemId);
      if (marker) marker.openPopup();
    },
    mouseout: () => {
      if (itemId !== selected?.reqId) {
        const marker = markerRefs.current.get(itemId);
        if (marker) marker.closePopup();
      }
    },
    click: () => {
      setSelectedValue((prev) => ({
        ...prev,
        reqId: prev?.reqId === itemId ? null : itemId,
      }));
      const marker = markerRefs.current.get(itemId);
      if (marker) marker.openPopup();
    },
  });

  useEffect(() => {
    // for Recenter Project marker
    if (selected && selected.projOrPropName && selected.lat && selected.lang) {
      const position: any = [
        parseFloat(selected.lat),
        parseFloat(selected.lang),
      ];
      map.setView(position, 100);

      const marker = markerRefs.current.get(selected?.reqId);
      if (marker) marker.openPopup();
    }
  }, [selected, map]);

  useEffect(() => {
    // for Recenter Nearby marker
    if (
      selectedNearbyItem &&
      selectedNearbyItem.lat &&
      selectedNearbyItem.lang
    ) {
      const position: any = [
        parseFloat(selectedNearbyItem.lat),
        parseFloat(selectedNearbyItem.lang),
      ];
      map.setView(position, 100);
    }
  }, [map, selectedNearbyItem]);

  useEffect(() => {
    if (
      data &&
      data?.length > 0 &&
      nearbyData &&
      Object.keys(nearbyData).length === 0 &&
      selected === null
    ) {
      const bounds = L.latLngBounds(
        data.map((item: any) => [parseFloat(item.lat), parseFloat(item.lang)])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, data, selected, nearbyData]);

  useEffect(() => {
    if (nearbyData && Object.keys(nearbyData).length > 0 && category === "") {
      const finalCateg =
        category !== "" ? category : Object.keys(nearbyData)[0];
      const nearByData = nearbyData[finalCateg];
      const bounds = L.latLngBounds(
        nearByData.map((item: any) => [
          parseFloat(item.lat),
          parseFloat(item.lang),
        ])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, nearbyData, category]);

  return (
    data &&
    data?.map((item: any, index: number) => {
      const isProp = !!item?.propIdEnc;
      const itemId = isProp ? item.propIdEnc : item.projIdEnc;
      const itemPropType = isProp ? item?.propTypeName : item?.propType;

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

      if (id === itemId || id === "") {
        return (
          <>
            <Marker
              ref={(el) => {
                if (el) markerRefs.current.set(itemId, el);
              }}
              key={itemId + "proijMarkerTag" + index.toString()}
              position={[
                parseFloat(item?.lat || 0),
                parseFloat(item?.lang || 0),
              ]}
              icon={isMobile ? MobileIcon : MapIcon}
              eventHandlers={getEventHandlers(itemId)}
            >
              <Popup closeButton={false}>
                {!isProp ? (
                  <TooltipProj
                    data={{
                      projName: item.projName,
                      city: item.city,
                      state: item.state,
                      locality: item.locality,
                      postedByName: item.postedByName,
                      phases: Object.values(phases || {}),
                      coverUrl: item.coverUrl,
                      reqId: itemId,
                      type: isProp ? "prop" : "proj",
                    }}
                  />
                ) : (
                  <TooltipProp
                    data={{
                      ...item,
                      reqId: itemId,
                      type: isProp ? "prop" : "proj",
                    }}
                  />
                )}
              </Popup>
            </Marker>
            <NearbyMarkers />
          </>
        );
      }
    })
  );
};

const NearbyMarkers = ({}) => {
  const [{ category, data, isOpen, selectedNearbyItem }, setSelectedLocation] =
    useAtom(selectedNearByAtom);

  const isMobile = useMediaQuery("(max-width: 601px)");
  const map = useMap();

  useEffect(() => {
    if (Object.keys(selectedNearbyItem).length === 0) return;
    const handleClickOutside = (event: any) => {
      if (event.target.closest(".leaflet-container")) {
        setSelectedLocation((prev: any) => ({
          ...prev,
          selectedNearbyItem: {},
        }));
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setSelectedLocation]);

  if (!data || Object.keys(data).length === 0) return;
  const finalCategory = category !== "" ? category : Object.keys(data)[0];
  const selectedNearByData: any = data ? data[finalCategory] : "";
  const Icon: any = createCustomIconReactLeafLet(
    finalCategory as keyof typeof icons
  );

  return (
    selectedNearByData &&
    selectedNearByData.length > 0 &&
    selectedNearByData?.map((item: any, index: number) => {
      return (
        <Marker
          key={item?.lat + "markerTag" + index.toString()}
          position={[parseFloat(item?.lat), parseFloat(item?.lang)]}
          title={item.name}
          icon={Icon}
          zIndexOffset={100}
          eventHandlers={{
            click: () =>
              setSelectedLocation((prev: any) => ({
                ...prev,
                selectedNearbyItem: {
                  lat: item?.lat,
                  lang: item?.lang,
                  name: item?.name,
                },
              })),
          }}
        >
          {!isMobile && (
            <Tooltip
              key={item.lat + "tooltipTag" + index.toString()}
              opacity={1}
              direction="top"
              permanent={selectedNearbyItem?.lat === item?.lat}
              className="min-w-fit z-50"
              offset={[4, -36]}
            >
              <div className=" ">
                <p className="text-[#00487C] text-lg not-italic font-semibold leading-[normal]">
                  {item.name}
                </p>
              </div>
            </Tooltip>
          )}

          {selectedNearbyItem?.lat === item?.lat && (
            <Tooltip
              opacity={1}
              direction="top"
              permanent={selectedNearbyItem?.lat === item?.lat}
              key={item.lang + "tooltipTag2" + index.toString()}
              offset={isMobile ? [-7, -40] : [4, -36]}
              className=" min-w-[300px] max-w-[300px] sm:max-w-full text-wrap md:text-n break-words "
            >
              <p className="text-[#00487C] text-[12px] md:text-lg not-italic font-semibold leading-[normal]">
                {item.name}
              </p>
            </Tooltip>
          )}
        </Marker>
      );
    })
  );
};
