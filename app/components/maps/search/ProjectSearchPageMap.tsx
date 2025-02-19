/* eslint-disable react/jsx-no-useless-fragment */
"use client";
import React, { useEffect, useMemo, useRef } from "react";
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
    iconSize: [50, 50],
    iconAnchor: [5, 38],
    popupAnchor: [0, -38],
  });
  const [selected, setSelectedValue] = useAtom(selectedSearchAtom);
  const { isOpen, selectedNearbyItem, id} = useAtomValue(selectedNearByAtom);
  
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const map = useMap();

  const markerRef = useRef();

  const eventHandlers = useMemo(
    () => ({
      mouseover() {
        console.log("over");
        if (markerRef) markerRef.current.openPopup();
      },
      mouseout() {
        console.log("out");
        if (markerRef) markerRef.current.closePopup();
      }
    }),
    []
  );

  useEffect(() => {
    if (selected && selected.projOrPropName && selected.lat && selected.lang) {
        const position:any = [parseFloat(selected.lat) + (isMobile ? 0.0006 : 0), parseFloat(selected.lang) ];
        map.setView(position, 100);
    }
  }, [selected, map]);

  useEffect(() => {
    if (selectedNearbyItem && selectedNearbyItem.lat && selectedNearbyItem.lang) {
      const position:any = [parseFloat(selectedNearbyItem.lat), parseFloat(selectedNearbyItem.lang) ];
      map.setView(position, 100);
    }
  }, [map, selectedNearbyItem]);

  useEffect(() => {
    if (data && data?.length > 0 && !isOpen) {
      const bounds = L.latLngBounds(
        data.map((item: any) => [parseFloat(item.lat), parseFloat(item.lang)])
      );
      map.fitBounds(bounds);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (event.target.closest(".leaflet-container")) {
        setSelectedValue(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setSelectedValue]);



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
      if(id === itemId || id === ""){
      return (
        <>
        <Marker
          ref={markerRef}
          key={itemId}
          position={[parseFloat(item?.lat || 0), parseFloat(item?.lang || 0)]}
          icon={isMobile ? MobileIcon : MapIcon}
          // eventHandlers={{
          //   click: () => {
          //     setSelectedValue({
          //       projOrPropName: isProp ? item.propTypeName : item.projName,
          //       lat: item.lat,
          //       lang: item.lang,
          //       type: isProp ? "prop" : "proj",
          //       reqId: itemId,
          //       propType: itemPropType,
          //     });
          //   },
          //   mouseover: () => {
          //     setSelectedValue({
          //       projOrPropName: isProp ? item.propTypeName : item.projName,
          //       lat: item.lat,
          //       lang: item.lang,
          //       type: isProp ? "prop" : "proj",
          //       reqId: itemId,
          //       propType: itemPropType,
          //     });
          //   }, // Open on hover
          //   mouseout: () => {
          //     setSelectedValue(null);
          //   }, // Close when mouse leaves
          // }}
          eventHandlers={eventHandlers}
        >
          {/* <Tooltip
            key={"tooltip_" + itemId + (selected?.reqId ?? "")}
            opacity={1}
            permanent={selected?.reqId === itemId} 
            direction="top"
            offset={[10, -35]}
            className={`${
              isProp
                ? "min-w-fit"
                : isMobile ? "!min-w-[300px] !max-w-[340px]" : "!min-w-[400px]"
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
          </Tooltip> */}

          <Popup>
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
          </Popup>
          
          {/* {itemId === selected?.reqId &&           
          <Popup>
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
          </Popup>
          } */}

        </Marker>
        <NearbyMarkers />
        </>
      )}
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
    }, [data, category]);

    useEffect(() => {
      const handleClickOutside = (event:any) => {
        if (event.target.closest(".leaflet-container")) {
          setSelectedLocation((prev:any)=>({ ...prev, selectedNearbyItem: {}}))
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, [setSelectedLocation]);

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
            zIndexOffset={100}
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
