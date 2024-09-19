import { modalAtom } from "@/app/test/newui/store/jotai";
import { overlayAtom } from "@/app/test/newui/store/overlay";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
import { useAtom, useSetAtom } from "jotai";
import React from "react";

type Props = any;

export default function ListingData({
  propTypes,
  landArea,
  type,
  ca,
  sba,
  propertyAge,
  propTypeName,
  pa,
  usp,
  projectAbout = usp,
  maxSba,
  minSba,
  minCa,
  maxCa,
  noOfUnits,
  noOfTowers,
  parking,
  balcony,
  bathroom,
  ownership,
  coverParking,
  propTypeId,
  minPa,
  maxPa,
  projIdEnc,
  propStatus,
  towerData,
  availableFor,
}: Props) {
  const isMobile = useMediaQuery("(max-width: 1600px)");
  const isPlot = propTypeId == 32;
  const isRent = type === "Rent";
  const readMoreThreshold = 200;
  const isReadMoreNeeded = projectAbout?.length > readMoreThreshold;
  const dispatch = useSetAtom(overlayAtom);
  return (
    <>
      {" "}
      <div
        className={clsx(
          "flex mb-2 sm:max-w-[600px]   gap-1 flex-col items-start  pl-[0px]  py-[2px] rounded  border-solid border-[#616D75] bg-white",
          type !== "proj" && "m-w-full w-full"
        )}
      >
        {/* down section start here */}
        {type === "proj" ? (
          <div className="flex flex-wrap xl:flex items-center gap-2 xl:gap-x-4 xl:gap-y-0 self-stretch">
            <DownSectionCard
              label={isPlot ? "Plot Area" : "Super Builtup Area"}
              value={
                isPlot
                  ? minPa === maxPa
                    ? `${formatNumberWithSuffix(minPa)} sqft`
                    : `${formatNumberWithSuffix(
                        minPa
                      )}-${formatNumberWithSuffix(maxPa)} sqft`
                  : minSba === maxSba
                  ? `${formatNumberWithSuffix(minSba)} sqft`
                  : `${formatNumberWithSuffix(minSba)}-${formatNumberWithSuffix(
                      maxSba
                    )} sqft`
              }
            />

            {/* <Divider orientation="vertical" color="#7BA0BB" /> */}
            {/* <br /> */}
            {!isPlot && (
              <DownSectionCard
                label="Carpet Area"
                value={
                  minCa === maxCa
                    ? `${formatNumberWithSuffix(minCa)} sqft`
                    : `${formatNumberWithSuffix(
                        minCa
                      )}-${formatNumberWithSuffix(maxCa)} sqft`
                }
              />
            )}

            {/* <Divider orientation="vertical" color="#7BA0BB" /> */}
            {
              <DownSectionCard
                label={type == "proj" ? "Land Area" : "Property Age"}
                value={
                  type == "proj"
                    ? `${landArea ?? 0} sqft`
                    : `${propertyAge ?? 0} Years`
                }
              />
            }

            <DownSectionCard
              label={"No. of Units"}
              value={formatNumberWithSuffix(noOfUnits)}
            />
            <DownSectionCard label={"Approved By"} value={`BDA`} />

            {!isMobile && !isPlot && (
              <DownSectionCard label={"Elevation"} value={`${towerData}`} />
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 xl:gap-x-4 xl:gap-y-0 self-stretch flex-wrap">
            {propTypeName != "Plot" ? (
              <>
                <DownSectionCard
                  label="Super Builtup Area"
                  value={`${formatNumberWithSuffix(sba)} sq.ft`}
                />
                <DownSectionCard
                  label="Carpet Area"
                  value={`${formatNumberWithSuffix(ca)} sq.ft`}
                />
              </>
            ) : (
              <DownSectionCard
                label="Total Area"
                value={`${formatNumberWithSuffix(pa)} sq.ft`}
              />
            )}
            <DownSectionCard label={"OwnerShip"} value={ownership} />
            {isRent && (
              <DownSectionCard label={"Available For"} value={availableFor} />
            )}

            {propStatus !== "Under Construction" && (
              <DownSectionCard
                label={"Property age"}
                value={propertyAge ?? "N/A"}
              />
            )}
            <DownSectionCard label={"Approved By"} value={`BDA`} />
            <div className="flex flex-nowrap gap-2 xl:gap-x-4">
              <DownSectionCard
                label={"Bathrooms"}
                value={bathroom && `${bathroom} No's`}
              />
              <DownSectionCard
                label={"Balcony"}
                value={balcony && `${balcony} No's`}
              />
              <DownSectionCard
                label={"Parkings"}
                value={parking && `${parking} No's (${coverParking})`}
              />
              {isRent && (
                <DownSectionCard label={"Security Deposit"} value={`4,333`} />
              )}
            </div>
          </div>
        )}
      </div>
      <div
        className="text-[12px] sm:text-[14px] pr-2 line-clamp-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="line-clamp-2 relative">
          {projectAbout}
          {isReadMoreNeeded && (
            <div className="absolute bottom-0 right-0 bg-white">
              <span className="text-black">...</span>{" "}
              <button
                className="text-btnPrimary font-bold text-[12px] sm:text-[14px] underline  cursor-pointer   "
                onClick={(e) => {
                  e.stopPropagation(); // Prevents the modal from opening if clicking elsewhere
                  dispatch({
                    content: projectAbout,
                    id: `${projIdEnc}+${propTypeId}`,
                    title: "About Project",
                    type: "OPEN",
                    conType: "readmore",
                  });
                }}
              >
                Read More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
const DownSectionCard = ({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon?: React.JSX.Element;
}) => {
  return value ? (
    <div className="flex flex-col justify-center items-start ">
      <p className="text-[#001F35] text-[12px] sm:text-[14px] xl:text-sm not-italic font-medium text-wrap underline inline-flex">
        {Icon} {label}:
      </p>
      <p className="text-[#242424] text-[12px] sm:text-[14px] xl:text-sm not-italic font-semibold">
        {value}
      </p>
    </div>
  ) : null;
};
