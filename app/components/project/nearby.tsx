"use client";
import React, { useState, useCallback, useRef } from "react";
import { LuTrain, LuSearch } from "react-icons/lu";
import { Text, Tabs, TextInput, Loader, ScrollArea } from "@mantine/core";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  useGoogleMap,
  DirectionsRenderer,
  InfoWindow,
  DirectionsService,
} from "@react-google-maps/api";
import { clsx } from "clsx";
import axios from "axios";
import { useQuery } from "react-query";
import { IoLocationSharp } from "react-icons/io5";
import Loading from "../atoms/Loader";
import {
  Coordinates,
  calculateDistance,
  calculateTime,
} from "@/app/utils/maps";
import { useDebouncedState } from "@mantine/hooks";
import { MapIcon, nearbyLocationIcon } from "@/app/images/commonSvgs";

interface Area {
  name: string;
  Icon?: string;
  lat?: number;
  lng?: number;
  projName?: string;
}

const Nearby: React.FC<{ lat: string; lang: string; projName: string }> = ({
  lat,
  lang,
  projName,
}) => {
  const [directionsResponse, setDirectionsResponse] = useState<any | null>(
    null
  );
  const [selected, setSelected] = useState<string>("commute");
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: parseInt(lat),
    lng: parseInt(lang),
  });
  const [selectedTravelMode, setSelectedTravelMode] =
    useState<string>("TRANSIT");
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
    height: "100%",
  };

  const showLocationOnMap = useCallback(
    (location: { position: { lat: number; lng: number }; name: string }) => {
      setSelectedLocation(location.position);
      map?.panTo(location.position);
      calculateRoute();
    },
    [map, selectedLocation, selectedTravelMode, selected]
  );
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();
  async function calculateRoute() {
    if ((!map && !selectedLocation) || !selectedTravelMode) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: {
          lat: parseInt(lat),
          lng: parseInt(lang),
        }, // Default center
        destination: new window.google.maps.LatLng(
          selectedLocation.lat,
          selectedLocation.lng
        ),
        // @ts-ignore
        travelMode: selectedTravelMode,
      },
      (result, status) => {
        console.log(result);
        if (status === "OK" && result) {
          setDirectionsResponse(result);
        } else {
          console.error(`Directions request failed: ${status}`);
        }
      }
    );
  }

  const fetchNearbyPlaces = async () => {
    const response = await fetch(
      `/api/hello?lt=${parseInt(lat)}&lng=${parseInt(
        lang
      )}&type=${selected}&travelType=${selectedTravelMode}`
    );
    return await response.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["nearbyPlaces" + selected + selectedTravelMode],
    queryFn: fetchNearbyPlaces,
    onSuccess: (data) => {
      if (Object.keys(data).length > 0) {
        showLocationOnMap({
          position: data[0].geometry.location,
          name: data[0].name,
        });
      }
    },
  });
  const handleLocationListClick = (type: string) => {
    setSelectedTravelMode(type);
  };

  return (
    <div className="w-[90%] mx-auto mt-[5%] mb-[5%] " id="nearBy">
      <h2 className="text-[24px] lg:text-[32px] font-semibold">
        <span className="!text-green-600">{projName} </span>
        <span className="">Near BY LOCATIONS</span>
      </h2>
      <p className="text-[#4D6677] text-2xl italic font-medium leading-[normal] tracking-[0.96px]mt-1 mb-2  ">
        Explore near by convenient amenities, entertainment, and essential
        services
      </p>

      <div className="flex gap-6 mb-5 mt-1 w-full flex-wrap ">
        {areas.map((area) => (
          <button
            onClick={() => {
              setSelected(area.name);
            }}
            className={clsx(
              "text-[#4D6677] text-xl not-italic font-medium flex items-center   leading-[normal] capitalize",
              selected === area.name && "!text-green-600 font-semibold"
            )}
            key={area.name}
          >
            <LuTrain className="mr-2" size={20} /> {area.name}
          </button>
        ))}
      </div>

      <div className="border border-[#92B2C8] grid grid-cols-1 md:grid-cols-[2fr_3fr] rounded-xl overflow-hidden shadow-lg md:h-[600px]">
        <section className="bg-white">
          <div id="tabs">
            <Tabs defaultValue="public">
              <div className="bg-blue-50 px-5 py-4">
                <p className="text-[#001F35] text-[22px]  font-medium leading-[normal]">
                  Select how you want to travel
                </p>
                <Tabs.List>
                  <Tabs.Tab
                    className={`  not-italic leading-[normal] no-underline capitalize ${
                      selectedTravelMode == "TRANSIT"
                        ? "!text-[#148B16] font-[700] underline"
                        : "!text-[#737579] no-underline font-[500]"
                    } `}
                    value="public"
                    onClick={() => setSelectedTravelMode("TRANSIT")}
                  >
                    Public Transport
                  </Tabs.Tab>
                  <Tabs.Tab
                    className={`  not-italic leading-[normal] no-underline capitalize ${
                      selectedTravelMode == "DRIVING"
                        ? "!text-[#148B16] font-[700] underline"
                        : "!text-[#737579] no-underline font-[500]"
                    } `}
                    value="drive"
                    onClick={() => setSelectedTravelMode("DRIVING")}
                  >
                    Drive
                  </Tabs.Tab>
                  <Tabs.Tab
                    className={`  not-italic leading-[normal] no-underline capitalize ${
                      selectedTravelMode == "WALKING"
                        ? "!text-[#148B16] font-[700] underline"
                        : "!text-[#737579] no-underline font-[500]"
                    } `}
                    value="walk"
                    onClick={() => setSelectedTravelMode("WALKING")}
                  >
                    Walk
                  </Tabs.Tab>
                </Tabs.List>
              </div>

              <div className="px-4 pb-3">
                {/* Search Section */}
                <SearchSection setSelectedLocation={showLocationOnMap} />

                <Tabs.Panel value="public">
                  <div id="location-listing" className="grid gap-2">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <ScrollArea h={400}>
                        {data && Object.values(data).length > 0 ? (
                          Object.values(data).map(
                            (location: any, index: number) => (
                              <LocationList
                                type="public"
                                {...location}
                                key={index}
                                lat={lat}
                                lng={lang}
                                onClick={setSelectedLocation}
                                setDirection={showLocationOnMap}
                                onChangeTravelMode={handleLocationListClick}
                                showLocationOnMap={showLocationOnMap}
                              />
                            )
                          )
                        ) : (
                          <p>No locations found.</p>
                        )}
                      </ScrollArea>
                    )}
                  </div>
                </Tabs.Panel>
                <Tabs.Panel value="drive">
                  <div id="location-listing" className="grid gap-2">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <ScrollArea h={400}>
                        {data && Object.values(data).length > 0 ? (
                          Object.values(data).map(
                            (location: any, index: number) => (
                              <LocationList
                                type="public"
                                {...location}
                                key={index}
                                lat={lat}
                                lng={lang}
                                onClick={setSelectedLocation}
                                setDirection={showLocationOnMap}
                                onChangeTravelMode={handleLocationListClick}
                                showLocationOnMap={showLocationOnMap}
                              />
                            )
                          )
                        ) : (
                          <p>No locations found.</p>
                        )}
                      </ScrollArea>
                    )}
                  </div>
                </Tabs.Panel>
                <Tabs.Panel value="walk">
                  <div id="location-listing" className="grid gap-2">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <ScrollArea h={400}>
                        {data && Object.values(data).length > 0 ? (
                          Object.values(data).map(
                            (location: any, index: number) => (
                              <LocationList
                                type="public"
                                {...location}
                                key={index}
                                lat={lat}
                                lng={lang}
                                onClick={setSelectedLocation}
                                setDirection={showLocationOnMap}
                                onChangeTravelMode={handleLocationListClick}
                                showLocationOnMap={showLocationOnMap}
                              />
                            )
                          )
                        ) : (
                          <p>No locations found.</p>
                        )}
                      </ScrollArea>
                    )}
                  </div>
                </Tabs.Panel>
              </div>
            </Tabs>
          </div>
        </section>
        <section>
          {isLoaded && (
            <GoogleMap
              key={selectedTravelMode}
              mapContainerStyle={mapContainerStyle}
              center={selectedLocation}
              zoom={15}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {selectedLocation && !directionsResponse && (
                <div className="relative">
                  <Marker
                    position={{
                      lat: parseInt(lat),
                      lng: parseInt(lang),
                    }}
                    icon={{
                      url: "/mapIcon.svg",
                    }}
                  >
                    <InfoWindow>
                      <div className=" ">
                        <p className="text-[#00487C] text-[10px] italic font-medium leading-[normal]">
                          Project you are exploring
                        </p>
                        <p className="text-[#006A02] text-sm not-italic font-semibold leading-[normal]">
                          {projName}
                        </p>
                      </div>
                    </InfoWindow>
                  </Marker>
                </div>
              )}
              {directionsResponse && (
                <DirectionsRenderer
                  options={{
                    directions: directionsResponse,
                  }}
                />
              )}
            </GoogleMap>
          )}
        </section>
      </div>
    </div>
  );
};

