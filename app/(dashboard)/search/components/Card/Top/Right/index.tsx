import Button from "@/app/elements/button";
import { GradientLocation, SearchMapIcon } from "@/app/images/commonSvgs";
import selectedSearchAtom from "@/app/store/search/map";
import { useAtom, useSetAtom } from "jotai";
import React from "react";
import HeartButton from "../Center/HeartButton";
import { searchShareAtom } from "../../../SharePopup";

type Props = any;

export default function TopRightSection({
  agentListing,
  ownerListing,
  projName,
  lat,
  lang,
  onAddingCompare,
  compareAdded,
  Com,
  Sh,
  onAddingShortList,
  projIdEnc,
  type,
  propIdEnc,
  postedDate,
}: Props) {
  const setSelected = useSetAtom(selectedSearchAtom);
  const [sharePopupData, setSharePopup] = useAtom(searchShareAtom);
  const url =
    type === "proj"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/abc/banglore/whitefield/${projIdEnc}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/listing/whitefield/${propIdEnc}`;

  return (
    <div className="mr-3 my-2 flex justify-between flex-col items-end">
      <div className="flex flex-col items-end">
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
        <div className="space-x-2">
          <HeartButton shortListed={Sh} onAddingShortList={onAddingShortList} />
          <button
            onClick={() =>
              setSharePopup({ ...sharePopupData, opened: true, url })
            }
          >
            {config.shareIcon}
          </button>
        </div>
      </div>

      <div className="flex items-end flex-col gap-2">
        <Button
          onChange={() => onAddingCompare()}
          title={Com ? "Remove Compare" : " Add to Compare"}
          buttonClass="inline-flex justify-center items-center gap-2.5 rounded p-0.5 border-[0.5px] border-solid border-[#00A8CD] text-[#00A8CD] text-xs not-italic font-semibold ml-auto"
        />{" "}
        <p className="text-[#242424] text-sm  not-italic font-normal">
          Posted: <span className="font-bold">{timeAgo(postedDate)}</span>
        </p>
      </div>
    </div>
  );
}

const config = {
  shareIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="11.75"
        fill="#ECF0F3"
        stroke="#A7C4DA"
        stroke-width="0.5"
      />
    </svg>
  ),
};
function parseDateString(dateString: string): Date {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [_, monthStr, day, time, , year] = dateString.split(" ");
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const month = months.indexOf(monthStr);
  return new Date(Number(year), month, Number(day), hours, minutes, seconds);
}

function timeAgo(dateString: string): string {
  const date = parseDateString(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  const interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }
  if (interval === 1) {
    return interval + " year ago";
  }

  const months = Math.floor(seconds / 2628000);
  if (months > 1) {
    return months + " months ago";
  }
  if (months === 1) {
    return months + " month ago";
  }

  const days = Math.floor(seconds / 86400);
  if (days > 1) {
    return days + " days ago";
  }
  if (days === 1) {
    return days + " day ago";
  }

  const hours = Math.floor(seconds / 3600);
  if (hours > 1) {
    return hours + " hours ago";
  }
  if (hours === 1) {
    return hours + " hour ago";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes > 1) {
    return minutes + " minutes ago";
  }
  if (minutes === 1) {
    return minutes + " minute ago";
  }

  return "just now";
}
