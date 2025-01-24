/* eslint-disable jsx-a11y/no-static-element-interactions */
import selectedSearchAtom from "@/app/store/search/map";
import { useAtom, useSetAtom } from "jotai";
import React from "react";
import HeartButton from "../Center/HeartButton";
import { useMediaQuery } from "@mantine/hooks";
import ProjData from "../Center/ProjData";
import { ShareIcon } from "@/app/images/HomePageIcons";
import { searchShareAtom } from "@/app/(dashboard)/searchOldPage/components/SharePopup";
import { NewMapIcon } from "@/app/images/commongsSvgs2";
import clsx from "clsx";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import DownloadBrocher from "../../DownloadBrocher";
import { overlayAtom } from "@/app/test/newui/store/overlay";
import { generateListingLinkUrl } from "@/app/utils/linkRouters/ListingLink";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import Image from "next/image";

type Props = any;

export default function TopRightSection({
  agentListing,
  ownerListing,
  projName,
  // lat,
  // lang,
  Sh,
  onAddingShortList,
  projIdEnc,
  type,
  data,
  propIdEnc,
  propName,
  basePrice,
  brochureUrl,
  propertyAge,
  facing,
  propTypeId,
  price,
  towerName,
  atFloor,
  sqftPrice,
  floorPlan,
  propTypeName,
  propType,
  amenCount,
  category,
  phaseId,
  location,

  city,
  cityName,
  towerData,
  locality,
  localityName,
  phaseName,
  bhk,
  bhkName,
}: Props) {
  const setSelected = useSetAtom(selectedSearchAtom);
  const [sharePopupData, setSharePopup] = useAtom(searchShareAtom);
  const dispatch = useSetAtom(overlayAtom);

  // const url =
  //   type === "proj"
  //     ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/abc/banglore/whitefield/${projIdEnc}`
  //     : `${process.env.NEXT_PUBLIC_BACKEND_URL}/listing/whitefield/${propIdEnc}`;

  const isMobile = useMediaQuery("(max-width: 1600px)");
  const projOrPropName = type === "proj" ? projName : propName;
  const handleClick = () => {
    // Get the div by ID and scroll to it
    const element = document.getElementById("mobileMap");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const url =
    type === "proj"
      ? createProjectLinkUrl({
          city: cityName ? cityName : city ? city : "",
          locality: localityName ? localityName : locality ? locality : "",
          slug: projName ? projName : projName,
          projIdEnc: projIdEnc,
        })
      : generateListingLinkUrl({
          city: cityName,
          locality: localityName,
          projName: projIdEnc ? propName : null,
          category: category === "Sale" ? "for-sale" : "for-rent",
          phase: phaseName,
          propIdEnc: propIdEnc,
          bhkUnitType: bhkName
            ? `${bhkName + " " + propTypeName}`
            : "" + " " + propTypeName,
        });
  const [lat, lang] = location?.split(",") ?? [];
  // console.log("card 1: ");
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={clsx(
        "m-[2px]  xl:mr-3 xl:my-2 flex xl:gap-[0.5px] mx-2 max-h-full justify-between items-start flex-row xl:flex-col xl:items-end  xl:absolute top-0 right-0",
        type !== "proj" && ""
      )}
    >
      {category == "Sale" || type === "proj" ? (
        <div className="text-xs hidden xl:flex sm:text-base font-medium text-[#4f4f4f] text-nowrap absolute top-3 right-24  sm:top-0 sm:right-[65px]">
          Avg Price:{" "}
          <span className="font-bold ml-1">
            {" "}
            {/*  ₹{formatNumberWithSuffix(type === "proj" ? basePrice : sqftPrice)} */}
            ₹{formatNumberWithSuffix(type === "proj" ? basePrice : price)}
          </span>
        </div>
      ) : null}

      {isMobile && (
        <>
          <ProjData type={type} {...data} />
          <div className="flex flex-col justify-between">
            <div className="flex flex-row md:flex-col gap-3 sm:gap-1 xl:gap-3  justify-end">
              <div className="gap-2 xl:gap-1 inline-flex justify-end">
                <HeartButton
                  shortListed={Sh}
                  onAddingShortList={onAddingShortList}
                />
                <button
                  className="gap-2 xl:gap-1 flex flex-row items-center align-middle  "
                  onClick={
                    () => {
                      navigator.share({
                        title: type === "proj" ? projName : propName,
                        text: `Check out this ${
                          type === "proj" ? "project" : "property"
                        }: ${type === "proj" ? projName : propName}`,
                        url: url,
                      });
                    }
                    // setSharePopup({
                    //   ...sharePopupData,
                    //   opened: true,
                    //   url,
                    //   ...(type !== "proj" && { title: "Share Listing" }),
                    // })
                  }
                >
                  <ShareIcon />
                </button>
                {floorPlan && type !== "proj" && (
                <div
                  onClick={() =>
                    window.open(
                      `/image?path=${
                        floorPlan.split(process.env.NEXT_PUBLIC_IMG_BASE)[1]
                      }&type=F`,
                      "_blank"
                    )
                  }
                  className="xm:px-[1px] sm:py-[1px] inline-flex justify-center items-center xl:bg-[#F0F9FF] gap-0.5 rounded hover:cursor-pointer"
                >
                  {/* <Image className="flex sm:hidden" alt="floorPlan-icon" src="/floorPlan.png" width={6} height={7}/> */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Blueprint Roll */}
                    <path
                      d="M3 4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4Z"
                      fill="#6B9AFF"
                      fillOpacity="0.1"
                    />
                    <path d="M3 4V20C3 20.5523 3.44772 21 4 21H5V3H4C3.44772 3 3 3.44772 3 4Z" fill="#6B9AFF" />

                    {/* House */}
                    <path d="M8 10H16L12 7L8 10Z" fill="#6B9AFF" />
                    <rect x="9" y="10" width="6" height="5" fill="#6B9AFF" />
                    <rect x="10.5" y="12" width="1.5" height="3" fill="white" />
                    <rect x="13" y="12" width="1" height="1" fill="white" />

                    {/* Measurement Line */}
                    <line x1="8" y1="16" x2="16" y2="16" stroke="#6B9AFF" strokeWidth="0.5" />
                    <line x1="8" y1="15.5" x2="8" y2="16.5" stroke="#6B9AFF" strokeWidth="0.5" />
                    <line x1="16" y1="15.5" x2="16" y2="16.5" stroke="#6B9AFF" strokeWidth="0.5" />

                    {/* Pencil */}
                    <path d="M14 8L16 6L17 7L15 9L14 8Z" fill="#6B9AFF" />
                    <rect x="16" y="5.5" width="1.5" height="1" transform="rotate(45 16.5 5.5)" fill="#6B9AFF" />
                  </svg>
                </div>)}
                <div
                  onClick={() => {
                    handleClick();
                    setSelected({
                      agentListing,
                      ownerListing,
                      projOrPropName,
                      lat,
                      lang,
                      type,
                      reqId: type === "proj" ? projIdEnc : propIdEnc,
                      propType: type === "proj" ? propType : propTypeName,
                    });
                  }}
                  className="xm:px-[1px] sm:py-[1px] inline-flex justify-center items-center xl:bg-[#F0F9FF] gap-0.5 rounded hover:cursor-pointer"
                >
                  <NewMapIcon className="w-6 h-6" />
                </div>
                {/* 
                <button
                  className="hidden sm:flex max-w-fit sm:px-[1px] sm:py-[1px] rounded text-[#242424] text-sm not-italic font-semibold sm:my-1 md:mb-1 xl:gradient"
                  onClick={() => {
                    handleClick();
                    setSelected({
                      agentListing,
                      ownerListing,
                      projOrPropName,
                      lat,
                      lang,
                      type,
                      reqId: type === "proj" ? projIdEnc : propIdEnc,
                      propType: type === "proj" ? propType : propTypeName,
                    });
                  }}
                >
                 
                </button> */}
              </div>
              <button
                className="max-w-fit sm:block hidden xl:hidden ml-auto px-[1px] py-[1px] rounded text-[#242424] text-xs not-italic font-semibold  md:mb-1 gradient"
                onClick={() =>
                  setSelected({
                    agentListing,
                    ownerListing,
                    projOrPropName,
                    lat,
                    lang,
                    type,
                    reqId: type === "proj" ? projIdEnc : propIdEnc,
                    propType: type === "proj" ? propType : propTypeName,
                  })
                }
              >
                {" "}
                <div className="py-[1px] px-[2px] inline-flex justify-center items-center bg-[#F0F9FF]  rounded">
                  {" "}
                  View on Map
                </div>
                
              </button>
            </div>

            {/* <div className="flex items-end flex-col justify-between md:gap-2 mt-[2px]">
              <Button
                // onChange={() => onAddingCompare()}
                title={Com ? "Remove Compare" : " + Compare"}
                buttonClass="inline-flex justify-center items-center gap-1 xl:gap-2.5 rounded p-0.5 border-[0.5px] border-solid border-[#00A8CD] text-[#00A8CD] text-[12px]       sm:text-[12px] xl:text-xs not-italic font-semibold ml-auto rounded-full"
              />{" "}
            </div> */}
            {type === "proj" && (
              <div className="flex flex-col space-y-1 justify-end items-end">
                {" "}
                {brochureUrl && <DownloadBrocher brochureUrl={brochureUrl} />}
                <button
                  className="bg-orange-500 text-white text-right max-w-fit  px-1 sm:py-1 sm:px-2 font-bold  rounded hover:bg-orange-600 focus:outline-none text-xs text-nowrap  inline-flex"
                  onClick={() =>
                    dispatch({
                      type: "OPEN",
                      content: [],
                      id: `${projIdEnc}+${propTypeId}+${phaseId}`,
                      title: "Amenities",
                      conType: "amenities",
                      pType: type,
                    })
                  }
                >
                  <span className="hidden sm:block">14+</span> Amenities
                </button>
                <button
                  className="bg-teal-500 text-white text-right max-w-fit px-1 font-bold sm:py-1 sm:px-2 text-xs rounded shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out"
                  onClick={() => {
                    console.log("near by 1", data);
                    dispatch({
                      type: "OPEN",
                      content: [],
                      id: `${projIdEnc}+${propTypeId}${
                        phaseId ? `+${phaseId}` : ""
                      }`,
                      title: `NearBy Locations of ${projName}`,
                      conType: "nearby",
                      pType: type,
                      lat,
                      lang,
                    });
                  }}
                >
                  Nearby
                </button>
              </div>
            )}
            {type === "proj" ||
              (category == "Sale" && (
                <div className="text-xs sm:hidden  sm:text-base font-semibold text-[#4f4f4f]  top-2.5 right-24  sm:top-0.5 sm:right-16 mt-1">
                  <p className="text-right text-[12px] text-nowrap text-[#148B16]">
                    Avg Price:₹{" "}
                    {formatNumberWithSuffix(
                      type === "proj" ? basePrice : price
                    )}
                  </p>
                  <p className="text-right text-[12px] text-nowrap">
                    {towerData ? towerData : "N/A"}
                  </p>
                </div>
              ))}

            {type !== "proj" && (
              <>
                <ListingDownSectionCard label={"Tower"} value={towerName} />
                <ListingDownSectionCard label={"Facing"} value={facing} />
                {/* <ListingDownSectionCard
                  label={"Property Age"}
                  value={propertyAge}
                /> */}
                <ListingDownSectionCard
                  label={
                    propTypeName === "Row House" || propTypeName === "Villa"
                      ? "Elevation"
                      : "At Floor"
                  }
                  value={atFloor == 0 ? "G" : atFloor}
                />
              </>
            )}
          </div>
        </>
      )}
      {!isMobile && (
        <div>
          <div className="flex  flex-col justify-center  h-auto items-end">
            <div className="space-x-2 flex flex-row justify-center">
              <HeartButton
                shortListed={Sh}
                onAddingShortList={onAddingShortList}
              />
              <button
                className="space-x-2 flex flex-row justify-center"
                onClick={
                  () =>
                    navigator.share({
                      title: type === "proj" ? projName : propName,
                      text: `Check out this ${
                        type === "proj" ? "project" : "property"
                      }: ${type === "proj" ? projName : propName}`,
                      url: url,
                    })

                  // setSharePopup({
                  //   ...sharePopupData,
                  //   opened: true,
                  //   url,
                  //   ...(type !== "proj" && { title: "Share Listing" }),
                  // })
                }
              >
                {config.shareIcon}
              </button>
            </div>
            <button
              className="max-w-fit px-[1px] py-[1px] rounded text-[#242424] text-xs not-italic font-semibold my-2 md:mb-1 gradient"
              onClick={() =>
                setSelected({
                  agentListing,
                  ownerListing,
                  projOrPropName,
                  lat,
                  lang,
                  type,
                  reqId: type === "proj" ? projIdEnc : propIdEnc,
                  propType: type === "proj" ? propType : propTypeName,
                })
              }
            >
              {" "}
              <div className="py-[1px] px-[2px] inline-flex justify-center items-center bg-[#F0F9FF]  rounded">
                {" "}
                View on Map
              </div>
            </button>
            {type !== "proj" && (
              <>
                <ListingDownSectionCard label={"Tower"} value={towerName} />
                <ListingDownSectionCard label={"Facing"} value={facing} />
                {/* <ListingDownSectionCard
                  label={"Property Age"}
                  value={propertyAge}
                /> */}
                <ListingDownSectionCard
                  label={
                    propTypeName === "Row House" || propTypeName === "Villa"
                      ? "Elevation"
                      : "At Floor"
                  }
                  value={
                    propTypeName === "Row House" || propTypeName === "Villa"
                      ? `G+${atFloor}`
                      : atFloor == 0
                      ? "G"
                      : atFloor
                  }
                />
                {floorPlan && (
                  <button
                    className="text-[14px]  text-btnPrimary  font-bold mt-2"
                    onClick={() =>
                      window.open(
                        `/image?path=${
                          floorPlan.split(process.env.NEXT_PUBLIC_IMG_BASE)[1]
                        }&type=F`,
                        "_blank"
                      )
                    }
                  >
                    <span className="hidden sm:flex">View Floor Plan</span>
                    
                  </button>
                )}
              </>
            )}
          </div>
          {type === "proj" && (
            <div className="flex  items-end flex-col gap-2">
              {brochureUrl && <DownloadBrocher brochureUrl={brochureUrl} />}
              {amenCount && (
                <button
                  className="bg-orange-500 text-white py-1 px-2 font-bold  rounded hover:bg-orange-600 focus:outline-none text-xs "
                  onClick={() =>
                    dispatch({
                      type: "OPEN",
                      content: [],
                      id: `${projIdEnc}+${propTypeId}${
                        phaseId ? `+${phaseId}` : ""
                      }`,
                      title: "Amenities",
                      conType: "amenities",
                      pType: type,
                    })
                  }
                >
                  {amenCount} {amenCount === 1 ? "Amenity" : "Amenities"}
                </button>
              )}

              <button
                className="bg-teal-500 text-white font-bold py-1 px-2 text-xs rounded shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out"
                onClick={() => {
                  dispatch({
                    type: "OPEN",
                    content: [
                      "Orion Mall",
                      "Apollo Hospital",
                      "Greenwood High International School",
                      "MG Road Metro Station",
                      "Major Bus Stop",
                      "City Park",
                      "Central Library",
                      "Fitness Center",
                      "Local Market",
                      "Coffee Shop",
                      "Bank",
                      "Post Office",
                      "Restaurant",
                      "Pharmacy",
                      "Veterinary Clinic",
                    ],
                    id: `${projIdEnc}+${propTypeId ?? ""}${
                      phaseId ? `+${phaseId}` : ""
                    }`,
                    title: `NearBy Locations of ${projName}`,
                    conType: "nearby",
                    pType: type,
                    lat,
                    lang,
                  });
                }}
              >
                Nearby
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
const ListingDownSectionCard = ({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon?: React.JSX.Element;
}) => {
  return (
    value && (
      <p className="text-[#001F35] text-[12px]   xl:text-sm not-italic font-medium text-wrap  inline-flex max-w-fit ml-auto">
        {Icon} {label}:{" "}
        <span className="text-[#242424] text-[12px] xl:text-[14px]  not-italic  font-bold text-nowrap ml-1 ">
          {" "}
          {value}
        </span>
      </p>
      // <p className="text-[#242424] text-[12px] xl:text-[14px]  not-italic mt-[1px] font-bold text-nowrap ml-1 mt-0.5">
      //   {" "}

      // </p>
    )
  );
};

const config = {
  shareIcon: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="13"
        cy="13"
        r="12.75"
        fill="#ECF0F3"
        stroke="#A7C4DA"
        strokeWidth="0.5"
      />
      <path
        d="M11.2391 13.5434C11.2391 14.0522 11.037 14.5401 10.6773 14.8999C10.3175 15.2597 9.82954 15.4618 9.32075 15.4618C8.81195 15.4618 8.324 15.2597 7.96423 14.8999C7.60446 14.5401 7.40234 14.0522 7.40234 13.5434C7.40234 13.0346 7.60446 12.5467 7.96423 12.1869C8.324 11.8271 8.81195 11.625 9.32075 11.625C9.82954 11.625 10.3175 11.8271 10.6773 12.1869C11.037 12.5467 11.2391 13.0346 11.2391 13.5434Z"
        stroke="#616D75"
        strokeWidth="1.5"
      />
      <path
        d="M15.0751 9.32227L11.2383 12.008M15.0751 17.7632L11.2383 15.0775"
        stroke="#616D75"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18.911 18.5308C18.911 19.0396 18.7089 19.5276 18.3491 19.8873C17.9894 20.2471 17.5014 20.4492 16.9926 20.4492C16.4838 20.4492 15.9959 20.2471 15.6361 19.8873C15.2763 19.5276 15.0742 19.0396 15.0742 18.5308C15.0742 18.022 15.2763 17.5341 15.6361 17.1743C15.9959 16.8145 16.4838 16.6124 16.9926 16.6124C17.5014 16.6124 17.9894 16.8145 18.3491 17.1743C18.7089 17.5341 18.911 18.022 18.911 18.5308ZM18.911 8.55512C18.911 9.06391 18.7089 9.55187 18.3491 9.91164C17.9894 10.2714 17.5014 10.4735 16.9926 10.4735C16.4838 10.4735 15.9959 10.2714 15.6361 9.91164C15.2763 9.55187 15.0742 9.06391 15.0742 8.55512C15.0742 8.04633 15.2763 7.55838 15.6361 7.19861C15.9959 6.83884 16.4838 6.63672 16.9926 6.63672C17.5014 6.63672 17.9894 6.83884 18.3491 7.19861C18.7089 7.55838 18.911 8.04633 18.911 8.55512Z"
        stroke="#616D75"
        strokeWidth="1.5"
      />
    </svg>
  ),
};
