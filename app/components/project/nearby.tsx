"use client";
import React, { useState, useCallback } from "react";
import { LuTrain, LuSearch } from "react-icons/lu";
import { Text, Tabs, TextInput } from "@mantine/core";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import cslx, { clsx } from "clsx";
import axios from "axios";
import { useQuery } from "react-query";
interface Area {
  name: string;
  Icon?: string;
  lat?: number;
  lng?: number;
}

const Nearby = ({ lat, lang }: { lat: string; lang: string }) => {
  const [selected, setSelected] = useState<string>("commute");
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: parseInt(lat),
    lng: parseInt(lang),
  });
  const [map, setMap] = useState<any | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!!,
  });

  const onLoad = useCallback((map: any) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const mapContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "400px",
  };

  const showLocationOnMap = useCallback(
    (location: { position: { lat: number; lng: number }; name: string }) => {
      setSelectedLocation(location.position);
      map?.panTo(location.position);
    },
    [map]
  );
  console.log(selectedLocation);
  const areas: Area[] = [
    {
      name: "commute",
      Icon: " ",
    },
    {
      name: "train",
      Icon: " ",
    },
    {
      name: "bus",
      Icon: " ",
    },
    {
      name: "hospital",
      Icon: " ",
      lng: 77.55137057690479,
      lat: 13.02542364337667,
    },
    {
      name: "school",
      Icon: " ",
    },
    {
      name: "market",
      Icon: " ",
    },
    {
      name: "restaurant",
      Icon: " ",
    },
    {
      name: "bank",
      Icon: " ",
      lng: 77.5815168,
      lat: 13.0318336,
    },
    {
      name: "clinic",
      Icon: " ",
    },
  ];
  const fetchNearbyPlaces = async () => {
    const response = await fetch(
      `/api/hello?lt=${13.0318336}&lng=${77.5815168}`
    );
    return await response.json();
  };

  const { data } = useQuery({
    queryKey: ["nearbyPlaces"],
    queryFn: fetchNearbyPlaces,
  });
  console.log(data);
  return (
    <div className="w-[90%] mx-auto mt-[5%] mb-[5%] " id="nearBy">
      <h2 className="text-[24px] lg:text-[32px] font-semibold">
        <span className="!text-green-600">SARANG BY SUMADHARA </span>
        <span className="">Near BY LOCATIONS</span>
      </h2>
      <p className="text-gray-500 mt-1 mb-2 text-lg italic ">
        Explore near by convenient amenities, entertainment, and essential
        services
      </p>

      <div className="flex gap-10 mb-5 mt-3 w-full flex-wrap ">
        {areas.map((area) => (
          <button
            onClick={() => {
              setSelected(area.name);
              showLocationOnMap({
                position: { lat: area.lat || 0, lng: area.lng || 0 },
                name: area.name,
              });
            }}
            className={clsx(
              "capitalize text-gray-600 font-medium flex items-center gap-1.5",
              selected === area.name && "!text-green-600 font-semibold"
            )}
            key={area.name}
          >
            <LuTrain size={20} /> {area.name}
          </button>
        ))}
      </div>

      <div className="border border-[#92B2C8] grid grid-cols-[2fr_3fr] rounded-xl overflow-hidden shadow-lg">
        <section className="bg-white">
          <div id="tabs">
            <Tabs defaultValue="gallery">
              <div className="bg-blue-50 px-5 py-4">
                <Text>Select how you want to travel</Text>
                <Tabs.List>
                  <Tabs.Tab value="gallery">Public Transport </Tabs.Tab>
                  <Tabs.Tab value="messages">Drive</Tabs.Tab>
                  <Tabs.Tab value="settings">Walk</Tabs.Tab>
                </Tabs.List>
              </div>

              <div className="px-4 pb-3">
                <div id="search" className="my-4">
                  <Text>Add a location to calculate your travel time</Text>
                  <TextInput
                    size="sm"
                    leftSection={<LuSearch />}
                    placeholder="Enter location"
                  />
                </div>

                <Tabs.Panel value="gallery">
                  <div id="location-listing" className="grid gap-2">
                    {/* Your existing location list items */}
                  </div>
                </Tabs.Panel>

                {/* Other panels... */}
              </div>
            </Tabs>
          </div>
        </section>
        <section>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={selectedLocation}
              zoom={15}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {selectedLocation && <Marker position={selectedLocation} />}
            </GoogleMap>
          )}
        </section>
      </div>
    </div>
  );
};

export default Nearby;
