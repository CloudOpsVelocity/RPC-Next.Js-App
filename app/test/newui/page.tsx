"use client";
import React, { useState } from "react";
// import ProjectCard from "./components/Card/index";

export default function Page() {
  const filters = {
    listedBy: "proj",
  };
  const refetch = () => {};
  const mutate = () => {};
  const arr = ["2bhk", "2bhk", "3bhk", "3Bhk", "4bhk"];
  // remove duplicates in this array
  const removeDuplicated = (input: string[]) => {
    let r: string[] = [];
    for (let i = 0; i < input.length; i++) {
      if (!r.includes(input[i])) {
        r.push(input[i]);
      }
    }
    return r;
  };
  const output = removeDuplicated(arr);
  console.log(output);
  return (
    <div className="flex justify-center items-center flex-wrap w-[100%] sm:max-w-[50%]">
      {/* {fakeData.map((eachOne, index: number) => {
        return (
          <ProjectCard
            key={`projCard_${eachOne?.projIdEnc}`}
            refetch={refetch}
            data={{ ...eachOne, type: filters.listedBy ?? "proj" }}
            index={index}
            mutate={mutate}
          />
        );
      })}
      <ReadMoreCard /> */}
    </div>
  );
}

const ReadMoreCard = () => {
  const [isReadMore, setIsReadMore] = useState(false);

  const handleReadMore = () => {
    setIsReadMore(true);
  };

  return (
    <div className="relative w-80 p-4 bg-white shadow-lg overflow-hidden">
      <div
        className={`relative ${isReadMore ? "" : "max-h-24 overflow-hidden"}`}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          auctor felis at nunc ornare, ac malesuada odio tincidunt. Donec nec
          lacus sit amet nisl aliquam malesuada. Maecenas lacinia sem ut massa
          hendrerit, non efficitur eros sodales. Proin nec aliquam velit. Nam a
          elit vel nisi faucibus tincidunt. Quisque sit amet elit vitae magna
          vestibulum fermentum. Etiam at odio orci.
        </p>
        {!isReadMore && (
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent h-24 pointer-events-none" />
        )}
      </div>
      {!isReadMore && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-70 flex justify-end">
          <button
            onClick={handleReadMore}
            className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
          >
            Read More
          </button>
        </div>
      )}
    </div>
  );
};
