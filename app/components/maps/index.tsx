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
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import {
  BlueIcon,
  BlueMobileMapIcon,
  MapIcon,
  MobileMapIcon,
} from "@/app/data/map";
import { RecenterIcon } from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";

const Map = ({
  data,
  selectedLocation,
  projName,
  lat,
  lang,
  setSelectedLocation,
  type,
  selected,
  className,
}: any) => {
  const position: LatLngTuple = [lat, lang];
  return (
    <MapContainer
      center={position}
      zoom={13}
      className={clsx(
        " h-[291px] sm:h-[700px] w-full z-[1] relative",
        className
      )}
      scrollWheelZoom={true}
    >
      <button
        className="z-[1000] inline-flex sm:w-fit w-[40px] h-[40px] justify-center items-center gap-1 p-2.5 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.40)] rounded-[21px] bg-[#0073c6] ml-3 sm:ml-0 absolute bottom-[10px] sm:right-[20px] sm:top-[20px]  text-white text-xl not-italic font-bold leading-[normal]"
        onClick={() => {
          setSelectedLocation({
            lat: Number(lat),
            lng: Number(lang),
            name: projName,
          });
        }}
      >
        <span className="hidden sm:block">Re- Center</span>
        <RecenterIcon />
      </button>
      <Content
        data={data}
        selectedLocation={selectedLocation}
        projName={projName}
        lat={lat}
        lang={lang}
        type={type}
        selected={selected}
      />
    </MapContainer>
  );
};

export default Map;

const Content: React.FC<any> = ({
  data,
  selectedLocation,
  projName,
  lat,
  lang,
  type,
  selected,
}) => {
  const position: LatLngTuple = [lat, lang];
  const map = useMap();
  useEffect(() => {
    if (selectedLocation && selectedLocation.name) {
      map.panTo([
        parseFloat(selectedLocation.lat),
        parseFloat(selectedLocation.lng),
      ]);
    }
  }, [selectedLocation, selected]);

  useEffect(() => {
    map.setView(position, 11);
  }, [selected]);

  const isMobile = useMediaQuery("(max-width: 601px)");
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data &&
        data.length > 0 &&
        data?.map((item: any) => (
          <Marker
            position={[parseFloat(item?.lat), parseFloat(item?.lang)]}
            title={item.name}
            {...(isMobile && { icon: BlueMobileMapIcon })}
          >
            {/* {selectedLocation?.lat === item?.lat && ( */}
            {!isMobile && (
              <Tooltip
                key={item.lat}
                opacity={1}
                direction="top"
                permanent={selectedLocation?.lat === item?.lat}
                className="min-w-fit"
              >
                <div className=" ">
                  <p className="text-[#00487C] text-lg not-italic font-semibold leading-[normal]">
                    {item.name}
                  </p>
                </div>
              </Tooltip>
            )}

            {/* )} */}
            {selectedLocation?.lat === item?.lat && (
              <Tooltip
                opacity={1}
                direction="top"
                permanent={selectedLocation?.lat === item?.lat}
                key={item.lang}
                {...(isMobile && { offset: [-7, -40] })}
                className="min-w-fit"
              >
                <div className=" ">
                  <p className="text-[#00487C] text-lg not-italic font-semibold leading-[normal]">
                    {item.name}
                  </p>
                </div>
              </Tooltip>
            )}

            <Popup>
              <p className="text-[#00487C] text-xs sm:text-[17px] italic font-medium leading-[normal]">
                {item.name}
              </p>
            </Popup>
          </Marker>
        ))}

      <Marker
        position={position}
        icon={isMobile ? MobileMapIcon : MapIcon}
        zIndexOffset={1000}
      >
        <Tooltip
          opacity={1}
          permanent
          direction="top"
          offset={[30, -40]}
          className="map"
        >
          <div className="sm:p-2 pt-1">
            <p className="text-white text-[12px] sm:text-base italic font-medium leading-[normal]">
              {type === "prop" ? "Property" : "Project"} you are exploring
            </p>
            <p className="text-white sm:text-lg not-italic font-semibold leading-[normal] mt-2 break-words text-wrap min-w-[200px]">
              {projName}
            </p>
          </div>
        </Tooltip>
      </Marker>
      <polyline />
    </>
  );
};
