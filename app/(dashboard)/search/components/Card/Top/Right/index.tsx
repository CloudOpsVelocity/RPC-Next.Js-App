import Button from "@/app/elements/button";
import { GradientLocation, SearchMapIcon } from "@/app/images/commonSvgs";
import selectedSearchAtom from "@/app/store/search/map";
import { useSetAtom } from "jotai";
import React from "react";

type Props = any;

export default function TopRightSection({
  agentListing,
  ownerListing,
  projName,
  lat,
  lang,
  onAddingCompare,
  onAddingShortList,
  compareAdded,
}: Props) {
  console.log(compareAdded);
  const setSelected = useSetAtom(selectedSearchAtom);
  return (
    <div className="mr-3 my-2 flex justify-between flex-col items-end">
      <button
        className="max-w-fit px-[1px] py-[1px]  rounded  text-[#242424] text-sm not-italic font-semibold my-2 md:mb-1  gradient"
        onClick={() =>
          setSelected({
            agentListing,
            ownerListing,
            projName,
            lat,
            lang,
          })
        }
      >
        <div className="px-[1px] py-[1px] inline-flex justify-center items-center bg-[#F0F9FF] gap-0.5 rounded">
          {" "}
          View on Map <SearchMapIcon className="w-4 h-4" />
        </div>
      </button>
      <div className="flex items-end flex-col gap-2">
        <Button
          onChange={() => onAddingCompare()}
          title={compareAdded === "Y" ? "Remove Compare" : " Add to Compare"}
          buttonClass="inline-flex justify-center items-center gap-2.5 rounded p-0.5 border-[0.5px] border-solid border-[#00A8CD] text-[#00A8CD] text-xs not-italic font-semibold ml-auto"
        />{" "}
        <p className="text-[#242424] text-sm  not-italic font-normal">
          Posted: <span className="font-bold">10 days ago</span>
        </p>
      </div>
    </div>
  );
}