export default Nearby;

const LocationList: React.FC<{
  name: string;
  geometry: Coordinates;
  vicinity: string;
  lat: number;
  lng: number;
  type: "public" | "drive" | "walk";
  onClick: (location: any) => void;
  onChangeTravelMode: (mode: string) => void; // New prop for changing travel mode
  showLocationOnMap: (location: any) => void;
  distance: any;
  duration: any;
}> = ({ name, geometry, vicinity, distance, duration, showLocationOnMap }) => {
  const handleClick = () => {
    showLocationOnMap({
      position: {
        lat: geometry.location.lat,
        lng: geometry.location.lng,
      },
    });
  };

  return (
    <div
      className="p-2 bg-gray-50 border rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <h6 className="text-black text-lg not-italic font-medium leading-[normal] capitalize">
          {name}
        </h6>
        <div className="flex gap-1 text-sm">
          <span className="flex items-center">
            {nearbyLocationIcon}
            <span className="ml-[4px] text-[#005DA0] text-lg not-italic font-medium leading-[normal] ">
              {distance?.text ?? "N/A"}
            </span>
          </span>
          <span>|</span>
          <span className="text-[#001F35] text-lg not-italic font-medium leading-[normal]">
            {duration?.text ?? "N/A"}
          </span>
        </div>
      </div>
      <p className="flex items-center gap-1 text-[#565D70] text-lg not-italic font-normal leading-[normal] lowercase">
        <LuTrain size={15} />
        Via public transport
      </p>
      <p className="text-gray-600 mt-1">{vicinity}</p>
    </div>
  );
};

