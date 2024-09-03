"use client";

import React, { useEffect, useMemo } from "react";
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
  const position: LatLngTuple = useMemo(() => [lat, lang], [lat, lang]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      className={clsx(
        " h-[291px] sm:h-[456px] xl:h-[600px] w-full z-[1] relative",
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
        setSelectedLocation={setSelectedLocation}
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
  setSelectedLocation,
}) => {
  const position: LatLngTuple = useMemo(() => [lat, lang], [lat, lang]);

  const map = useMap();
  useEffect(() => {
    if (selectedLocation && selectedLocation.name) {
      map.panTo([
        parseFloat(selectedLocation.lat),
        parseFloat(selectedLocation.lng),
      ]);
    }
  }, [selectedLocation, selected, position, map]);

  useEffect(() => {
    map.setView(position, 11);
  }, [selected, map, position]);
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
            key={item?.lat}
            position={[parseFloat(item?.lat), parseFloat(item?.lang)]}
            title={item.name}
            {...(isMobile && { icon: BlueMobileMapIcon })}
            zIndexOffset={100}
            eventHandlers={{
              click: () =>
                setSelectedLocation({
                  lat: item?.lat,
                  lng: item?.lang,
                  name: item?.name,
                }),
            }}
          >
            {/* {selectedLocation?.lat === item?.lat && ( */}
            {!isMobile && (
              <Tooltip
                key={item.lat}
                opacity={1}
                direction="top"
                permanent={selectedLocation?.lat === item?.lat}
                className="min-w-fit z-50"
                offset={[-16, -16]}
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
                offset={isMobile ? [-7, -40] : [-16, -16]}
                className="min-w-fit"
              >
                <div className=" ">
                  <p className="text-[#00487C] text-lg not-italic font-semibold leading-[normal]">
                    {item.name}
                  </p>
                </div>
              </Tooltip>
            )}

            {/* <Popup className="min-w-fit">
              <p className="text-[#00487C] text-xs sm:text-[17px] italic font-medium leading-[normal]">
                {item.name}
              </p>
            </Popup> */}
          </Marker>
        ))}

      <Marker position={position} icon={isMobile ? MobileMapIcon : MapIcon}>
        {/* <Tooltip
          opacity={1}
          direction="top"
          offset={[30, -40]}
          className="max-w-fit -z-10"
          permanent
        >
          <p className="font-bold text-black text-lg sm:text-lg">{projName}</p>
        </Tooltip> */}
        <Popup className="min-w-fit" offset={[30, -4]}>
          <p className="font-bold text-black text-[14px] sm:text-lg">
            {projName}
          </p>
        </Popup>
      </Marker>
      <polyline />
    </>
  );
};
