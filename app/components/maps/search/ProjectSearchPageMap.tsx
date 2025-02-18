/* eslint-disable react/jsx-no-useless-fragment */
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
import { useAtom, useAtomValue } from "jotai";
import selectedSearchAtom, { selectedNearByAtom } from "@/app/store/search/map";
import TooltipProj from "./Tooltip";
import TooltipProp from "./ToolltipProp";
import { createCustomIconReactLeafLet, icons } from "@/app/data/map";

const Map = ({ data, lat, lang, type, styles }: any) => {
  const position: LatLngTuple = [lat, lang];

  return ( 
    <>
      <MapContainer
        center={position}
        className={styles ? styles : "h-[calc(100vh-75vh)] sm:h-[calc(78vh)] xl:h-[calc(100vh-24vh)] w-full  max-w-full "}
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
    iconAnchor: [5, 38],
    popupAnchor: [0, -38],
  });
  const [selected, setSelectedValue] = useAtom(selectedSearchAtom);
  const { isOpen, selectedNearbyItem} = useAtomValue(selectedNearByAtom);

  
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const map = useMap();

  useEffect(() => {
    const object:any = Object.keys(selectedNearbyItem).length > 0 ? selectedNearbyItem : selected
    // if (object && object.projOrPropName) {
    if (object) {
      const position:any = [parseFloat(object.lat) + (isMobile ? 0.0005 : 0), parseFloat(object.lang) ];
      map.setView(position, 100);
    }else{
      if (data && data?.length > 0) {
        const bounds = L.latLngBounds(
          data.map((item: any) => [parseFloat(item.lat), parseFloat(item.lang)])
        );
        map.fitBounds(bounds);
      }
    }
  }, [selected, map, selectedNearbyItem]);


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
        <>
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
              isProp
                ? "min-w-fit"
                : isMobile
                ? "min-w-[300px]"
                : "min-w-[400px]"
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
                  coverUrl: item.coverUrl
                }}
              />
            ) : (
              <TooltipProp data={item} />
            )}
          </Tooltip>

          {/* <Popup closeButton={false}>
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
          </Popup > */}
        </Marker>
        <NearbyMarkers />
        </>
      );
    })
  );
};

const NearbyMarkers = ({}) => {
  const [{category, data, isOpen, selectedNearbyItem}, setSelectedLocation] = useAtom(selectedNearByAtom);

  const isMobile = useMediaQuery("(max-width: 601px)");
    const map = useMap();

    useEffect(() => {
      if (data && Object.keys(data).length > 0) {
        const finalCateg = category !== "" ? category : Object.keys(data)[0]
        const nearByData = data[finalCateg];

        const bounds = L.latLngBounds(
          nearByData.map((item: any) => [parseFloat(item.lat), parseFloat(item.lang)])
        );
        map.fitBounds(bounds);
      }
    }, [data, map, category]);

    if(!data || Object.keys(data).length === 0) return;

    const finalCategory = category !== "" ? category : Object.keys(data)[0]
    const selectedNearByData = data ? data[finalCategory] : [];
    const Icon:any = createCustomIconReactLeafLet(finalCategory);
    
    return(
      selectedNearByData && selectedNearByData.length > 0 && selectedNearByData?.map((item: any) => {
        return(
          <Marker
            key={item?.lat}
            position={[parseFloat(item?.lat), parseFloat(item?.lang)]}
            title={item.name}
            icon={Icon}
            /*             {...(isMobile && { icon: BlueMobileMapIcon })}
            */ zIndexOffset={100}
            eventHandlers={{
              click: () =>
                setSelectedLocation((prev:any)=>({ ...prev, selectedNearbyItem: {lat: item?.lat, lang: item?.lang, name: item?.name }})),
            }}
          >
            {!isMobile && (
              <Tooltip
                key={item.lat}
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
                key={item.lang}
                offset={isMobile ? [-7, -40] : [4, -36]}
                className=" min-w-[300px] max-w-[300px] sm:max-w-full text-wrap md:text-n break-words "
              >
                <p className="text-[#00487C] text-[12px] md:text-lg not-italic font-semibold leading-[normal]">
                  {item.name}
                </p>
              </Tooltip>
            )}
          </Marker>
      )}))
    
}
