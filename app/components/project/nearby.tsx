"use client";

import clsx from "clsx";
import { useState } from "react";
import { LuTrain, LuSearch } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";
import { Text, Tabs, TextInput } from "@mantine/core";
export default function Nearby() {
  const [selected, setSelected] = useState("commute");
  return (
    <div className="w-[90%] mx-auto mt-[5%] mb-[5%] " id="nearBy">
      <h2 className="text-[24px] lg:text-[32px] font-semibold">
        <span className="!text-green-600">SARANG BY SUMADHARA </span>
        <span className="">Near BY LOCATIONS</span>
      </h2>
      <p className="text-gray-500 mt-1 mb-2 text-lg italic ">
        Explore near by convernient amenities, entertainment and essesntial
        services
      </p>

      <div className="flex gap-10 mb-5 mt-3 w-full flex-wrap ">
        {areas.map((area) => (
          <button
            onClick={() => {
              setSelected(area.name);
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
                    <LocationList />
                    <LocationList />
                    <LocationList />
                    <LocationList />
                    <LocationList />
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="messages">
                  <div id="location-listing" className="grid gap-2">
                    <LocationList />
                    <LocationList />
                    <LocationList />
                  </div>
                </Tabs.Panel>

                <Tabs.Panel value="settings">
                  <div id="location-listing" className="grid gap-2">
                    <LocationList />
                    <LocationList />
                    <LocationList />
                    <LocationList />
                  </div>
                </Tabs.Panel>
              </div>
            </Tabs>
          </div>
        </section>
        <section
          className="bg-cover-- bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://cdn.buttercms.com/Ym1iRZNbRHOeWv0X4x3w)",
          }}
        ></section>
      </div>
    </div>
  );
}

const LocationList = () => (
  <div className="p-2 bg-gray-50 border rounded-lg">
    <div className="flex items-center justify-between">
      <h6 className="text-md">Internation Airport</h6>
      <div className="flex gap-1 text-sm">
        <span className="flex items-center">
          <IoLocationSharp />
          <span className="text-blue-800">10 Km</span>
        </span>
        <span>|</span>
        <span>1hr</span>
      </div>
    </div>
    <p className="flex items-center gap-1 text-sm text-gray-600">
      <LuTrain size={15} />
      Via public transport
    </p>
  </div>
);

const areas = [
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
  //   {
  //     name: "other1",
  //     Icon: " ",
  //   },
  //   {
  //     name: "other2",
  //     Icon: " ",
  //   },
  //   {
  //     name: "othre3",
  //     Icon: " ",
  //   },
];
