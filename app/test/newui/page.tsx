"use client";
import React from "react";
import Card from "./components/Card";
import ProjectCard from "./components/Card/index";

type Props = {};

export default function Page({}: Props) {
  const filters = {
    listedBy: "proj",
  };
  const refetch = () => {};
  const mutate = () => {};
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
    </div>
  );
}

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
