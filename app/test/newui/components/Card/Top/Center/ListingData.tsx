import { formatNumberWithSuffix } from "@/app/utils/numbers";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
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
  projectAbout,
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
}: Props) {
  const isMobile = useMediaQuery("(max-width: 1600px)");
  const isPlot = propTypeId == 32;
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
            {/* {type === "proj" && (
              <div className="mt-[2px] hidden md:block max-w-fit">
                <h5 className="text-[#001F35] text-sm font-medium underline">
                  Property Available:
                </h5>
                <p className="text-[#242424]  text-base not-italic font-semibold">
                  {propTypes && propTypes?.length > 0
                    ? propTypes?.join(", ")
                    : ""}
                </p>
              </div>
            )} */}

            {/* <Divider
              orientation="vertical"
              color="#7BA0BB"
              className="flex md:hidden"
            /> */}
            <DownSectionCard
              label={isPlot ? "Plot Area" : "Super Builtup Area"}
              value={`${formatNumberWithSuffix(
                isPlot ? minPa : minSba
              )}-${formatNumberWithSuffix(isPlot ? maxPa : maxSba)} sqft`}
            />
            {/* <Divider orientation="vertical" color="#7BA0BB" /> */}
            {/* <br /> */}
            {!isPlot && (
              <DownSectionCard
                label="Carpet Area"
                value={`${formatNumberWithSuffix(
                  minCa
                )}-${formatNumberWithSuffix(maxCa)} sqft`}
              />
            )}

            {/* <Divider orientation="vertical" color="#7BA0BB" /> */}
            <DownSectionCard
              label={type == "proj" ? "Land Area" : "Property Age"}
              value={
                type == "proj"
                  ? `${landArea ?? 0} Sqft`
                  : `${propertyAge ?? 0} Years`
              }
            />
            <DownSectionCard
              label={"No. of Units"}
              value={formatNumberWithSuffix(noOfUnits)}
            />
            {!isMobile && !isPlot && (
              <DownSectionCard label={"Elevation"} value={`G+${noOfTowers}`} />
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

            {/* {propStatus == "Under Construction" ? null : (
              // <DownSectionCard
              //   label="Possession Date"
              //   value={formatDate(possassionDate, true)}
              // />
              <DownSectionCard
                label="Property Age"
                value={
                  type == "proj"
                    ? `${landArea ?? 0} Acres`
                    : `${propertyAge ?? `0 Years`} `
                }
              />
            )} */}
            {/* <DownSectionCard
              label="Furnishing"
              value={"Fully Furnished"}
            /> */}

            <DownSectionCard label={"OwnerShip"} value={ownership} />
            <div className="flex flex-nowrap gap-2 xl:gap-x-4">
              <DownSectionCard label={"Bathrooms"} value={`${bathroom} No's`} />
              <DownSectionCard label={"Balcony"} value={`${balcony} No's`} />
              <DownSectionCard
                label={"Parkings"}
                value={`${parking} No's (${coverParking})`}
              />
            </div>
          </div>
        )}
      </div>
      <div className="text-[12px] sm:text-[14px] pr-2 line-clamp-2">
        {projectAbout}
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
  return (
    <div className="flex flex-col justify-center items-start ">
      <p className="text-[#001F35] text-[12px] sm:text-[14px] xl:text-sm not-italic font-medium text-wrap underline inline-flex">
        {Icon} {label}:
      </p>
      <p className="text-[#242424] text-[12px] sm:text-[14px] xl:text-sm not-italic font-semibold">
        {value}
      </p>
    </div>
  );
};
// const ListingDownSectionCard = ({
//   label,
//   value,
//   Icon,
// }: {
//   label: string;
//   value: string;
//   Icon?: React.JSX.Element;
// }) => {
//   return (
//     <div className="flex flex-col justify-center items-start ">
//       <p className="text-[#001F35] text-[12px] sm:text-[14px] xl:text-sm not-italic font-medium text-wrap  inline-flex">
//         {Icon} {value}:
//       </p>
//       <p className="text-[#242424] text-[12px]  not-italic ">{label}</p>
//     </div>
//   );
// };