const SearchSection = ({ setSelectedLocation }: any) => {
  const getSearchResults = async (input: string) => {
    const res = await axios.get(`/api/googlesearch?input=${input}`);
    return res.data;
  };
  const [value, setValue] = useDebouncedState("", 500);
  const { data, isLoading } = useQuery({
    queryKey: ["search", value],
    queryFn: () => getSearchResults(value),
    enabled: !!value,
  });
  const handleSearchClick = async (id: number) => {
    const res = await axios.get(`/api/latlong?id=${id}`);
    setSelectedLocation({
      position: {
        lat: res.data.location.lat,
        lng: res.data.location.lng,
      },
    });
    setValue("");
  };
  return (
    <div id="search" className="my-4">
      <p className="text-[#212C33] text-lg not-italic font-medium leading-[normal] mb-1">
        Add a location to calculate your travel time
      </p>
      <TextInput
        size="sm"
        leftSection={<LuSearch />}
        placeholder="Enter location"
        onChange={(e) => setValue(e.target.value)}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-2">
            {data?.autocompleteRes?.predictions?.map(
              (result: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center my-1 cursor-pointer"
                  onClick={() => handleSearchClick(result.place_id)}
                >
                  <IoLocationSharp className="text-gray-500" />
                  <span className="ml-2">{result.description}</span>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};
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
  },
  {
    name: "clinic",
    Icon: " ",
  },
];
