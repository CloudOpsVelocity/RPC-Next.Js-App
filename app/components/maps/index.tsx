"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { LatLngTuple } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import Image from "next/image";
import CustomMarker from "./customarker";
import clsx from "clsx";
import { MapIcon, areas, fakeDataMaps, markers } from "@/app/data/map";

const Map = ({ data }: any) => {
  const [selected, setSelected] = useState("commute");

  const position: LatLngTuple = [12.9856503, 77.60569269999999];

  return (
    // <div className="">MAp</div>
    <>
      <MapContainer
        center={position}
        zoom={15}
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
        {data &&
          Object.values(data).length > 0 &&
          Object.values(data)?.map((item: any, index: any) => (
            <CustomMarker
              key={index}
              location={[
                item?.geometry?.location?.lat,
                item?.geometry?.location?.lng,
              ]}
              iconType="Hotel"
            />
          ))}

        <Marker position={position} icon={MapIcon}>
          <Tooltip opacity={1} permanent direction="top" offset={[30, -40]}>
            <div className=" ">
              <p className="text-[#00487C] text-[10px] italic font-medium leading-[normal]">
                Project you are exploring
              </p>
              <p className="text-[#006A02] text-sm not-italic font-semibold leading-[normal]">
                Sagar Samudhara
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
      <div className="flex gap-6 mb-5 mt-1 w-full flex-wrap ">
        {areas.map((area) => {
          return (
            <button
              onClick={() => {
                setSelected(area.name);
              }}
              className={clsx(
                "text-[#4D6677] text-xl not-italic font-medium flex items-center gap-[5px] leading-[normal] capitalize",
                selected === area.name && "!text-green-600 font-semibold"
              )}
              key={area.name}
            >
              <Image src={area.Icon} alt="hello" height={30} width={30} />{" "}
              {area.name}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Map;
