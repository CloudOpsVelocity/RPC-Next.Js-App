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
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapIcon } from "@/app/data/map";
import { RecenterIcon } from "@/app/images/commonSvgs";

const Map = ({
  data,
  selectedLocation,
  projName,
  lat,
  lang,
  setSelectedLocation,
}: any) => {
  const position: LatLngTuple = [lat, lang];
  return (
    <MapContainer
      center={position}
      zoom={13}
      className=" h-[291px] sm:h-[700px] w-full z-[1] relative"
      scrollWheelZoom={true}
    >
      <button
        className="z-[1000] inline-flex justify-center items-center gap-1 p-2.5 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.40)] rounded-[21px] bg-[#0073c6] absolute top-[20px] right-[20px] text-white text-xl not-italic font-bold leading-[normal]"
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
  }, [selectedLocation]);
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
          >
            {/* {selectedLocation?.lat === item?.lat && ( */}
            <Tooltip
              key={item.lat}
              opacity={1}
              direction="top"
              permanent={selectedLocation?.lat === item?.lat}
            >
              <div className=" ">
                <p className="text-[#00487C] text-lg not-italic font-semibold leading-[normal]">
                  {item.name}
                </p>
              </div>
            </Tooltip>
            {/* )} */}
            {selectedLocation?.lat === item?.lat && (
              <Tooltip
                opacity={1}
                direction="top"
                permanent={selectedLocation?.lat === item?.lat}
                key={item.lang}
              >
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

      <Marker position={position} icon={MapIcon} zIndexOffset={1000}>
        <Tooltip
          opacity={1}
          permanent
          direction="top"
          offset={[30, -40]}
          className="map"
        >
          <div className="p-2">
            <p className="text-white text-base italic font-medium leading-[normal]">
              Project you are exploring
            </p>
            <p className="text-white text-lg not-italic font-semibold leading-[normal] mt-2">
              {projName}
            </p>
          </div>
        </Tooltip>
        {/* <Popup maxWidth={200} minWidth={200}>
          <Image
            src="https://ak-d.tripcdn.com/images/220a0r000000gwne24089_R_960_660_R5_D.jpg"
            width={500}
            height={500}
            alt="Wrong with images"
          />
          <div className="my-2">
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm">{projName}</div>
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
        </Popup> */}
      </Marker>
      <polyline />
    </>
  );
};
