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
    <div onClick={(e)=>e.stopPropagation()
    } className="mr-3 my-2 flex justify-between flex-col items-end">
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
        <div className="space-x-2 align-middle">
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
    <div className="bg-[#ECF0F3]  rounded-full w-[26px] h-[26px]  flex  items-center">
       <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M6.37492 8.5C6.37492 8.96966 6.18835 9.42007 5.85625 9.75217C5.52416 10.0843 5.07374 10.2708 4.60409 10.2708C4.13443 10.2708 3.68401 10.0843 3.35192 9.75217C3.01982 9.42007 2.83325 8.96966 2.83325 8.5C2.83325 8.03035 3.01982 7.57993 3.35192 7.24783C3.68401 6.91574 4.13443 6.72917 4.60409 6.72917C5.07374 6.72917 5.52416 6.91574 5.85625 7.24783C6.18835 7.57993 6.37492 8.03035 6.37492 8.5Z" stroke="#616D75" stroke-width="1.5"/>
      <path d="M9.91667 4.60417L6.375 7.08333M9.91667 12.3958L6.375 9.91667" stroke="#616D75" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M13.4582 13.1042C13.4582 13.5738 13.2716 14.0242 12.9395 14.3563C12.6074 14.6884 12.157 14.875 11.6873 14.875C11.2177 14.875 10.7673 14.6884 10.4352 14.3563C10.1031 14.0242 9.9165 13.5738 9.9165 13.1042C9.9165 12.6345 10.1031 12.1841 10.4352 11.852C10.7673 11.5199 11.2177 11.3333 11.6873 11.3333C12.157 11.3333 12.6074 11.5199 12.9395 11.852C13.2716 12.1841 13.4582 12.6345 13.4582 13.1042ZM13.4582 3.89583C13.4582 4.36549 13.2716 4.81591 12.9395 5.148C12.6074 5.4801 12.157 5.66667 11.6873 5.66667C11.2177 5.66667 10.7673 5.4801 10.4352 5.148C10.1031 4.81591 9.9165 4.36549 9.9165 3.89583C9.9165 3.42618 10.1031 2.97576 10.4352 2.64367C10.7673 2.31157 11.2177 2.125 11.6873 2.125C12.157 2.125 12.6074 2.31157 12.9395 2.64367C13.2716 2.97576 13.4582 3.42618 13.4582 3.89583Z" stroke="#616D75" stroke-width="1.5"/>
    </svg>
      </div>
     
  
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
