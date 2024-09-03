"use client";
import React, { useState } from "react";
import ProjectCard from "./components/Card/index";

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
      {fakeData.map((eachOne, index: number) => {
        return (
          <ProjectCard
            key={index}
            refetch={refetch}
            data={{ ...eachOne, type: filters.listedBy ?? "proj" }}
            index={index}
            mutate={mutate}
          />
        );
      })}
      <ReadMoreCard />
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

const fakeData = [
  {
    projIdEnc: "529bf454894ef4588fce38c434ad6e8a",
    builderId: 103,
    projName: "Mayfair Residency",
    minPrice: "9527000",
    maxPrice: "11100000",
    launchDate: "Wed Apr 07 00:00:00 IST 2021",
    possassionDate: "Thu Oct 16 00:00:00 IST 2025",
    postedDate: "Mon Aug 26 12:47:41 IST 2024",
    city: "Bengaluru",
    locality: "Varthur",
    pincode: "560022",
    propTypes: ["Apartment"],
    agentListing: 1,
    ownerListing: 1,
    builderListing: 4,
    landArea: "8.5",
    builderLogo:
      "https://d2l0lb5gc1bw3t.cloudfront.net/images/varify/builder/solr/103/logo.webp?v\u003d1724666251041",
    lat: 12.956964,
    lang: 77.70214,
    coverUrl:
      "https://d2l0lb5gc1bw3t.cloudfront.net/images/varify/soc/7/cover/cover.webp?v\u003d1724666251041",
    projstatus: "Completed",
    rerastatus: "Recieved",
    postedByName: "Mayfair Builders \u0026 Developers",
    builderName: "Mayfair Builders \u0026 Developers",
    companyName: "Mayfair Pvt. Ltd Brokerage Saved Monthly",
    state: "Karnataka",
    address:
      "Varthur Road, Lakshminarayana Pura, Chandra Layout, Marathahalli, Bengaluru, Karnataka, India",
    shortListed: "N",
    compareAdded: "N",
  },
  {
    projIdEnc: "989b51e0bc9ef35ade73826a63c1576a",
    builderId: 12,
    projName: "Prestige Somerville",
    minPrice: "780000",
    maxPrice: "25000000",
    launchDate: "Wed Aug 19 00:00:00 IST 1857",
    possassionDate: "Thu Aug 21 00:00:00 IST 3000",
    postedDate: "Wed Aug 21 13:06:40 IST 2024",
    city: "Bengaluru",
    locality: "Ramagondanahalli",
    pincode: "560066",
    propTypes: ["Apartment"],
    agentListing: 0,
    ownerListing: 0,
    builderListing: 4,
    landArea: "6.58",
    builderLogo:
      "https://d2l0lb5gc1bw3t.cloudfront.net/images/varify/builder/solr/12/logo.webp?v\u003d1724421159062",
    lat: 12.954621,
    lang: 77.74265,
    coverUrl:
      "https://d2l0lb5gc1bw3t.cloudfront.net/images/varify/soc/2/cover/cover.webp?v\u003d1724421159062",
    projstatus: "On Going",
    rerastatus: "Not Applied",
    postedByName: "Prestige Group",
    builderName: "Prestige Group",
    companyName: "Prestige International Inc.",
    state: "Karnataka",
    address:
      "Prestige Somerville, Ramagondanahalli, Whitefield, Bengaluru, Karnataka, India",
    shortListed: "N",
    compareAdded: "N",
  },
];
