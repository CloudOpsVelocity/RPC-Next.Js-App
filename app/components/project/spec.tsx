import React from "react";
import { MdOutlineDoorSliding } from "react-icons/md";

export default function Spec() {
  return (
    <>
      {/*
  // v0 by Vercel.
  // https://v0.dev/t/k36UExGzW14
  */}
      <div className="max-w-[1920px] px-5    mx-auto mb-10">
        <div className="bg-white  rounded-lg shadow-md flex  overflow-hidden max-h-[300px] ">
          <div className="flex-1 bg-gradient-to-tr from-blue-100 p-8">
            <h2 className="text-2xl font-semibold">
              SPECIFICATION OF
              <span className="!text-green-600"> SARANG</span>
            </h2>
            <p className="text-lg text-gray-600 mt-2 mb-4">
              Vital Details: Size, Amenities,
              <br /> Features- Unveiling your dream project
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#structure"
                className="border px-5 py-2 rounded-lg bg-white font-semibold flex gap-2 items-center"
              >
                <MdOutlineDoorSliding size={20} /> Structure
              </a>

              <a
                href="#doors"
                className="border px-5 py-2 rounded-lg bg-white font-semibold flex gap-2 items-center"
              >
                <MdOutlineDoorSliding size={20} /> Flooring
              </a>

              <a
                href="#structure"
                className="border px-5 py-2 rounded-lg bg-white font-semibold flex gap-2 items-center"
              >
                <MdOutlineDoorSliding size={20} /> Doors
              </a>

              <a
                href="#structure"
                className="border px-5 py-2 rounded-lg bg-white font-semibold flex gap-2 items-center"
              >
                <MdOutlineDoorSliding size={20} /> Power Backup
              </a>
              <a
                href="#structure"
                className="border px-5 py-2 rounded-lg bg-white font-semibold flex gap-2 items-center"
              >
                <MdOutlineDoorSliding size={20} /> Windows
              </a>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-lg overflow-y-scroll">
            <div id="structure">
              <h1 className="bg-gradient-to-tr from-blue-100 flex items-center gap-2 text-xl py-2 px-2 rounded-xl">
                <MdOutlineDoorSliding size={22} />{" "}
                <span className="">Structure</span>
              </h1>
              <div>
                <ul className=" list-disc ml-8 grid gap-2 my-2">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                </ul>
              </div>
            </div>

            <div id="flooring">
              <h1 className="bg-gradient-to-tr from-blue-100 flex items-center gap-2 text-xl py-2 px-2 rounded-xl">
                <MdOutlineDoorSliding size={22} />{" "}
                <span className="">Flooring</span>
              </h1>
              <div>
                <ul className=" list-disc ml-8 grid gap-2 my-2">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                </ul>
              </div>
            </div>

            <div id="doors">
              <h1 className="bg-gradient-to-tr from-blue-100 flex items-center gap-2 text-xl py-2 px-2 rounded-xl">
                <MdOutlineDoorSliding size={22} />{" "}
                <span className="">Doors</span>
              </h1>
              <div>
                <ul className=" list-disc ml-8 grid gap-2 my-2">
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
