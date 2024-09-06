/* eslint-disable jsx-a11y/no-static-element-interactions */
import selectedSearchAtom from "@/app/store/search/map";
import { useAtom, useSetAtom } from "jotai";
import React from "react";
import HeartButton from "../Center/HeartButton";
import { useMediaQuery } from "@mantine/hooks";
import ProjData from "../Center/ProjData";
import { ShareIcon } from "@/app/images/HomePageIcons";
import { searchShareAtom } from "@/app/(dashboard)/search/components/SharePopup";
import { DownLoadIcon, NewMapIcon } from "@/app/images/commongsSvgs2";
import clsx from "clsx";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import downloadPDF from "@/app/(dashboard)/search/Page/utils";
import DownloadBrocher from "../../DownloadBrocher";
import { overlayAtom } from "@/app/test/newui/store/overlay";

type Props = any;

export default function TopRightSection({
  agentListing,
  ownerListing,
  projName,
  lat,
  lang,

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
}: Props) {
  const setSelected = useSetAtom(selectedSearchAtom);
  const [sharePopupData, setSharePopup] = useAtom(searchShareAtom);
  const dispatch = useSetAtom(overlayAtom);
  const url =
    type === "proj"
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/abc/banglore/whitefield/${projIdEnc}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/listing/whitefield/${propIdEnc}`;
  const isMobile = useMediaQuery("(max-width: 1600px)");
  const projOrPropName = type === "proj" ? projName : propName;
  const handleClick = () => {
    // Get the div by ID and scroll to it
    const element = document.getElementById("mobileMap");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={clsx(
        "m-[2px]  xl:mr-3 xl:my-2 flex xl:gap-[0.5px] mx-2 max-h-full justify-between items-start flex-row xl:flex-col xl:items-end  xl:absolute top-0 right-0",
        type !== "proj" && ""
      )}
    >
      <div className="text-xs hidden xl:flex sm:text-base font-medium text-[#4f4f4f] text-nowrap absolute top-3 right-24  sm:top-0 sm:right-[65px]">
        Avg Price:{" "}
        <span className="font-bold ml-1">
          {" "}
          ₹{formatNumberWithSuffix(type === "proj" ? basePrice : price)}
        </span>
      </div>

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
                  onClick={() =>
                    setSharePopup({
                      ...sharePopupData,
                      opened: true,
                      url,
                      ...(type !== "proj" && { title: "Share Listing" }),
                    })
                  }
                >
                  <ShareIcon />
                </button>
              </div>
              {!isMobile && (
                <button
                  className="hidden sm:flex max-w-fit sm:px-[1px] sm:py-[1px]  rounded  text-[#242424] text-sm not-italic font-semibold sm:my-1  md:mb-1  xl:gradient"
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
                    });
                  }}
                >
                  <div className="xm:px-[1px] sm:py-[1px] inline-flex justify-center items-center xl:bg-[#F0F9FF] gap-0.5 rounded">
                    {" "}
                    <span className="hidden md:flex">View on Map</span>{" "}
                    <NewMapIcon className="w-6 h-6" />
                  </div>
                </button>
              )}
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
                      content: [
                        {
                          name: "",
                          id: 323,
                        },
                        {
                          name: "",
                          id: 324,
                        },
                        {
                          name: "",
                          id: 261,
                        },
                        {
                          name: "",
                          id: 325,
                        },
                        {
                          name: "",
                          id: 262,
                        },
                        {
                          name: "",
                          id: 326,
                        },
                        {
                          name: "",
                          id: 263,
                        },
                        {
                          name: "",
                          id: 327,
                        },
                        {
                          name: "",
                          id: 264,
                        },
                        {
                          name: "",
                          id: 328,
                        },
                        {
                          name: "",
                          id: 329,
                        },
                        {
                          name: "",
                          id: 202,
                        },
                        {
                          name: "",
                          id: 203,
                        },
                        {
                          name: "",
                          id: 205,
                        },
                        {
                          name: "",
                          id: 206,
                        },
                        {
                          name: "",
                          id: 340,
                        },
                        {
                          name: "",
                          id: 341,
                        },
                        {
                          name: "",
                          id: 342,
                        },
                        {
                          name: "",
                          id: 343,
                        },
                        {
                          name: "",
                          id: 344,
                        },
                        {
                          name: "",
                          id: 221,
                        },
                        {
                          name: "",
                          id: 222,
                        },
                        {
                          name: "",
                          id: 224,
                        },
                        {
                          name: "",
                          id: 289,
                        },
                        {
                          name: "",
                          id: 290,
                        },
                        {
                          name: "",
                          id: 291,
                        },
                        {
                          name: "",
                          id: 229,
                        },
                        {
                          name: "",
                          id: 230,
                        },
                        {
                          name: "",
                          id: 231,
                        },
                        {
                          name: "",
                          id: 235,
                        },
                        {
                          name: "",
                          id: 236,
                        },
                        {
                          name: "",
                          id: 238,
                        },
                        {
                          name: "",
                          id: 305,
                        },
                        {
                          name: "",
                          id: 306,
                        },
                        {
                          name: "",
                          id: 307,
                        },
                        {
                          name: "",
                          id: 308,
                        },
                        {
                          name: "",
                          id: 309,
                        },
                        {
                          name: "",
                          id: 310,
                        },
                        {
                          name: "",
                          id: 311,
                        },
                        {
                          name: "",
                          id: 312,
                        },
                        {
                          name: "",
                          id: 313,
                        },
                      ],
                      id: `${projIdEnc}+${propTypeId}`,
                      title: "Amenities",
                      conType: "amenities",
                    })
                  }
                >
                  <span className="hidden sm:block">14+</span> Amenities
                </button>
                <button
                  className="bg-teal-500 text-white text-right max-w-fit px-1 font-bold sm:py-1 sm:px-2 text-xs rounded shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out"
                  onClick={() =>
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
                      id: `${projIdEnc}+${propTypeId}`,
                      title: `NearBy Locations of ${projName}`,
                      conType: "nearby",
                    })
                  }
                >
                  Nearby
                </button>
              </div>
            )}
            {type === "proj" && (
              <div className="text-xs sm:hidden  sm:text-base font-semibold text-[#4f4f4f]  top-2.5 right-24  sm:top-0.5 sm:right-16 mt-1">
                <p className="text-right text-[12px] text-nowrap text-[#148B16]">
                  Avg Price:₹ {formatNumberWithSuffix(basePrice)}
                </p>
                <p className="text-right text-[12px] text-nowrap">
                  Elevation: G+30
                </p>
              </div>
            )}

            {type !== "proj" && (
              <>
                <ListingDownSectionCard label={"Tower"} value={"Tower 1"} />
                <ListingDownSectionCard label={"Facing"} value={facing} />
                {/* <ListingDownSectionCard
                  label={"Property Age"}
                  value={propertyAge}
                /> */}
                <ListingDownSectionCard label={"At Floor"} value={"2"} />
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
                onClick={() =>
                  setSharePopup({
                    ...sharePopupData,
                    opened: true,
                    url,
                    ...(type !== "proj" && { title: "Share Listing" }),
                  })
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
                <ListingDownSectionCard label={"Tower"} value={"Tower 1"} />
                <ListingDownSectionCard label={"Facing"} value={facing} />
                {/* <ListingDownSectionCard
                  label={"Property Age"}
                  value={propertyAge}
                /> */}
                <ListingDownSectionCard label={"At Floor"} value={"2"} />
                <button className="text-[14px]  text-btnPrimary  font-bold mt-2">
                  View Floor Plan
                </button>
              </>
            )}
          </div>
          {type === "proj" && (
            <div className="flex  items-end flex-col gap-2">
              {brochureUrl && <DownloadBrocher brochureUrl={brochureUrl} />}

              <button
                className="bg-orange-500 text-white py-1 px-2 font-bold  rounded hover:bg-orange-600 focus:outline-none text-xs "
                onClick={() =>
                  dispatch({
                    type: "OPEN",
                    content: [
                      {
                        name: "",
                        id: 323,
                      },
                      {
                        name: "",
                        id: 324,
                      },
                      {
                        name: "",
                        id: 261,
                      },
                      {
                        name: "",
                        id: 325,
                      },
                      {
                        name: "",
                        id: 262,
                      },
                      {
                        name: "",
                        id: 326,
                      },
                      {
                        name: "",
                        id: 263,
                      },
                      {
                        name: "",
                        id: 327,
                      },
                      {
                        name: "",
                        id: 264,
                      },
                      {
                        name: "",
                        id: 328,
                      },
                      {
                        name: "",
                        id: 329,
                      },
                      {
                        name: "",
                        id: 202,
                      },
                      {
                        name: "",
                        id: 203,
                      },
                      {
                        name: "",
                        id: 205,
                      },
                      {
                        name: "",
                        id: 206,
                      },
                      {
                        name: "",
                        id: 340,
                      },
                      {
                        name: "",
                        id: 341,
                      },
                      {
                        name: "",
                        id: 342,
                      },
                      {
                        name: "",
                        id: 343,
                      },
                      {
                        name: "",
                        id: 344,
                      },
                      {
                        name: "",
                        id: 221,
                      },
                      {
                        name: "",
                        id: 222,
                      },
                      {
                        name: "",
                        id: 224,
                      },
                      {
                        name: "",
                        id: 289,
                      },
                      {
                        name: "",
                        id: 290,
                      },
                      {
                        name: "",
                        id: 291,
                      },
                      {
                        name: "",
                        id: 229,
                      },
                      {
                        name: "",
                        id: 230,
                      },
                      {
                        name: "",
                        id: 231,
                      },
                      {
                        name: "",
                        id: 235,
                      },
                      {
                        name: "",
                        id: 236,
                      },
                      {
                        name: "",
                        id: 238,
                      },
                      {
                        name: "",
                        id: 305,
                      },
                      {
                        name: "",
                        id: 306,
                      },
                      {
                        name: "",
                        id: 307,
                      },
                      {
                        name: "",
                        id: 308,
                      },
                      {
                        name: "",
                        id: 309,
                      },
                      {
                        name: "",
                        id: 310,
                      },
                      {
                        name: "",
                        id: 311,
                      },
                      {
                        name: "",
                        id: 312,
                      },
                      {
                        name: "",
                        id: 313,
                      },
                    ],
                    id: `${projIdEnc}+${propTypeId}`,
                    title: "Amenities",
                    conType: "amenities",
                  })
                }
              >
                14+ Amenities
              </button>
              <button
                className="bg-teal-500 text-white font-bold py-1 px-2 text-xs rounded shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out"
                onClick={() =>
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
                    id: `${projIdEnc}+${propTypeId}`,
                    title: `NearBy Locations of ${projName}`,
                    conType: "nearby",
                  })
                }
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
        stroke-width="0.5"
      />
      <path
        d="M11.2391 13.5434C11.2391 14.0522 11.037 14.5401 10.6773 14.8999C10.3175 15.2597 9.82954 15.4618 9.32075 15.4618C8.81195 15.4618 8.324 15.2597 7.96423 14.8999C7.60446 14.5401 7.40234 14.0522 7.40234 13.5434C7.40234 13.0346 7.60446 12.5467 7.96423 12.1869C8.324 11.8271 8.81195 11.625 9.32075 11.625C9.82954 11.625 10.3175 11.8271 10.6773 12.1869C11.037 12.5467 11.2391 13.0346 11.2391 13.5434Z"
        stroke="#616D75"
        stroke-width="1.5"
      />
      <path
        d="M15.0751 9.32227L11.2383 12.008M15.0751 17.7632L11.2383 15.0775"
        stroke="#616D75"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M18.911 18.5308C18.911 19.0396 18.7089 19.5276 18.3491 19.8873C17.9894 20.2471 17.5014 20.4492 16.9926 20.4492C16.4838 20.4492 15.9959 20.2471 15.6361 19.8873C15.2763 19.5276 15.0742 19.0396 15.0742 18.5308C15.0742 18.022 15.2763 17.5341 15.6361 17.1743C15.9959 16.8145 16.4838 16.6124 16.9926 16.6124C17.5014 16.6124 17.9894 16.8145 18.3491 17.1743C18.7089 17.5341 18.911 18.022 18.911 18.5308ZM18.911 8.55512C18.911 9.06391 18.7089 9.55187 18.3491 9.91164C17.9894 10.2714 17.5014 10.4735 16.9926 10.4735C16.4838 10.4735 15.9959 10.2714 15.6361 9.91164C15.2763 9.55187 15.0742 9.06391 15.0742 8.55512C15.0742 8.04633 15.2763 7.55838 15.6361 7.19861C15.9959 6.83884 16.4838 6.63672 16.9926 6.63672C17.5014 6.63672 17.9894 6.83884 18.3491 7.19861C18.7089 7.55838 18.911 8.04633 18.911 8.55512Z"
        stroke="#616D75"
        stroke-width="1.5"
      />
    </svg>
  ),
};
