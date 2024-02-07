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

const Map = ({ data, selectedLocation, projName, lat, lang }: any) => {
  console.log(selectedLocation);
  const position: LatLngTuple = [lat, lang];

  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "700px", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={position} icon={MapIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {/* {data &&
          data.length > 0 &&
          data?.map((item: any, index: any) => (
            <CustomMarker
              key={index}
              location={[parseFloat(item?.lat), parseFloat(item?.lang)]}
              iconType="Hotel"
            />
          ))} */}
        {data &&
          data.length > 0 &&
          data?.map((item: any) => (
            <Marker
              position={[parseFloat(item?.lat), parseFloat(item?.lang)]}
              title="Hell"
            >
              {selectedLocation?.lat === item?.lat && (
                <Tooltip opacity={1} permanent direction="top">
                  <div className=" ">
                    <p className="text-[#00487C] text-lg not-italic font-semibold leading-[normal]">
                      {item.name}
                    </p>
                  </div>
                </Tooltip>
              )}

              <Popup>
                <p className="text-[#00487C] text-[17px] italic font-medium leading-[normal]">
                  {item.name}
                </p>
              </Popup>
            </Marker>
          ))}

        <Marker position={position} icon={MapIcon}>
          <Tooltip opacity={1} permanent direction="top" offset={[30, -40]}>
            <div className=" ">
              <p className="text-[#00487C] text-base italic font-medium leading-[normal]">
                Project you are exploring
              </p>
              <p className="text-[#006A02] text-lg not-italic font-semibold leading-[normal]">
                {projName}
              </p>
            </div>
          </Tooltip>
          <Popup maxWidth={200} minWidth={200}>
            <Image
              src="https://ak-d.tripcdn.com/images/220a0r000000gwne24089_R_960_660_R5_D.jpg"
              width={500}
              height={500}
              alt="Wrong with images"
            />
            <div className="my-2">
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm">The Scene Condo</div>
                <div className="">123</div>
              </div>
              <div className="overflow-x-scroll mt-1">
                <div className="">Booking Now (132)</div>
                <div className="text-xs mt-1">Price: 9000</div>
                <div className="text-xs mt-1">
                  40 THAVEEWONG ROAD, PATONG, KATHU
                </div>
                <div className="text-xs mt-1">
                  RESERVATIONS-BLISSPATONG@HOMMHOTELS.COM
                </div>
                <div className="text-xs mt-1">
                  0x05CD35f8D7011b42Ef579cCab9D6982cDd9f24cd
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
        <polyline />
      </MapContainer>
    </>
  );
};

export default Map;
